import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from '../utils/hooks/useForm';
import { gql, useMutation } from '@apollo/client';
import { Text } from '../components/elements';
import { AuthContext } from '../context/authContext';
import { FormInput } from '../components/styles/form';

const FormContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[1]};
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LOGIN = gql`
  mutation loginClient($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      id
      emailAddress
      token
      tokenExpiration
      firstName
      userType
    }
  }
`;

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const values = {
    emailAddress: '',
    password: '',
  };
  const [errors, setErrors] = useState([]) as any;
  const loginCallback = () => {
    login();
  };
  const { inputs, handleInputChange, onSubmit } = useForm(
    loginCallback,
    values
  );

  useEffect(() => {
    const userType = context?.user?.userType;
    if (userType === 'ADMIN') {
      navigate(`/${context?.user?.id}/${userType}/dashboard`);
    } else if (userType === 'CLIENT') {
      navigate('/');
    }
  }, [context, navigate]);

  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, { data: { login: user } }) {
      cache.writeQuery({
        query: LOGIN,
        data: {
          login: {
            id: user.id,
            emailAddress: user.emailAddress,
            password: user.password,
            token: user.token,
            tokenExpiration: user.tokenExpiration,
            firstName: user.firstName,
            userType: user.userType,
          },
        },
      });
      context.login(user);
      if (user.userType === 'ADMIN') {
        navigate(`/${user.id}/${user.userType}/dashboard`);
      } else {
        navigate('/');
      }
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: inputs },
  });

  if (loading) return <Text>Loading...</Text>;

  return (
    <FormContainer>
      <Form className='w-100'>
        <Form.Group controlId='emailAddress'>
          <Form.Label className='mb-1'>Email Address</Form.Label>
          <FormInput
            name='emailAddress'
            value={inputs.emailAddress || ''}
            type='text'
            placeholder='Email Address'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label className='mb-1'>Password</Form.Label>
          <FormInput
            name='password'
            value={inputs.password || ''}
            type='password'
            placeholder='Password'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
      <Link to='/register'>Register</Link>
      {errors.map((error: any, i: number) => (
        <Alert key={i}>{error.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default Login;

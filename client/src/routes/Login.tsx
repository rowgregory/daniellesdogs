import React, { useContext, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks/useForm';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import {
  FormGroup,
  FormInput,
  FormLabel,
  FormContainer,
} from '../components/styles/form';
import { PageTitle } from './NewClientForm';
import { LOGIN } from '../mutations/login';

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]) as any;

  const values = {
    emailAddress: '',
    password: '',
  };

  const loginCallback = () => {
    login();
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    loginCallback,
    values
  );

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

  if (loading) return <Spinner animation='border' />;

  return (
    <FormContainer>
      <PageTitle>Login</PageTitle>
      <Form className='w-25'>
        {errors?.map((error: any, i: number) => (
          <Alert variant='danger' key={i}>
            {error.message}
          </Alert>
        ))}
        <FormGroup controlId='emailAddress'>
          <FormLabel className='mb-1'>Email Address</FormLabel>
          <FormInput
            name='emailAddress'
            value={inputs?.emailAddress || ''}
            type='text'
            placeholder='Email Address'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup controlId='password'>
          <FormLabel className='mb-1'>Password</FormLabel>
          <FormInput
            name='password'
            value={inputs?.password || ''}
            type='password'
            placeholder='Password'
            onChange={handleInputChange}
          />
        </FormGroup>
        <div className='d-flex justify-content-between align-items-center mt-5'>
          <Button className='' onClick={onSubmit}>
            Submit
          </Button>
          <Link to='/register'>Register</Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export default Login;

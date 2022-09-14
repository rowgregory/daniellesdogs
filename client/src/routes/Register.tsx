import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { AuthContext } from '../context/authContext';
import { Text } from '../components/elements';

const FormContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[1]};
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormInput = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.4rem 1.2rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border} !important;
  :active,
  :focus {
    box-shadow: none !important;
    outline: none !important;
    border-color: 0 !important;
  }
`;

const REGISTER = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      emailAddress
      token
      tokenExpiration
      firstName
      userType
    }
  }
`;

const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const values = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
  };
  const [errors, setErrors] = useState([]) as any;
  const registerCallback = () => {
    register();
  };
  const { inputs, handleInputChange, onSubmit } = useForm(
    registerCallback,
    values
  );

  const [register, { loading }] = useMutation(REGISTER, {
    update(cache, { data: { register: user } }) {
      cache.writeQuery({
        query: REGISTER,
        data: {
          register: {
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
      }
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: inputs },
  });

  if (loading) return <Text>Loading...</Text>;

  return (
    <FormContainer>
      <Form className='w-100'>
        <Form.Group controlId='firstName'>
          <Form.Label className='mb-1'>First Name</Form.Label>
          <FormInput
            name='firstName'
            value={inputs?.firstName || ''}
            type='text'
            placeholder='First Name'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='lastName'>
          <Form.Label className='mb-1'>Last Name</Form.Label>
          <FormInput
            name='lastName'
            value={inputs?.lastName || ''}
            type='text'
            placeholder='Last Name'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='emailAddress'>
          <Form.Label className='mb-1'>Email Address</Form.Label>
          <FormInput
            name='emailAddress'
            value={inputs?.emailAddress || ''}
            type='text'
            placeholder='Email Address'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label className='mb-1'>Pasword</Form.Label>
          <FormInput
            name='password'
            value={inputs?.password || ''}
            type='text'
            placeholder='Paswword'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label className='mb-1'>Confirm Pasword</Form.Label>
          <FormInput
            name='confirmPassword'
            value={inputs?.confirmPassword || ''}
            type='text'
            placeholder='Confirm Paswword'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
      <Link to='/login'>Login</Link>
      {errors.map((error: any, i: number) => (
        <Alert key={i}>{error.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default Register;

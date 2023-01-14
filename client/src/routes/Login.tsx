import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { AuthContext } from '../context/authContext';
import { LOGIN } from '../mutations/login';
import { loginValues } from '../utils/form-values/values';
import {
  FormGroup,
  FormInput,
  FormLabel,
  FormContainer,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import { ButtonWrapper } from '../components/styles/LoginRegister';
import LoginRegisterBtn from '../components/LoginRegisterBtn';
import { validateLogin } from '../utils/validate';
import GraphQLAlert from '../components/elements/GraphQLAlert';

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]) as any;
  const [graphqlErrors, setGraphQLErrors] = useState([]) as any;

  const loginCallback = () => {
    const validForm = validateLogin(setErrors, inputs);
    if (validForm) login();
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    loginCallback,
    loginValues
  );

  const [login, { loading }] = useMutation(LOGIN, {
    variables: { loginInput: inputs },
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
      navigate(`/${user.id}/${user.userType}/dashboard`);
    },
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
  });

  return (
    <FormContainer>
      <PageTitle>Log In</PageTitle>
      <GraphQLAlert
        graphqlErrors={graphqlErrors}
        setGraphQLErrors={setGraphQLErrors}
      />
      <Form>
        <FormGroup controlId='emailAddress'>
          <FormLabel className='mb-1'>Email Address</FormLabel>
          <FormInput
            name='emailAddress'
            value={inputs?.emailAddress || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.emailAddress}</ErrorText>
        </FormGroup>
        <FormGroup controlId='password'>
          <FormLabel className='mb-1'>Password</FormLabel>
          <FormInput
            name='password'
            value={inputs?.password || ''}
            type='password'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.password}</ErrorText>
        </FormGroup>
        <ButtonWrapper>
          <LoginRegisterBtn
            onSubmit={onSubmit}
            loading={loading}
            type='login'
          />
          {!loading && <Link to='/secure'>Register</Link>}
        </ButtonWrapper>
      </Form>
    </FormContainer>
  );
};

export default Login;

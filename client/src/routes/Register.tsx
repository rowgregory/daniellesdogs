import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { AuthContext } from '../context/authContext';
import { REGISTER } from '../mutations/register';
import { registerValues } from '../utils/form-values/values';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import { ButtonWrapper } from '../components/styles/LoginRegister';
import LoginRegisterBtn from '../components/LoginRegisterBtn';
import { validateRegister } from '../utils/validate';
import GraphQLAlert from '../components/elements/GraphQLAlert';

const Register = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]) as any;
  const [graphqlErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();

  const registerCallback = () => {
    const validForm = validateRegister(setErrors, inputs);
    if (validForm) register();
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    registerCallback,
    registerValues
  );

  const [register, { loading }] = useMutation(REGISTER, {
    variables: { registerInput: inputs },
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
        navigate('/admin/dashboard');
      }
    },
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
  });

  return (
    <FormContainer>
      <PageTitle>Register</PageTitle>
      <GraphQLAlert
        graphqlErrors={graphqlErrors}
        setGraphQLErrors={setGraphQLErrors}
      />
      <Form>
        <FormGroup controlId='firstName'>
          <FormLabel className='mb-1'>First Name</FormLabel>
          <FormInput
            name='firstName'
            value={inputs?.firstName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.firstName}</ErrorText>
        </FormGroup>
        <FormGroup controlId='lastName'>
          <FormLabel className='mb-1'>Last Name</FormLabel>
          <FormInput
            name='lastName'
            value={inputs?.lastName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.lastName}</ErrorText>
        </FormGroup>
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
        <FormGroup controlId='confirmPassword'>
          <FormLabel className='mb-1'>Confirm Password</FormLabel>
          <FormInput
            name='confirmPassword'
            value={inputs?.confirmPassword || ''}
            type='password'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.confirmPassword}</ErrorText>
        </FormGroup>
        <ButtonWrapper>
          <LoginRegisterBtn
            onSubmit={onSubmit}
            loading={loading}
            type='register'
          />
          {!loading && <Link to='/login'>Login</Link>}
        </ButtonWrapper>
      </Form>
    </FormContainer>
  );
};

export default Register;

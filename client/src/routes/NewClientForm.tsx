import React, { useState } from 'react';
import { Text } from '../components/elements';
import { Form } from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../queries/getNewClientForms';
import { useNavigate } from 'react-router-dom';
import { validateNewClientForm } from '../utils/validate';
import GraphQLAlert from '../components/elements/GraphQLAlert';
import ContinueBtn from '../components/ContinueBtn';
import {
  ErrorText,
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
} from '../components/styles/form';
import { useForm } from '../utils/hooks/useForm';
import { ncfBasicValues } from '../utils/form-values/values';

const NewClientForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]) as any;
  const [graphqlErrors, setGraphQLErrors] = useState([]) as any;

  const ncfCallback = () => {
    let validForm = validateNewClientForm(setErrors, inputs);
    if (validForm)
      getUserByEmail({ variables: { emailAddress: inputs?.emailAddress } });
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    ncfCallback,
    ncfBasicValues
  );

  let [getUserByEmail, { loading, data }] = useLazyQuery(GET_USER_BY_EMAIL, {
    onCompleted: () => {
      if (data?.getUserByEmail) {
        navigate('/new-client-form/address', {
          state: {
            firstName: inputs?.firstName,
            lastName: inputs?.lastName,
            emailAddress: inputs?.emailAddress,
            phoneNumber: inputs?.phoneNumber,
          },
        });
      }
    },
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
  });

  return (
    <FormContainer>
      <PageTitle>Introduce yourself.</PageTitle>
      <Text fontFamily='Oxygen, sans-serif' margin={['0 0 1.5rem 0']}>
        Let's get to know each other. Quick tip: make sure all fields are
        accurately filled out;
      </Text>
      <GraphQLAlert
        graphqlErrors={graphqlErrors}
        setGraphQLErrors={setGraphQLErrors}
      />
      <Form>
        <FormGroup controlId='firstName'>
          <FormLabel>First Name*</FormLabel>
          <FormInput
            name='firstName'
            value={inputs?.firstName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.firstName}</ErrorText>
        </FormGroup>
        <FormGroup controlId='lastName'>
          <FormLabel>Last Name*</FormLabel>
          <FormInput
            name='lastName'
            value={inputs?.lastName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.lastName}</ErrorText>
        </FormGroup>
        <FormGroup controlId='emailAddress'>
          <FormLabel>Email Address*</FormLabel>
          <FormInput
            name='emailAddress'
            value={inputs?.emailAddress || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.emailAddress}</ErrorText>
        </FormGroup>
        <FormGroup controlId='phoneNumber'>
          <FormLabel>Phone Number*</FormLabel>
          <FormInput
            name='phoneNumber'
            value={inputs?.phoneNumber || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.phoneNumber}</ErrorText>
        </FormGroup>
        <ContinueBtn onSubmit={onSubmit} text='Continu' loading1={loading} />
      </Form>
    </FormContainer>
  );
};

export default NewClientForm;

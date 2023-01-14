import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_NEW_CLIENT_FORM } from '../mutations/createNewClientForm';
import { useMutation } from '@apollo/client';
import { validateNewClientFormWaiver } from '../utils/validate';
import { Form } from 'react-bootstrap';
import GraphQLAlert from '../components/elements/GraphQLAlert';
import ContinueBtn from '../components/ContinueBtn';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import { useNCFWaiverForm } from '../utils/hooks/useNCFMWaierForm';
import { currentDate } from '../utils/currentDate';

const Waiver = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]) as any;
  const [graphqlErrors, setGraphQLErrors] = useState([]) as any;
  const { state } = useLocation() as any;

  const createNewClientFormCallback = () => {
    const validForm = validateNewClientFormWaiver(setErrors, inputs);

    if (validForm) {
      createNewClientForm();
    }
  };

  const { inputs, handleInputChange, onSubmit } = useNCFWaiverForm(
    createNewClientFormCallback
  );

  const newClientFormInput = {
    firstName: state?.firstName,
    lastName: state?.lastName,
    emailAddress: state?.emailAddress,
    phoneNumber: state?.phoneNumber,
    address: {
      addressLine1: state?.address?.addressLine1,
      city: state?.address?.city,
      state: state?.address?.state,
      zipPostalCode: state?.address?.zipPostalCode,
    },
    vet: {
      name: state?.vet?.name,
      address: state?.vet?.address,
      phoneNumber: state?.vet?.phoneNumber,
    },
    openYard: state?.openYard,
    pets: state?.pets,
    signedWaiver: true,
    signedWaiverSignature: inputs?.signedWaiverSignature,
    signedWaiverDate: inputs?.signedWaiverDate,
  };

  const [createNewClientForm, { loading }] = useMutation(
    CREATE_NEW_CLIENT_FORM,
    {
      variables: { newClientFormInput },
      onCompleted() {
        navigate('/new-client-form/complete');
      },
      onError({ graphQLErrors }) {
        setGraphQLErrors(graphQLErrors);
      },
    }
  );

  return (
    <FormContainer>
      <PageTitle>Waiver</PageTitle>
      <GraphQLAlert
        graphqlErrors={graphqlErrors}
        setGraphQLErrors={setGraphQLErrors}
      />
      <Form>
        <FormGroup controlId='signedWaiverSignature'>
          <FormLabel>Signature</FormLabel>
          <FormInput
            name='signedWaiverSignature'
            value={inputs?.signedWaiverSignature || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.signedWaiverSignature}</ErrorText>
        </FormGroup>
        <FormGroup controlId='signedWaiverDate'>
          <FormLabel>Date</FormLabel>
          <FormInput
            disabled={true}
            name='signedWaiverDate'
            value={currentDate}
            type='date'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.signedWaiverDate}</ErrorText>
        </FormGroup>
        <ContinueBtn onSubmit={onSubmit} text='Complet' loading1={loading} />
      </Form>
    </FormContainer>
  );
};

export default Waiver;

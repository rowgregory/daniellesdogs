import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text } from '../components/elements';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
} from '../components/styles/form';
import { CREATE_NEW_CLIENT_FORM } from '../mutations/createNewClientForm';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { validateNewClientFormWaiver } from '../utils/validate';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { ErrorText, PageTitle } from './NewClientForm';

const Waiver = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const { state } = useLocation() as any;

  const date = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1 <= 9
      ? '0' + (new Date().getMonth() + 1).toString()
      : new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const values = {
    signedWaiver: false,
    signedWaiverSignature: '',
    signedWaiverDate: date,
  };

  const createNewClientFormCallback = () => {
    const validForm = validateNewClientFormWaiver(setErrors, inputs);

    if (validForm) {
      createNewClientForm();
    }
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    createNewClientFormCallback,
    values
  );

  const newClientFormData = {
    firstName: state?.firstName,
    lastName: state?.lastName,
    emailAddress: state?.emailAddress,
    phoneNumber: state?.phoneNumber,
    address: {
      addressLine1: state?.address.addressLine1,
      city: state?.address.city,
      state: state?.address.state,
      zipPostalCode: state?.address.zipPostalCode,
    },
    vet: {
      name: state?.vet.name,
      address: state?.vet.address,
      phoneNumber: state?.vet.phoneNumber,
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
      onError({ graphQLErrors }) {
        setGraphQLErrors(graphQLErrors);
      },
      onCompleted() {
        navigate('/new-client-form/complete');
      },
      variables: { newClientFormInput: newClientFormData },
    }
  );

  return (
    <FormContainer>
      <PageTitle>Waiver</PageTitle>
      <Form>
        {graphQLErrors?.map((error: any) => (
          <Alert variant='danger'>{error}</Alert>
        ))}
        <div className='d-flex'>
          <FormGroup controlId='signedWaiverSignature'>
            <FormLabel className='mb-0'>Signature</FormLabel>
            <FormInput
              name='signedWaiverSignature'
              value={inputs?.signedWaiverSignature || ''}
              type='text'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.signedWaiverSignature}</ErrorText>
          </FormGroup>
          <FormGroup controlId='signedWaiverDate'>
            <FormLabel className='mb-0'>Date</FormLabel>
            <FormInput
              disabled={true}
              name='signedWaiverDate'
              value={date}
              type='date'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.signedWaiverDate}</ErrorText>
          </FormGroup>
        </div>
        <Button
          style={{ textTransform: 'capitalize' }}
          onClick={onSubmit}
          className='d-flex align-items-center justify-content-center text-white mt-5'
        >
          <Text
            fontFamily={`Oxygen, sans-serif`}
            color='#fff'
            margin={[`0 ${loading ? '0.5rem' : '0'} 0 0`]}
          >
            Complete
          </Text>
          {loading && <Spinner animation='border' size='sm' />}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Waiver;

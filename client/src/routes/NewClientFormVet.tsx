import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
} from '../components/styles/form';
import { useForm } from '../utils/hooks/useForm';
import { validateNewClientFormVet } from '../utils/validate';
import { ErrorText, NewClientFormTitle } from './NewClientForm';

const NewClientFormVet = () => {
  const { state } = useLocation() as any;
  const values = {
    vet: {
      name: '',
      address: '',
      phoneNumber: '',
    },
  };
  const { inputs, handleInputChange } = useForm(values);
  const [errors, setErrors] = useState() as any;
  const navigate = useNavigate();

  useEffect(() => {
    const allFieldsAreFilled = [
      errors?.name,
      errors?.address,
      errors?.phoneNumber,
    ].every((f) => f === '');

    if (allFieldsAreFilled) {
      navigate('/new-client-form/pets', {
        state: {
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
            name: inputs?.vet?.name,
            address: inputs?.vet?.address,
            phoneNumber: inputs?.vet?.phoneNumber,
          },
        },
      });
    }
  }, [errors, inputs, state, navigate]);

  const handleSubmit = () => {
    validateNewClientFormVet(setErrors, inputs);
  };

  return (
    <FormContainer>
      <NewClientFormTitle>Vet</NewClientFormTitle>
      <Form>
        <FormGroup controlId='vetName'>
          <FormLabel className='mb-0'>Name</FormLabel>
          <FormInput
            name='vetName'
            value={inputs?.vet?.name || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.name}</ErrorText>
        </FormGroup>
        <FormGroup controlId='vetAddress'>
          <FormLabel className='mb-0'>Address</FormLabel>
          <FormInput
            name='vetAddress'
            value={inputs?.vet?.address || state?.vet?.address || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.address}</ErrorText>
        </FormGroup>
        <FormGroup controlId='vetPhoneNumber'>
          <FormLabel className='mb-0'>Phone Number</FormLabel>
          <FormInput
            name='vetPhoneNumber'
            value={inputs?.vet?.phoneNumber || ''}
            type='tel'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.phoneNumber}</ErrorText>
        </FormGroup>
        <Button
          style={{ textTransform: 'capitalize' }}
          onClick={handleSubmit}
          className='d-flex align-items-center justify-content-center text-white mt-5'
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default NewClientFormVet;

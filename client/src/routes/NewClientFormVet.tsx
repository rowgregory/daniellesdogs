import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ContinueBtn from '../components/ContinueBtn';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import { useNCFVetForm } from '../utils/hooks/useNCFVetForm';
import { validateNewClientFormVet } from '../utils/validate';

const NewClientFormVet = () => {
  const [errors, setErrors] = useState() as any;
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const ncfVetCalback = () => {
    setLoading(true);
    const validForm = validateNewClientFormVet(setErrors, inputs);
    setLoading(false);

    if (validForm) {
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
  };

  const { inputs, handleInputChange, onSubmit } = useNCFVetForm(ncfVetCalback);

  return (
    <FormContainer>
      <PageTitle>Vet</PageTitle>
      <Form>
        <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormInput
            name='name'
            value={inputs?.vet?.name || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.name}</ErrorText>
        </FormGroup>
        <FormGroup controlId='address'>
          <FormLabel>Address</FormLabel>
          <FormInput
            name='address'
            value={inputs?.vet?.address || state?.vet?.address || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.address}</ErrorText>
        </FormGroup>
        <FormGroup controlId='phoneNumber' className='mb-4'>
          <FormLabel>Phone Number</FormLabel>
          <FormInput
            name='phoneNumber'
            value={inputs?.vet?.phoneNumber || ''}
            type='tel'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.phoneNumber}</ErrorText>
        </FormGroup>
        <ContinueBtn onSubmit={onSubmit} text='Continue' loading1={loading} />
      </Form>
    </FormContainer>
  );
};

export default NewClientFormVet;

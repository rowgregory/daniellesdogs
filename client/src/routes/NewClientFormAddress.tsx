import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  FormSelect,
} from '../components/styles/form';
import { useForm } from '../utils/hooks/useForm';
import { STATES } from '../utils/states';
import { validateNewClientFormAddress } from '../utils/validate';
import { ErrorText, PageTitle } from './NewClientForm';

const NewClientFormAddress = () => {
  const [errors, setErrors] = useState() as any;
  const { state } = useLocation() as any;
  const navigate = useNavigate();

  const values = {
    address: {
      addressLine1: '',
      city: '',
      state: '',
      zipPostalCode: '',
    },
  };

  const { inputs, handleInputChange } = useForm(values);

  const handleSubmit = () => {
    const validForm = validateNewClientFormAddress(setErrors, inputs);

    if (validForm) {
      navigate('/new-client-form/vet', {
        state: {
          firstName: state?.firstName,
          lastName: state?.lastName,
          emailAddress: state?.emailAddress,
          phoneNumber: state?.phoneNumber,
          address: {
            addressLine1: inputs?.address?.addressLine1,
            city: inputs?.address?.city,
            state: inputs?.address?.state,
            zipPostalCode: inputs?.address?.zipPostalCode,
          },
        },
      });
    }
  };

  return (
    <FormContainer>
      <PageTitle>Address</PageTitle>
      <Form>
        <FormGroup controlId='addressLine1'>
          <FormLabel className='mb-0'>Address</FormLabel>
          <FormInput
            name='addressLine1'
            value={inputs?.address?.addressLine1 || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.addressLine1}</ErrorText>
        </FormGroup>
        <FormGroup controlId='city'>
          <FormLabel className='mb-0'>City</FormLabel>
          <FormInput
            name='city'
            value={inputs?.address?.city || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.city}</ErrorText>
        </FormGroup>
        <FormGroup controlId='state'>
          <FormLabel className='mb-0'>State</FormLabel>
          <FormSelect
            name='state'
            value={inputs?.address?.state || ''}
            onChange={handleInputChange}
          >
            {STATES.map((obj: any, i: number) => (
              <option key={i} value={obj.value}>
                {obj.text}
              </option>
            ))}
          </FormSelect>
          <ErrorText>{errors?.state}</ErrorText>
        </FormGroup>
        <FormGroup controlId='zipPostalCode'>
          <FormLabel className='mb-0'>Zip/Postal Code</FormLabel>
          <FormInput
            name='zipPostalCode'
            value={inputs?.address?.zipPostalCode || ''}
            type='number'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.zipPostalCode}</ErrorText>
        </FormGroup>
        <Button
          onClick={handleSubmit}
          className='py-1 px-3 d-flex align-items-center justify-content-center text-white mt-5'
          style={{
            textTransform: 'capitalize',
          }}
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default NewClientFormAddress;

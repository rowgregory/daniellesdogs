import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import ContinueBtn from '../components/ContinueBtn';
import { useNCFAddressForm } from '../utils/hooks/useNCFAddressForm';
import { STATES } from '../utils/states';
import { validateNewClientFormAddress } from '../utils/validate';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  FormSelect,
  PageTitle,
  ErrorText,
} from '../components/styles/form';

const NewClientFormAddress = () => {
  const [errors, setErrors] = useState() as any;
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const ncfAddressCalback = () => {
    setLoading(true);
    const validForm = validateNewClientFormAddress(setErrors, inputs);
    setLoading(false);

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

  const { inputs, handleInputChange, onSubmit } =
    useNCFAddressForm(ncfAddressCalback);

  return (
    <FormContainer>
      <PageTitle>Address</PageTitle>
      <Form>
        <FormGroup controlId='addressLine1'>
          <FormLabel>Address*</FormLabel>
          <FormInput
            name='addressLine1'
            value={inputs?.address?.addressLine1 || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.addressLine1}</ErrorText>
        </FormGroup>
        <FormGroup controlId='city'>
          <FormLabel>City*</FormLabel>
          <FormInput
            name='city'
            value={inputs?.address?.city || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.city}</ErrorText>
        </FormGroup>
        <FormGroup controlId='state'>
          <FormLabel>State*</FormLabel>
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
          <FormLabel>Zip/Postal Code*</FormLabel>
          <FormInput
            name='zipPostalCode'
            value={inputs?.address?.zipPostalCode || ''}
            type='number'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.zipPostalCode}</ErrorText>
        </FormGroup>
        <ContinueBtn onSubmit={onSubmit} text='Continu' loading1={loading} />
      </Form>
    </FormContainer>
  );
};

export default NewClientFormAddress;

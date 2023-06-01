import React from 'react';
import { Form } from 'react-bootstrap';
import { STATES } from '../../utils/states';
import {
  ErrorText,
  FormInput,
  FormSelection,
  ProceedBtn,
} from '../styles/checkout';

const ShippingForm = ({ inputs, handleInputChange, errors, onSubmit }: any) => {
  return (
    <Form className='d-flex flex-column'>
      <Form.Group controlId='address'>
        <FormInput
          name='address'
          value={inputs.address || ''}
          onChange={handleInputChange}
          placeholder='Address'
          type='text'
        />
        <ErrorText>{errors?.address}</ErrorText>
      </Form.Group>
      <Form.Group controlId='city'>
        <FormInput
          name='city'
          value={inputs.city || ''}
          onChange={handleInputChange}
          placeholder='City'
          type='text'
        />
        <ErrorText>{errors?.city}</ErrorText>
      </Form.Group>
      <Form.Group controlId='state'>
        <FormSelection
          name='state'
          value={inputs.state || ''}
          onChange={handleInputChange}
          placeholder=''
        >
          {STATES.map((obj, i) => (
            <option key={i} value={obj.value}>
              {obj.text}
            </option>
          ))}
        </FormSelection>
        <ErrorText>{errors?.state}</ErrorText>
      </Form.Group>
      <Form.Group controlId='zipPostalCode'>
        <FormInput
          name='zipPostalCode'
          value={inputs.zipPostalCode || ''}
          onChange={handleInputChange}
          placeholder='Zip Code'
          type='number'
        />
        <ErrorText>{errors?.zipPostalCode}</ErrorText>
      </Form.Group>
      <ProceedBtn
        onClick={onSubmit}
        type='submit'
        className='mb-5 mt-4 align-self-end'
      >
        Use this address
      </ProceedBtn>
    </Form>
  );
};

export default ShippingForm;

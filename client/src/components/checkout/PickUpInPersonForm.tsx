import React from 'react';
import { Flex, Text } from '../elements';
import { Form } from 'react-bootstrap';
import { ErrorText, FormInput, ProceedBtn } from '../styles/checkout';
import styled from 'styled-components';

const Check = styled(Form.Check)`
  font-family: Arial, sans-serif;
  margin-right: 30px;
  font-size: 16px;
`;

const PickUpInPersonForm = ({
  inputs,
  handleInputChange,
  errors,
  onSubmit,
}: any) => {
  return (
    <Form className='d-flex flex-column'>
      <Text fontFamily='Arial'>Which city will you be picking up in?</Text>
      <Flex margin={['30px 0 20px 0']}>
        <Check
          className='check'
          type='radio'
          label='Swampscott, MA'
          name='selectionOption'
          value='swampscott'
          checked={inputs.selectionOption === 'swampscott'}
          onChange={handleInputChange}
        />
        <Check
          type='radio'
          label='Marblehead, MA'
          name='selectionOption'
          value='marblehead'
          checked={inputs.selectionOption === 'marblehead'}
          onChange={handleInputChange}
        />
        <Check
          type='radio'
          label='Salem, MA'
          name='selectionOption'
          value='salem'
          checked={inputs.selectionOption === 'salem'}
          onChange={handleInputChange}
        />
      </Flex>
      {inputs.selectionOption && (
        <Form.Group controlId='cellPhoneNumber'>
          <FormInput
            name='cellPhoneNumber'
            type='tel'
            placeholder='Phone number'
            value={inputs.cellPhoneNumber}
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.cellPhoneNumber}</ErrorText>
        </Form.Group>
      )}
      <ProceedBtn
        onClick={onSubmit}
        type='submit'
        className='mb-5 mt-4 align-self-end'
      >
        Continue to payment
      </ProceedBtn>
    </Form>
  );
};

export default PickUpInPersonForm;

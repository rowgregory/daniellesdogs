import React, { useEffect, useState } from 'react';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
} from '../components/styles/form';
import { useForm } from '../utils/hooks/useForm';
import { Text } from '../components/elements';
import { Button, Form, Spinner, Stack } from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../queries/getNewClientForms';
import { useNavigate } from 'react-router-dom';
import { ErrorAlertIcon } from '../components/svg/ErrorAlertIcon';
import styled from 'styled-components';
import { validateNewClientForm } from '../utils/validate';
import { motion } from 'framer-motion';

export const ErrorText = styled(Text)`
  font-family: 'Oxygen', sans-serif;
  font-size: 0.875rem;
  color: #d42825;
  font-weight: bold;
`;

export const NewClientFormTitle = styled(Text)`
  font-family: 'Oxygen', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const NewClientForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState() as any;
  const navigate = useNavigate();
  const values = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    afterMeetingNotes: '',
  };

  useEffect(() => {
    document.title = 'New Client Form';
  }, []);

  const { inputs, handleInputChange } = useForm(values);

  let [getUserByEmail, { loading, data }] = useLazyQuery(GET_USER_BY_EMAIL, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      const allFieldsAreFilled = [
        errors?.firstName,
        errors?.lastName,
        errors?.emailAddress,
        errors?.phoneNumber,
      ].every((f) => f === '');

      const emailDoesNotExist = data?.getUserByEmail?.message === 'OKAY_TO_GO';
      const emailDoesExist = data?.getUserByEmail?.message !== 'OKAY_TO_GO';

      const okToProceed = emailDoesNotExist && allFieldsAreFilled;
      if (okToProceed) {
        setErrorMessage('');
        navigate('/new-client-form/address', {
          state: {
            firstName: inputs?.firstName,
            lastName: inputs?.lastName,
            emailAddress: inputs?.emailAddress,
            phoneNumber: inputs?.phoneNumber,
          },
        });
      } else if (emailDoesExist) {
        setErrorMessage(data?.getUserByEmail?.message);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.25 }}
      transition={{ duration: 0.5 }}
    >
      <FormContainer>
        <NewClientFormTitle>Introduce yourself.</NewClientFormTitle>
        <Text fontFamily='Oxygen, sans-serif' margin={['0 0 1.5rem 0']}>
          Let's get to know each other. Quick tip: make sure all fields are
          accurately filled out;
        </Text>
        <Form className='w-100'>
          <Stack>
            {errorMessage && (
              <div className='d-flex align-items-center mb-3'>
                <ErrorAlertIcon />
                <Text margin={['0 0 0 1rem']} fontFamily={`Oxygen, sans-serif`}>
                  {errorMessage}
                </Text>
              </div>
            )}
            <FormGroup controlId='firstName'>
              <FormLabel className='mb-0'>First Name</FormLabel>
              <FormInput
                name='firstName'
                value={inputs?.firstName || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.firstName}</ErrorText>
            </FormGroup>
            <FormGroup controlId='lastName'>
              <FormLabel className='mb-0'>Last Name</FormLabel>
              <FormInput
                name='lastName'
                value={inputs?.lastName || ''}
                type='text'
                onChange={handleInputChange}
              />
            </FormGroup>
            <ErrorText>{errors?.lastName}</ErrorText>
            <FormGroup controlId='emailAddress'>
              <FormLabel className='mb-0'>Email Address</FormLabel>
              <FormInput
                name='emailAddress'
                value={inputs?.emailAddress || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.emailAddress}</ErrorText>
            </FormGroup>
            <FormGroup controlId='phoneNumber'>
              <FormLabel className='mb-0'>Phone Number</FormLabel>
              <FormInput
                name='phoneNumber'
                value={inputs?.phoneNumber || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.phoneNumber}</ErrorText>
            </FormGroup>
          </Stack>
          <Button
            className='py-1 px-3 d-flex align-items-center justify-content-center text-white mt-5'
            style={{
              textTransform: 'capitalize',
            }}
            onClick={() => {
              validateNewClientForm(setErrors, inputs);
              inputs?.emailAddress &&
                getUserByEmail({
                  variables: { emailAddress: inputs?.emailAddress },
                });
            }}
          >
            <Text
              fontFamily={`Oxygen, sans-serif`}
              color='#fff'
              margin={[`0 ${loading ? '0.5rem' : '0'} 0 0`]}
            >
              Continue
            </Text>
            {loading && <Spinner animation='border' size='sm' />}
          </Button>
        </Form>
      </FormContainer>
    </motion.div>
  );
};

export default NewClientForm;

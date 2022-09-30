import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  FormTextArea,
} from '../components/styles/form';
import { ErrorText, PageTitle } from './NewClientForm';
import { validateContactForm } from '../utils/validate';
import { CREATE_CONTACT_FORM } from '../mutations/createContactForm';
import { useNavigate } from 'react-router-dom';
import { Text } from '../components/elements';

const ContactForm = () => {
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();

  const values = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    subject: '',
    message: '',
  };

  const createContactFormCallback = () => {
    const validForm = validateContactForm(setErrors, inputs);

    if (validForm) {
      contactFormCreate();
    }
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    createContactFormCallback,
    values
  );

  const [contactFormCreate, { loading, data }] = useMutation(
    CREATE_CONTACT_FORM,
    {
      onError({ graphQLErrors }) {
        setGraphQLErrors(graphQLErrors);
      },
      onCompleted() {
        navigate(`/contact/thank-you`, {
          state: {
            firstName: data?.createContactForm?.firstName,
            id: data?.createContactForm?.id,
          },
        });
      },
      variables: { contactFormInput: inputs },
    }
  );

  return (
    <FormContainer>
      <PageTitle>Contact Us</PageTitle>
      <Form className='w-100'>
        <FormGroup controlId='firstName'>
          <FormLabel className='mb-1'>First Name</FormLabel>
          <FormInput
            name='firstName'
            value={inputs?.firstName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.firstName}</ErrorText>
        </FormGroup>
        <FormGroup controlId='lastName'>
          <FormLabel className='mb-1'>Last Name</FormLabel>
          <FormInput
            name='lastName'
            value={inputs?.lastName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.lastName}</ErrorText>
        </FormGroup>
        <FormGroup controlId='emailAddress'>
          <FormLabel className='mb-1'>Email Address</FormLabel>
          <FormInput
            name='emailAddress'
            value={inputs?.emailAddress || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.emailAddress}</ErrorText>
        </FormGroup>
        <FormGroup controlId='subject'>
          <FormLabel className='mb-1'>Subject</FormLabel>
          <FormInput
            name='subject'
            value={inputs?.subject || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.subject}</ErrorText>
        </FormGroup>
        <FormGroup controlId='message'>
          <FormLabel className='mb-1'>Message</FormLabel>
          <FormTextArea
            name='message'
            value={inputs?.message || ''}
            as='textarea'
            rows={4}
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.message}</ErrorText>
        </FormGroup>
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
            Submit{loading && 'ting...'}
          </Text>
          {loading && <Spinner animation='border' size='sm' />}
        </Button>
      </Form>
      {graphQLErrors?.map((error: any, i: number) => (
        <Alert key={i}>{error?.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default ContactForm;

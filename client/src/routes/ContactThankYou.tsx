import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link, Text } from '../components/elements';
import { FormContainer, PageTitle } from '../components/styles/form';

const ContactThankYou = () => {
  const { state } = useLocation() as any;
  return (
    <FormContainer>
      <PageTitle>Thank you for contacting us {state?.firstName}.</PageTitle>
      <Text margin={['0 0 3rem 0']}>
        Contact Form Id: <span style={{ fontWeight: 'bold' }}>{state.id}</span>
      </Text>
      <Text>We will get back to you within 24 hours.</Text>
      <Link
        to='/'
        className='mt-5'
        style={{ borderBottom: '1px dotted #121212' }}
      >
        Home
      </Link>
    </FormContainer>
  );
};

export default ContactThankYou;

import { useQuery } from '@apollo/client';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GET_CONTACT_FORM_BY_ID } from '../queries/getContactFormById';
import { Flex, Text } from '../components/elements';
import { PageTitle } from '../components/styles/backend-tables';
import formatDate from '../utils/formatDate';

const ContactFormView = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_CONTACT_FORM_BY_ID, {
    variables: { id },
  });

  return (
    <Flex padding={['32px 32px 48px']} flexdirection={['column']}>
      <PageTitle>Contact Form</PageTitle>
      {loading && <Spinner animation='border' />}
      <Text margin={['0 0 32px 0']} color={['#d1d1d1']} fontFamily='Roboto'>
        Created On: {formatDate(data?.contactFormById?.createdAt)}
      </Text>
      <Text color={['#d1d1d1']} fontFamily='Roboto'>
        First Name: {data?.contactFormById?.firstName}
      </Text>

      <Text color={['#d1d1d1']} fontFamily='Roboto'>
        Last Name: {data?.contactFormById?.lastName}
      </Text>
      <Text color={['#d1d1d1']} fontFamily='Roboto'>
        Email Address: {data?.contactFormById?.emailAddress}
      </Text>
      <Text color={['#d1d1d1']} fontFamily='Roboto'>
        Subject: {data?.contactFormById?.subject}
      </Text>
      <Text color={['#d1d1d1']} fontFamily='Roboto'>
        Message: {data?.contactFormById?.message}
      </Text>
    </Flex>
  );
};

export default ContactFormView;

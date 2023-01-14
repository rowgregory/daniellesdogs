import React from 'react';
import styled from 'styled-components';
import { Link, Text } from '../components/elements';
import { FormContainer, PageTitle } from '../components/styles/form';

const ReturnHomeLink = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  :hover {
    color: #fff;
  }
`;

const Complete = () => {
  return (
    <FormContainer>
      <PageTitle>Complete!</PageTitle>
      <Text fontFamily={`Oxygen, sans-serif`} margin={['0 0 2rem 0']}>
        Thank you for submitting our new client form. You will be contacted once
        your submition has been reviewed.
      </Text>
      <ReturnHomeLink
        className='bg-success'
        fontFamily={`Oxygen, sans-serif`}
        to='/'
        color={['#fff']}
        padding={['0.5rem 1.5rem']}
      >
        Home
      </ReturnHomeLink>
    </FormContainer>
  );
};

export default Complete;

import React from 'react';
import { Link } from 'react-router-dom';
import { FormContainer, PageTitle } from '../components/styles/form';

const LoggedOut = () => {
  window.scrollTo(0, 0);
  return (
    <FormContainer>
      <PageTitle>You've Logged Out</PageTitle>
      <Link to='/login'>Log In</Link>
    </FormContainer>
  );
};

export default LoggedOut;

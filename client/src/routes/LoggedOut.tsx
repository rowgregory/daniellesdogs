import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../components/elements';

const LoggedOut = () => {
  return (
    <>
      <Text>You've Logged Out</Text>
      <Link to='/login'>Log In</Link>
    </>
  );
};

export default LoggedOut;

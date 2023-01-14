import React, { FC } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from './elements';

interface LoginBtnProps {
  onSubmit: any;
  loading: boolean;
  type: string;
}

const Login = styled(Button)<{ l: string }>`
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: ${({ l }) => (l === 'true' ? '100%' : 'fit-content')};
`;

const LoginRegisterBtn: FC<LoginBtnProps> = ({ onSubmit, loading, type }) => {
  return (
    <Login onClick={onSubmit} disabled={loading} l={String(loading)}>
      <Text
        fontFamily={`Oxygen, sans-serif`}
        color='#fff'
        margin={[`0 ${loading ? '0.5rem' : '0'} 0 0`]}
      >
        {type === 'login' && loading
          ? 'Analyzing data...'
          : type === 'login' && 'Log In'}
        {type === 'register' && loading
          ? 'Verifying credentials...'
          : type === 'register' && 'Register'}
      </Text>
      {loading && <Spinner animation='border' size='sm' />}
    </Login>
  );
};

export default LoginRegisterBtn;

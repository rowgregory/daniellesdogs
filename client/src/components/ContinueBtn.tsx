import React, { FC } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from './elements';

interface ContineBtnProps {
  onSubmit: any;
  text: string;
  loading1?: boolean;
  loading2?: boolean;
  loading3?: boolean;
}

const Continue = styled(Button)<{ t: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ t }) => (t === 'Continu' || t === 'Complet' ? '3rem' : '')};
  :hover {
    margin-top: ${({ t }) =>
      t === 'Continu' || t === 'Complet' ? '3rem' : ''} !important;
  }
`;

const ContinueBtn: FC<ContineBtnProps> = ({
  onSubmit,
  text,
  loading1,
  loading2,
  loading3,
}) => {
  const isLoading = loading1 || loading2 || loading3;
  return (
    <Continue onClick={onSubmit} t={text}>
      <Text
        texttransform='capitalize'
        fontFamily={`Oxygen, sans-serif`}
        color='#fff'
        margin={[`0 ${isLoading ? '0.5rem' : '0'} 0 0`]}
      >
        {text}
        {isLoading ? 'ing...' : 'e'}
      </Text>
      {isLoading && <Spinner animation='border' size='sm' />}
    </Continue>
  );
};

export default ContinueBtn;

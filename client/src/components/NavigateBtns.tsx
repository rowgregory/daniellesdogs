import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContinueBtn from './ContinueBtn';
import { Flex } from './elements';

interface NavigateBtnsProps {
  onSubmit: any;
  text: string;
  loading1?: boolean;
  loading2?: boolean;
  loading3?: boolean;
}

const BackBtn = styled(Button)`
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigateBtns: FC<NavigateBtnsProps> = ({
  onSubmit,
  text,
  loading1,
  loading2,
  loading3,
}) => {
  const navigate = useNavigate();
  return (
    <Flex
      width={['235px']}
      justifyContent={['space-between']}
      margin={['48px 0 0 0']}
    >
      <ContinueBtn
        onSubmit={onSubmit}
        text={text}
        loading1={loading1}
        loading2={loading2}
        loading3={loading3}
      />
      <BackBtn variant='secondary' onClick={() => navigate(-1)}>
        Back
      </BackBtn>
    </Flex>
  );
};

export default NavigateBtns;

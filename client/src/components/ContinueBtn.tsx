import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex, Text } from './elements';

interface ContineBtnProps {
  onSubmit: any;
  text: string;
  loading1?: boolean;
  loading2?: boolean;
  loading3?: boolean;
}
export const Continue = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #5a67ff;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  width: 100%;
  color: #fff;

  &.loading {
    margin-right: 16px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: fit-content;
  }
`;

const m3 = keyframes`
  0%   {background-position:0    0   ;clip-path:circle(15px at left  4px top    4px)}
  25%  {background-position:100% 0   ;clip-path:circle(15px at right 4px top    4px)}
  50%  {background-position:100% 100%;clip-path:circle(15px at right 4px bottom 4px)}
  75%  {background-position:0    100%;clip-path:circle(15px at left  4px bottom 4px)}
  100% {background-position:0    0   ;clip-path:circle(15px at left  4px top    4px)}
`;

export const Maze = styled.div`
  width: 40px;
  aspect-ratio: 1;
  outline: 2px solid #5a67ff;
  background: radial-gradient(farthest-side, #0e1117 90%, #0000) 0 0/8px 8px
      no-repeat,
    conic-gradient(from 90deg at 10px 10px, #0000 90deg, #5a67ff 0),
    conic-gradient(from -90deg at 30px 30px, #0000 90deg, #5a67ff 0);
  animation: ${m3} 1.5s infinite;
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
    <Flex alignItems={['center']}>
      <Continue onClick={onSubmit} className={isLoading ? 'loading' : ''}>
        <Text
          texttransform='capitalize'
          color='#fff'
          fontFamily='Roboto'
          fontWeight={['500']}
        >
          {text}
        </Text>
      </Continue>
      {isLoading && <Maze />}
    </Flex>
  );
};

export default ContinueBtn;

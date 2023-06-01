import React from 'react';
import styled from 'styled-components';
import BarChart from './BarChart';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
`;

const MiddleRow = () => {
  return (
    <Container>
      <BarChart />
    </Container>
  );
};

export default MiddleRow;

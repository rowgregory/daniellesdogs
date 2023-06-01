import React from 'react';
import { Text } from '../elements';
import BreadCrumb from './BreadCrumb';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
  }
`;

const CheckoutNavbar = ({ breadCrumbData }: any) => {
  return (
    <Container>
      <Text
        fontSize={['24px']}
        fontWeight={['500']}
        fontFamily={`Roboto`}
        color={['#000']}
      >
        Danielle's Dogs
      </Text>
      <BreadCrumb breadCrumbData={breadCrumbData} />
    </Container>
  );
};

export default CheckoutNavbar;

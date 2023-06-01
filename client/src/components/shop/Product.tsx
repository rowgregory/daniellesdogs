import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex, Text } from '../elements';

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  gap: 16px;
  max-width: 420px;
  width: 100%;
  aspect-ratio: 1/1;
  text-decoration: none;
  transition: 300ms;
  box-shadow: 0px 0px 20px -4px rgba(0, 0, 0, 0.53);
  :hover {
    box-shadow: 0px 0px 43px -4px rgba(0, 0, 0, 0.53);
  }
`;

const ProductName = styled(Text)`
  font-weight: 400;

  font-size: 18px;
  margin-bottom: 8px;
`;

const ProductImg = styled(Image)`
  object-fit: cover;
  width: 100%;
  max-width: 420px;
  border-radius: 0;
  justify-self: center;
`;

const Price = styled(Text)`
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    text-align: left;
  }
`;

const Product = ({ product }: any) => {
  return (
    <Container to={`/shop/${product?.id}`}>
      <ProductImg src={product.displayUrl} />
      <Flex flexDirection={['column']} padding={['8px']}>
        <ProductName>{product?.name}</ProductName>
        <Price>${product?.price}</Price>
      </Flex>
    </Container>
  );
};

export default Product;

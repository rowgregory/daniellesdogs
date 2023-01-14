import React from 'react';
import { Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ProceedBtn } from '../styles/shop';

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 48px;
  padding-top: 48px;
  border-bottom: 1px solid #ededed;
  gap: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 25% 42.5% 23%;
    gap: 32px;
  }
`;

const ProductName = styled(Link)`
  font-weight: 400;
  height: 42px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ProductImg = styled(Image)`
  object-fit: contain;
  width: 100%;
  width: 100%;
  border-radius: 0;
`;

const Price = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    text-align: left;
  }
`;

const Product = ({ product }: any) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Link to='product-details' state={{ product }}>
        <ProductImg src={product.image} />
      </Link>
      <ProductName to='product-details' state={{ product }}>
        {product?.name}
      </ProductName>
      <div className='d-flex flex-column'>
        <Price>${product?.price}</Price>
        <ProceedBtn
          onClick={() => navigate(`${product?.name}`, { state: { product } })}
        >
          View Product
        </ProceedBtn>
      </div>
    </Container>
  );
};

export default Product;

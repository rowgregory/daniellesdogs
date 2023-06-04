import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../context/cartContext';
import { Flex, Link, Text } from '../elements';
import { Spinner } from 'react-bootstrap';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 2px solid #f5f5f5;
  display: flex;
  height: 55px;
`;

const AddToCartBtn = styled.button`
  background-color: #1b1c1e;
  color: #fff;
  padding: 8px 20px;
  border-radius: 2px;
  border: none;
  font-size: 16px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cormorant, serif';
  width: 122px;
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StickyFooter = ({ product, qty, size, outOfStock }: any) => {
  const { cart } = useContext(CartContext) as any;

  return (
    <Container>
      <Flex
        display={['none', 'flex', 'flex']}
        alignItems={['center']}
        justifyContent={['center']}
        width={['180px']}
        style={{ borderRight: '2px solid #f5f5f5' }}
      >
        <i className='fas fa-chevron-left fa-xs'></i>
        <Link margin={['0 0 0 8px']} to='/shop'>
          Shop
        </Link>
      </Flex>
      <Flex
        padding={['0 8px', '016px', '0 32px']}
        justifyContent={['space-between']}
        alignItems={['center']}
        width={['100%']}
      >
        <Text fontWeight={['600']}>{product?.name}</Text>
        <Flex alignItems={['center']}>
          <Text
            fontWeight={['600']}
            fontSize={['24px']}
            margin={['0 20px 0 0']}
          >
            ${Number(product?.price)?.toFixed(2)}
          </Text>
          <AddToCartBtn
            disabled={outOfStock}
            onClick={() => cart.addItemToCart(product, qty, size)}
          >
            {cart.loadingCartAddItem ? (
              <Spinner animation='border' size='sm' />
            ) : (
              'Add to Cart'
            )}
          </AddToCartBtn>
        </Flex>
      </Flex>
    </Container>
  );
};

export default StickyFooter;

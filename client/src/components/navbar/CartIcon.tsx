import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../context/cartContext';
import { NavbarContext } from '../../context/navbarContext';
import { Flex, Link } from '../elements';
import Cart3 from '../svg/Cart3';

const LinkContainer = styled(Link)`
  transform: translateX(0);
  right: 60px;
`;

const CartItems = styled(Flex)`
  position: absolute;
  z-index: 100;
  top: -6px;
  right: -7px;
  cursor: pointer;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: #121212;
  background-color: #fff;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  font-family: 'Arial';
  font-size: 13px;
  transition: 300ms;
`;

const CartIcon = () => {
  const { cart } = useContext(CartContext) as any;
  const { setShowSideBar } = useContext(NavbarContext);

  return (
    <LinkContainer to='/cart' onClick={() => setShowSideBar(false)}>
      <Cart3 />
      <CartItems>{cart.cartItemsAmount}</CartItems>
    </LinkContainer>
  );
};

export default CartIcon;

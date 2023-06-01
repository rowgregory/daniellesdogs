import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import { Link } from '../elements';
import {
  CheckoutBarContainer,
  CheckoutBarInnerWrapper,
  CheckoutBtn,
  ShopLink,
  SubtotalContainer,
  SubtotalText,
} from './styles';

const CheckoutBar = () => {
  const { cart } = useContext(CartContext);

  return (
    <CheckoutBarContainer>
      <CheckoutBarInnerWrapper>
        <div className='w-50 d-flex align-items-center'>
          <ShopLink to='/shop'>
            <i className='fas fa-chevron-left fa-xs'></i> Shop
          </ShopLink>
        </div>
        <SubtotalContainer>
          <SubtotalText>
            Subtotal: <span>${cart.subtotal}</span>{' '}
          </SubtotalText>
          <Link to='/checkout'>
            <CheckoutBtn disabled={cart?.cartItems?.length <= 0}>
              CHECKOUT
            </CheckoutBtn>
          </Link>
        </SubtotalContainer>
      </CheckoutBarInnerWrapper>
    </CheckoutBarContainer>
  );
};

export default CheckoutBar;

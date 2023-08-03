import React, { useContext, useRef } from 'react';
import {
  CheckoutBtn,
  Container,
  QtyBtn,
  ViewCartBtn,
} from '../styles/cart-drawer';
import { CartContext } from '../../context/cartContext';
import useHandleOutsideClick from '../../utils/hooks/useHandleOutsideClick';
import { Flex, Link, Picture, Text } from '../elements';

const CartDrawer = () => {
  const {
    cart: {
      cartItems,
      subtotal,
      success,
      closeCartDrawer,
      deleteOneItem,
      addOneItem,
      cartItemsAmount,
    },
  } = useContext(CartContext);

  const animation = success ? 'move-left' : '';
  const cartRef = useRef(null) as any;

  useHandleOutsideClick(cartRef, closeCartDrawer);

  return (
    <Container ref={cartRef} className={animation}>
      <Flex flexdirection={['column']}>
        {cartItems?.map((item: any, i: number) => (
          <Flex key={i} width={['100%']} margin={['0 0 36px 0']}>
            <Picture
              src={item.displayUrl}
              margin={['0 16px 0 0']}
              aspectratio={['1/1']}
              height='64px'
              borderradius={['6px']}
              background={['#ddd']}
            />
            <Flex flexdirection={['column']} width={['100%']}>
              <Text fontWeight={['500']} fontFamily='Roboto'>
                {item.name}
              </Text>
              {item?.size && (
                <Text fontFamily='Roboto' fontSize={['14px']}>
                  {item?.size}
                </Text>
              )}
              <Flex justifyContent={['space-between']} margin={['24px 0 0 0']}>
                <Flex alignitems={['baseline']}>
                  <QtyBtn
                    style={{ fontSize: '10px' }}
                    onClick={(e: any) => deleteOneItem(e, item)}
                  >
                    <i className='fas fa-minus fa-xs'></i>
                  </QtyBtn>
                  <Text
                    margin={['0 10px']}
                    fontWeight={['600']}
                    fontSize={['13px']}
                    fontFamily='Roboto'
                  >
                    {item.qty}
                  </Text>
                  <QtyBtn
                    style={{ fontSize: '10px' }}
                    className='plus'
                    onClick={(e: any) => addOneItem(e, item)}
                  >
                    <i className='fas fa-plus fa-xs'></i>
                  </QtyBtn>
                </Flex>

                <Text fontWeight={['600']} fontFamily='Roboto'>
                  ${Number(item?.price)?.toFixed(2)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      {cartItemsAmount === 0 ? (
        <Flex
          flexdirection={['column']}
          justifyContent={['center']}
          alignitems={['center']}
          style={{ minHeight: '100vh' }}
        >
          <Text
            fontSize={['20px']}
            fontWeight={['500']}
            color={['#000']}
            fontFamily='Roboto'
            margin={['0 0 16px 0']}
          >
            Your cart is currently empty
          </Text>
          <Link
            style={{ border: '2px solid #ededed' }}
            fontFamily='Roboto'
            to='/shop'
            padding={['10px 16px']}
            onClick={() => closeCartDrawer()}
          >
            RETURN TO SHOP
          </Link>
        </Flex>
      ) : (
        <Flex flexdirection={['column']}>
          <Flex justifyContent={['space-between']}>
            <Text fontFamily='Roboto' fontWeight={['600']}>
              Subtotal
            </Text>
            <Flex alignitems={['baseline']}>
              <Text
                fontWeight={['600']}
                fontFamily='Roboto'
                margin={['0 6px 0 0']}
              >
                ${subtotal?.toFixed(2)}
              </Text>
              <Text fontFamily='Roboto' fontWeight={['600']}>
                USD
              </Text>
            </Flex>
          </Flex>
          <Text fontSize={['12px']} margin={['0 0 16px 0']} fontFamily='Roboto'>
            Taxes and shipping calculated at checkout
          </Text>
          <Flex width={['100%']}>
            <CheckoutBtn onClick={() => closeCartDrawer()} to='/checkout'>
              CHECK OUT
            </CheckoutBtn>
            <ViewCartBtn onClick={() => closeCartDrawer()} to='/cart'>
              VIEW CART
            </ViewCartBtn>
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default CartDrawer;

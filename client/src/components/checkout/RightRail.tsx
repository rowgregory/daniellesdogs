import React, { useContext } from 'react';
import { Name, QTY, RightRailContainer } from '../styles/checkout';
import { Image } from 'react-bootstrap';
import { Flex, Text } from '../elements';
import { CartContext } from '../../context/cartContext';
import styled from 'styled-components';

const SubContainer = styled.div`
  padding: 16px 8px;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 66px 84px 21px 44px;
    max-width: 546px;
  }
`;

const RightRail = () => {
  const {
    cart: { cartItems, subtotal, taxAmount, shippingPrice, orderTotal },
  } = useContext(CartContext);

  return (
    <RightRailContainer className='right-rail pb-0'>
      <SubContainer>
        {cartItems?.map((item: any, index: number) => (
          <div className='d-flex justify-content-between mb-4' key={index}>
            <div className='d-flex'>
              <Image
                src={item?.displayUrl}
                alt={item?.name}
                width='64px'
                height='64px'
                className=''
                style={{
                  objectFit: 'cover',
                  marginRight: '16px',
                  borderRadius: '6px',
                }}
              />

              <div
                className='d-flex flex-column'
                style={{ position: 'relative' }}
              >
                <Name>{item?.name}</Name>
                <QTY>{item?.qty}</QTY>
                <Text fontFamily='Arial' fontSize={['11px']}>
                  {item?.size}
                </Text>
              </div>
            </div>
            <Text fontSize={['14px']} fontWeight={['500']} fontFamily='Roboto'>
              ${(item?.qty * item?.price)?.toFixed(2)}
            </Text>
          </div>
        ))}
        <div className='d-flex justify-content-between mb-2'>
          <Text
            fontSize={['14px']}
            fontFamily='Roboto'
            className='d-flex align-items-baseline'
          >
            Subtotal
          </Text>
          <Text fontSize={['14px']} fontFamily='Roboto'>
            ${Number(subtotal)?.toFixed(2)}
          </Text>
        </div>
        <div className='d-flex justify-content-between mb-2'>
          <Text fontSize={['14px']} fontFamily='Roboto'>
            Shipping
          </Text>
          <Text fontSize={['14px']} fontFamily='Roboto'>
            ${shippingPrice?.toFixed(2)}
          </Text>
        </div>
        <div className='d-flex justify-content-between mb-4'>
          <Text
            fontSize={['14px']}
            fontFamily='Roboto'
            className='d-flex align-items-baseline'
          >
            Tax{' '}
            <Text
              fontFamily='Roboto'
              fontSize={['12px']}
              margin={['0 0 0 4px']}
            >
              (Calculated during delivery options)
            </Text>
          </Text>
          <Text fontSize={['14px']} fontFamily='Roboto'>
            ${taxAmount?.toFixed(2)}
          </Text>
        </div>

        <div className='d-flex justify-content-between'>
          <Text fontSize={['17px']} fontFamily='Roboto' fontWeight={['600']}>
            Total
          </Text>
          <Flex alignItems={['baseline']}>
            <Text
              fontSize={['12px']}
              fontWeight={['300']}
              margin={['0 8px 0 0']}
              fontFamily='Roboto'
            >
              USD
            </Text>{' '}
            <Text fontSize={['17px']} fontFamily='Roboto' fontWeight={['600']}>
              ${orderTotal?.toFixed(2)}
            </Text>
          </Flex>
        </div>
      </SubContainer>
    </RightRailContainer>
  );
};

export default RightRail;

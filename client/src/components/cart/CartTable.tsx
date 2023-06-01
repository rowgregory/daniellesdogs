import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import { StyledTable, Triangle } from './styles';
import { Flex, Link, Picture, Text } from '../elements';
import { QtyBtn } from '../styles/cart-drawer';

const CartTable = ({ height }: any) => {
  const { cart } = useContext(CartContext);

  return (
    <StyledTable borderless>
      <thead>
        <tr>
          <td style={{ width: '100px' }}></td>
          <td style={{ width: '437px' }}>PRODUCT</td>
          <td style={{ width: '100px' }}>PRICE</td>
          <td style={{ width: '100px' }}>QTY</td>
          <td style={{ width: '100px' }}>SIZE</td>
          <td style={{ width: '100px' }}>TOTAL</td>
          <td style={{ width: '50px' }}></td>
        </tr>
      </thead>
      <tbody className={height ? 'height' : ''}>
        {cart?.cartItems?.map((item: any, i: number) => (
          <tr key={i}>
            <td style={{ position: 'relative', width: '100px' }}>
              <Triangle />
              <Link
                to={`/shop/${item?.product}`}
                onClick={() => cart.closeCartDrawer()}
              >
                <Picture
                  src={item?.displayUrl}
                  width={['60px']}
                  borderradius={['50%']}
                  aspectratio={['1/1']}
                  objectfit={['cover']}
                />
              </Link>
            </td>
            <td style={{ width: '437px' }}>
              <Text>{item?.name}</Text>
            </td>
            <td style={{ width: '100px' }}>
              <Text>${Number(item?.price)?.toFixed(2)}</Text>
            </td>
            <td style={{ width: '100px' }}>
              <Flex alignItems={['baseline']}>
                <QtyBtn
                  style={{ fontSize: '10px' }}
                  onClick={(e: any) => cart.deleteOneItem(e, item)}
                >
                  <i className='fas fa-minus fa-xs'></i>
                </QtyBtn>
                <Text
                  margin={['0 10px']}
                  fontWeight={['600']}
                  fontSize={['13px']}
                  fontFamily='Roboto'
                >
                  {item?.qty}
                </Text>
                <QtyBtn
                  style={{ fontSize: '10px' }}
                  className='plus'
                  onClick={(e: any) => cart.addOneItem(e, item)}
                >
                  <i className='fas fa-plus fa-xs'></i>
                </QtyBtn>
              </Flex>
            </td>

            <td style={{ width: '100px' }}>
              <Text>{item?.size ?? '--'}</Text>
            </td>

            <td style={{ width: '100px' }}>
              <Text>${Number(+item?.qty * +item?.price).toFixed(2)}</Text>
            </td>
            <td style={{ width: '50px' }}>
              <i
                onClick={() => cart.deleteItemFromCart(item)}
                className='fas fa-times'
                style={{ color: '#7c7f85', cursor: 'pointer' }}
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default CartTable;

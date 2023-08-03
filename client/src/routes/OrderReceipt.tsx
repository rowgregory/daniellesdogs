import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Flex, Link, Text } from '../components/elements';
import { useQuery } from '@apollo/client';
import { GET_ORDER_BY_ID } from '../queries/getOrderById';
import { DDLogo } from '../components/svg/Logo';
import AcrobaticLoader from '../components/AcrobaticLoader/AcrobaticLoader';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';

const Container = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  min-height: 100vh;
  margin-inline: auto;
  display: block;
  white-space: nowrap;
  width: 100vw;
  overflow-x: scroll;
  @media screen and (min-width: 970px) {
    overflow-x: auto;
  }
`;

export const Wrapper = styled.div`
  width: 970px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  margin: 0 auto;
  max-width: ${({ theme }) => theme.breakpoints[2]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: flex;
    flex-direction: column;
  }
`;

const OrderReceipt = () => {
  const { id } = useParams() as any;
  const { user } = useContext(AuthContext);

  const { loading, error, data, refetch } = useQuery(GET_ORDER_BY_ID, {
    variables: { id },
  }) as any;

  const order = data?.getOrderById;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
      } catch (error) {
        console.log('ERROR: ', error);
      }
    };

    fetchData();
  }, [refetch]);

  return (
    <Container>
      {loading && <AcrobaticLoader />}
      <Wrapper>
        <Flex
          alignitems={['center']}
          padding={['20px 0']}
          style={{ background: '#fcfbfe' }}
        >
          <Link
            display={['flex']}
            alignitems={['center']}
            padding={['0 0 0 20px']}
            margin={['0 24px 0 0']}
            to='/'
          >
            <DDLogo fill='#aaadb1' w='50px' h='50px' />
            <Text
              fontFamily={`Italianno, cursive`}
              padding={['0 0 0 16px']}
              fontSize={['30px']}
            >
              Danielle's Dogs
            </Text>
          </Link>
          {user?.userType === 'ADMIN' && (
            <Link to='/admin/orders'>Go back to orders</Link>
          )}
        </Flex>
        <div style={{ padding: '32px' }}>
          {error && <Text>{error.message}</Text>}
          <Text
            fontSize={['24px']}
            fontWeight={['600']}
            color='#404450'
            margin={['12px 0 24px 0']}
            fontFamily='Roboto'
          >
            Your order is confirmed!
          </Text>
          <Text
            color='#4e515b'
            fontSize={['17px']}
            margin={['0 0 10px 0']}
            fontWeight={['600']}
            fontFamily='Roboto'
          >
            Hello {order?.name}
          </Text>
          <Text
            color='#a5a7ab'
            fontSize={['14.5px']}
            padding={['0 0 32px 0']}
            margin={['0 0 22px 0']}
            fontFamily='Roboto'
          >
            Your order has been confirmed and your item(s) will be shipped
            within two days.
          </Text>
          <table style={{ borderBottom: '1px solid #f2f2f2', width: '100%' }}>
            <thead>
              <tr>
                <td>
                  <Text fontSize={['14px']} fontWeight={['600']}>
                    Order Date
                  </Text>
                </td>
                <td>
                  <Text fontSize={['14px']} fontWeight={['600']}>
                    Order No
                  </Text>
                </td>
                <td>
                  <Text fontSize={['14px']} fontWeight={['600']}>
                    PayPal Order Id
                  </Text>
                </td>
                <td>
                  <Text fontSize={['14px']} fontWeight={['600']}>
                    {order?.cellPhoneNumber ? 'Cell Phone' : 'Shipping Address'}
                  </Text>
                </td>
                <td>
                  <Text fontSize={['14px']} fontWeight={['600']}>
                    Shipped
                  </Text>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Text
                    fontWeight={['400']}
                    padding={['10px 0 32px']}
                    fontSize={['14px']}
                  >
                    {new Date(+order?.paidOn)
                      ?.toLocaleDateString('en-us', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })
                      .replace(/\//g, '-')}
                  </Text>
                </td>
                <td>
                  <Text
                    fontWeight={['400']}
                    padding={['10px 0 32px']}
                    fontSize={['14px']}
                  >
                    {order?.id}
                  </Text>
                </td>
                <td>
                  <Text
                    fontWeight={['400']}
                    padding={['10px 0 32px']}
                    fontSize={['14px']}
                  >
                    {order?.paypalOrderId}
                  </Text>
                </td>
                <td>
                  <Text
                    fontWeight={['400']}
                    padding={['10px 0 32px']}
                    fontSize={['14px']}
                  >
                    {order?.cellPhoneNumber
                      ? `(***) *** - ${order?.cellPhoneNumber?.slice(6, 10)}`
                      : `${order?.shippingAddress?.addressLine1}, ${order?.shippingAddress?.city} ${order?.shippingAddress?.state} ${order?.shippingAddress?.zipPostalCode}`}
                  </Text>
                </td>
                <td>
                  <Text
                    fontWeight={['400']}
                    padding={['10px 0 32px']}
                    fontSize={['14px']}
                  >
                    {order?.isShipped ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
          {order?.orderItems?.map((item: any, index: number) => (
            <div
              key={index}
              className='d-flex justify-content-between py-4 w-100 mb-4'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <div className='d-flex'>
                <Image
                  src={item?.displayUrl}
                  alt='product-img'
                  width='100px'
                  style={{
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                    borderRadius: '6px',
                  }}
                />
                <Text
                  fontFamily='Roboto'
                  margin={['0 0 0 16px']}
                  className='d-flex flex-column'
                >
                  <Text
                    fontFamily='Roboto'
                    fontWeight={['600']}
                    margin={['0 0 5px 0']}
                  >
                    {item?.name}
                  </Text>
                  {item?.size && (
                    <Text fontFamily='Roboto' fontWeight={['200']}>
                      Size: {item?.size}
                    </Text>
                  )}
                  <Text
                    fontFamily='Roboto'
                    fontWeight={['200']}
                    fontSize={['14px']}
                  >
                    Quantity: {item?.qty}
                  </Text>
                </Text>
              </div>
              <Text
                fontFamily='Roboto'
                fontWeight={['600']}
                fontSize={['18px']}
              >
                ${item?.price}
              </Text>
            </div>
          ))}
          <div className='d-flex flex-column align-items-end mb-4'>
            <div className='d-flex justify-content-between w-25 mb-1'>
              <Text fontSize={['14px']} fontFamily='Roboto'>
                Subtotal
              </Text>
              <Text
                fontSize={['14px']}
                fontFamily='Roboto'
                fontWeight={['400']}
              >
                $
                {order?.orderItems
                  .reduce(
                    (acc: any, item: any) => acc + item?.qty * item?.price,
                    0
                  )
                  .toFixed(2) ?? order?.subTotal}
              </Text>
            </div>
            <div className='d-flex justify-content-between w-25 mb-1'>
              <Text fontSize={['14px']} fontFamily='Roboto'>
                Shipping
              </Text>
              <Text
                fontSize={['14px']}
                fontFamily='Roboto'
                fontWeight={['400']}
              >
                ${order?.shippingPrice?.toFixed(2)}
              </Text>
            </div>
            <div
              className='d-flex justify-content-between w-25 mb-1'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <Text fontSize={['14px']} fontFamily='Roboto'>
                Tax
              </Text>
              <Text
                fontSize={['14px']}
                fontFamily='Roboto'
                fontWeight={['400']}
              >
                ${order?.taxPrice?.toFixed(2)}
              </Text>
            </div>
            <div
              className='d-flex mt-2 pb-2 justify-content-between w-25'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <Text
                fontFamily='Roboto'
                fontSize={['14px']}
                fontWeight={['600']}
              >
                Total
              </Text>
              <Text
                fontFamily='Roboto'
                fontSize={['14px']}
                fontWeight={['600']}
              >
                ${order?.totalPrice?.toFixed(2)}
              </Text>
            </div>
          </div>
          <Text
            fontFamily='Roboto'
            color='#494c59'
            fontSize={['17px']}
            fontWeight={['600']}
          >
            Thank you for shopping with us!
          </Text>
          <Text
            fontFamily={`Italianno, cursive`}
            fontWeight={['400']}
            margin={['0 0 32px 0']}
            fontSize={['25px']}
          >
            Danielle's Dogs
          </Text>
        </div>
        <div
          className='d-flex justify-content-between align-items-center'
          style={{ background: '#fcfbfe', padding: '24px 32px', margin: 0 }}
        >
          <Text fontFamily='Roboto' fontSize={['12px']}>
            Need Help? Visit our{' '}
            <Link
              fontFamily='Roboto'
              fontSize={['12px']}
              to='/about/contact-us'
              color={['#3d62a2']}
            >
              contact{' '}
            </Link>
            page.
          </Text>
          <Text fontFamily='Roboto' fontSize={['12px']}>
            Danielle's Dogs {new Date().getFullYear()}
          </Text>
        </div>
      </Wrapper>
    </Container>
  );
};

export default OrderReceipt;

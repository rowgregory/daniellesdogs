import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { Image, Spinner } from 'react-bootstrap';
import { Flex, Link, Text } from '../../elements';
import { useQuery } from '@apollo/client';
import { GET_RECENT_ORDERS } from '../../../queries/getRecentOrders';
import UserInitial from './UserInitial';

const Container = styled.div`
  padding-inline: 12px;
  @media screen and (min-width: 900px) {
    background: #2d363c;
    width: 100%;
    max-width: 400px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

export const UserInitials = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #5a68fe;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const RecentOrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderItem = styled(Link)`
  padding: 10px;
  display: flex;
  background: #3d444c;
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  width: 100%;
  :hover {
    filter: brightness(0.9);
  }
  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 12px;
  }
`;

const RightPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { loading, data, refetch } = useQuery(GET_RECENT_ORDERS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const recentOrders = data?.getRecentOrders;

  const handleDateSelection = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      {window.innerWidth > 720 && (
        <>
          <div className='mb-5'>
            <UserInitial />
          </div>
          <Calendar
            showNeighboringMonth={false}
            value={selectedDate}
            formatMonth={(locale, date) =>
              date.toLocaleString(locale, { month: 'short' })
            }
            onChange={handleDateSelection}
          />
        </>
      )}
      <Text color='#fff' fontFamily={'Roboto'} margin={['16px 0 16px 0']}>
        Recent Orders
      </Text>
      <RecentOrdersContainer>
        {recentOrders?.map((obj: any, i: number) => (
          <OrderItem key={i} to={`/order/receipt/${obj?.id}`}>
            {loading ? (
              <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                <Spinner animation='border' size='sm' />
              </div>
            ) : (
              <>
                <Image src={obj.displayUrl} alt={`${obj.name}-${i}`} />
                <div className='d-flex justify-content-between w-100'>
                  <div className='d-flex flex-column'>
                    <Text
                      fontWeight={['500']}
                      fontSize={['14px']}
                      color={['#fff']}
                      fontFamily={'Roboto'}
                    >
                      {obj.productName}
                    </Text>
                    <Text
                      fontSize={['12px']}
                      color={['#fff']}
                      fontFamily={'Roboto'}
                    >
                      {obj.name}
                    </Text>
                  </div>
                  <Flex alignItems={['center']}>
                    <Text
                      fontSize={['12px']}
                      fontWeight={['600']}
                      fontFamily='Roboto'
                      color={['#5a67ff']}
                    >
                      + ${obj?.totalPrice?.toFixed(2)}
                    </Text>
                  </Flex>
                </div>
              </>
            )}
          </OrderItem>
        ))}
      </RecentOrdersContainer>
    </Container>
  );
};

export default RightPanel;

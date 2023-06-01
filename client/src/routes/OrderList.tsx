import { useMutation, useQuery } from '@apollo/client';
import { Link, Text } from '../components/elements';
import { FormGroup, Spinner, Table } from 'react-bootstrap';
import { GET_ORDERS } from '../queries/getOrders';
import formatDate from '../utils/formatDate';
import {
  ContentWrapper,
  FilterInput,
  SubNav,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
} from '../components/styles/backend-tables';
import { Maze } from '../components/ContinueBtn';
import { useState } from 'react';
import { UPDATE_ORDER_TO_SHIPPED } from '../mutations/updateOrderToShipped';

const OrderList = () => {
  const { loading, data } = useQuery(GET_ORDERS);
  const [text, setText] = useState('');
  const [id, setId] = useState('');

  const [updateToShipped, { loading: loadingShipped }] = useMutation(
    UPDATE_ORDER_TO_SHIPPED,
    {
      refetchQueries: [GET_ORDERS],
    }
  );

  const filteredOrders = data?.orderList?.filter((form: any) =>
    form?.id?.toLowerCase().includes(text?.toLowerCase())
  );

  const noOrders = filteredOrders?.length === 0;

  return (
    <TableContainer>
      <SubNav className='p-0 d-flex align-items-center'>
        {!noOrders && (
          <FormGroup style={{ marginLeft: '26px' }}>
            <FilterInput
              placeholder='Search by id'
              as='input'
              type='text'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            ></FilterInput>
          </FormGroup>
        )}
      </SubNav>
      <ContentWrapper>
        {loading ? (
          <Maze />
        ) : noOrders ? (
          <Text fontFamily='Roboto' color={['#ededed']}>
            No Orders
          </Text>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <TableHeader>Order No.</TableHeader>
                </th>
                <th>
                  <TableHeader>Name</TableHeader>
                </th>
                <th>
                  <TableHeader>Email</TableHeader>
                </th>
                <th>
                  <TableHeader>Created On</TableHeader>
                </th>
                <th>
                  <TableHeader>Order Total</TableHeader>
                </th>
                <th>
                  <TableHeader>Is Shipped</TableHeader>
                </th>
                <th>
                  <TableHeader>View</TableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order: any) => (
                <TableRow key={order?.id}>
                  <td>
                    <TableData>{order?.id}</TableData>
                  </td>
                  <td>
                    <TableData>{order?.name}</TableData>
                  </td>
                  <td>
                    <TableData>{order?.emailAddress}</TableData>
                  </td>
                  <td>
                    <TableData>{formatDate(order?.createdAt)}</TableData>
                  </td>
                  <td>
                    <TableData>${order?.totalPrice?.toFixed(2)}</TableData>
                  </td>
                  <td>
                    <TableData
                      onClick={() => {
                        setId(order.id);
                        updateToShipped({ variables: { id: order?.id } });
                      }}
                    >
                      {loadingShipped && order.id === id ? (
                        <Spinner
                          animation='border'
                          size='sm'
                          style={{ color: '#5a67ff' }}
                        />
                      ) : (
                        <i
                          style={{
                            color: order?.isShipped ? '#39FF14' : '#FF2400',
                          }}
                          className={`fas fa-${
                            order?.isShipped ? 'check' : 'times'
                          }`}
                        ></i>
                      )}
                    </TableData>
                  </td>
                  <td>
                    <Link to={`/order/receipt/${order?.id}`}>
                      <i
                        className='fas fa-edit'
                        style={{ color: '#d1d1d1' }}
                      ></i>
                    </Link>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </ContentWrapper>
    </TableContainer>
  );
};

export default OrderList;

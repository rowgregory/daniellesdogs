import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Text } from '../../elements';
import { GET_TRANSFORMED_NEW_CLIENT_FORM } from '../../../queries/getTransformedNewClientForm';
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';

const Container = styled.div`
  background: #2d363c;
  border-radius: 12px;
  padding: 16px;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  min-height: 300px;

  &.center {
    align-items: center;
    justify-content: center;
  }
`;

const Table = styled.table`
  thead {
    tr {
      border-bottom: 2.5px solid #394149;
      td {
        padding-bottom: 8px;
        font-weight: 600;
        color: #c6cbcf;
      }
    }
  }
  tbody {
    tr {
      td {
        padding-block: 16px;
        border-bottom: 2.5px solid #394149;
        color: #8b9099;
      }
    }
  }
`;

const BottomRow = () => {
  let { loading, data, refetch } = useQuery(GET_TRANSFORMED_NEW_CLIENT_FORM);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const transformedNewClientForms = data?.getTransformedNewClientForm;
  const noClients = transformedNewClientForms?.length === 0;
  const className = { center: noClients ? 'center' : '' };

  return (
    <Container className={className.center}>
      {loading ? (
        <div className='d-flex align-items-center justify-content-center w-100 h-100'>
          <Spinner animation='border' size='sm' />
        </div>
      ) : (
        <>
          {noClients ? (
            <Text
              textAlign={['center']}
              width={['100%']}
              color={['#faf9f9']}
              fontFamily='Roboto'
            >
              No Clients Yet
            </Text>
          ) : (
            <>
              <Text
                fontSize={['16px']}
                fontFamily='Roboto'
                color={['#faf9f9']}
                margin={['0 0 22px 0']}
              >
                Clients
              </Text>
              <Table>
                <thead>
                  <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Email</td>
                    <td>Phone Number</td>
                    <td style={{ textAlign: 'center' }}>Pet Name(s)</td>
                  </tr>
                </thead>
                <tbody>
                  {transformedNewClientForms?.map((client: any, i: number) => (
                    <tr key={i}>
                      <td>{client?.firstName}</td>
                      <td>{client?.lastName}</td>
                      <td>{client?.emailAddress}</td>
                      <td>{client?.phoneNumber}</td>
                      <td style={{ textAlign: 'center' }}>
                        {client?.pets?.map((petName: any) => petName)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default BottomRow;

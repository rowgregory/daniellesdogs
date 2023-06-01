import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Picture, Text } from '../components/elements';
import { Table } from 'react-bootstrap';
import DeleteModal from '../components/DeleteModal';
import {
  ContentWrapper,
  CreateLink,
  SubNav,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
} from '../components/styles/backend-tables';
import { Maze } from '../components/ContinueBtn';
import { GET_SERVICES } from '../queries/getServices';

const ServiceList = () => {
  const { loading, data } = useQuery(GET_SERVICES);
  const [show, setShow] = useState(false);
  const [serviceData, setServiceData] = useState({}) as any;
  const handleClose = () => setShow(false);

  const noServices = data?.serviceList?.length === 0;

  return (
    <TableContainer>
      <DeleteModal
        actionFunc='Service'
        show={show}
        handleClose={handleClose}
        id={serviceData.id}
        image={serviceData.image}
      />
      <SubNav>
        <CreateLink to='/admin/services/create'>CREATE SERVICE</CreateLink>
      </SubNav>
      <ContentWrapper>
        {loading ? (
          <Maze />
        ) : noServices ? (
          <Text fontFamily='Roboto' color={['#ededed']}>
            Click on the button to create a service
          </Text>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <TableHeader>Title</TableHeader>
                </th>
                <th>
                  <TableHeader>Image</TableHeader>
                </th>
                <th>
                  <TableHeader>Price</TableHeader>
                </th>
                <th>
                  <TableHeader>Description</TableHeader>
                </th>
                <th>
                  <TableHeader>Edit</TableHeader>
                </th>
                <th>
                  <TableHeader>Delete</TableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.serviceList?.map((service: any) => (
                <TableRow key={service?.id}>
                  <td>
                    <TableData>{service?.title}</TableData>
                  </td>
                  <td>
                    <Picture
                      src={service?.displayUrl}
                      borderradius={['50%']}
                      objectfit={['cover']}
                      width='35px'
                      height='35px'
                    />
                  </td>
                  <td>
                    <TableData>{service?.price}</TableData>
                  </td>
                  <td>
                    <TableData>
                      {service?.description?.slice(0, 50) + '...'}
                    </TableData>
                  </td>
                  <td>
                    <Link to={`/admin/services/${service?.id}/edit`}>
                      {' '}
                      <i
                        className='fas fa-edit'
                        style={{ color: '#d1d1d1' }}
                      ></i>
                    </Link>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        setServiceData(service);
                        setShow(true);
                      }}
                      className='fas fa-trash'
                      style={{ color: 'red', cursor: 'pointer' }}
                    ></i>
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

export default ServiceList;

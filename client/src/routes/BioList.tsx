import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Picture, Text } from '../components/elements';
import { Table } from 'react-bootstrap';
import { GET_BIOS } from '../queries/getBios';
import DeleteModal from '../components/DeleteModal';
import {
  ContentWrapper,
  CreateLink,
  GoToLink,
  SubNav,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
} from '../components/styles/backend-tables';
import { Maze } from '../components/ContinueBtn';

const BioList = () => {
  const { loading, data } = useQuery(GET_BIOS);
  const [show, setShow] = useState(false);
  const [bioData, setBioData] = useState({}) as any;
  const handleClose = () => setShow(false);

  const noBios = data?.bioList?.length === 0;

  return (
    <TableContainer>
      <DeleteModal
        actionFunc='Bio'
        show={show}
        handleClose={handleClose}
        id={bioData.id}
        image={bioData.displayUrl}
      />
      <SubNav>
        <CreateLink to='/admin/bios/create'>CREATE BIO</CreateLink>
        <GoToLink to='/about'>Go to bios</GoToLink>
      </SubNav>
      <ContentWrapper>
        {loading ? (
          <Maze />
        ) : noBios ? (
          <Text fontFamily='Roboto' color={['#ededed']}>
            Click on the button to create a bio
          </Text>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <TableHeader>Name</TableHeader>
                </th>
                <th>
                  <TableHeader>Picture</TableHeader>
                </th>
                <th>
                  <TableHeader>Email Address</TableHeader>
                </th>
                <th>
                  <TableHeader>Title</TableHeader>
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
              {data?.bioList?.map((bio: any) => (
                <TableRow key={bio?.id}>
                  <td>
                    <TableData>{`${bio?.firstName} ${bio.lastName}`}</TableData>
                  </td>

                  <td>
                    <Picture
                      src={bio?.displayUrl}
                      borderradius={['50%']}
                      objectfit={['cover']}
                      width='35px'
                      height='35px'
                    />
                  </td>
                  <td>
                    <TableData>{bio?.emailAddress}</TableData>
                  </td>
                  <td>
                    <TableData>{bio?.title}</TableData>
                  </td>
                  <td>
                    <TableData>
                      {bio?.description?.slice(0, 50) + '...'}
                    </TableData>
                  </td>
                  <td>
                    <Link to={`/admin/bios/${bio?.id}/edit`}>
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
                        setBioData(bio);
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

export default BioList;

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Picture, Text } from '../components/elements';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GET_BIOS } from '../queries/getBios';
import DeleteModal from '../components/DeleteModal';

const BioList = () => {
  const { user_id, user_type } = useParams();
  const { loading, data } = useQuery(GET_BIOS);
  const [show, setShow] = useState(false);
  const [imageData, setImageData] = useState({}) as any;

  const handleClose = () => setShow(false);

  return (
    <>
      <DeleteModal
        actionFunc='Bio'
        show={show}
        handleClose={handleClose}
        id={imageData.id}
        publicId={imageData.publicId}
      />
      {loading && <Spinner animation='border' />}
      <Link
        className='py-1 px-2'
        style={{ border: '1px dotted #121212' }}
        to={`/${user_id}/${user_type}/bios/create`}
      >
        Create Bio
      </Link>
      <div style={{ tableLayout: 'fixed', overflowX: 'auto' }} className='mt-4'>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.bioList?.map((bio: any) => (
              <tr key={bio?.id}>
                <td>
                  <Text>{bio?.firstName}</Text>
                </td>
                <td>
                  <Text>{bio?.lastName}</Text>
                </td>
                <td>
                  <Text>{bio?.emailAddress}</Text>
                </td>
                <td>
                  <Text>{bio?.title}</Text>
                </td>
                <td>
                  <Text>{bio?.description}</Text>
                </td>
                <td>
                  <Picture
                    src={bio?.image}
                    borderradius={['50%']}
                    objectfit={['cover']}
                    width='50px'
                    height='50px'
                  />
                </td>
                <td>
                  <Link to={`/${user_id}/${user_type}/bios/${bio?.id}/edit`}>
                    <Button>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => {
                      setImageData(bio);
                      setShow(true);
                    }}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BioList;

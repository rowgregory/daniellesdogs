import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Text } from '../components/elements';
import { Button, Image, Spinner, Table } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import { GET_BIOS } from '../queries/getBios';
import DeleteModal from '../components/DeleteModal';

const BioList = () => {
  const params = useParams();
  const userId = params.user_id;
  const userType = params.user_type;
  const { loading, error, data } = useQuery(GET_BIOS);
  const tableBodyRef = useRef();
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
      {error && <div>Error! ${error.message}</div>}
      <Link
        style={{ borderBottom: '1px dotted #121212' }}
        to={`/${userId}/${userType}/bios/create`}
      >
        Create Bio
      </Link>
      <div style={{ tableLayout: 'fixed', overflowX: 'auto' }}>
        <Table responsive striped hover className='table-md'>
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
          <TransitionGroup component='tbody'>
            {data?.bioList?.map((bio: any) => (
              <CSSTransition
                nodeRef={tableBodyRef}
                key={bio?.id}
                timeout={500}
                classNames='item'
              >
                <tr ref={tableBodyRef.current}>
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
                    <Image
                      src={bio?.image}
                      width='50px'
                      height='50px'
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </td>

                  <td>
                    <Link to={`/${userId}/${userType}/bios/${bio.id}/edit`}>
                      <Button className='btn-md'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-md'
                      onClick={() => {
                        setImageData(bio);
                        setShow(true);
                      }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Table>
      </div>
    </>
  );
};

export default BioList;

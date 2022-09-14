import React, { useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Text } from '../components/elements';
import { Alert, Button, Col, Form, Table } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link, useParams } from 'react-router-dom';
import DELETE_NEW_CLIENT_FORM from '../queries/deleteNewClientForm';
import toaster from 'toasted-notes';
import { ToastAlert } from '../components/elements/ToastAlert';
import { GET_NEW_CLIENT_FORMS } from '../queries/getNewClientForms';
import NewClientFormModal from '../components/NewClientFormModal';
import { SearchBar } from '../components/styles/form';

const NewClientForms = () => {
  const params = useParams();
  const userId = params.user_id;
  const userType = params.user_type;
  const { loading, error, data } = useQuery(GET_NEW_CLIENT_FORMS);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const tableBodyRef = useRef();
  const [errors, setErrors] = useState([]) as any;

  const filteredNewClientForms = data?.getNewClientForms?.filter((form: any) =>
    form?.user.firstName?.toLowerCase().includes(text?.toLowerCase())
  );

  const [deleteForm, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_NEW_CLIENT_FORM, {
      refetchQueries: [
        {
          query: GET_NEW_CLIENT_FORMS,
        },
        'getNewClientForms',
      ],
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors);
      },
      onCompleted() {
        toaster.notify(
          ({ onClose }) => ToastAlert('FORM DELETED', onClose, 'success'),
          {
            duration: 2000,
            position: 'bottom',
          }
        );
      },
    });

  const viewFormData = (form: any) => {
    setId(form.id);
    setShow(true);
  };

  return (
    <>
      <NewClientFormModal show={show} setShow={setShow} id={id} />
      {loading && 'Loading ...'}
      {loadingDelete && 'Deleting Form ...'}
      {error && <div>Error! ${error.message}</div>}
      {errorDelete && <div>Error Deleting! ${errorDelete.message}</div>}
      <Col className='d-flex align-items-center justify-content-between'>
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search by First Name'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
      </Col>
      <div style={{ tableLayout: 'fixed', overflowX: 'auto' }}>
        <Table responsive striped hover className='table-md'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Pet(s)</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <TransitionGroup component='tbody'>
            {filteredNewClientForms?.map((form: any) => (
              <CSSTransition
                nodeRef={tableBodyRef}
                key={form?.id}
                timeout={500}
                classNames='item'
              >
                <tr ref={tableBodyRef.current}>
                  <td onClick={() => viewFormData(form)}>
                    <Text>{form?.user?.firstName}</Text>
                  </td>
                  <td onClick={() => viewFormData(form)}>
                    <Text>{form?.user?.lastName}</Text>
                  </td>
                  <td onClick={() => viewFormData(form)}>
                    <Text>{form?.user?.emailAddress}</Text>
                  </td>
                  <td onClick={() => viewFormData(form)}>
                    <Text>{form?.user?.phoneNumber}</Text>
                  </td>
                  <td onClick={() => viewFormData(form)}>
                    <Text>
                      {form?.address?.addressLine1} {form?.address?.city},{' '}
                      {form?.address?.state}
                      {form?.address?.zipPostalCode}
                    </Text>
                  </td>
                  <td>
                    {form?.pets?.map((pet: any, i: number) => (
                      <Text key={i}>
                        {pet.name}:{pet.breedString}
                      </Text>
                    ))}
                  </td>

                  <td>
                    <Link
                      to={`/${userId}/${userType}/new-client-forms/${form.id}`}
                    >
                      <Button className='btn-md'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        deleteForm({
                          variables: {
                            id: form.id,
                            userId: form.user.id,
                            petsId: form.pets.map((pet: any) => pet.id),
                            vetId: form.vet.id,
                            addressId: form.address.id,
                          },
                        })
                      }
                      variant='danger'
                      className='btn-md'
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
      {errors.map((error: any, i: number) => (
        <Alert key={i}>{error.message}</Alert>
      ))}
    </>
  );
};

export default NewClientForms;

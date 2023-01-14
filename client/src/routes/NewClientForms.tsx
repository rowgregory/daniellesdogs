import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Text } from '../components/elements';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { GET_NEW_CLIENT_FORMS } from '../queries/getNewClientForms';
import NewClientFormModal from '../components/NewClientFormModal';
import { FormGroup, FormInput, FormLabel } from '../components/styles/form';
import DeleteModal from '../components/DeleteModal';

const NewClientForms = () => {
  const { user_id, user_type } = useParams();
  const { loading, data } = useQuery(GET_NEW_CLIENT_FORMS);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [formData, setFormData] = useState({}) as any;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredNewClientForms = data?.getNewClientForms?.filter((form: any) =>
    form?.user.firstName?.toLowerCase().includes(text?.toLowerCase())
  );

  const viewFormData = (form: any) => {
    setId(form.id);
    setShow(true);
  };

  return (
    <>
      <DeleteModal
        actionFunc='New Client Form'
        show={showDeleteModal}
        handleClose={setShowDeleteModal}
        id={formData}
      />
      <NewClientFormModal show={show} setShow={setShow} id={id} />
      {loading && <Spinner animation='border' />}
      <FormGroup className='mb-4'>
        <FormLabel>Search by First Name</FormLabel>
        <FormInput
          as='input'
          type='text'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        ></FormInput>
      </FormGroup>
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
          <tbody>
            {filteredNewClientForms?.map((form: any) => (
              <tr key={form?.id}>
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
                <td onClick={() => viewFormData(form)}>
                  {form?.pets?.map((pet: any, i: number) => (
                    <Text key={i}>
                      {pet.name}:{pet.breedString}
                    </Text>
                  ))}
                </td>

                <td>
                  <Link
                    to={`/${user_id}/${user_type}/new-client-forms/${form.id}`}
                  >
                    <Button>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setFormData(form);
                      setShowDeleteModal(true);
                    }}
                    variant='danger'
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

export default NewClientForms;

import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
} from '../components/styles/form';
import { Flex, Text } from '../components/elements';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import PetEditModal from '../components/PetEditModal';
import { UPDATE_NEW_CLIENT_FORM } from '../mutations/updateNewClientForm';
import styled from 'styled-components';
import { GET_NEW_CLIENT_FORMS } from '../queries/getNewClientForms';
import PetCreateModal from '../components/PetCreateModal';
import NavigateBtns from '../components/NavigateBtns';
import { useNCFEditForm } from '../utils/hooks/useNCFEditForm';

const PetCard = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  width: 100%;
  padding: 2rem;
  border-radius: 0.875rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 300ms;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  :hover {
    transform: translateY(-4px);
  }
  :nth-child(1) {
    margin-top: 1rem;
  }
`;

const NewClientFormEdit = () => {
  const navigate = useNavigate();
  const { formId, user_id, user_type } = useParams();
  const [errors, setErrors] = useState([]) as any;
  const [showEditModal, setShowEditModal] = useState(false);
  const [id, setId] = useState(null) as any;
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { loading, data } = useQuery(GET_NEW_CLIENT_FORM_BY_ID, {
    variables: {
      id: formId,
    },
  });

  const updateNewClientFormCallback = () => {
    updateNewClientForm({
      variables: {
        id: formId,
        userId: data?.getNewClientFormById?.user?.id,
        addressId: data?.getNewClientFormById?.address?.id,
        vetId: data?.getNewClientFormById?.vet?.id,
        newClientFormEditInput: inputs,
      },
    });
  };

  const { inputs, handleInputChange, onSubmit } = useNCFEditForm(
    updateNewClientFormCallback,
    data
  );

  const [updateNewClientForm, { loading: loadingUpdate }] = useMutation(
    UPDATE_NEW_CLIENT_FORM,
    {
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors);
      },
      refetchQueries: [
        { query: GET_NEW_CLIENT_FORM_BY_ID, variables: { id: formId } },
        { query: GET_NEW_CLIENT_FORMS },
      ],
      onCompleted() {
        navigate(`/${user_id}/${user_type}/new-client-forms`);
      },
    }
  );

  return (
    <>
      <PetEditModal
        show={showEditModal}
        setShow={setShowEditModal}
        id={id}
        formId={formId}
      />
      <PetCreateModal
        show={showCreateModal}
        setShow={setShowCreateModal}
        formId={formId}
      />
      <FormContainer>
        {loading && <Spinner animation='border' />}
        <PageTitle>New Client Form</PageTitle>
        <Form>
          <Row className='mb-5'>
            <Col md={5}>
              <Text fontSize={['1.5rem']}>Basic Info</Text>
              <FormGroup controlId='firstName'>
                <FormLabel className='mb-1'>First Name</FormLabel>
                <FormInput
                  name='firstName'
                  value={inputs.firstName || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='lastName'>
                <FormLabel className='mb-1'>Last Name</FormLabel>
                <FormInput
                  name='lastName'
                  value={inputs.lastName || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='emailAddress'>
                <FormLabel className='mb-1'>Email Address</FormLabel>
                <FormInput
                  name='emailAddress'
                  value={inputs.emailAddress || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='phoneNumber'>
                <FormLabel className='mb-1'>Phone Number</FormLabel>
                <FormInput
                  name='phoneNumber'
                  value={inputs.phoneNumber || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup
                controlId='openYard'
                className='d-flex align-items-center flex-row'
              >
                <Form.Check
                  className='mt-3 mb-1'
                  id='openYard'
                  name='openYard'
                  type='switch'
                  checked={inputs.openYard}
                  onChange={handleInputChange}
                ></Form.Check>
                <FormLabel className='mb-1'>
                  Is your yard open for play dates?
                </FormLabel>
              </FormGroup>
              <Text margin={['1.5rem 0 0 0']} fontSize={['1.5rem']}>
                Address
              </Text>
              <FormGroup controlId='addressLine1'>
                <FormLabel className='mb-1'>Address</FormLabel>
                <FormInput
                  name='addressLine1'
                  value={inputs.address.addressLine1 || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='city'>
                <FormLabel className='mb-1'>City</FormLabel>
                <FormInput
                  name='city'
                  value={inputs.address.city || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='state'>
                <FormLabel className='mb-1'>State</FormLabel>
                <FormInput
                  name='state'
                  value={inputs.address.state || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='zipPostalCode'>
                <FormLabel className='mb-1'>Zip/Postal Code</FormLabel>
                <FormInput
                  name='zipPostalCode'
                  value={inputs.address.zipPostalCode || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Text margin={['1.5rem 0 0 0']} fontSize={['1.5rem']}>
                Vet
              </Text>
              <FormGroup controlId='name'>
                <FormLabel className='mb-1'>Name</FormLabel>
                <FormInput
                  name='name'
                  value={inputs.vet.name || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='address'>
                <FormLabel className='mb-1'>Address</FormLabel>
                <FormInput
                  name='address'
                  value={inputs.vet.address || ''}
                  type='text'
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId='vetPhoneNumber'>
                <FormLabel className='mb-1'>Phone Number</FormLabel>
                <FormInput
                  name='vetPhoneNumber'
                  value={inputs.vet.phoneNumber || ''}
                  type='number'
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <Text fontSize={['1.5rem']}>Pet</Text>
              <Flex flexDirection={['column']}>
                {data?.getNewClientFormById?.pets?.map(
                  (pet: any, i: number) => (
                    <PetCard
                      key={i}
                      onClick={() => {
                        setId(pet.id);
                        setShowEditModal(true);
                      }}
                    >
                      <div className='d-flex'>
                        <Text
                          display={['flex']}
                          flex={['1']}
                          fontWeight={['800']}
                        >
                          Name:
                        </Text>
                        <Text display={['flex']} flex={['1']}>
                          {pet.name}
                        </Text>
                      </div>
                      <div className='d-flex'>
                        <Text
                          display={['flex']}
                          flex={['1']}
                          fontWeight={['800']}
                        >
                          Breed:
                        </Text>
                        <Text display={['flex']} flex={['1']}>
                          {pet.breedString}
                        </Text>
                      </div>
                      <div className='d-flex'>
                        <Text
                          display={['flex']}
                          flex={['1']}
                          fontWeight={['800']}
                        >
                          Age:
                        </Text>
                        <Text display={['flex']} flex={['1']}>
                          {pet.age}
                        </Text>
                      </div>
                    </PetCard>
                  )
                )}
                <Button onClick={() => setShowCreateModal(true)}>
                  Add Pet
                </Button>
              </Flex>
            </Col>
          </Row>
          <NavigateBtns
            onSubmit={onSubmit}
            text='Updat'
            loading1={loadingUpdate}
          />
        </Form>
        {errors.map((error: any, i: number) => (
          <Alert key={i}>{error.message}</Alert>
        ))}
      </FormContainer>
    </>
  );
};

export default NewClientFormEdit;

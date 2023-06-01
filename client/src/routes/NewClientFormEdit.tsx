import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormGroup } from '../components/styles/form';
import { Flex, Text } from '../components/elements';
import { Alert, Col, Form, Row, Spinner } from 'react-bootstrap';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import PetEditModal from '../components/PetEditModal';
import { UPDATE_NEW_CLIENT_FORM } from '../mutations/updateNewClientForm';
import styled from 'styled-components';
import { GET_NEW_CLIENT_FORMS } from '../queries/getNewClientForms';
import PetCreateModal from '../components/PetCreateModal';
import { useNCFEditForm } from '../utils/hooks/useNCFEditForm';
import {
  ContentWrapper,
  GoBackLink,
  Input,
  Label,
  SubNav,
  TableContainer,
} from '../components/styles/backend-tables';
import ContinueBtn, { Continue } from '../components/ContinueBtn';

const PetCard = styled.div`
  background: #0e1117;
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
  const { formId } = useParams();
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
        navigate(`/admin/new-client-forms`);
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
      <TableContainer>
        <SubNav>
          <GoBackLink to='/admin/new-client-forms'>
            GO BACK&nbsp;&nbsp;
            {(loading || loadingUpdate) && (
              <Spinner
                animation='border'
                size='sm'
                style={{ color: '#5a67ff' }}
              />
            )}
          </GoBackLink>
        </SubNav>
        <ContentWrapper className='edit'>
          <Form className='d-flex flex-column w-100'>
            <Row className='mb-5'>
              <Col md={8} sm={12}>
                <Text
                  color={['#ededed']}
                  fontFamily='Roboto'
                  margin={['1.5rem 0 12px 0']}
                  fontSize={['16px']}
                >
                  Basic Info
                </Text>
                <FormGroup controlId='firstName'>
                  <Label className='mb-1'>First Name</Label>
                  <Input
                    name='firstName'
                    value={inputs.firstName || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='lastName'>
                  <Label className='mb-1'>Last Name</Label>
                  <Input
                    name='lastName'
                    value={inputs.lastName || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='emailAddress'>
                  <Label className='mb-1'>Email Address</Label>
                  <Input
                    name='emailAddress'
                    value={inputs.emailAddress || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='phoneNumber'>
                  <Label className='mb-1'>Phone Number</Label>
                  <Input
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
                  <Label className='mb-1'>
                    Is your yard open for play dates?
                  </Label>
                </FormGroup>
                <Text
                  color={['#ededed']}
                  fontFamily='Roboto'
                  margin={['1.5rem 0 12px 0']}
                  fontSize={['16px']}
                >
                  Address
                </Text>
                <FormGroup controlId='addressLine1'>
                  <Label className='mb-1'>Address</Label>
                  <Input
                    name='addressLine1'
                    value={inputs?.address?.addressLine1 || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='city'>
                  <Label className='mb-1'>City</Label>
                  <Input
                    name='city'
                    value={inputs?.address?.city || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='state'>
                  <Label className='mb-1'>State</Label>
                  <Input
                    name='state'
                    value={inputs?.address?.state || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='zipPostalCode'>
                  <Label className='mb-1'>Zip/Postal Code</Label>
                  <Input
                    name='zipPostalCode'
                    value={inputs?.address?.zipPostalCode || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <Text
                  color={['#ededed']}
                  fontFamily='Roboto'
                  margin={['1.5rem 0 12px 0']}
                  fontSize={['16px']}
                >
                  Vet
                </Text>
                <FormGroup controlId='name'>
                  <Label className='mb-1'>Name</Label>
                  <Input
                    name='name'
                    value={inputs.vet.name || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='address'>
                  <Label className='mb-1'>Address</Label>
                  <Input
                    name='address'
                    value={inputs.vet.address || ''}
                    type='text'
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId='vetPhoneNumber'>
                  <Label className='mb-1'>Phone Number</Label>
                  <Input
                    name='vetPhoneNumber'
                    value={inputs.vet.phoneNumber || ''}
                    type='number'
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4} sm={12}>
                <Text
                  color={['#ededed']}
                  fontFamily='Roboto'
                  margin={['1.5rem 0 12px 0']}
                  fontSize={['16px']}
                >
                  Pet
                </Text>
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
                            color={['#ededed']}
                          >
                            Name:
                          </Text>
                          <Text
                            display={['flex']}
                            flex={['1']}
                            color={['#ededed']}
                          >
                            {pet.name}
                          </Text>
                        </div>
                        <div className='d-flex'>
                          <Text
                            display={['flex']}
                            flex={['1']}
                            fontWeight={['800']}
                            color={['#ededed']}
                          >
                            Breed:
                          </Text>
                          <Text
                            display={['flex']}
                            flex={['1']}
                            color={['#ededed']}
                          >
                            {pet.breedString}
                          </Text>
                        </div>
                        <div className='d-flex'>
                          <Text
                            display={['flex']}
                            flex={['1']}
                            fontWeight={['800']}
                            color={['#ededed']}
                          >
                            Age:
                          </Text>
                          <Text
                            display={['flex']}
                            flex={['1']}
                            color={['#ededed']}
                          >
                            {pet.age}
                          </Text>
                        </div>
                      </PetCard>
                    )
                  )}
                  <Continue
                    onClick={(e: any) => {
                      e.preventDefault();
                      setShowCreateModal(true);
                    }}
                  >
                    <Text
                      texttransform='capitalize'
                      color='#fff'
                      fontFamily='Roboto'
                      fontWeight={['500']}
                    >
                      Add Pet
                    </Text>
                  </Continue>
                </Flex>
              </Col>
            </Row>
            <ContinueBtn
              onSubmit={onSubmit}
              text='Update'
              loading1={loadingUpdate}
            />
          </Form>
        </ContentWrapper>
        {errors.map((error: any, i: number) => (
          <Alert key={i}>{error.message}</Alert>
        ))}
      </TableContainer>
    </>
  );
};

export default NewClientFormEdit;

import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormInput } from '../components/styles/form';
import { useForm } from '../utils/hooks/useForm';
import { Text, Wrapper } from '../components/elements';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import PetModal from '../components/PetModal';
import { UPDATE_NEW_CLIENT_FORM } from '../mutations/updateNewClientForm';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';

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
    background: ${({ theme }) => theme.colors.tertiary};
  }
`;

const NewClientFormEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [errors, setErrors] = useState([]) as any;
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [addNewPet, setAddNewPet] = useState(false);
  const formId = params.formId;
  const { user } = useContext(AuthContext) as any;

  const [loadFormData, { loading, error, data }] = useLazyQuery(
    GET_NEW_CLIENT_FORM_BY_ID
  );

  const values = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    address: {
      addressLine1: '',
      city: '',
      state: '',
      zipPostalCode: '',
    },
    openYard: false,
    vet: {
      name: '',
      address: '',
      phoneNumber: '',
    },
    afterMeetingNotes: '',
  };

  useEffect(() => {
    loadFormData({
      variables: {
        id: formId,
      },
    });
  }, [loadFormData, formId]);

  let addressId = useRef(null) as any;
  let vetId = useRef(null) as any;
  let userId = useRef(null) as any;
  let petData = useRef(null) as any;

  const updateNewClientFormCallback = () => {
    updateNewClientForm({
      variables: {
        id: formId,
        userId: userId.current,
        addressId: addressId.current,
        vetId: vetId.current,
        newClientFormEditInput: inputs,
      },
    });
  };

  const { inputs, handleInputChange, setInputs, onSubmit } = useForm(
    updateNewClientFormCallback,
    values
  );

  useEffect(() => {
    if (data) {
      const {
        getNewClientFormById: { user, address, vet, pets, openYard },
      } = data;

      addressId.current = address.id;
      vetId.current = vet.id;
      userId.current = user.id;
      petData.current = pets;

      setInputs((inputs: any) => ({
        ...inputs,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        openYard: openYard,
        address: {
          addressLine1: address.addressLine1,
          city: address.city,
          state: address.state,
          zipPostalCode: address.zipPostalCode,
        },
        vet: {
          name: vet.name,
          phoneNumber: vet.phoneNumber,
          address: vet.address,
        },
      }));
    }
  }, [data, setInputs]);

  const [updateNewClientForm, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_NEW_CLIENT_FORM, {
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors);
      },
      refetchQueries: [
        { query: GET_NEW_CLIENT_FORM_BY_ID, variables: { id: formId } },
      ],
      onCompleted() {
        navigate(`/${user.userId}/${user.userType}/new-client-forms`);
      },
    });

  const addPet = () => {
    setAddNewPet(true);
    setShow(true);
  };

  return (
    <>
      <PetModal
        show={show}
        setShow={setShow}
        id={id}
        formId={formId}
        clearForm={addNewPet}
      />
      <FormContainer style={{ maxWidth: '45rem' }}>
        {loading && 'Loading ...'}
        {error && error.message}
        {errorUpdate && errorUpdate.message}
        <Text fontSize={['2rem']}>New Client Form</Text>
        <Form>
          <Row>
            <Col md={7}>
              <Form.Group
                controlId={data?.getNewClientFormById?.user?.firstName}
              >
                <Form.Label className='mb-1'>First Name</Form.Label>
                <FormInput
                  defaultValue={data?.getNewClientFormById?.user?.firstName}
                  name='firstName'
                  value={inputs.firstName || ''}
                  type='text'
                  placeholder='First Name'
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId='lastName'>
                <Form.Label className='mb-1'>Last Name</Form.Label>
                <FormInput
                  name='lastName'
                  value={inputs.lastName || ''}
                  type='text'
                  placeholder='Last Name'
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId='emailAddress'>
                <Form.Label className='mb-1'>Email Address</Form.Label>
                <FormInput
                  name='emailAddress'
                  value={inputs.emailAddress || ''}
                  type='text'
                  placeholder='Email Address'
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId='phoneNumber'>
                <Form.Label className='mb-1'>Phone Number</Form.Label>
                <FormInput
                  name='phoneNumber'
                  value={inputs.phoneNumber || ''}
                  type='text'
                  placeholder='Phone Number'
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Text fontSize={['1.5rem']}>Address</Text>
              <Form.Group controlId='addressLine1'>
                <Form.Label className='mb-1'>Address</Form.Label>
                <FormInput
                  name='addressLine1'
                  value={inputs.address.addressLine1 || ''}
                  type='text'
                  placeholder='Address'
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div className='d-flex justify-content-between w-100'>
                <Form.Group controlId='city'>
                  <Form.Label className='mb-1'>City</Form.Label>
                  <FormInput
                    name='city'
                    value={inputs.address.city || ''}
                    type='text'
                    placeholder='City'
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId='state'>
                  <Form.Label className='mb-1'>State</Form.Label>
                  <FormInput
                    name='state'
                    value={inputs.address.state || ''}
                    type='text'
                    placeholder='State'
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId='zipPostalCode'>
                  <Form.Label className='mb-1'>Zip/Postal Code</Form.Label>
                  <FormInput
                    name='zipPostalCode'
                    value={inputs.address.zipPostalCode || ''}
                    type='text'
                    placeholder='Zip/Postal Code'
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <Form.Group controlId='openYard'>
                <Form.Label className='mb-1'>
                  Is your yard open for play dates?
                </Form.Label>
                <Form.Check
                  id='openYard'
                  name='openYard'
                  type='switch'
                  checked={inputs.openYard}
                  onChange={handleInputChange}
                ></Form.Check>
              </Form.Group>
              <Text fontSize={['1.5rem']}>Vet</Text>
              <Form.Group controlId='vetName'>
                <Form.Label className='mb-1'>Name</Form.Label>
                <FormInput
                  name='vetName'
                  value={inputs.vet.name || ''}
                  type='text'
                  placeholder='Name'
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId='vetAddress'>
                <Form.Label className='mb-1'>Address</Form.Label>
                <FormInput
                  name='vetAddress'
                  value={inputs.vet.address || ''}
                  type='text'
                  placeholder='Address'
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId='vetPhoneNumber'>
                <Form.Label className='mb-1'>Phone Number</Form.Label>
                <FormInput
                  name='vetPhoneNumber'
                  value={inputs.vet.phoneNumber || ''}
                  type='tel'
                  placeholder='Phone Number'
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <div className='d-flex'>
                <Text fontSize={['1.5rem']}>Pet</Text>
              </div>
              <Wrapper display={['flex']} flexDirection={['column']}>
                {petData.current?.map((pet: any, i: number) => (
                  <PetCard
                    key={i}
                    onClick={() => {
                      setId(pet.id);
                      setShow(true);
                      setAddNewPet(false);
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
                ))}
                <Button onClick={() => addPet()}>Add Pet</Button>
              </Wrapper>
            </Col>
          </Row>
          <Button onClick={onSubmit} className='d-flex align-items-center'>
            {loadingUpdate && <Spinner animation='border' size='sm' />}
            {loadingUpdate ? 'Updating' : 'Update'}
          </Button>
        </Form>
        {errors.map((error: any, i: number) => (
          <Alert key={i}>{error.message}</Alert>
        ))}
      </FormContainer>
    </>
  );
};

export default NewClientFormEdit;

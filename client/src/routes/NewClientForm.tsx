import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, FormInput } from '../components/styles/form';
import { useForm } from '../utils/hooks/useForm';
import { Text } from '../components/elements';
import { Alert, Button, Form, Stack } from 'react-bootstrap';
import { CREATE_NEW_CLIENT_FORM } from '../mutations/createNewClientForm';
import { petValues } from '../utils/form-values/values';

const NewClientForm = () => {
  const navigate = useNavigate();
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
    pets: [
      {
        ...petValues,
      },
    ],
    vet: {
      name: '',
      address: '',
      phoneNumber: '',
    },
    afterMeetingNotes: '',
  };
  const [errors, setErrors] = useState([]) as any;

  const createNewClientFormCallback = () => {
    createNewClientForm();
  };

  const { inputs, handleInputChange, setInputs, onSubmit } = useForm(
    createNewClientFormCallback,
    values
  );

  const [createNewClientForm, { loading }] = useMutation(
    CREATE_NEW_CLIENT_FORM,
    {
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors);
      },
      onCompleted() {
        navigate('/waiver');
      },
      variables: { newClientFormInput: inputs },
    }
  );

  const addPet = () => {
    const values = [...inputs.pets];
    values.push({ ...petValues });

    setInputs((inputs: any) => ({
      ...inputs,
      pets: values,
    }));
  };

  const handleRemovePet = (index: any) => {
    const values = [...inputs.pets];
    values.splice(index, 1);
    setInputs(() => ({
      ...inputs,
      pets: values,
    }));
  };

  return (
    <FormContainer>
      {loading && 'Loading ...'}
      <Text fontSize={['2rem']}>New Client Form</Text>
      <Form className='w-100'>
        <Stack>
          <Form.Group controlId='firstName'>
            <Form.Label className='mb-1'>First Name</Form.Label>
            <FormInput
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
          <div className='d-flex justify-space-between w-100'>
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
          <div className='d-flex'>
            <Text fontSize={['1.5rem']}>Pet</Text>
            <Button onClick={() => addPet()}>Add Pet</Button>
          </div>
          {inputs.pets?.map((pet: any, i: number) => (
            <div
              key={i}
              className='w-100'
              style={{ borderBottom: '2px solid #ccc' }}
            >
              <div className='d-flex justify-content-between'>
                <Form.Group controlId='name' className='w-100'>
                  <Form.Label className='mb-1'>Name</Form.Label>
                  <FormInput
                    name='name'
                    value={pet.name}
                    type='text'
                    placeholder='Name'
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Form.Group>
                <Form.Group controlId='age' className='w-100'>
                  <Form.Label className='mb-1'>Age</Form.Label>
                  <FormInput
                    name='age'
                    value={pet.age}
                    type='number'
                    placeholder='Age'
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Form.Group>
              </div>
              <Form.Group controlId='breedString' className='w-50'>
                <Form.Label className='mb-1'>Breed</Form.Label>
                <FormInput
                  name='breedString'
                  value={pet.breedString}
                  type='text'
                  placeholder='Breed'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='sex' className='w-50'>
                <Form.Label className='mb-1'>Sex</Form.Label>
                <FormInput
                  name='sex'
                  value={pet.sex}
                  type='text'
                  placeholder='Sex'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='preferredTimeOfService' className='w-50'>
                <Form.Label className='mb-1'>
                  Preferred Time of Service
                </Form.Label>
                <FormInput
                  name='preferredTimeOfService'
                  value={pet.preferredTimeOfService}
                  type='text'
                  placeholder='Preferred Time of Service'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='harnessLocation' className='w-50'>
                <Form.Label className='mb-1'>Harness Location</Form.Label>
                <FormInput
                  name='harnessLocation'
                  value={pet.harnessLocation}
                  type='text'
                  placeholder='Harness Location'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='dropOffLocation' className='w-50'>
                <Form.Label className='mb-1'>Drop Off Location</Form.Label>
                <FormInput
                  name='dropOffLocation'
                  value={pet.dropOffLocation}
                  type='text'
                  placeholder='Drop Off Location'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='freeRoaming'>
                <Form.Label className='mb-1'>Free Roaming</Form.Label>
                <Form.Check
                  id='freeRoaming'
                  name='freeRoaming'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </Form.Group>
              <Form.Group controlId='isSprayed'>
                <Form.Label className='mb-1'>Srayed/Neutered?</Form.Label>
                <Form.Check
                  id='isSprayed'
                  name='isSprayed'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </Form.Group>
              <Form.Group controlId='medications' className='w-50'>
                <Form.Label className='mb-1'>Medications</Form.Label>
                <FormInput
                  name='medications'
                  value={pet.medications}
                  type='text'
                  placeholder='Medications'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='allergies' className='w-50'>
                <Form.Label className='mb-1'>Allergies</Form.Label>
                <FormInput
                  name='allergies'
                  value={pet.allergies}
                  type='text'
                  placeholder='Allergies'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='temperament' className='w-50'>
                <Form.Label className='mb-1'>Temperament</Form.Label>
                <FormInput
                  name='temperament'
                  value={pet.temperament}
                  type='text'
                  placeholder='Temperament'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Form.Group>
              <Form.Group controlId='goodWithStrangers'>
                <Form.Label className='mb-1'>Good With Strangers</Form.Label>
                <Form.Check
                  id='goodWithStrangers'
                  name='goodWithStrangers'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </Form.Group>
              <Button variant='secondary' onClick={() => handleRemovePet(i)}>
                Cancel
              </Button>
            </div>
          ))}
        </Stack>
      </Form>
      <Text onClick={onSubmit}>Submit</Text>
      {errors.map((error: any, i: number) => (
        <Alert key={i}>{error.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default NewClientForm;

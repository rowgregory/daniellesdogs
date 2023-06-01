import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Text } from '../components/elements';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import { petValues } from '../utils/form-values/values';
import { validateNewClientFormPets } from '../utils/validate';
import ContinueBtn from '../components/ContinueBtn';
import { useNCFPetsForm } from '../utils/hooks/useNCFPetsForm';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_CLIENT_FORM } from '../mutations/createNewClientForm';
import GraphQLAlert from '../components/elements/GraphQLAlert';

const NewClientFormPets = () => {
  const navigate = useNavigate();
  let [errors, setErrors] = useState([]) as any;
  const [graphqlErrors, setGraphQLErrors] = useState([]) as any;
  const { state } = useLocation() as any;

  const ncfPetsCalback = () => {
    const validForm = validateNewClientFormPets(setErrors, inputs);

    if (validForm) {
      createNewClientForm();
    }
  };

  const { inputs, handleInputChange, setInputs, onSubmit } =
    useNCFPetsForm(ncfPetsCalback);

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

  const newClientFormInput = {
    firstName: state?.firstName,
    lastName: state?.lastName,
    emailAddress: state?.emailAddress,
    phoneNumber: state?.phoneNumber,
    address: {
      addressLine1: state?.address?.addressLine1,
      city: state?.address?.city,
      state: state?.address?.state,
      zipPostalCode: state?.address?.zipPostalCode,
    },
    vet: {
      name: state?.vet?.name,
      address: state?.vet?.address,
      phoneNumber: state?.vet?.phoneNumber,
    },
    pets: inputs?.pets,
    openYard: inputs?.openYard,
  };

  const [createNewClientForm, { loading }] = useMutation(
    CREATE_NEW_CLIENT_FORM,
    {
      variables: { newClientFormInput },
      onCompleted() {
        navigate('/new-client-form/complete');
      },
      onError({ graphQLErrors }) {
        setGraphQLErrors(graphQLErrors);
      },
    }
  );

  return (
    <FormContainer>
      <PageTitle>Pets</PageTitle>
      <GraphQLAlert
        graphqlErrors={graphqlErrors}
        setGraphQLErrors={setGraphQLErrors}
      />
      <Form>
        <Flex justifyContent={['flex-start']}>
          {inputs?.pets?.map((pet: any, i: number) => (
            <div key={i} style={{ marginRight: '1rem' }}>
              <FormGroup controlId='name'>
                <FormLabel>Name</FormLabel>
                <FormInput
                  name='name'
                  value={pet.name}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.name}</ErrorText>
              </FormGroup>
              <FormGroup controlId='age'>
                <FormLabel>Age</FormLabel>
                <FormInput
                  name='age'
                  value={pet.age}
                  type='number'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.age}</ErrorText>
              </FormGroup>
              <FormGroup controlId='breedString'>
                <FormLabel>Breed</FormLabel>
                <FormInput
                  name='breedString'
                  value={pet.breedString}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.breedString}</ErrorText>
              </FormGroup>
              <FormGroup controlId='sex'>
                <FormLabel>Sex</FormLabel>
                <FormInput
                  name='sex'
                  value={pet.sex}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.sex}</ErrorText>
              </FormGroup>
              <FormGroup controlId='preferredTimeOfService'>
                <FormLabel>Preferred Time of Service</FormLabel>
                <FormInput
                  name='preferredTimeOfService'
                  value={pet.preferredTimeOfService}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>
                  {i === 0 && [errors][0]?.preferredTimeOfService}
                </ErrorText>
              </FormGroup>
              <FormGroup controlId='harnessLocation'>
                <FormLabel>Harness Location</FormLabel>
                <FormInput
                  name='harnessLocation'
                  value={pet.harnessLocation}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.harnessLocation}</ErrorText>
              </FormGroup>
              <FormGroup controlId='dropOffLocation'>
                <FormLabel>Drop Off Location</FormLabel>
                <FormInput
                  name='dropOffLocation'
                  value={pet.dropOffLocation}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.dropOffLocation}</ErrorText>
              </FormGroup>
              <FormGroup controlId='medications'>
                <FormLabel>Medications</FormLabel>
                <FormInput
                  name='medications'
                  value={pet.medications}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.medications}</ErrorText>
              </FormGroup>
              <FormGroup controlId='allergies'>
                <FormLabel>Allergies</FormLabel>
                <FormInput
                  name='allergies'
                  value={pet.allergies}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.allergies}</ErrorText>
              </FormGroup>
              <FormGroup controlId='temperament'>
                <FormLabel className='mb-1'>Temperament</FormLabel>
                <FormInput
                  name='temperament'
                  value={pet.temperament}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
              </FormGroup>
              <FormGroup controlId='freeRoaming' className='mb-3'>
                <FormLabel>Free Roaming?</FormLabel>
                <Form.Check
                  id='freeRoaming'
                  name='freeRoaming'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </FormGroup>
              <FormGroup controlId='isSprayed' className='mb-3'>
                <FormLabel>Spayed/Neutered?</FormLabel>
                <Form.Check
                  id='isSprayed'
                  name='isSprayed'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </FormGroup>
              <FormGroup controlId='goodWithStrangers' className='mb-3'>
                <FormLabel>Good With Strangers?</FormLabel>
                <Form.Check
                  id='goodWithStrangers'
                  name='goodWithStrangers'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </FormGroup>
              {i !== 0 && (
                <Button
                  variant='danger'
                  onClick={() => handleRemovePet(i)}
                  style={{ textTransform: 'capitalize' }}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </Flex>
        <FormGroup controlId='openYard' className='mb-3'>
          <FormLabel>Is your yard open for play dates?</FormLabel>
          <Form.Check
            id='openYard'
            name='openYard'
            type='switch'
            onChange={(e) => handleInputChange(e)}
          ></Form.Check>
        </FormGroup>
        <div className='d-flex align-items-center mt-3 mb-4'>
          <Text fontFamily={`Oxygen, sans-serif`} margin={['0 0.5rem 0 0']}>
            Need to add an additional pet?
          </Text>
          <Text
            cursor='pointer'
            fontFamily={`Oxygen, sans-serif`}
            textDecoration={['underline']}
            onClick={() => addPet()}
          >
            Add Pet
          </Text>
        </div>
        <ContinueBtn onSubmit={onSubmit} text='Complete' loading1={loading} />
      </Form>
    </FormContainer>
  );
};

export default NewClientFormPets;

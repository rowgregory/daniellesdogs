import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Text } from '../components/elements';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
} from '../components/styles/form';
import { useForm } from '../utils/hooks/useForm';
import { petValues } from '../utils/form-values/values';

import { validateNewClientFormPets } from '../utils/validate';
import { ErrorText, PageTitle } from './NewClientForm';

const NewClientFormPets = () => {
  const navigate = useNavigate();
  let [errors, setErrors] = useState([]) as any;
  const { state } = useLocation() as any;

  const values = useRef({
    openYard: false,
    pets: [
      {
        ...petValues,
      },
    ],
  }) as any;

  const { inputs, handleInputChange, setInputs } = useForm(values.current);
  useEffect(() => {
    setInputs(values.current);
  }, [setInputs, values]);

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

  const handleSubmit = () => {
    const validForm = validateNewClientFormPets(setErrors, inputs);

    if (validForm) {
      navigate('/new-client-form/waiver', {
        state: {
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
        },
      });
    }
  };

  return (
    <FormContainer>
      <PageTitle>Pets</PageTitle>
      <Form>
        <Flex justifyContent={['flex-start']}>
          {inputs?.pets?.map((pet: any, i: number) => (
            <div key={i} style={{ marginRight: '1rem' }}>
              <FormGroup controlId='name'>
                <FormLabel className='mb-0'>Name</FormLabel>
                <FormInput
                  name='name'
                  value={pet.name}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.name}</ErrorText>
              </FormGroup>
              <FormGroup controlId='age'>
                <FormLabel className='mb-0'>Age</FormLabel>
                <FormInput
                  name='age'
                  value={pet.age}
                  type='number'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.age}</ErrorText>
              </FormGroup>
              <FormGroup controlId='breedString'>
                <FormLabel className='mb-0'>Breed</FormLabel>
                <FormInput
                  name='breedString'
                  value={pet.breedString}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.breedString}</ErrorText>
              </FormGroup>
              <FormGroup controlId='sex'>
                <FormLabel className='mb-0'>Sex</FormLabel>
                <FormInput
                  name='sex'
                  value={pet.sex}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.sex}</ErrorText>
              </FormGroup>
              <FormGroup controlId='preferredTimeOfService'>
                <FormLabel className='mb-0'>
                  Preferred Time of Service
                </FormLabel>
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
                <FormLabel className='mb-0'>Harness Location</FormLabel>
                <FormInput
                  name='harnessLocation'
                  value={pet.harnessLocation}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.harnessLocation}</ErrorText>
              </FormGroup>
              <FormGroup controlId='dropOffLocation'>
                <FormLabel className='mb-0'>Drop Off Location</FormLabel>
                <FormInput
                  name='dropOffLocation'
                  value={pet.dropOffLocation}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.dropOffLocation}</ErrorText>
              </FormGroup>

              <FormGroup controlId='medications'>
                <FormLabel className='mb-0'>Medications</FormLabel>
                <FormInput
                  name='medications'
                  value={pet.medications}
                  type='text'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <ErrorText>{i === 0 && [errors][0]?.medications}</ErrorText>
              </FormGroup>
              <FormGroup controlId='allergies'>
                <FormLabel className='mb-0'>Allergies</FormLabel>
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
                <FormLabel className='mb-0'>Free Roaming?</FormLabel>
                <Form.Check
                  id='freeRoaming'
                  name='freeRoaming'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </FormGroup>
              <FormGroup controlId='isSprayed' className='mb-3'>
                <FormLabel className='mb-0'>Spayed/Neutered?</FormLabel>
                <Form.Check
                  id='isSprayed'
                  name='isSprayed'
                  type='switch'
                  onChange={(e) => handleInputChange(e, i)}
                ></Form.Check>
              </FormGroup>
              <FormGroup controlId='goodWithStrangers' className='mb-3'>
                <FormLabel className='mb-0'>Good With Strangers?</FormLabel>
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
          <FormLabel className='mb-0'>
            Is your yard open for play dates?
          </FormLabel>
          <Form.Check
            id='openYard'
            name='openYard'
            type='switch'
            onChange={handleInputChange}
          ></Form.Check>
        </FormGroup>
        <div className='d-flex align-items-center mt-3'>
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
        <Button
          style={{ textTransform: 'capitalize' }}
          onClick={handleSubmit}
          className='d-flex align-items-center justify-content-center text-white mt-5'
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default NewClientFormPets;

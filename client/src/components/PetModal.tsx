import React, { FC, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { usePetEditModalForm } from '../utils/hooks/usePetEditModalForm';
import { FormInput } from './styles/form';
import { Text, Wrapper } from '../components/elements';
import { petEditModalData } from '../utils/petEditModalData';
import { petValues } from '../utils/form-values/values';
import { GET_PET_BY_ID } from '../queries/getPetById';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import { UPDATE_PET } from '../mutations/updatePet';
import { CREATE_PET } from '../mutations/createPet';
import { DELETE_PET } from '../mutations/deletePet';

interface PetModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  id: any;
  formId: any;
  clearForm: boolean;
}

const PetModal: FC<PetModalProps> = ({
  show,
  setShow,
  id,
  formId,
  clearForm,
}) => {
  const [queryErrors, setQueryErrors] = useState([]) as any;
  const [mutationErrors, setMutationErrors] = useState([]) as any;

  const updatePetCallback = () => {
    if (clearForm) {
      createPet({
        variables: {
          id: formId,
          petCreateInput: inputs,
        },
      });
    } else {
      updatePet({
        variables: {
          id,
          petEditInput: inputs,
        },
      });
    }
  };

  const { inputs, handleInputChange, setInputs, onSubmit } =
    usePetEditModalForm(updatePetCallback, petValues);

  const [loadPetData, { loading, error, data }] = useLazyQuery(GET_PET_BY_ID, {
    onError({ graphQLErrors }) {
      setQueryErrors(graphQLErrors);
    },
    variables: {
      id,
    },
  });

  const [updatePet] = useMutation(UPDATE_PET, {
    onError({ graphQLErrors }) {
      setMutationErrors(graphQLErrors);
    },
    refetchQueries: [
      { query: GET_NEW_CLIENT_FORM_BY_ID, variables: { id: formId } },
      { query: GET_PET_BY_ID, variables: { id } },
    ],
    onCompleted() {
      setShow(false);
    },
  });

  const [createPet] = useMutation(CREATE_PET, {
    onError({ graphQLErrors }) {
      setMutationErrors(graphQLErrors);
    },
    refetchQueries: [
      { query: GET_NEW_CLIENT_FORM_BY_ID, variables: { id: formId } },
      { query: GET_PET_BY_ID, variables: { id } },
    ],
    onCompleted() {
      setShow(false);
    },
  }) as any;

  const [deletePet, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_PET, {
      onError({ graphQLErrors }) {
        setMutationErrors(graphQLErrors);
      },
      refetchQueries: [
        { query: GET_NEW_CLIENT_FORM_BY_ID, variables: { id: formId } },
      ],
      onCompleted() {
        setShow(false);
      },
    }) as any;

  useEffect(() => {
    if (show && !clearForm) {
      loadPetData();
    }
  }, [clearForm, loadPetData, show]);

  useEffect(() => {
    if (clearForm) {
      setInputs((inputs: any) => ({
        ...inputs,
        ...petValues,
      }));
    } else if (data) {
      const { getPetById } = data;
      setInputs((inputs: any) => ({
        ...inputs,
        name: getPetById.name,
        age: getPetById.age,
        breedString: getPetById.breedString,
        sex: getPetById.sex,
        preferredTimeOfService: getPetById.preferredTimeOfService,
        harnessLocation: getPetById.harnessLocation,
        dropOffLocation: getPetById.dropOffLocation,
        freeRoaming: getPetById.freeRoaming,
        isSprayed: getPetById.isSprayed,
        medications: getPetById.medications,
        allergies: getPetById.allergies,
        temperament: getPetById.temperament,
        goodWithStrangers: getPetById.goodWithStrangers,
      }));
    }
  }, [clearForm, data, setInputs]);

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
      keyboard
    >
      <Form className='p-5'>
        {loading && 'Loading ...'}
        {error && <Alert>{error.message}</Alert>}
        {errorDelete && (
          <Alert variant='info'>Error Deleting: {errorDelete.message}</Alert>
        )}
        <Text fontSize={['1.5rem']}>Pet</Text>
        {petEditModalData(inputs).map((pet: any, i: number) => (
          <div key={i}>
            {pet.type !== 'switch' ? (
              <Form.Group>
                <Form.Label className='mb-1'>{pet.label}</Form.Label>
                <FormInput
                  name={pet.name}
                  value={pet.value}
                  type={pet.type}
                  placeholder={pet.placeholder}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ) : (
              <Form.Group>
                <Form.Label className='mb-1'>{pet.label}</Form.Label>
                <Form.Check
                  id={pet.name}
                  name={pet.name}
                  type={pet.type}
                  checked={pet.value}
                  onChange={handleInputChange}
                ></Form.Check>
              </Form.Group>
            )}
          </div>
        ))}
        <Wrapper display={['flex']} justifyContent={['space-between']}>
          <Button onClick={onSubmit}>{clearForm ? 'Add' : 'Update'}</Button>
          {!clearForm && (
            <Button
              variant='danger'
              onClick={() =>
                deletePet({
                  variables: {
                    id,
                  },
                })
              }
            >
              {loadingDelete && <Spinner animation='border' size='sm' />}
              {loadingDelete ? 'Deleting' : 'Delete'}
            </Button>
          )}
        </Wrapper>
      </Form>
      {mutationErrors.map((error: any, i: number) => (
        <Alert
          variant='danger'
          key={i}
        >{`Mutation Error: ${error.message}`}</Alert>
      ))}
      {queryErrors.map((error: any, i: number) => (
        <Alert
          variant='secondary'
          key={i}
        >{`Query Error: ${error.message}`}</Alert>
      ))}
    </Modal>
  );
};

export default PetModal;

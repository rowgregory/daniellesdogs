import React, { FC, useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { usePetEditModalForm } from '../utils/hooks/usePetEditModalForm';
import { FormGroup, FormInput, FormLabel, PageTitle } from './styles/form';
import { Flex } from './elements';
import { petEditModalData } from '../utils/petEditModalData';
import { petValues } from '../utils/form-values/values';
import { GET_PET_BY_ID } from '../queries/getPetById';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import { UPDATE_PET } from '../mutations/updatePet';
import { DELETE_PET } from '../mutations/deletePet';

interface PetEditModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  id: any;
  formId: any;
}

const PetEditModal: FC<PetEditModalProps> = ({ show, setShow, id, formId }) => {
  const [queryErrors, setQueryErrors] = useState([]) as any;
  const [mutationErrors, setMutationErrors] = useState([]) as any;

  const updatePetCallback = () => updatePet();

  const [petById, { loading, error, data }] = useLazyQuery(GET_PET_BY_ID, {
    onError({ graphQLErrors }) {
      setQueryErrors(graphQLErrors);
    },
    variables: {
      id,
    },
  });

  const { inputs, handleInputChange, onSubmit } = usePetEditModalForm(
    updatePetCallback,
    petValues,
    data
  );

  useEffect(() => {
    if (show) petById();
  }, [petById, show]);

  const [updatePet] = useMutation(UPDATE_PET, {
    variables: {
      id,
      petEditInput: inputs,
    },
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

  const [deletePet, { loading: lDelete, error: eDelete }] = useMutation(
    DELETE_PET,
    {
      variables: {
        id,
      },
      onError({ graphQLErrors }) {
        setMutationErrors(graphQLErrors);
      },
      refetchQueries: [
        { query: GET_NEW_CLIENT_FORM_BY_ID, variables: { id: formId } },
      ],
      onCompleted() {
        setShow(false);
      },
    }
  );

  return (
    <Modal show={show} onHide={() => setShow(false)} centered keyboard>
      <Form className='p-5'>
        {loading && <Spinner animation='border' />}
        {error && <Alert>{error.message}</Alert>}
        {eDelete && (
          <Alert variant='info'>Error Deleting: {eDelete.message}</Alert>
        )}
        <PageTitle>Pet</PageTitle>
        {petEditModalData(inputs).map((pet: any, i: number) => (
          <div key={i}>
            {pet.type !== 'switch' ? (
              <FormGroup>
                <FormLabel className='mb-1'>{pet.label}</FormLabel>
                <FormInput
                  name={pet.name}
                  value={pet.value}
                  type={pet.type}
                  placeholder={pet.placeholder}
                  onChange={handleInputChange}
                />
              </FormGroup>
            ) : (
              <FormGroup>
                <FormLabel className='mb-1'>{pet.label}</FormLabel>
                <Form.Check
                  id={pet.name}
                  name={pet.name}
                  type={pet.type}
                  checked={pet.value}
                  onChange={handleInputChange}
                ></Form.Check>
              </FormGroup>
            )}
          </div>
        ))}
        <Flex justifyContent={['space-between']} className='mt-5'>
          <Button onClick={onSubmit}>Update</Button>
          <Button variant='danger' onClick={() => deletePet({})}>
            {lDelete && <Spinner animation='border' size='sm' />}
            {lDelete ? 'Deleting' : 'Delete'}
          </Button>
        </Flex>
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

export default PetEditModal;

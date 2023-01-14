import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { FormGroup, FormInput, FormLabel, PageTitle } from './styles/form';
import { Flex } from './elements';
import { petEditModalData } from '../utils/petEditModalData';
import { petValues } from '../utils/form-values/values';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import { CREATE_PET } from '../mutations/createPet';
import { usePetCreateModalForm } from '../utils/hooks/usePetCreateModalForm';

interface PetCreateModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  formId: any;
}

const PetCreateModal: FC<PetCreateModalProps> = ({ show, setShow, formId }) => {
  const [mutationErrors, setMutationErrors] = useState([]) as any;

  const createPetCallback = () => createPet();

  const { inputs, handleInputChange, setInputs, onSubmit } =
    usePetCreateModalForm(createPetCallback, petValues);

  const [createPet, { loading }] = useMutation(CREATE_PET, {
    variables: {
      id: formId,
      petCreateInput: inputs,
    },
    onError({ graphQLErrors }) {
      setMutationErrors(graphQLErrors);
    },
    refetchQueries: [
      { query: GET_NEW_CLIENT_FORM_BY_ID, variables: { id: formId } },
    ],
    onCompleted() {
      setInputs({});
      setShow(false);
    },
  }) as any;

  return (
    <Modal show={show} onHide={() => setShow(false)} centered keyboard>
      <Form className='p-5'>
        <PageTitle>Pet Create</PageTitle>
        {petEditModalData(inputs).map((pet: any, i: number) => (
          <div key={i}>
            {pet.type !== 'switch' ? (
              <FormGroup>
                <FormLabel className='mb-1'>{pet.label}</FormLabel>
                <FormInput
                  name={pet.name}
                  value={pet.value}
                  type={pet.type}
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
        <Flex justifyContent={['space-between']}>
          <Button onClick={onSubmit}>
            Add{loading && <Spinner animation='border' />}
          </Button>
        </Flex>
      </Form>
      {mutationErrors.map((error: any, i: number) => (
        <Alert
          variant='danger'
          key={i}
        >{`Mutation Error: ${error.message}`}</Alert>
      ))}
    </Modal>
  );
};

export default PetCreateModal;

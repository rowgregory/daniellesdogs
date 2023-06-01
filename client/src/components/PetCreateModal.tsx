import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Alert, Form, Modal, Spinner } from 'react-bootstrap';
import { FormGroup } from './styles/form';
import { Text } from './elements';
import { petEditModalData } from '../utils/petEditModalData';
import { petValues } from '../utils/form-values/values';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import { CREATE_PET } from '../mutations/createPet';
import { usePetCreateModalForm } from '../utils/hooks/usePetCreateModalForm';
import { Input, Label } from './styles/backend-tables';
import { Continue } from './ContinueBtn';

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
      <Form className='p-5' style={{ background: '#1f252b' }}>
        {petEditModalData(inputs).map((pet: any, i: number) => (
          <div key={i}>
            {pet.type !== 'switch' ? (
              <FormGroup className='mb-2'>
                <Label className='mb-1'>{pet.label}</Label>
                <Input
                  name={pet.name}
                  value={pet.value}
                  type={pet.type}
                  onChange={handleInputChange}
                />
              </FormGroup>
            ) : (
              <FormGroup className='mb-2'>
                <Label className='mb-1'>{pet.label}</Label>
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

        <Continue onClick={onSubmit} className='mt-4'>
          <Text
            texttransform='capitalize'
            color='#fff'
            fontFamily='Roboto'
            fontWeight={['500']}
          >
            Add{loading && <Spinner animation='border' />}
          </Text>
        </Continue>
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

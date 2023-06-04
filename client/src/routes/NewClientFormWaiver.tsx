import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { CREATE_NEW_CLIENT_FORM } from '../mutations/createNewClientForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNCFWaiverForm } from '../utils/hooks/useNCFMWaierForm';
import { validateNewClientFormWaiver } from '../utils/validate';
import { ErrorText, FormContainer, FormGroup } from '../components/styles/form';
import { FormCheck, Spinner } from 'react-bootstrap';
import GraphQLAlert from '../components/elements/GraphQLAlert';
import ContinueBtn from '../components/ContinueBtn';
import styled from 'styled-components';
import { Picture } from '../components/elements';
import FakeWaier from '../components/assets/waiver.png';
import { GET_WAIVER } from '../queries/getWaiver';

const StyledCheck = styled(FormCheck)`
  display: flex;
  align-items: center;
  .form-check-input[type='checkbox']:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .form-check-input:focus {
    box-shadow: none;
  }

  .form-check-input {
    width: 30px;
    height: 30px;
    margin-right: 16px;
  }
`;

const NewClientFormWaiver = () => {
  const navigate = useNavigate();
  let [errors, setErrors] = useState([]) as any;
  const [graphqlErrors, setGraphQLErrors] = useState([]) as any;
  const { state } = useLocation() as any;

  const { loading, data } = useQuery(GET_WAIVER);

  const ncfWaiverCalback = () => {
    const validForm = validateNewClientFormWaiver(setErrors, inputs);

    if (validForm) {
      createNewClientForm();
    }
  };

  const { inputs, handleInputChange, onSubmit } = useNCFWaiverForm(
    ncfWaiverCalback,
    setErrors
  );

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
    pets: state?.pets,
    openYard: state?.openYard,
    signedWaiver: inputs.signedWaiver,
  };

  const [createNewClientForm, { loading: loadingCreate }] = useMutation(
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
      <GraphQLAlert
        graphqlErrors={graphqlErrors}
        setGraphQLErrors={setGraphQLErrors}
      />
      {loading && <Spinner animation='border' size='sm' />}
      <Picture
        src={data?.getWaiver[0]?.displayUrl ?? FakeWaier}
        width={['100%']}
        maxwidth={['600px']}
        margin={['0 0 24px 0']}
        alignself={['center']}
      />

      <FormGroup
        controlId='signedWaiver'
        className='d-flex justify-content-center mb-4'
      >
        <StyledCheck
          name='signedWaiver'
          onChange={handleInputChange}
          checked={inputs.signedWaiver}
          label='I hereby acknowledge and agree to the terms and conditions outlined in
          the dog walking waiver.'
        />
        <ErrorText>{errors?.signedWaiver}</ErrorText>
      </FormGroup>
      <ContinueBtn
        onSubmit={onSubmit}
        text='Complete'
        loading1={loadingCreate}
      />
    </FormContainer>
  );
};

export default NewClientFormWaiver;

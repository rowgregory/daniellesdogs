import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
} from '../components/styles/form';
import { ErrorText, PageTitle } from './NewClientForm';
import { validateBio } from '../utils/validate';
import { CREATE_BIO } from '../mutations/createBio';
import { useNavigate } from 'react-router-dom';
import { Flex, Text } from '../components/elements';
import axios from 'axios';
import { GET_BIOS } from '../queries/getBios';

const BioCreate = () => {
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);

  const values = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    title: '',
    description: '',
    image: '',
  };

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const createBioCallback = async () => {
    const validForm = validateBio(setErrors, inputs);

    if (validForm) {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post('/upload/v2', formData, config);

      bioCreate({
        variables: {
          bioInput: {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            emailAddress: inputs.emailAddress,
            title: inputs.title,
            description: inputs.description,
            image: data.secure_url,
            publicId: data.public_id,
          },
        },
      });
    }
  };

  const { inputs, handleInputChange, setInputs, onSubmit } = useForm(
    createBioCallback,
    values
  );

  const [bioCreate, { loading }] = useMutation(CREATE_BIO, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
      navigate(-1);
    },
    refetchQueries: [{ query: GET_BIOS }],
  });

  const handleChange = (e: any) => {
    setInputs((inputs: any) => ({ ...inputs, image: e.target.files[0] }));
    setFile(e.target.files[0]);
  };

  return (
    <FormContainer>
      <PageTitle>Create Bio</PageTitle>
      <Form style={{ width: '235px' }}>
        <FormGroup controlId='image'>
          <FormLabel className='mb-1'>Bio Pic</FormLabel>
          <FormInput
            style={{ background: '#fff' }}
            type='file'
            id='image'
            onChange={handleChange}
          />

          <ErrorText>{errors?.image}</ErrorText>
        </FormGroup>
        <FormGroup controlId='firstName'>
          <FormLabel className='mb-1'>First Name</FormLabel>
          <FormInput
            name='firstName'
            value={inputs?.firstName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.firstName}</ErrorText>
        </FormGroup>
        <FormGroup controlId='lastName'>
          <FormLabel className='mb-1'>Last Name</FormLabel>
          <FormInput
            name='lastName'
            value={inputs?.lastName || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.lastName}</ErrorText>
        </FormGroup>
        <FormGroup controlId='emailAddress'>
          <FormLabel className='mb-1'>Email Address</FormLabel>
          <FormInput
            name='emailAddress'
            value={inputs?.emailAddress || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.emailAddress}</ErrorText>
        </FormGroup>
        <FormGroup controlId='title'>
          <FormLabel className='mb-1'>Title</FormLabel>
          <FormInput
            name='title'
            value={inputs?.title || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.title}</ErrorText>
        </FormGroup>
        <FormGroup controlId='description'>
          <FormLabel className='mb-1'>Description</FormLabel>
          <FormInput
            name='description'
            value={inputs?.description || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.description}</ErrorText>
        </FormGroup>
        <Flex justifyContent={['space-between']}>
          <Button
            style={{ textTransform: 'capitalize' }}
            onClick={onSubmit}
            className='d-flex align-items-center justify-content-center text-white mt-5'
          >
            <Text
              fontFamily={`Oxygen, sans-serif`}
              color='#fff'
              margin={[`0 ${loading || uploading ? '0.5rem' : '0'} 0 0`]}
            >
              Creat
              {loading || uploading ? 'ing...' : 'e'}
            </Text>
            {(loading || uploading) && <Spinner animation='border' size='sm' />}
          </Button>
          <Button
            variant='secondary'
            style={{ textTransform: 'capitalize' }}
            onClick={() => navigate(-1)}
            className='d-flex align-items-center justify-content-center mt-5'
          >
            Back
          </Button>
        </Flex>
      </Form>
      {graphQLErrors?.map((error: any, i: number) => (
        <Alert key={i}>{error?.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default BioCreate;

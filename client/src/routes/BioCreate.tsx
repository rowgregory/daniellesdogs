import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import { validateBio } from '../utils/validate';
import { CREATE_BIO } from '../mutations/createBio';
import { useNavigate } from 'react-router-dom';
import { Flex } from '../components/elements';
import axios from 'axios';
import { GET_BIOS } from '../queries/getBios';
import ContinueBtn from '../components/ContinueBtn';
import { imgConfig } from '../utils/config';
import { bioValues } from '../utils/form-values/values';

const BioCreate = () => {
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);

  const createBioCallback = async () => {
    const validForm = validateBio(setErrors, inputs);

    if (validForm) {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData, imgConfig);

      if (data.message === 'IMAGE_UPLOAD_SUCCESS') {
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
    }
  };

  const { inputs, handleInputChange, setInputs, onSubmit } = useForm(
    createBioCallback,
    bioValues
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
        <Flex justifyContent={['space-between']} margin={['48px 0 0 0']}>
          <ContinueBtn
            onSubmit={onSubmit}
            text='Creat'
            loading1={loading}
            loading2={uploading}
          />
          <Button
            variant='secondary'
            style={{ textTransform: 'capitalize' }}
            onClick={() => navigate(-1)}
            className='d-flex align-items-center justify-content-center'
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

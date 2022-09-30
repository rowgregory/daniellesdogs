import React, { useState } from 'react';
import { Alert, Button, Form, Image, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  FormTextArea,
} from '../components/styles/form';
import { ErrorText, PageTitle } from './NewClientForm';
import { validateBio } from '../utils/validate';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from '../components/elements';
import axios from 'axios';
import { GET_BIO_BY_ID } from '../queries/getBioById';
import { UPDATE_BIO } from '../mutations/updateBio';

const BioEdit = () => {
  const params = useParams();
  const id = params.id;
  const { loading, data } = useQuery(GET_BIO_BY_ID, {
    variables: { id },
  });

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
      let uploadedImage;
      if (file) {
        if (data?.bioById?.publicId) {
          await axios.post(`/upload/${data.bioById.publicId}`);
        }

        const formData = new FormData();
        formData.append('image', file);
        const { data: info } = await axios.post('/upload/v2', formData, config);
        uploadedImage = info;
      }

      bioUpdate({
        variables: {
          id,
          bioInput: {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            emailAddress: inputs.emailAddress,
            title: inputs.title,
            description: inputs.description,
            image: uploadedImage ? uploadedImage.secure_url : inputs.image,
            publicId: uploadedImage ? uploadedImage.public_id : inputs.publicId,
          },
        },
      });
    }
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    createBioCallback,
    values,
    data
  );

  const [bioUpdate, { loading: loadingUpdate }] = useMutation(UPDATE_BIO, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
    },
    refetchQueries: [{ query: GET_BIO_BY_ID, variables: { id } }],
  });

  const handleChange = (e: any) => setFile(e.target.files[0]);

  return (
    <FormContainer>
      {loading && <Spinner animation='border' />}
      <PageTitle>Edit Bio</PageTitle>
      <Form style={{ width: '235px' }}>
        <Image
          src={data?.bioById?.image}
          width='200px'
          height='200px'
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <FormGroup controlId='image'>
          <FormLabel className='mb-1'>Bio Pic</FormLabel>
          <FormInput
            style={{ background: '#fff' }}
            type='file'
            onChange={handleChange}
          />
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
          <FormTextArea
            name='description'
            value={inputs?.description || ''}
            as='textarea'
            rows={4}
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.description}</ErrorText>
        </FormGroup>
        <div className='d-flex justify-content-between'>
          <Button
            style={{ textTransform: 'capitalize' }}
            onClick={onSubmit}
            className='d-flex align-items-center justify-content-center text-white mt-5'
          >
            <Text
              fontFamily={`Oxygen, sans-serif`}
              color='#fff'
              margin={[`0 ${uploading || loadingUpdate ? '0.5rem' : '0'} 0 0`]}
            >
              Updat
              {uploading || loadingUpdate ? 'ing...' : 'e'}
            </Text>
            {(uploading || loadingUpdate) && (
              <Spinner animation='border' size='sm' />
            )}
          </Button>
          <Button
            variant='secondary'
            style={{ textTransform: 'capitalize' }}
            onClick={() => navigate(-1)}
            className='d-flex align-items-center justify-content-center mt-5'
          >
            Back
          </Button>
        </div>
      </Form>
      {graphQLErrors?.map((error: any, i: number) => (
        <Alert key={i}>{error?.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default BioEdit;

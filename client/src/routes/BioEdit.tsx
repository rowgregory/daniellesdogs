import React, { useState } from 'react';
import { Alert, Form, Image, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  FormTextArea,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import { validateBio } from '../utils/validate';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GET_BIO_BY_ID } from '../queries/getBioById';
import { UPDATE_BIO } from '../mutations/updateBio';
import { GET_BIOS } from '../queries/getBios';
import NavigateBtns from '../components/NavigateBtns';
import { bioValues } from '../utils/form-values/values';
import { imgConfig } from '../utils/config';

const BioEdit = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);

  const { loading, data } = useQuery(GET_BIO_BY_ID, {
    variables: { id },
  });

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
        const { data: info } = await axios.post('/upload', formData, imgConfig);
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
            publicId: uploadedImage
              ? uploadedImage.public_id
              : data.bioById.publicId,
          },
        },
      });
    }
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    createBioCallback,
    bioValues,
    data
  );

  const [bioUpdate, { loading: loadingUpdate }] = useMutation(UPDATE_BIO, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
    },
    refetchQueries: [
      { query: GET_BIO_BY_ID, variables: { id } },
      { query: GET_BIOS },
    ],
  });

  return (
    <FormContainer>
      {loading && <Spinner animation='border' />}
      <PageTitle>Edit Bio</PageTitle>
      <Form>
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
            onChange={(e: any) => setFile(e.target.files[0])}
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
        <NavigateBtns
          onSubmit={onSubmit}
          text='Updat'
          loading1={uploading}
          loading2={loadingUpdate}
        />
      </Form>
      {graphQLErrors?.map((error: any, i: number) => (
        <Alert key={i}>{error?.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default BioEdit;

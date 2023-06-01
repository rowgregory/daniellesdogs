import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { FormGroup, ErrorText } from '../components/styles/form';
import { validateBio } from '../utils/validate';
import { CREATE_BIO } from '../mutations/createBio';
import { useNavigate } from 'react-router-dom';
import { Flex } from '../components/elements';
import { GET_BIOS } from '../queries/getBios';
import ContinueBtn from '../components/ContinueBtn';
import { bioValues } from '../utils/form-values/values';
import {
  Label,
  TableContainer,
  Input,
  TextArea,
  SubNav,
  GoBackLink,
  ContentWrapper,
} from '../components/styles/backend-tables';
import { API } from '../utils/api';
import { NoVideoModal } from '../components/NoVideoModal';

const BioCreate = () => {
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [showNoVideo, setShowNoVideo] = useState(false);
  const handleClose = () => {
    setShowNoVideo(false);
  };

  const createBioCallback = async () => {
    const validForm = validateBio(setErrors, inputs);

    if (validForm) {
      setUploading(true);

      try {
        const res = await API.uploadImageToImgbb(file);

        if (res.status_code === 400) {
          setUploading(false);
          setShowNoVideo(true);
        }

        if (res.data) {
          bioCreate({
            variables: {
              bioInput: {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                emailAddress: inputs.emailAddress,
                title: inputs.title,
                description: inputs.description,
                displayUrl: res.data.image.url,
              },
            },
          });
        }
      } catch (err) {
        console.error('ERROR: ', err);
        setUploading(false);
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
    if (['video/mp4', 'video/quicktime'].includes(e?.target?.files[0]?.type)) {
      setShowNoVideo(true);
      setUploading(false);
      return;
    } else {
      setInputs((inputs: any) => ({ ...inputs, image: e.target.files[0] }));
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <TableContainer>
        <SubNav>
          <GoBackLink to='/admin/bios'>GO BACK</GoBackLink>
        </SubNav>
        <ContentWrapper className='create'>
          <Form className='w-100'>
            <FormGroup controlId='image' className='mb-3'>
              <Label className='mb-1'>Bio Pic</Label>
              <Input type='file' id='image' onChange={handleChange} />
              <ErrorText>{errors?.image}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='firstName'>
              <Label className='mb-1'>First Name</Label>
              <Input
                name='firstName'
                value={inputs?.firstName || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.firstName}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='lastName'>
              <Label className='mb-1'>Last Name</Label>
              <Input
                name='lastName'
                value={inputs?.lastName || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.lastName}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='emailAddress'>
              <Label className='mb-1'>Email Address</Label>
              <Input
                name='emailAddress'
                value={inputs?.emailAddress || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.emailAddress}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='title'>
              <Label className='mb-1'>Title</Label>
              <Input
                name='title'
                value={inputs?.title || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.title}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='description'>
              <Label className='mb-1'>Description</Label>
              <TextArea
                name='description'
                value={inputs?.description || ''}
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.description}</ErrorText>
            </FormGroup>
            <Flex justifyContent={['space-between']} margin={['48px 0 0 0']}>
              <ContinueBtn
                onSubmit={onSubmit}
                text='Create'
                loading1={loading}
                loading2={uploading}
              />
            </Flex>
          </Form>
        </ContentWrapper>
        {graphQLErrors?.map((error: any, i: number) => (
          <Alert key={i}>{error?.message}</Alert>
        ))}
      </TableContainer>
    </>
  );
};

export default BioCreate;

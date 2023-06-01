import React, { useRef, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { FormGroup, ErrorText } from '../components/styles/form';
import { validateBio } from '../utils/validate';
import { useParams } from 'react-router-dom';
import { GET_BIO_BY_ID } from '../queries/getBioById';
import { UPDATE_BIO } from '../mutations/updateBio';
import { GET_BIOS } from '../queries/getBios';
import { bioValues } from '../utils/form-values/values';
import { Flex, Picture } from '../components/elements';
import { API } from '../utils/api';
import {
  TableContainer,
  Label,
  Input,
  TextArea,
  SubNav,
  GoBackLink,
  ContentWrapper,
} from '../components/styles/backend-tables';
import ToastNoti from '../components/ToastNoti';
import { NoVideoModal } from '../components/NoVideoModal';
import ContinueBtn from '../components/ContinueBtn';

const BioEdit = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [showNoVideo, setShowNoVideo] = useState(false);
  const handleClose = () => setShowNoVideo(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { loading, data } = useQuery(GET_BIO_BY_ID, {
    variables: { id },
  });

  const editBioCallback = async () => {
    const validForm = validateBio(setErrors, inputs, true);

    if (validForm) {
      setUploading(true);

      try {
        let res;
        if (file?.name) {
          res = await API.uploadImageToImgbb(file);

          if (res.status_code === 400) {
            setUploading(false);
            setShowNoVideo(true);

            return;
          }
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
              displayUrl: res?.data?.image?.url ?? inputs.displayUrl,
            },
          },
        });
      } catch (err) {
        console.error('ERROR: ', err);
        setUploading(false);
      }
    }
  };

  const { inputs, handleInputChange, onSubmit, setInputs } = useForm(
    editBioCallback,
    bioValues,
    data
  );

  const [bioUpdate, { loading: loadingUpdate }] = useMutation(UPDATE_BIO, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
      setShowToast(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    refetchQueries: [
      { query: GET_BIO_BY_ID, variables: { id } },
      { query: GET_BIOS },
    ],
  });

  const handleChange = (e: any) => {
    if (['video/mp4', 'video/quicktime'].includes(e?.target?.files[0]?.type)) {
      setShowNoVideo(true);
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    } else {
      setInputs((inputs: any) => ({ ...inputs, image: e.target.files[0] }));
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <ToastNoti
        showToast={showToast}
        setShowToast={setShowToast}
        options={{ bg: '#0a9900', header: 'Success', body: 'Bio updated' }}
      />
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <TableContainer>
        <SubNav>
          <GoBackLink to='/admin/bios'>GO BACK</GoBackLink>
        </SubNav>
        <ContentWrapper className='edit'>
          <Flex
            flexDirection={['column']}
            alignItems={['center']}
            margin={['0 0 0 0', '0 0 0 32px']}
          >
            <Label>CURRENT PIC</Label>
            <Picture
              src={data?.bioById?.displayUrl}
              width='100px'
              height='100px'
              borderradius={['50%']}
              objectfit={['cover']}
            />
          </Flex>
          <Form className='d-flex flex-column w-100'>
            <FormGroup className='mb-3' controlId='image'>
              <Label className='mb-1'>Bio Pic</Label>
              <Input type='file' onChange={handleChange} ref={fileInputRef} />
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
                as='textarea'
                rows={4}
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.description}</ErrorText>
            </FormGroup>
            <ContinueBtn
              onSubmit={onSubmit}
              text='Update'
              loading1={uploading}
              loading2={loadingUpdate}
              loading3={loading}
            />
          </Form>
        </ContentWrapper>
        {graphQLErrors?.map((error: any, i: number) => (
          <Alert key={i}>{error?.message}</Alert>
        ))}
      </TableContainer>
    </>
  );
};

export default BioEdit;

import React, { useRef, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { FormGroup, ErrorText } from '../components/styles/form';
import { validateService } from '../utils/validate';
import { useParams } from 'react-router-dom';
import { serviceValues } from '../utils/form-values/values';
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
import { GET_SERVICE_BY_ID } from '../queries/getServiceById';
import { UPDATE_SERVICE } from '../mutations/updateService';
import { GET_SERVICES } from '../queries/getServices';

const ServiceEdit = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [showNoVideo, setShowNoVideo] = useState(false);
  const handleClose = () => setShowNoVideo(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { loading, data } = useQuery(GET_SERVICE_BY_ID, {
    variables: { id },
  });

  const editServiceCallback = async () => {
    const validForm = validateService(setErrors, inputs);

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

        serviceUpdate({
          variables: {
            id,
            serviceInput: {
              title: inputs.title,
              price: inputs.price,
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
    editServiceCallback,
    serviceValues,
    data
  );
  console.log(inputs);
  const [serviceUpdate, { loading: loadingUpdate }] = useMutation(
    UPDATE_SERVICE,
    {
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
        { query: GET_SERVICE_BY_ID, variables: { id } },
        { query: GET_SERVICES },
      ],
    }
  );

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
        options={{ bg: '#99007d', header: 'Success', body: 'Service updated' }}
      />
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <TableContainer>
        <SubNav>
          <GoBackLink to='/admin/services'>GO BACK</GoBackLink>
        </SubNav>
        <ContentWrapper className='edit'>
          <Form className='d-flex flex-column w-100'>
            <Flex
              flexdirection={['column']}
              alignitems={['center']}
              margin={['0 0 0 0', '0 0 0 32px']}
            >
              <Label>CURRENT PIC</Label>
              <Picture
                src={data?.serviceById?.displayUrl}
                width='100px'
                height='100px'
                borderradius={['50%']}
                objectfit={['cover']}
              />
            </Flex>
            <FormGroup controlId='image' className='mb-3'>
              <Label className='mb-1'>Service Pic</Label>
              <Input type='file' id='image' onChange={handleChange} />
              <ErrorText>{errors?.image}</ErrorText>
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
            <FormGroup className='mb-3' controlId='price'>
              <Label className='mb-1'>Price</Label>
              <Input
                name='price'
                value={inputs?.price || ''}
                type='number'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.price}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='description'>
              <Label className='mb-1'>Description</Label>
              <TextArea
                rows={10}
                name='description'
                value={inputs?.description || ''}
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

export default ServiceEdit;

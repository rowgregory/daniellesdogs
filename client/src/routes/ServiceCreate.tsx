import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { FormGroup, ErrorText } from '../components/styles/form';
import { validateService } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { Flex } from '../components/elements';
import ContinueBtn from '../components/ContinueBtn';
import { serviceValues } from '../utils/form-values/values';
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
import { GET_SERVICES } from '../queries/getServices';
import { CREATE_SERVICE } from '../mutations/createService';

const ServiceCreate = () => {
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [showNoVideo, setShowNoVideo] = useState(false);
  const handleClose = () => {
    setShowNoVideo(false);
  };

  const createServiceCallback = async () => {
    const validForm = validateService(setErrors, inputs);
    if (validForm) {
      setUploading(true);

      try {
        const res = await API.uploadImageToImgbb(file);

        if (res?.status_code === 400) {
          setUploading(false);
          setShowNoVideo(true);
        }

        if (res?.data) {
          serviceCreate({
            variables: {
              serviceInput: {
                title: inputs.title,
                displayUrl: res.data.image.url,
                description: inputs.description,
                price: inputs.price,
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
    createServiceCallback,
    serviceValues
  );

  const [serviceCreate, { loading }] = useMutation(CREATE_SERVICE, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
      navigate('/admin/services');
    },
    refetchQueries: [{ query: GET_SERVICES }],
  });

  const handleChange = (e: any) => {
    if (['video/mp4', 'video/quicktime'].includes(e?.target?.files[0]?.type)) {
      setShowNoVideo(true);
      setUploading(false);
      return;
    } else {
      setInputs((inputs: any) => ({
        ...inputs,
        displayUrl: e.target.files[0],
      }));
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <TableContainer>
        <SubNav>
          <GoBackLink to='/admin/services'>GO BACK</GoBackLink>
        </SubNav>
        <ContentWrapper className='create'>
          <Form className='w-100 create'>
            <FormGroup controlId='displayUrl' className='mb-3'>
              <Label className='mb-1'>Service Pic</Label>
              <Input
                name='displayUrl'
                type='file'
                id='displayUrl'
                onChange={handleChange}
              />
              <ErrorText>{errors?.displayUrl}</ErrorText>
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

export default ServiceCreate;

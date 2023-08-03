import { useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { Text } from '../components/elements';
import DeleteModal from '../components/DeleteModal';
import { API } from '../utils/api';
import {
  GalleryImage,
  GalleryImageGrid,
  ImageCard,
  Input,
  SubNav,
  TableContainer,
} from '../components/styles/backend-tables';
import AcrobaticLoader from '../components/AcrobaticLoader/AcrobaticLoader';
import { NoVideoModal } from '../components/NoVideoModal';
import { ContentWrapper } from '../components/styles/backend-tables';
import { Maze } from '../components/ContinueBtn';
import { GET_WAIVER } from '../queries/getWaiver';
import { CREATE_WAIVER } from '../mutations/createWaiver';

const Waiver = () => {
  const { loading, data, refetch } = useQuery(GET_WAIVER);
  let [uploading, setUploading] = useState(false);
  const [imageData, setImageData] = useState({}) as any;
  const [show, setShow] = useState(false);
  const [showNoVideo, setShowNoVideo] = useState(false);
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const handleClose = () => {
    setShowNoVideo(false);
    setShow(false);
  };

  const [isLoading, setIsLoading] = useState(true);

  const uploadFileHandler = async (e: any) => {
    setUploading(true);

    const file = e.target.files[0];

    if (['video/mp4', 'video/quicktime'].includes(file.type)) {
      setShowNoVideo(true);
      setUploading(false);
      return;
    }

    try {
      const res = await API.uploadImageToImgbb(file);

      if (res.status_code === 400) {
        setUploading(false);
        setShowNoVideo(true);
      }

      if (res.data) {
        waiverCreate({
          variables: {
            displayUrl: res.data.image.url,
          },
        });
      }
    } catch (err) {
      console.error('ERROR: ', err);
      setUploading(false);
    }
  };

  const [waiverCreate] = useMutation(CREATE_WAIVER, {
    onError({ graphQLErrors }) {
      setUploading(false);
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
      refetch();
    },
    refetchQueries: [{ query: GET_WAIVER }],
  });

  const noWaiver = data?.getWaiver?.length === 0 || data?.getWaiver === null;

  return (
    <TableContainer>
      <DeleteModal
        actionFunc='Waiver'
        show={show}
        handleClose={handleClose}
        id={imageData.id}
        image={imageData.displayUrl}
      />
      {uploading && <AcrobaticLoader />}
      <SubNav className='p-0 d-flex align-items-center'>
        <Form.Group controlId='image' className='my-auto m-0'>
          <Input
            type='file'
            onChange={uploadFileHandler}
            style={{ border: 0 }}
          ></Input>
        </Form.Group>
      </SubNav>
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <ContentWrapper>
        {loading ? (
          <Maze />
        ) : noWaiver ? (
          <Text fontFamily='Roboto' color={['#ededed']} textalign={['center']}>
            Select a file from your device to add the waiver to the new client
            form.
          </Text>
        ) : (
          <GalleryImageGrid>
            {data?.getWaiver?.map((img: any, i: number) => (
              <ImageCard
                key={i}
                onClick={() => {
                  setImageData(img);
                  setShow(true);
                }}
              >
                {isLoading && <Spinner animation='border' />}
                <GalleryImage
                  src={img.displayUrl}
                  onLoad={() => setIsLoading(false)}
                  style={{
                    display: isLoading ? 'none' : 'block',
                  }}
                />
              </ImageCard>
            ))}
          </GalleryImageGrid>
        )}
        {graphQLErrors?.map((error: any, i: number) => (
          <Alert key={i}>{error?.message}</Alert>
        ))}
      </ContentWrapper>
    </TableContainer>
  );
};

export default Waiver;

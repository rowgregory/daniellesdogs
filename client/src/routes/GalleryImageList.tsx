import React, { useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { Text } from '../components/elements';
import DeleteModal from '../components/DeleteModal';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';
import ImageType from '../components/svg/ImageType';
import { API } from '../utils/api';
import { CREATE_GALLERY_IMAGE } from '../mutations/createGalleryImage';
import {
  GalleryImage,
  GalleryImageGrid,
  GoToLink,
  ImageCard,
  Input,
  SubNav,
  TableContainer,
} from '../components/styles/backend-tables';
import AcrobaticLoader from '../components/AcrobaticLoader/AcrobaticLoader';
import { NoVideoModal } from '../components/NoVideoModal';
import { ContentWrapper } from '../components/styles/backend-tables';
import { Maze } from '../components/ContinueBtn';

const GalleryImageList = () => {
  const { loading, data } = useQuery(GALLERY_IMAGE_LIST);
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

      if (res?.status_code === 400) {
        setUploading(false);
        setShowNoVideo(true);
      }

      if (res?.data) {
        galleryImageCreate({
          variables: {
            galleryImageInput: {
              displayUrl: res?.data?.image?.url,
              width: res?.data?.width,
              height: res?.data?.height,
              mimetype: res?.data?.image?.mime,
              title: res?.data?.title,
              size: res?.data?.size,
              thumbUrl: res?.data?.thumb?.url,
            },
          },
        });
      }
    } catch (err) {
      console.error('ERROR: ', err);
      setUploading(false);
    }
  };

  const [galleryImageCreate] = useMutation(CREATE_GALLERY_IMAGE, {
    onError({ graphQLErrors }) {
      setUploading(false);
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
    },
    refetchQueries: [{ query: GALLERY_IMAGE_LIST }],
  });

  const noGalleryImages = data?.galleryImageList?.length === 0;

  return (
    <TableContainer>
      <DeleteModal
        actionFunc='Gallery Image'
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
        <GoToLink to='/gallery'>Go to gallery</GoToLink>
      </SubNav>
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <ContentWrapper>
        {loading ? (
          <Maze />
        ) : noGalleryImages ? (
          <Text fontFamily='Roboto' color={['#ededed']} textAlign={['center']}>
            Select a file from your device to add as an image to the gallery
          </Text>
        ) : (
          <GalleryImageGrid>
            {data?.galleryImageList?.map((img: any, i: number) => (
              <ImageCard
                key={i}
                onClick={() => {
                  setImageData(img);
                  setShow(true);
                }}
              >
                {isLoading && <Spinner animation='border' />}
                <GalleryImage
                  src={img.thumbUrl}
                  onLoad={() => setIsLoading(false)}
                  style={{
                    display: isLoading ? 'none' : 'block',
                  }}
                />
                <div
                  style={{
                    height: '72px',
                    background: '#0e1117',
                    borderRadius: '0 0 0.5rem 0.5rem',
                    width: '100%',
                  }}
                >
                  <div className='d-flex align-items-end justify-content-between h-100 p-2'>
                    <div className='d-flex align-items-center'>
                      <ImageType />
                      <Text
                        color={['#d1d1d1']}
                        fontFamily={`Oxygen, sans-serif`}
                        fontSize={['0.625rem']}
                        margin={['0 0 0 0.25rem']}
                      >
                        {img.mimetype}
                      </Text>
                    </div>
                    <Text
                      color={['#d1d1d1']}
                      fontFamily={`Oxygen, sans-serif`}
                      fontSize={['0.625rem']}
                    >
                      {img.size}KB
                    </Text>
                  </div>
                </div>
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

export default GalleryImageList;

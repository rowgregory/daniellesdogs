import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { Text } from '../components/elements';
import styled from 'styled-components';
import DeleteModal from '../components/DeleteModal';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';
import ImageType from '../components/svg/ImageType';

const ImageCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: 300ms;
  border-radius: 0.5rem;
  :hover {
    box-shadow: 0 4px 5px rgb(0 0 0 / 30%);
  }
`;

const GalleryImageList = () => {
  const [file, setFile] = useState(null) as any;
  const { loading, data, refetch } = useQuery(GALLERY_IMAGE_LIST);
  const [uploading, setUploading] = useState(false);
  const [imageData, setImageData] = useState({}) as any;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await axios.post('/upload', formData, config);

    if (data === 'IMAGE_UPLOAD_SUCCESS') {
      refetch();
      setUploading(false);
    }
  };

  return (
    <div>
      <DeleteModal
        actionFunc='Gallery Image'
        show={show}
        handleClose={handleClose}
        id={imageData.id}
        publicId={imageData.publicId}
      />
      {loading && <Spinner animation='border' />}
      <Form.Control id='logo' type='file' onChange={handleChange} />
      <Button
        className='d-flex align-items-center justify-content-center text-white mt-5'
        disabled={file === null}
        type='button'
        onClick={handleClick}
      >
        <Text
          fontFamily={`Oxygen, sans-serif`}
          fontSize={['0.85rem']}
          color='#fff'
          margin={[`0 ${uploading ? '0.5rem' : '0'} 0 0`]}
        >
          Upload{uploading && 'ing...'}
        </Text>
        {uploading && <Spinner animation='border' size='sm' />}
      </Button>
      <div
        className='mt-5'
        style={{
          display: 'grid',
          gridTemplateColumns: '235px 235px 235px',
          gap: '1.5rem',
        }}
      >
        {data?.galleryImageList?.map((img: any, i: number) => (
          <ImageCard
            key={i}
            onClick={() => {
              setImageData(img);
              setShow(true);
            }}
          >
            <Image
              src={img.secureUrl}
              width='235px'
              height='158px'
              style={{
                objectFit: 'contain',
                background: '#fff',
                borderRadius: '0.5rem 0.5rem 0 0',
              }}
            />
            <div
              style={{
                width: '235px',
                height: '72px',
                background: '#fff',
                borderRadius: '0 0 0.5rem 0.5rem',
              }}
            >
              <div className='d-flex align-items-end justify-content-between h-100 p-2'>
                <div className='d-flex align-items-center'>
                  <ImageType />
                  <Text
                    fontFamily={`Oxygen, sans-serif`}
                    fontSize={['0.625rem']}
                    margin={['0 0 0 0.25rem']}
                  >
                    {img.format}
                  </Text>
                </div>
                <Text fontFamily={`Oxygen, sans-serif`} fontSize={['0.625rem']}>
                  {img.bytes}KB
                </Text>
                <div className='d-flex align-items-center'>
                  <Text
                    fontFamily={`Oxygen, sans-serif`}
                    fontSize={['0.625rem']}
                  >
                    {img.width} x&nbsp;
                  </Text>
                  <Text
                    fontFamily={`Oxygen, sans-serif`}
                    fontSize={['0.625rem']}
                  >
                    {img.height}
                  </Text>
                </div>
              </div>
            </div>
          </ImageCard>
        ))}
      </div>
    </div>
  );
};

export default GalleryImageList;

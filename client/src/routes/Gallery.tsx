import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Carousel, Image, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { FormContainer } from '../components/styles/form';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';
import { PageTitle } from './NewClientForm';

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 100%;
  gap: 0.5rem;
`;

const GalleryImage = styled(Image)`
  aspect-ratio: 1/1;
  object-fit: cover;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: 300ms ease-out;
`;

const Toggle = styled(Button)`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 1rem;
  z-index: 11;
  width: fit-content;
`;

const FullScreenImage = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const CloseBtn = styled.i`
  position: absolute;
  z-index: 12;
  color: #f6f6f6;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-inline: auto;
  right: 0;
  left: 0;
  top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 2000ms;
  :hover {
    transform: rotate(360deg);
  }
`;

const Gallery = () => {
  const { data } = useQuery(GALLERY_IMAGE_LIST);
  const [isGrid, setIsGrid] = useState(true) as any;
  const [index, setIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState('');

  let [loadingImages, setLoading] = useState(true);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {fullScreen === '' && (
        <Toggle
          onClick={() => {
            setFullScreen('');
            setIsGrid(!isGrid);
          }}
        >
          {isGrid ? 'Slide Show' : 'Grid'}
        </Toggle>
      )}
      {fullScreen !== '' && (
        <>
          <CloseBtn
            onClick={() => setFullScreen('')}
            className='fas fa-times fa-2x'
          ></CloseBtn>
          <FullScreenImage src={fullScreen} />
        </>
      )}
      {isGrid && fullScreen === '' && (
        <FormContainer>
          <PageTitle>Gallery</PageTitle>
          {loadingImages && <Spinner animation='border' />}
          <GalleryGrid>
            {data?.galleryImageList?.map((img: any, i: number) => (
              <GalleryImage
                onLoad={() => setLoading(false)}
                key={i}
                src={img?.secureUrl}
                onClick={() => setFullScreen(img.secureUrl)}
              />
            ))}
          </GalleryGrid>
        </FormContainer>
      )}
      {!isGrid && (
        <Carousel interval={2000} activeIndex={index} onSelect={handleSelect}>
          {data?.galleryImageList?.map((img: any, i: number) => (
            <Carousel.Item key={i} style={{ height: '100vh' }}>
              <Image
                fluid
                className='h-100 d-block mx-auto'
                src={img.secureUrl}
                alt={`Gallery Image - ${img._id}`}
                style={{
                  objectFit: 'cover',
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Gallery;

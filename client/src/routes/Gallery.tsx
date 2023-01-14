import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Carousel, Image, Spinner } from 'react-bootstrap';
import { FormContainer, PageTitle } from '../components/styles/form';
import {
  CloseBtn,
  FullScreenImage,
  GalleryGrid,
  GalleryImage,
  Toggle,
} from '../components/styles/gallery';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';

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

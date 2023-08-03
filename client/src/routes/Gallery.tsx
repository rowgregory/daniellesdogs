import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Carousel, Image, Spinner } from 'react-bootstrap';
import { FormContainer, PageTitle } from '../components/styles/form';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';
import {
  GalleryGrid,
  GalleryImage,
  Toggle,
} from '../components/styles/gallery';
import { Flex, Text } from '../components/elements';

const Gallery = () => {
  const { data, loading } = useQuery(GALLERY_IMAGE_LIST);
  const [isGrid, setIsGrid] = useState(true) as any;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  const noImages = data?.galleryImageList?.length === 0;

  return (
    <>
      {!noImages && (
        <Toggle
          onClick={() => {
            setIsGrid(!isGrid);
          }}
        >
          {isGrid ? (
            <i className='fa-brands fa-slideshare fa-2x'></i>
          ) : (
            <i className='fa-solid fa-grip fa-2x'></i>
          )}
        </Toggle>
      )}
      {isGrid && (
        <FormContainer>
          <PageTitle>Gallery</PageTitle>
          {noImages && <Text>Check back soon</Text>}
          <GalleryGrid>
            {loading ? (
              <Flex
                style={{ aspectRatio: '1/1' }}
                width={['100%']}
                justifyContent={['center']}
                alignitems={['center']}
              >
                <Spinner animation='border' />
              </Flex>
            ) : (
              data?.galleryImageList?.map((img: any, i: number) => (
                <GalleryImage
                  key={i}
                  src={img?.displayUrl}
                  onClick={() => {
                    setIsGrid(false);
                    setIndex(i);
                  }}
                />
              ))
            )}
          </GalleryGrid>
        </FormContainer>
      )}
      {!isGrid && (
        <Carousel
          interval={2000}
          activeIndex={index}
          onSelect={handleSelect}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 202,
          }}
        >
          {data?.galleryImageList?.map((img: any, i: number) => (
            <Carousel.Item key={i} style={{ height: '100vh' }}>
              <Image
                fluid
                className='h-100 d-block'
                src={img.displayUrl}
                alt={`Gallery Image - ${img._id}`}
                style={{ objectFit: 'cover' }}
                width='100%'
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Gallery;

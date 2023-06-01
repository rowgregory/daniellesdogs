import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Text, Flex } from '../components/elements';
import Dog1 from '../components/assets/dogs_1.png';
import Picture from '../components/elements/Picture';
import Marquee from 'react-fast-marquee';
import { Spinner } from 'react-bootstrap';
import { imgArr, servicesData, setsUsApartData } from '../utils/home';
import {
  BannerLogoText,
  CenterArea,
  SMContainer,
  IntroSection,
  Skew,
  TextStyled,
  ImageGallery,
  ZoomImg,
  Skew2,
} from '../components/styles/home';
import { DDLogo } from '../components/svg/Logo';
import LandingHigh from '../components/videos/landing-high.mp4';

const Home = () => {
  const [showVideoLoader, setShowVideoLoader] = useState(true);

  useEffect(() => {
    document.title = `Danielle's Dog's`;
  });

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {!showVideoLoader && (
          <CenterArea>
            <DDLogo />
            <BannerLogoText
              fontFamily={`Italianno, cursive`}
              color='#f3f3f3'
              fontSize={['5rem']}
            >
              Danielle's Dogs
            </BannerLogoText>
            <div className='d-flex justify-content-evenly'>
              <SMContainer
                onClick={() =>
                  window.open(
                    'https://www.instagram.com/danielles__dogs/?hl=en',
                    '_blank'
                  )
                }
              >
                <i className='fab fa-instagram fa-3x'></i>
              </SMContainer>
              <SMContainer
                onClick={() =>
                  window.open(
                    'https://www.facebook.com/DaniellesDogs',
                    '_blank'
                  )
                }
              >
                <i className='fab fa-facebook-f fa-3x'></i>
              </SMContainer>
            </div>
          </CenterArea>
        )}
        <div>
          {showVideoLoader && (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              className='d-flex justify-content-center align-items-center'
            >
              <Spinner animation='border' />
              <Text>Loading Danielle's Dogs...</Text>
            </div>
          )}
          <ReactPlayer
            onReady={() => setShowVideoLoader(false)}
            style={{ position: 'absolute', top: 0, left: 0 }}
            url={LandingHigh}
            playsinline
            controls={false}
            playing={true}
            volume={5}
            muted={true}
            loop={true}
            width='100%'
            height='100%'
            config={{
              file: {
                attributes: {
                  style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                },
              },
            }}
          />
        </div>

        <Text
          bottom='10px'
          right={['10px']}
          color={['#fff']}
          position={['absolute']}
          className='d-flex justify-content-end'
          margin={['0 4px 0 0']}
          cursor='pointer'
          fontSize={['10px']}
          onClick={() =>
            window.open(
              'https://www.pexels.com/video/a-cute-dog-in-a-lavender-field-5126333/',
              '_blank'
            )
          }
        >
          Video by Anastasia Shuraeva
        </Text>
      </div>
      <div
        style={{
          background:
            'linear-gradient(to right, #f6f6f6 0%,#f6f6f6 30%, #ffe2e2 30%, #ffc7c7 100%)',
        }}
      >
        <div className='d-flex' style={{ position: 'relative' }}>
          <IntroSection>
            <Picture
              src={Dog1}
              alt='DD'
              objectfit={['cover']}
              width={['100%', '50%', '50%', '50%', '60%']}
              margin={['0 2rem 0 0']}
            />
            <Flex
              alignItems={['center', 'flex-start']}
              className='d-flex flex-column justify-content-center'
            >
              <Text
                fontFamily={`Italianno, cursive`}
                fontSize={['4rem', '4rem', '4rem', '5rem', '5.5rem']}
                margin={['1.5rem 0 0 0', '0']}
                lineHeight={['44px']}
              >
                Danielle's Dogs
              </Text>
              <Text
                textAlign={['center']}
                lineHeight={['30px']}
                fontWeight={['600']}
                fontSize={['20px', '1.15rem', '1.45rem', '1.55rem']}
                width={['20rem', '11rem', '13rem', '20rem']}
                margin={['23px 0 0 0']}
              >
                We're here to care for your pets and make your life easier.
              </Text>
            </Flex>
          </IntroSection>
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBlock: '275px',
          }}
        >
          <Text
            fontSize={['42px']}
            fontWeight={['600']}
            textAlign={['center']}
            width={['100%']}
          >
            Why D Dogs!?
          </Text>
          <div
            className='d-flex-flex-column'
            style={{ maxWidth: '625px', width: '100%' }}
          >
            {setsUsApartData.map((obj: any, i: number) => (
              <div
                key={i}
                className='d-flex align-items-center justify-content-evenly py-5'
              >
                <Picture
                  width={['100px']}
                  height='100px'
                  src={obj?.icon}
                  borderradius={['50%']}
                  objectfit={['cover']}
                  style={{ border: '4px solid #fff' }}
                />
                <Flex flexDirection={['column']} width={['64%']}>
                  <Text
                    style={{ maxWidth: '300px' }}
                    fontSize={['calc(10px + 3.75vw)']}
                  >
                    {obj.text}
                  </Text>
                  <Text style={{ maxWidth: '400px' }} fontSize={['18px']}>
                    {obj.desc}
                  </Text>
                </Flex>
              </div>
            ))}
          </div>
        </div>
        <Skew>
          <div></div>
        </Skew>
      </div>

      <div className='d-flex flex-column mb-5'>
        <div
          style={{
            padding: '0 4rem 5rem',
            background:
              'linear-gradient(90deg, rgb(15, 15, 15) 0%, rgb(35, 35, 35) 100%)',
            width: '100%',
            zIndex: 30,
          }}
        >
          <TextStyled
            fontSize={['calc(10px + 10vw)']}
            fontFamily={`Italianno, cursive`}
          >
            Services
          </TextStyled>
          <TextStyled
            fontSize={['1.25rem', '1rem', '1.25rem', '1.75rem', '2rem']}
          >
            Our wide range of services will allow us to provide for all of your
            pet's needs
          </TextStyled>
        </div>

        <ImageGallery>
          {servicesData.map((obj: any, i: number) => (
            <ZoomImg key={i} text={obj.text}>
              <Picture src={obj.img} alt='DD' />
            </ZoomImg>
          ))}
        </ImageGallery>
        <Skew2>
          <div></div>
        </Skew2>
      </div>
      <div style={{ padding: '20rem 0' }}>
        <Marquee speed={75} gradientWidth={0} pauseOnHover={true}>
          {imgArr.map((img: any, i: number) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '175px 175px 175px 175px 175px 175px',
                gridTemplateRows: '175px 175px 175px',
                gap: '0.5rem',
                marginRight: '0.5rem',
              }}
            >
              <Picture
                src={img.first}
                gridarea={['1/1/1/1']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.second}
                gridarea={['1/2/1/2']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.third}
                gridarea={['2/1/4/3']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.fourth}
                gridarea={['1/3/2/3']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.fifth}
                gridarea={['2/3/2/3']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.sixth}
                gridarea={['3/3/3/3']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.seventh}
                gridarea={['1/4/3/6']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.eigth}
                gridarea={['3/4/4/4']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.ninth}
                gridarea={['3/5/4/5']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.tenth}
                gridarea={['1/6/1/6']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.eleventh}
                gridarea={['2/6/2/6']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
              <Picture
                src={img.twelth}
                gridarea={['3/6/3/6']}
                width={['100%']}
                aspectratio={['1/1']}
                objectfit={['cover']}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default Home;

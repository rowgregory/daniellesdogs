import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Text, Flex } from '../components/elements';
import Dog1 from '../components/assets/dogs_1.png';
import Picture from '../components/elements/Picture';
import gsap, { CSSPlugin } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Map from '../components/Map';
import Marquee from 'react-fast-marquee';
import { Spinner } from 'react-bootstrap';
import {
  imgArr,
  servicesData,
  setsUsApartData,
  SplitTextToChars,
} from '../utils/home';
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
import { Logo } from '../components/svg/Logo';

gsap.registerPlugin(ScrollTrigger, CSSPlugin);

const Home = () => {
  const [showVideoLoader, setShowVideoLoader] = useState(true);
  const firstImgRef = useRef(null) as any;
  const nameRef = useRef(null) as any;
  const quoteRef = useRef(null) as any;
  const revealRefs = useRef([]) as any;
  const apartRef = useRef([]) as any;
  const servicesRef = useRef(null) as any;
  const servicesRef2 = useRef(null) as any;
  const zoomImgRefs = useRef([]) as any;
  const mapRef = useRef(null) as any;

  const addToRefs = (el: any) => {
    if (el && !revealRefs?.current?.includes(el)) {
      revealRefs?.current?.push(el);
    }
  };
  const addToZoomImgRefs = (el: any) => {
    if (el && !zoomImgRefs?.current?.includes(el)) {
      zoomImgRefs?.current?.push(el);
    }
  };

  useEffect(() => {
    document.title = `Danielle's Dog's`;
  });

  // useEffect(() => {
  //   const el = firstImgRef.current;
  //   const el2 = nameRef.current;
  //   const el3 = quoteRef.current;
  //   const el5 = revealRefs.current;
  //   const el6 = apartRef.current;
  //   const el7 = servicesRef.current;
  //   const el7a = servicesRef2.current;
  //   const el8 = zoomImgRefs.current;

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: el,
  //       start: `bottom-=600 bottom`,
  //       end: 'bottom+=100 bottom',
  //       toggleActions: 'play pause none reset',
  //       // markers: true,
  //       scrub: 0.5,
  //     },
  //   });
  //   const tl2 = gsap.timeline();

  //   tl.from(el, {
  //     x: -400,
  //     opacity: 0,
  //     ease: 'power1',
  //     duration: 0.7,
  //   });

  //   tl.from(
  //     el2,
  //     {
  //       x: 100,
  //       opacity: 0,
  //       ease: 'power1',
  //       duration: 0.7,
  //     },
  //     '-=0.25'
  //   ).from(
  //     el3,
  //     {
  //       y: 100,
  //       opacity: 0,
  //       ease: 'power1',
  //       duration: 0.7,
  //     },
  //     '-=0.15'
  //   );

  //   tl2.to(el6, {
  //     color: '#ffc7c7',
  //     duration: 0.3,
  //     scrollTrigger: {
  //       start: 'bottom+=600 bottom',
  //       end: 'top+=525 top',
  //       trigger: el,
  //       scrub: 0.5,
  //       toggleActions: 'play pause none reset',
  //     },
  //   });

  //   el5.forEach((el: any) => {
  //     gsap.fromTo(
  //       el,
  //       {
  //         autoAlpha: 0,
  //         x: 100,
  //       },
  //       {
  //         duration: 1,
  //         x: 0,
  //         autoAlpha: 1,
  //         ease: 'elastic',
  //         scrollTrigger: {
  //           trigger: el,
  //           start: 'top center+=200',
  //           toggleActions: 'play pause none reset',
  //         },
  //       }
  //     );
  //   });

  //   if (!servicesRef.current) return;
  //   const chars = SplitTextToChars(servicesRef.current);

  //   gsap.set(servicesRef.current, {
  //     perspective: 400,
  //     transform: 'translate(0px, 0px',
  //   });

  //   gsap.from(chars, {
  //     duration: 0.2,
  //     opacity: 0,
  //     scale: 1,
  //     y: -40,
  //     rotationX: -90,
  //     transformOrigin: '0% 50% -50',
  //     ease: 'inOut',
  //     stagger: 0.025,
  //     scrollTrigger: {
  //       trigger: el7,
  //       start: 'bottom+=500 bottom',
  //       toggleActions: 'play pause none reset',
  //     },
  //   });

  //   if (!servicesRef2.current) return;
  //   const chars2 = SplitTextToChars(servicesRef2.current);

  //   gsap.set(servicesRef2.current, {
  //     perspective: 400,
  //     transform: 'translate(0px, 0px)',
  //   });

  //   gsap.from(chars2, {
  //     duration: 0.2,
  //     opacity: 0,
  //     scale: 1,
  //     delay: 0.5,
  //     y: -40,
  //     rotationX: -90,
  //     transformOrigin: '0% 50% -50',
  //     ease: 'inOut',
  //     stagger: 0.025,
  //     scrollTrigger: {
  //       trigger: el7a,
  //       start: 'bottom+=300 bottom',
  //       toggleActions: 'play pause none reset',
  //     },
  //   });

  //   gsap.from(el8, {
  //     duration: 0.35,
  //     opacity: 0,
  //     x: -150,
  //     ease: 'power4',
  //     stagger: 0.125,
  //     scrollTrigger: {
  //       trigger: el7a,
  //       start: 'top+=50 bottom',
  //       toggleActions: 'play pause none reset',
  //     },
  //   });

  //   return () => {
  //     tl.kill();
  //     tl2.kill();
  //   };
  // }, []);

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {!showVideoLoader && (
          <CenterArea>
            <Logo />
            <BannerLogoText
              fontFamily={`Italianno, cursive`}
              color='#f3f3f3'
              margin={['0 auto']}
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
            url='https://res.cloudinary.com/dxc6zj0ir/video/upload/v1672257670/home_video_azbwo7.mp4'
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
          right='10px'
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
              ref={firstImgRef}
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
                ref={nameRef}
                fontFamily={`Italianno, cursive`}
                fontSize={['4rem', '4rem', '4rem', '5rem', '5.5rem']}
                margin={['1.5rem 0 0 0', '0']}
              >
                Danielle's Dogs
              </Text>
              <Text
                ref={quoteRef}
                lineHeight={['30px']}
                fontWeight={['600']}
                fontSize={['0.875rem', '1.15rem', '1.45rem', '1.55rem']}
                width={['', '11rem', '13rem', '20rem']}
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
            margin: '15rem 0',
          }}
        >
          <Text
            color={['#aaa']}
            // ref={setsUsApartRef}
            fontSize={['3rem', '3rem', '4rem', '5rem', '5.5rem']}
            // margin={['20rem 0 0 16%']}
            fontFamily={`Italianno, cursive`}
            style={{
              transform: 'rotate(-90deg) translate(194px, 56px)',
              transformOrigin: 'right',
            }}
            width={['fit-content']}
          >
            What sets us <span ref={apartRef}>apart?</span>
          </Text>
          <div className='d-flex-flex-column'>
            {setsUsApartData.map((obj: any, i: number) => (
              <div
                ref={addToRefs}
                key={i}
                className='d-flex align-items-center pt-5 pb-5'
              >
                <div>{obj.icon}</div>
                <Text margin={['0 0 0 1.5rem']} fontSize={['3rem']}>
                  {obj.text}
                </Text>
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
            color={['green']}
            fontSize={['3rem', '3rem', '4rem', '5rem', '5.5rem']}
            ref={servicesRef}
            fontFamily={`Italianno, cursive`}
          >
            Services
          </TextStyled>
          <TextStyled
            ref={servicesRef2}
            fontSize={['1rem', '1rem', '1.25rem', '1.75rem', '2rem']}
          >
            Our wide range of services will allow us to provide for all of your
            pet's needs
          </TextStyled>
        </div>

        <ImageGallery>
          {servicesData.map((obj: any, i: number) => (
            <ZoomImg key={i} text={obj.text} ref={addToZoomImgRefs}>
              <Picture src={obj.img} alt='DD' />
            </ZoomImg>
          ))}
        </ImageGallery>
        <Skew2>
          <div></div>
        </Skew2>
      </div>
      <Text
        fontSize={['3rem', '3rem', '4rem', '5rem', '5.5rem']}
        padding={['12rem 0 4rem 6rem']}
        fontFamily={`Italianno, cursive`}
      >
        Service Locations
      </Text>
      <div style={{ position: 'relative' }} ref={mapRef}>
        <div
          style={{
            background: `linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 80%`,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: '50%',
            zIndex: 10,
            width: '100%',
          }}
        ></div>
        <Map />
        <div
          style={{
            background: `linear-gradient(rgba(246, 246, 246, 0) 0%, rgba(246, 246, 246, 1) 100%`,
            position: 'absolute',
            top: '50%',
            left: 0,
            bottom: 0,
            zIndex: 10,
            width: '100%',
          }}
        ></div>
      </div>
      <div style={{ padding: '20rem 0' }}>
        <Marquee speed={150} gradientWidth={0} pauseOnHover={true}>
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

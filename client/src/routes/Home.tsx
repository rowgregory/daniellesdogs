import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { Text } from '../components/elements';
import { motion } from 'framer-motion';
import Dog1 from '../components/assets/dogs_1.png';
import Picture from '../components/elements/Picture';
import gsap, { CSSPlugin } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import S1 from '../components/assets/service_1.png';
import S2 from '../components/assets/service_2.png';
import S3 from '../components/assets/service_3.png';
import S4 from '../components/assets/service_4.png';
import Fifth from '../components/assets/fifth.jpeg';
import Thirteenth from '../components/assets/thirteenth.jpeg';
import Flexible from '../components/svg/Flexible';
import Convenience from '../components/svg/Convenience';
import PhotoUpdates from '../components/svg/PhotoUpdates';
import Communication from '../components/svg/Communication';
import Map from '../components/Map';
import Marquee from 'react-fast-marquee';
import { Logo } from '../components/svg/Logo';

gsap.registerPlugin(ScrollTrigger, CSSPlugin);

const BannerLogoText = styled(Text)`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 30px;
    left: 0;
    background-color: lightpink;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  :hover {
    &::before {
      visibility: visible;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
`;

const Skew = styled.div`
  transform-origin: top left;
  transform: skewY(10deg);
  overflow: hidden;
  div {
    transform-origin: top left;
    transform: skewY(-10deg);
    height: 500px;
    background: linear-gradient(
      90deg,
      rgb(15, 15, 15) 0%,
      rgb(35, 35, 35) 100%
    );
  }
`;
const Skew2 = styled.div`
  transform-origin: bottom left;
  transform: skewY(-10deg);
  overflow: hidden;
  div {
    transform-origin: top left;
    transform: skewY(10deg);
    height: 500px;
    background: linear-gradient(
      90deg,
      rgb(15, 15, 15) 0%,
      rgb(35, 35, 35) 100%
    );
  }
`;

const SMContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    border: 2px solid #f3f3f3;
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 3.75rem;
    height: 3.75rem;
    transition: 500ms;
  }

  i {
    transform: scale(1) rotateY(0deg);
    transition: 250ms;
    color: #f3f3f3;
  }

  :hover {
    &::before {
      content: '';
      position: absolute;
      transform: scale(1.4) rotateY(360deg);
      transition: 0.5s;
    }
    i {
      transform: scale(1.4) rotateY(360deg);
      transition: 0.75s;
      &.fa-facebook-f {
        color: #1877f2;
      }
      &.fa-instagram {
        background: linear-gradient(
          45deg,
          #ebcc50 0%,
          #e14d3a 52%,
          #a7308f 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
`;

const CenterArea = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
`;

const setsUsApartData = [
  {
    icon: <Flexible />,
    text: 'Flexibility',
  },
  {
    icon: <Convenience />,
    text: 'Convenience',
  },
  {
    icon: <Communication />,
    text: 'Communcation',
  },
  {
    icon: <PhotoUpdates />,
    text: `Photo & Text Updates`,
  },
];

const servicesData = [
  {
    img: S1,
    text: 'Thirty Minute Walk',
  },
  {
    img: S2,
    text: 'One Hour Walk',
  },
  {
    img: S3,
    text: 'Overnight Care',
  },
  {
    img: S4,
    text: 'Check-Ins',
  },
];

export const SplitTextToChars = (textNode: any) => {
  const textContent = textNode.textContent;
  const textSplit = textContent.split('');

  const frag = document.createDocumentFragment();
  textSplit.forEach((letter: any, i: number) => {
    const span = document.createElement('span') as any;
    span.textContent = letter;
    span.style = `${letter === ' ' ? 'min-width: 0.45rem;' : ''}z-index: ${
      textSplit.length - i
    }; position: relative; display: inline-block;`;
    frag.appendChild(span);
  });
  textNode.textContent = '';
  textNode.appendChild(frag);

  return textNode.children;
};
const TextStyled = styled(Text)`
  font-weight: 500;
  margin: 0;
  color: #fff;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  transition: 1000ms;
  background: linear-gradient(90deg, rgb(15, 15, 15) 0%, rgb(35, 35, 35) 100%);
  z-index: 100;
  :hover {
    img {
      tranform: scale(1.2);
    }
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
  }
`;

const ZoomImg = styled.div<{ text?: string }>`
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 3s ease-out;
  }

  :hover {
    &::before {
      content: '';
      position: absolute;
      transform: translate(-100%, 0);
    }
    img {
      transform: scale(1.3);
    }
  }
  &::before {
    font-family: Cormorant, serif;
    content: '${({ text }) => text}';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    box-sizing: border-box;
    z-index: 30;
    transition: transform 500ms;
    transform: translate(0, 0);
  }
`;

const imgArr = [
  {
    first:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660264184/M1_cucuux.png',
    second:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265747/M10-min_z6pywe.png',
    third: Thirteenth,
    fourth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265350/M2-min_khrx2h.png',
    fifth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265415/M3-min_lcsyzv.png',
    sixth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265446/M4-min_kes7ya.png',
    seventh:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265453/M5-min_koc06p.png',
    eigth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265533/M6-min_rzhgqq.png',
    ninth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265562/M7-min_jvix21.png',
    tenth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833624/IMG_5634_jcwygm.png',
    eleventh:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663008137/IMG_2013_za0pih.png',
    twelth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663008476/IMG_5597_eo0rsf.jpg',
  },
  {
    first:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663007945/IMG_7775_te5poe.png',
    second:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663007808/IMG_7823_lmunws.png',
    third:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663007800/IMG_6175_hi89pi.jpg',
    fourth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265599/M8-min_jtw364.png',
    fifth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662834144/Screenshot_2022-07-28_at_5.10.42_PM_fig1vy.png',
    sixth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265650/M11-min_s0yxxn.png',
    seventh: Fifth,
    eigth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663008138/IMG_1192_d7ahmz.png',
    ninth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833626/IMG_5423_f5dgii.png',
    tenth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833624/IMG_0271_hzwto8.png',
    eleventh:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833607/IMG_2909_jzizco.png',
    twelth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833619/IMG_5661_wmbxxo.png',
  },
];

const Home = () => {
  const firstImgRef = useRef(null) as any;
  const nameRef = useRef(null) as any;
  const quoteRef = useRef(null) as any;
  const setsUsApartRef = useRef(null) as any;
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
    document.title = `Danielle's Dogs`;
  });

  useEffect(() => {
    const el = firstImgRef.current;
    const el2 = nameRef.current;
    const el3 = quoteRef.current;
    const el4 = setsUsApartRef.current;
    const el5 = revealRefs.current;
    const el6 = apartRef.current;
    const el7 = servicesRef.current;
    const el7a = servicesRef2.current;
    const el8 = zoomImgRefs.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `bottom-=600 bottom`,
        end: 'bottom+=100 bottom',
        toggleActions: 'play pause none reset',
        // markers: true,
        scrub: 0.5,
      },
    });
    const tl2 = gsap.timeline();

    tl.from(el, {
      x: -400,
      opacity: 0,
      ease: 'power1',
      duration: 0.7,
    });

    tl.from(
      el2,
      {
        x: 100,
        opacity: 0,
        ease: 'power1',
        duration: 0.7,
      },
      '-=0.25'
    ).from(
      el3,
      {
        y: 100,
        opacity: 0,
        ease: 'power1',
        duration: 0.7,
      },
      '-=0.15'
    );

    tl2
      .to(el4, {
        transformOrigin: 'bottom left',
        rotate: 90,
        duration: 0.3,
        scrollTrigger: {
          start: 'bottom+=800 bottom',
          end: 'bottom top',
          trigger: el,
          scrub: 0.5,
          toggleActions: 'play pause none reset',
        },
      })
      .to(el6, {
        color: '#ffc7c7',
        duration: 0.3,
        scrollTrigger: {
          start: 'bottom+=600 bottom',
          end: 'top+=525 top',
          trigger: el,
          scrub: 0.5,
          toggleActions: 'play pause none reset',
        },
      });

    el5.forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          x: 100,
        },
        {
          duration: 1,
          x: 0,
          autoAlpha: 1,
          ease: 'elastic',
          scrollTrigger: {
            trigger: el,
            start: 'top center+=200',
            toggleActions: 'play pause none reset',
          },
        }
      );
    });

    if (!servicesRef.current) return;
    const chars = SplitTextToChars(servicesRef.current);

    gsap.set(servicesRef.current, {
      perspective: 400,
      transform: 'translate(0px, 0px',
    });

    gsap.from(chars, {
      duration: 0.2,
      opacity: 0,
      scale: 1,
      y: -40,
      rotationX: -90,
      transformOrigin: '0% 50% -50',
      ease: 'inOut',
      stagger: 0.025,
      scrollTrigger: {
        trigger: el7,
        start: 'bottom+=300 bottom',
        toggleActions: 'play pause none reset',
        // markers: true,
      },
    });

    if (!servicesRef2.current) return;
    const chars2 = SplitTextToChars(servicesRef2.current);

    gsap.set(servicesRef2.current, {
      perspective: 400,
      transform: 'translate(0px, 0px)',
    });

    gsap.from(chars2, {
      duration: 0.2,
      opacity: 0,
      scale: 1,
      delay: 0.5,
      y: -40,
      rotationX: -90,
      transformOrigin: '0% 50% -50',
      ease: 'inOut',
      stagger: 0.025,
      scrollTrigger: {
        trigger: el7a,
        start: 'bottom+=300 bottom',
        toggleActions: 'play pause none reset',
        // markers: true,
      },
    });

    gsap.from(el8, {
      duration: 0.35,
      opacity: 0,
      x: -150,
      ease: 'power4',
      stagger: 0.125,
      scrollTrigger: {
        trigger: el7a,
        start: 'top+=50 bottom',
        toggleActions: 'play pause none reset',
      },
    });

    return () => {
      tl.kill();
      tl2.kill();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.25 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ position: 'relative', minHeight: '100vh' }}>
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
                window.open('https://www.facebook.com/DaniellesDogs', '_blank')
              }
            >
              <i className='fab fa-facebook-f fa-3x'></i>
            </SMContainer>
          </div>
        </CenterArea>
        <div>
          <ReactPlayer
            style={{ position: 'absolute', top: 0, left: 0 }}
            url='https://res.cloudinary.com/little-paws-dachshund-rescue/video/upload/v1660078524/production_ID_5126333_tzxwzt.mp4'
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
      </div>
      <div
        style={{
          background:
            'linear-gradient(to right, #f6f6f6 0%,#f6f6f6 30%, #ffe2e2 30%, #ffc7c7 100%)',
        }}
      >
        <div className='d-flex' style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              paddingTop: '12.5rem',
              display: 'flex',
            }}
          >
            <Picture
              ref={firstImgRef}
              src={Dog1}
              alt='DD'
              objectfit={['cover']}
              width={['50%', '50%', '50%', '60%']}
              margin={['0 2rem 0 0']}
            />
            <div className='d-flex flex-column justify-content-center'>
              <Text
                ref={nameRef}
                fontFamily={`Italianno, cursive`}
                fontSize={['3rem', '3rem', '4rem', '5rem', '5.5rem']}
              >
                Danielle's Dogs
              </Text>
              <Text
                ref={quoteRef}
                lineHeight={['30px']}
                fontWeight={['600']}
                fontSize={['0.875rem', '1.15rem', '1.45rem', '1.55rem']}
                width={['11rem', '13rem', '20rem']}
              >
                We're here to care for your pets and make your life easier.
              </Text>
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '0 0 16rem 0',
          }}
        >
          <Text
            color={['#aaa']}
            ref={setsUsApartRef}
            fontSize={['3rem', '3rem', '4rem', '5rem', '5.5rem']}
            margin={['20rem 0 0 16%']}
            fontFamily={`Italianno, cursive`}
          >
            What sets us <span ref={apartRef}>apart?</span>
          </Text>
          <div className='d-flex-flex-column' style={{ marginLeft: '35%' }}>
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
          {servicesData.map((obj, i) => (
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
          {imgArr.map((img, i) => (
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
    </motion.div>
  );
};

export default Home;

import { useQuery } from '@apollo/client';
import { Text, Flex, Picture } from '../components/elements';
import { Spinner } from 'react-bootstrap';
import { GET_BIOS } from '../queries/getBios';
import styled from 'styled-components';
import AboutImg from '../components/assets/about.jpg';

const BioCard = styled.div`
  background: rgb(255 255 255/0.15);
  width: 100%;
  border-radius: 0;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  height: auto;
  box-shadow: 0px 0px 43px -4px rgba(0, 0, 0, 0.53);

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    border-radius: 8px;
    max-width: 382px;
  }
`;

const BioCardsContainer = styled(Flex)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 160px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: 390px 390px;
    gap: 24px;
  }
`;

const Image = styled(Picture)`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    border-radius: 8px 8px 0 0;
  }
`;

const Container = styled(Flex)`
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const About = () => {
  const { loading, data } = useQuery(GET_BIOS);

  return (
    <div
      style={{
        background: 'linear-gradient(to top, #fff 0%, #fff 70%, #ffc7c7 100%)',
      }}
    >
      <Container
        style={{
          position: 'relative',
          height: '548px',
          backgroundImage: `url(${AboutImg})`,
          width: '100%',
          backgroundSize: 'cover',
          backgroundPositionY: 'center',
        }}
        flexDirection={['column']}
      >
        <Flex
          maxWidth={['1120px']}
          margin={['0 auto']}
          width={['100%']}
          padding={['60px 24px 0']}
          flexDirection={['column']}
          position={['relative']}
        >
          <Text
            fontSize={['40px', '40px', '60px']}
            color={['#fff']}
            fontWeight={['800']}
            maxWidth={['350px', '400px', '588px']}
            lineHeight={['38px', 'normal']}
            margin={['0 0 20px 0']}
            textShadow={['2px 2px 4px rgba(0, 0, 0, 0.5)']}
            position={['absolute']}
            style={{ zIndex: 2 }}
          >
            About Us
          </Text>
          <Text
            fontSize={['24px', '24px', '30px']}
            color={['#fff']}
            fontWeight={['800']}
            maxWidth={['350px', '400px', '588px']}
            textShadow={['2px 2px 4px rgba(0, 0, 0, 0.5)']}
            position={['absolute']}
            style={{ zIndex: 2, top: '136px' }}
          >
            Two female founders initiated a successful venture focused on
            canines.
          </Text>
        </Flex>
        <svg
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '300px',
          }}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          preserveAspectRatio='xMidYMid slice'
        >
          <path
            fill='#fff'
            fillOpacity='1'
            d='M0,256L40,240C80,224,160,192,240,176C320,160,400,160,480,181.3C560,203,640,245,720,250.7C800,256,880,224,960,213.3C1040,203,1120,213,1200,208C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
          ></path>
        </svg>
      </Container>
      <Flex flexDirection={['column']} maxWidth={['796px']} margin={['0 auto']}>
        <Text fontSize={['18px']}>
          Danielle and Olympia, two passionate dog lovers, embarked on a
          remarkable journey that led to the creation of Danielle Dogs dog
          walking business. Bound by their shared devotion to canines, they
          recognized the need for reliable and trustworthy dog walking services
          in their community. Fuelled by their love for dogs and a desire to
          make a positive impact, they combined their expertise and launched a
          business committed to providing exceptional care. Through dedication
          and hard work, Danielle Dogs flourished, earning a stellar reputation
          for its personalized approach, professionalism, and unwavering
          commitment to the well-being of furry companions. Danielle and
          Olympia's incredible partnership has shaped a thriving business
          dedicated to the happiness and health of dogs everywhere.
        </Text>
        {loading && <Spinner animation='border' />}
        <BioCardsContainer>
          {data?.bioList?.map((bio: any, i: number) => (
            <BioCard key={i}>
              <Flex flexDirection={['column']}>
                <Image src={bio?.displayUrl} />
                <Text
                  fontSize={['32px']}
                  textAlign={['center']}
                  width={['100%']}
                  margin={['16px 0 0 0']}
                >
                  {`${bio?.firstName} ${bio?.lastName}`}
                </Text>
                <Text
                  margin={['0 0 16px 0']}
                  fontSize={['24px']}
                  textAlign={['center']}
                  fontWeight={['bold']}
                  width={['100%']}
                >
                  {bio?.title}
                </Text>
                <Text padding={['16px 16px 32px']}>{bio?.description}</Text>
              </Flex>
            </BioCard>
          ))}
        </BioCardsContainer>
      </Flex>
    </div>
  );
};

export default About;

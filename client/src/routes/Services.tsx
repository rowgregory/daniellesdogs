import styled from 'styled-components';
import { Flex, Link, Picture, Text } from '../components/elements';
import { useQuery } from '@apollo/client';
import { GET_SERVICES } from '../queries/getServices';
import { Maze } from '../components/ContinueBtn';
import ServiceImg from '../components/assets/services.jpg';

const ServiceContainer = styled.div`
  background: rgb(255 255 255/0.15);
  width: 100%;
  border-radius: 1rem;
  background: #fff;
  padding: 16px;
  margin-bottom: 2rem;
  margin-top: 32px;
  max-width: 70rem;
  margin-inline: auto;
`;

const Services = () => {
  const { loading, data } = useQuery(GET_SERVICES);

  return (
    <Flex
      flexdirection={['column']}
      style={{ minHeight: 'calc(100vh - 617px)' }}
    >
      <Flex
        style={{
          position: 'relative',
          height: '548px',
          backgroundImage: `url(${ServiceImg})`,
          width: '100%',
          backgroundSize: 'cover',
          backgroundPositionY: 'center',
        }}
        flexdirection={['column']}
      >
        <Flex
          maxWidth={['1120px']}
          margin={['0 auto']}
          width={['100%']}
          padding={['60px 24px 0']}
          flexdirection={['column']}
        >
          <Text
            fontSize={['40px', '40px', '60px']}
            color={['#fff']}
            fontWeight={['600']}
            maxWidth={['350px', '400px', '588px']}
            lineHeight={['38px', 'normal']}
            margin={['0 0 20px 0']}
          >
            Trusted local dog walking experts.
          </Text>
          <Text
            fontSize={['24px', '24px', '30px']}
            color={['#fff']}
            fontWeight={['500']}
            maxWidth={['350px', '400px', '588px']}
          >
            Trustworthy, local, 5-star dog walkers available for booking in your
            neighborhood.
          </Text>
          <Link
            to='/new-client-form'
            display={['flex']}
            alignitems={['center']}
            fontWeight={['500']}
            style={{
              justifyContent: 'center',
              marginTop: '16px',
              fontSize: '24px',
              color: '#fff',
              background: 'rgb(255, 199, 199)',
              border: 'none',
              borderRadius: '8px',
              paddingBlock: '10px',
              width: '240px',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            Book a walk
          </Link>
        </Flex>
        <svg
          style={{
            position: 'absolute',
            zIndex: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '300px',
            transform: 'scaleX(-1)',
          }}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          preserveAspectRatio='xMidYMid slice'
        >
          <path
            fill='#fff'
            fillOpacity='1'
            d='M0,160L80,186.7C160,213,320,267,480,266.7C640,267,800,213,960,208C1120,203,1280,245,1360,266.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
          ></path>
        </svg>
        <Text
          cursor='pointer'
          position={['absolute']}
          color={['#717171']}
          fontSize={['10px']}
          alignSelf={['start', 'start', 'end']}
          style={{
            right: '-30px',
            bottom: 0,
            transform: 'rotate(90deg)',
          }}
          onClick={() =>
            window.open(
              'https://www.pexels.com/photo/adult-golden-retriever-1771838/',
              '_blank'
            )
          }
        >
          Photo by Davide Baraldi
        </Text>
      </Flex>

      <ServiceContainer>
        <Text
          fontSize={['26px', '30px', '48px']}
          textalign={['center']}
          fontFamily='Roboto'
          color={['rgb(114, 114, 114)']}
          margin={['0 auto 60px']}
        >
          Explore the range of services we offer
        </Text>
        {loading ? (
          <Maze />
        ) : data?.serviceList?.length === 0 ? (
          <Text margin={['0 auto 60px']}>Check back soon</Text>
        ) : (
          data?.serviceList?.map((obj: any, i: number) => (
            <Flex
              key={i}
              margin={['0 0 3rem 0']}
              flexdirection={['column', 'column', 'row']}
              padding={['0 0 30px 0']}
              borderBottom={['1px solid #f0f0f0']}
            >
              <Picture
                aspectratio={['1/1']}
                objectfit={['cover']}
                src={obj?.displayUrl}
                alt={`${obj?.name}-${i}`}
                width={['100%', '100%', '50%']}
                margin={['0', '0 1.5rem 0 0']}
                maxwidth={['100%', '100%', '300px']}
              />
              <Flex flexdirection={['column']}>
                <Text
                  fontSize={['2rem']}
                  margin={[
                    '16px auto 16px auto',
                    '16px auto 16px auto',
                    '0 0 16px 0',
                  ]}
                >
                  {obj?.title}
                </Text>
                <Text fontSize={['19px']}>{obj?.description}</Text>
                <Text fontSize={['36px']} margin={['16px 0 0 0']}>
                  ${Number(obj?.price)?.toFixed(2)}
                </Text>
              </Flex>
            </Flex>
          ))
        )}
      </ServiceContainer>
    </Flex>
  );
};

export default Services;

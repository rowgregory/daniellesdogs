import React from 'react';
import { useQuery } from '@apollo/client';
import { Text, Flex, Picture } from '../components/elements';
import { Spinner } from 'react-bootstrap';
import { GET_BIOS } from '../queries/getBios';
import { FormContainer, PageTitle } from '../components/styles/form';
import styled from 'styled-components';

const BioCard = styled.div`
  background: rgb(255 255 255/0.15);
  width: 100%;
  border-radius: 1rem;
  background: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const BioCardsContainer = styled(Flex)`
  flex-direction: column;
`;

const Image = styled(Picture)`
  width: 100%;
  height: 100%;
  margin: 0 1rem 1rem 0;
  object-fit: cover;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 300px;
    height: 300px;
  }
`;

const Wrapper = styled(Flex)`
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

const About = () => {
  const { loading, data } = useQuery(GET_BIOS);

  return (
    <FormContainer style={{ height: '100%' }}>
      <PageTitle>About</PageTitle>
      {loading && <Spinner animation='border' />}
      <BioCardsContainer>
        {data?.bioList?.map((bio: any, i: number) => (
          <BioCard key={i}>
            <Wrapper>
              <Flex flexDirection={['column']}>
                <Image src={bio?.image} />
                <Text fontSize={['1.125rem']}>{bio?.emailAddress}</Text>
              </Flex>
              <Flex flexDirection={['column']}>
                <Text fontSize={['2.875rem']}>
                  {`${bio?.firstName} ${bio?.lastName}`}
                </Text>
                <Text margin={['0 0 2rem 0']} fontSize={['1.5rem']}>
                  {bio?.title}
                </Text>
                <Text>{bio?.description}</Text>
              </Flex>
            </Wrapper>
          </BioCard>
        ))}
      </BioCardsContainer>
    </FormContainer>
  );
};

export default About;

import React from 'react';
import styled from 'styled-components';
import { Flex, Picture, Text } from '../components/elements';
import { FormContainer, PageTitle } from '../components/styles/form';
import Service_1 from '../components/assets/IMG_1896.jpeg';
import Service_2 from '../components/assets/IMG_2120.jpeg';
import Service_3 from '../components/assets/IMG_2850.jpeg';
import Service_4 from '../components/assets/IMG_3379.jpeg';

const ServiceContainer = styled.div`
  background: rgb(255 255 255/0.15);
  width: 100%;
  border-radius: 1rem;
  background: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const serviceData = [
  {
    name: 'One Hour Walks',
    price: '30',
    description:
      'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
    image: Service_1,
  },
  {
    name: 'Half Hour Walks',
    price: '30',
    description:
      'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
    image: Service_2,
  },
  {
    name: 'Check Ins',
    price: '15',
    description:
      'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
    image: Service_3,
  },
  {
    name: 'Overnight',
    price: '50',
    description:
      'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah',
    image: Service_4,
  },
];

const Services = () => {
  return (
    <FormContainer>
      <PageTitle>Services</PageTitle>
      <ServiceContainer>
        {serviceData?.map((obj: any, i: number) => (
          <Flex key={i} margin={['0 0 3rem 0']}>
            <Picture
              aspectratio={['1/1']}
              objectfit={['cover']}
              src={obj?.image}
              alt={`${obj?.name}-${i}`}
              width='50%'
              margin={['0 1.5rem 0 0']}
            />
            <Flex flexDirection={['column']}>
              <Text fontSize={['2rem']}>{obj?.name}</Text>
              <Text>${Number(obj?.price).toFixed(2)}</Text>
              <Text>{obj?.description}</Text>
            </Flex>
          </Flex>
        ))}
      </ServiceContainer>
    </FormContainer>
  );
};

export default Services;

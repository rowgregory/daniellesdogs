import React from 'react';
import { Flex, Link, Text } from '../elements';
import styled from 'styled-components';

const ChevronRight = () => (
  <Text fontSize={['13px']} margin={['0 14px 0 14px']}>
    <i className='fas fa-chevron-right fa-xs' style={{ color: '#707070' }}></i>
  </Text>
);

const Crumb = styled(Text)<{ current?: any; completed?: any }>`
  color: ${({ current, completed }) =>
    completed ? '#3981b8' : current ? '#000' : '#707070;'};
  font-size: 13px;
  font-family: Arial;
`;

const CrumbLink = styled(Link)`
  color: #3981b8;
  font-size: 13px;
  font-family: Arial;
`;

const BreadCrumb = ({ breadCrumbData }: any) => {
  const {
    step,
    setSteps,
    setRevealContactInfo,
    setRevealShippingAddress,
    setRevealPayment,
  } = breadCrumbData;

  return (
    <Flex alignitems={['baseline']} margin={['20px 0 36px 0']}>
      <CrumbLink to='/cart'>Cart</CrumbLink>
      <ChevronRight />
      <Crumb
        onClick={() => {
          if (step.one.hasCompleted) {
            setSteps({
              one: { current: true },
              two: { current: false, hasStarted: true },
              three: {
                current: false,
                hasStarted: step.two.hasCompleted ? true : false,
              },
            });
            setRevealContactInfo(true);
            setRevealShippingAddress(false);
            setRevealPayment(false);
          }
        }}
        current={step.one.current}
        completed={step.one.hasCompleted}
      >
        Contact
      </Crumb>
      <ChevronRight />
      <Crumb
        onClick={() => {
          if (step.two.hasCompleted || step.two.hasStarted) {
            setSteps({
              one: { current: false, hasCompleted: true },
              two: { current: true, hasStarted: true },
              three: { current: false, hasStarted: true },
            });
            setRevealContactInfo(false);
            setRevealShippingAddress(true);
            setRevealPayment(false);
          }
        }}
        current={step.two.current}
        completed={
          step.two.hasCompleted || (step.two.hasStarted && step.one.current)
        }
      >
        Delivery Options
      </Crumb>
      <ChevronRight />
      <Crumb
        onClick={() => {
          if (step.three.hasStarted || step.two.hasCompleted) {
            setSteps({
              one: { current: false, hasCompleted: true },
              two: { current: false, hasStarted: true, hasCompleted: true },
              three: { current: true, hasStarted: true, hasCompleted: false },
            });
            setRevealContactInfo(false);
            setRevealShippingAddress(false);
            setRevealPayment(true);
          }
        }}
        current={step.three.current}
        completed={
          step.three.hasCompleted ||
          (step.three.hasStarted && (step.two.current || step.one.current))
        }
      >
        Payment
      </Crumb>
    </Flex>
  );
};

export default BreadCrumb;

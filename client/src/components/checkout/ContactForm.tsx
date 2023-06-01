import React from 'react';
import { Flex } from '../elements';
import validateContactInfo from './validateContactInfo';

import { ErrorText, FormInput, ProceedBtn } from '../styles/checkout';

const ContactForm = ({ data }: any) => {
  const {
    userFullName,
    userEmail,
    errors,
    setErrors,
    setUserFullName,
    setUserEmail,
    setRevealContactInfo,
    setRevealShippingAddress,
    setSteps,
    formIsValid,
  } = data;
  return (
    <Flex flexDirection={['column']}>
      <FormInput
        name='userFullName'
        value={userFullName}
        onChange={(e: any) => setUserFullName(e.target.value)}
        placeholder='Full Name'
        style={{}}
      />
      <ErrorText>{errors?.fullName}</ErrorText>
      <FormInput
        name='userEmail'
        value={userEmail}
        onChange={(e: any) => setUserEmail(e.target.value)}
        placeholder='Email'
        style={{ padding: '14px 11px' }}
      />
      <ErrorText>{errors?.userEmail}</ErrorText>
      <ProceedBtn
        onClick={() => {
          const isValid = validateContactInfo(
            setErrors,
            { userEmail, userFullName },
            formIsValid
          );
          if (isValid) {
            setRevealContactInfo(false);
            setRevealShippingAddress(true);
            setSteps({
              one: { hasCompleted: true, current: false },
              two: {
                hasCompleted: false,
                current: true,
                hasStarted: true,
              },
              three: { hasCompleted: false, current: false },
            });
          }
        }}
        type='submit'
        className='mb-5 mt-4 align-self-end'
      >
        Continue to delivery options
      </ProceedBtn>
    </Flex>
  );
};

export default ContactForm;

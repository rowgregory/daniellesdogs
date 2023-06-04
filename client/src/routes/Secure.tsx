import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert, Button, Spinner } from 'react-bootstrap';
import { useForm } from '../utils/hooks/useForm';
import {
  FormGroup,
  FormInput,
  FormLabel,
  FormContainer,
  PageTitle,
} from '../components/styles/form';
import { useLazyQuery } from '@apollo/client';
import { RETREIVE_PASSCODE } from '../queries/retreivePasscode';

const Secure = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]) as any;
  const [getPasscode, { loading, data }] = useLazyQuery(RETREIVE_PASSCODE, {
    onCompleted: () => {
      if (data?.retreivePasscode) {
        setTimeout(() => {
          navigate('/register', {
            state: {
              secure_password: 'UNLOCKED',
            },
          });
        }, 1000);
      } else {
        setErrors((errors: any) => [...errors, { message: 'Wrong passcode' }]);
        setTimeout(() => {
          setErrors([]);
        }, 2000);
      }
    },
  });

  const secureValue = {
    passcode: '',
  };

  const secureCallback = () => {
    if (inputs.passcode === '') {
      setErrors((errors: any) => [...errors, { message: 'Enter Passcode' }]);
      setTimeout(() => {
        setErrors([]);
      }, 2000);
    } else {
      getPasscode({ variables: { passcodeAttempt: inputs.passcode } });
    }
  };

  const { inputs, handleInputChange, onSubmit } = useForm(
    secureCallback,
    secureValue
  );

  return (
    <FormContainer>
      <PageTitle>
        Secure{' '}
        <i
          style={{ color: data?.retreivePasscode ? 'green' : '' }}
          className={
            data?.retreivePasscode
              ? `fas fa-unlock ml-1 fa-sm`
              : 'fas fa-lock ml-1 fa-sm'
          }
        ></i>
      </PageTitle>
      {errors?.map((error: any, i: number) => (
        <Alert variant='danger' key={i}>
          {error?.message}
        </Alert>
      ))}
      <Form>
        <FormGroup controlId='passcode'>
          <FormLabel className='mb-1'>Passcode</FormLabel>
          <FormInput
            name='passcode'
            value={inputs?.passcode || ''}
            type='text'
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button
          variant={data?.retreivePasscode ? 'success' : 'primary'}
          className='mt-5'
          onClick={onSubmit}
          disabled={errors?.length > 0}
        >
          Unlock{loading && <Spinner animation='border' size='sm' />}
          {data?.retreivePasscode && 'ed!'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Secure;

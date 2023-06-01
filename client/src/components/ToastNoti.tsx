import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Text } from './elements';

const ToastNoti = ({ showToast, setShowToast, options }: any) => {
  return (
    <ToastContainer position='bottom-center'>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        autohide
        delay={4000}
        style={{ background: '#1b1b1b' }}
      >
        <Toast.Header style={{ background: options.bg }}>
          <Text
            fontFamily='Roboto'
            fontSize={['16px']}
            fontWeight={['600']}
            color={['#fff']}
            className='me-auto'
          >
            {options.header}
          </Text>
        </Toast.Header>
        <Toast.Body style={{ color: '#fff' }}>{options.body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNoti;

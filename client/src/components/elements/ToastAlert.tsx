import styled from 'styled-components';
import { Text } from '../elements';

const GenericAlert = styled.div`
  height: 3.5rem;
  background: #d6f5d6 !important;
  display: flex;
  align-items: center;
  padding: 0.5rem 12rem 0.5rem 2rem;
`;

export const ToastAlert = (msg: string, onClose: () => void, type: string) => (
  <GenericAlert>
    <div className='mr-3'>
      <>
        {type === 'success' ? (
          <i
            className='fa fa-check'
            aria-hidden='true'
            style={{ color: 'green', marginRight: '0.5rem' }}
          ></i>
        ) : (
          type === 'error' && (
            <i
              className='fa-solid fa-triangle-exclamation'
              style={{ color: 'red' }}
            ></i>
          )
        )}
      </>
    </div>
    <Text>{msg}</Text>
  </GenericAlert>
);

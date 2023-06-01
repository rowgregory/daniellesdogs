import { Modal } from 'react-bootstrap';
import { Body, Content, Footer, Header, Title } from './DeleteModal';
import { Text } from './elements';

export const NoVideoModal = ({ show, close }: any) => {
  return (
    <Modal show={show} onHide={close} centered className='delete-modal'>
      <Content>
        <Header>
          <Title style={{ color: '#f004e0' }}>Excuse Me!</Title>
        </Header>
        <Body>
          <Text color={['#d1d1d1']} fontFamily='Roboto'>
            You can not upload a video here guuuurl!
          </Text>
        </Body>
        <Footer>
          <button
            style={{
              background: '#f004e0',
              padding: '8px 14px',
              color: '#fff',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'uppercase',
              fontFamily: 'Roboto',
              fontSize: '14px',
              border: 'none',
            }}
            onClick={() => close()}
          >
            Close
          </button>
        </Footer>
      </Content>
    </Modal>
  );
};

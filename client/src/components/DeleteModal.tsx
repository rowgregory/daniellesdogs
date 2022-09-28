import { useMutation } from '@apollo/client';
import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { DELETE_GALLERY_IMAGE } from '../mutations/deleteGalleryImage';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';

const Content = styled.div`
  background: #fff;
  padding: 1rem;
  transform: translate3d(0, 0, 0);
`;

const Header = styled(Modal.Header)`
  background: #fff;
  padding: 3rem 2rem 2rem 2rem;
  border: 0;
  position: relative;
`;

const Title = styled(Modal.Title)`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  span {
    color: red;
    font-weight: bold;
  }
`;

const Body = styled(Modal.Body)`
  color: ${({ theme }) => theme.text};
  background: #fff;
  font-size: 1rem;
  padding: 1rem 2rem;
`;

const Footer = styled(Modal.Footer)`
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  background: #fff;
  border: 0;
`;

const DeleteModal = ({ actionFunc, show, handleClose, id, publicId }: any) => {
  const [deleting, setDeleting] = useState(false);
  const [galleryImageDelete, { loading }] = useMutation(DELETE_GALLERY_IMAGE, {
    refetchQueries: [{ query: GALLERY_IMAGE_LIST }],
  });

  const getAction = async () => {
    switch (actionFunc) {
      case 'Gallery Image':
        if (publicId) {
          setDeleting(true);
          await axios.post(`/upload/${publicId}`);
          galleryImageDelete({ variables: { id } });
          setDeleting(false);
        }
        handleClose();
        break;
      default:
        return;
    }
  };

  const checkForVowel = (word: string) => {
    const firstLetter = word?.charAt(0);
    const isVowel = ['A', 'E', 'I', 'O'].includes(firstLetter);
    if (isVowel) return 'an ';
    return 'a ';
  };

  return (
    <Modal show={show} onHide={handleClose} centered className='delete-modal'>
      <Content>
        <Header closeButton>
          <Title>
            You are about to <span>DELETE</span> {checkForVowel(actionFunc)}
            {actionFunc}
          </Title>
        </Header>
        <Body>Are you sure?</Body>
        <Footer>
          <Button className='px-3' variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='px-4' variant='danger' onClick={getAction}>
            Yes{' '}
            {(loading || deleting) && <Spinner animation='border' size='sm' />}
          </Button>
        </Footer>
      </Content>
    </Modal>
  );
};

export default DeleteModal;

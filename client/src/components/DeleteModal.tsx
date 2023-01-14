import { useMutation } from '@apollo/client';
import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { DELETE_BIO } from '../mutations/deleteBio';
import { DELETE_CONTACT_FORM } from '../mutations/deleteContactForm';
import { DELETE_GALLERY_IMAGE } from '../mutations/deleteGalleryImage';
import { DELETE_PRODUCT } from '../mutations/deleteProduct';
import { DELETE_NEW_CLIENT_FORM } from '../queries/deleteNewClientForm';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';
import { GET_BIOS } from '../queries/getBios';
import { GET_CONTACT_FORMS } from '../queries/getContactForms';
import { GET_NEW_CLIENT_FORMS } from '../queries/getNewClientForms';
import { GET_PRODUCTS } from '../queries/getProducts';

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
  const [bioDelete, { loading: loadingBios }] = useMutation(DELETE_BIO, {
    refetchQueries: [{ query: GET_BIOS }],
  });
  const [contactFormDelete, { loading: loadingContactForm }] = useMutation(
    DELETE_CONTACT_FORM,
    {
      refetchQueries: [{ query: GET_CONTACT_FORMS }],
    }
  );
  const [productDelete, { loading: loadingProduct }] = useMutation(
    DELETE_PRODUCT,
    {
      refetchQueries: [{ query: GET_PRODUCTS }],
    }
  );
  const [newClientFormDelete, { loading: loadingNewClientForm }] = useMutation(
    DELETE_NEW_CLIENT_FORM,
    {
      refetchQueries: [{ query: GET_NEW_CLIENT_FORMS }],
    }
  );

  const getAction = async () => {
    setDeleting(true);
    switch (actionFunc) {
      case 'Gallery Image':
        if (publicId) {
          await axios.post(`/upload/${publicId}`);
        }
        galleryImageDelete({ variables: { id } });
        handleClose();
        setDeleting(false);
        break;
      case 'Bio':
        if (publicId) {
          await axios.post(`/upload/${publicId}`);
        }
        bioDelete({ variables: { id } });
        handleClose();
        setDeleting(false);
        break;
      case 'Contact Form':
        contactFormDelete({ variables: { id } });
        handleClose();
        setDeleting(false);
        break;
      case 'Product':
        if (publicId) {
          await axios.post(`/upload/${publicId}`);
        }
        productDelete({ variables: { id } });
        handleClose();
        setDeleting(false);
        break;
      case 'New Client Form':
        // id has been a string up to this point
        // with multiple documents to delete
        // there are multiple id's
        newClientFormDelete({
          variables: {
            id: id.id,
            userId: id.user.id,
            petsId: id.pets.map((pet: any) => pet.id),
            vetId: id.vet.id,
            addressId: id.address.id,
          },
        });
        handleClose();
        setDeleting(false);
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
          <Button
            className='px-3'
            variant='secondary'
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button className='px-4' variant='danger' onClick={getAction}>
            Yes{' '}
            {(loading ||
              deleting ||
              loadingBios ||
              loadingContactForm ||
              loadingProduct ||
              loadingNewClientForm) && <Spinner animation='border' size='sm' />}
          </Button>
        </Footer>
      </Content>
    </Modal>
  );
};

export default DeleteModal;

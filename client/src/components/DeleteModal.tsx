import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Image, Modal, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { DELETE_BIO } from '../mutations/deleteBio';
import { DELETE_CONTACT_FORM } from '../mutations/deleteContactForm';
import { DELETE_GALLERY_IMAGE } from '../mutations/deleteGalleryImage';
import { DELETE_PRODUCT } from '../mutations/deleteProduct';
import { DELETE_NEW_CLIENT_FORM } from '../mutations/deleteNewClientForm';
import { GALLERY_IMAGE_LIST } from '../queries/galleryImageList';
import { GET_BIOS } from '../queries/getBios';
import { GET_CONTACT_FORMS } from '../queries/getContactForms';
import { GET_NEW_CLIENT_FORMS } from '../queries/getNewClientForms';
import { GET_PRODUCTS } from '../queries/getProducts';
import { Text } from './elements';
import { DELETE_SERVICE } from '../mutations/deleteService';
import { GET_SERVICES } from '../queries/getServices';

export const Content = styled.div`
  background: #1f252b;
  padding-block: 16px;
  transform: translate3d(0, 0, 0);
`;

export const Header = styled(Modal.Header)`
  background: #1f252b;
  padding: 3rem 2rem 2rem 2rem;
  border: 0;
  position: relative;

  &.btn-close {
    color: #d1d1d1 !important;
    background: #d1d1d1;
  }
`;

export const Title = styled(Modal.Title)`
  color: #d1d1d1;
  font-family: Roboto;
  font-size: 1.25rem;
  span {
    color: red;
    font-weight: bold;
  }
`;

export const Body = styled(Modal.Body)`
  color: #d1d1d1;
  font-family: Roboto;
  background: #1f252b;
  font-size: 1rem;
  padding: 1rem 2rem;
`;

export const Footer = styled(Modal.Footer)`
  color: #d1d1d1;
  font-family: Roboto;
  padding: 2rem;
  background: #1f252b;
  border: 0;
  justify-content: flex-start;
`;

const DeleteModal = ({ actionFunc, show, handleClose, id, image }: any) => {
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
  const [serviceDelete, { loading: loadingService }] = useMutation(
    DELETE_SERVICE,
    {
      refetchQueries: [{ query: GET_SERVICES }],
    }
  );

  const getAction = async () => {
    setDeleting(true);
    switch (actionFunc) {
      case 'Gallery Image':
        galleryImageDelete({ variables: { id } });
        handleClose();
        setDeleting(false);
        break;
      case 'Bio':
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
        productDelete({ variables: { id } });
        handleClose();
        setDeleting(false);
        break;
      case 'New Client Form':
        newClientFormDelete({
          variables: {
            id: id.id,
            userId: id.user.id,
            petsId: id.pets.map((pet: any) => pet.id),
            vetId: id.vet.id,
            addressId: id?.address?.id,
          },
        });
        handleClose();
        setDeleting(false);
        break;
      case 'Service':
        serviceDelete({ variables: { id } });
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
        <Header>
          <Title>
            You are about to <span>DELETE</span> {checkForVowel(actionFunc)}
            {actionFunc}
          </Title>
          <i
            className='fas fa-times'
            style={{ color: '#d1d1d1' }}
            onClick={() => handleClose()}
          ></i>
        </Header>
        <Body>
          {image && (
            <Image
              src={image}
              alt='Delete'
              width='100%'
              style={{
                maxHeight: '300px',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          )}
          <Text margin={['16px 0 0 0']} color={['#d1d1d1']} fontFamily='Roboto'>
            Do you really want to remove this content? This can't be undone.
          </Text>
        </Body>
        <Footer>
          <Button
            className='px-4 mt-0'
            variant='danger'
            onClick={getAction}
            style={{ borderBottomWidth: 0 }}
          >
            Confirm{' '}
            {(loading ||
              deleting ||
              loadingBios ||
              loadingContactForm ||
              loadingProduct ||
              loadingNewClientForm ||
              loadingService) && <Spinner animation='border' size='sm' />}
          </Button>
        </Footer>
      </Content>
    </Modal>
  );
};

export default DeleteModal;

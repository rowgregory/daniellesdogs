import { gql } from '@apollo/client';

export const DELETE_GALLERY_IMAGE = gql`
  mutation deleteGalleryImage($id: ID!) {
    deleteGalleryImage(id: $id) {
      message
    }
  }
`;

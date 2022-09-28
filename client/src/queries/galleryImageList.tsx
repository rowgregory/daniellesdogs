import { gql } from '@apollo/client';

export const GALLERY_IMAGE_LIST = gql`
  query galleryImageLIst {
    galleryImageList {
      id
      publicId
      secureUrl
      height
      width
      format
      bytes
    }
  }
`;

import { gql } from '@apollo/client';

export const GALLERY_IMAGE_LIST = gql`
  query galleryImageLIst {
    galleryImageList {
      id
      displayUrl
      width
      height
      mimetype
      title
      size
      mediumImgUrl
      thumbUrl
    }
  }
`;

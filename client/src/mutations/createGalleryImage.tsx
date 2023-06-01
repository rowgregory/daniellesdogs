import { gql } from '@apollo/client';

export const CREATE_GALLERY_IMAGE = gql`
  mutation createGalleryImage($galleryImageInput: GalleryImageInput) {
    createGalleryImage(galleryImageInput: $galleryImageInput) {
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

import { gql } from '@apollo/client';

export const GET_ORDERS_CLIENTS_GALLERYIMAGES_CONTACTFORM_TOTALS = gql`
  query getOrdersClientsGalleryImagesContactFormsTotals {
    getOrdersClientsGalleryImagesContactFormsTotals {
      orderCount
      newClientFormCount
      galleryImageCount
      contactFormCount
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_ID = gql`
  query productById($id: ID!) {
    productById(id: $id) {
      id
      name
      image
      description
      price
      countInStock
      publicId
      sizes {
        size
        qty
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query productList {
    productList {
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
      category
    }
  }
`;

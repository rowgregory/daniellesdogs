import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query productList {
    productList {
      id
      name
      displayUrl
      description
      price
      countInStock
      sizes {
        size
        qty
      }
      category
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_ID = gql`
  query productById($id: ID!) {
    productById(id: $id) {
      id
      name
      displayUrl
      description
      price
      countInStock
      category
      sizes {
        size
        qty
      }
    }
  }
`;

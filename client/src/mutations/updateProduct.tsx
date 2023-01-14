import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $productInput: ProductInput) {
    updateProduct(id: $id, productInput: $productInput) {
      id
    }
  }
`;

import { gql } from '@apollo/client';

export const DELETE_BIO = gql`
  mutation deleteBio($id: ID!) {
    deleteBio(id: $id) {
      id
    }
  }
`;

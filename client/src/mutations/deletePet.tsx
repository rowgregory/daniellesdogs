import { gql } from '@apollo/client';

export const DELETE_PET = gql`
  mutation deletePet($id: ID!) {
    deletePet(id: $id) {
      id
    }
  }
`;

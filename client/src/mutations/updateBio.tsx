import { gql } from '@apollo/client';

export const UPDATE_BIO = gql`
  mutation updateBio($id: ID!, $bioInput: BioInput) {
    updateBio(id: $id, bioInput: $bioInput) {
      id
    }
  }
`;

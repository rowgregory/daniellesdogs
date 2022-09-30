import { gql } from '@apollo/client';

export const CREATE_BIO = gql`
  mutation createBio($bioInput: BioInput) {
    createBio(bioInput: $bioInput) {
      id
    }
  }
`;

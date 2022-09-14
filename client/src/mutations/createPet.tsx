import { gql } from '@apollo/client';

export const CREATE_PET = gql`
  mutation createPet($id: ID!, $petCreateInput: PetInput) {
    createPet(id: $id, petCreateInput: $petCreateInput) {
      name
    }
  }
`;

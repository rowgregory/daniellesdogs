import { gql } from '@apollo/client';

export const UPDATE_PET = gql`
  mutation updatePet($id: ID!, $petEditInput: PetInput) {
    updatePet(id: $id, petEditInput: $petEditInput) {
      name
    }
  }
`;

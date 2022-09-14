import { gql } from '@apollo/client';

export const GET_PET_BY_ID = gql`
  query getPetById($id: ID!) {
    getPetById(id: $id) {
      name
      age
      breedString
      sex
      preferredTimeOfService
      harnessLocation
      dropOffLocation
      freeRoaming
      isSprayed
      medications
      allergies
      temperament
      goodWithStrangers
    }
  }
`;

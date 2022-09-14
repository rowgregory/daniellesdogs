import { gql } from '@apollo/client';

export const GET_NEW_CLIENT_FORM_BY_ID = gql`
  query getNewClientFormById($id: ID!) {
    getNewClientFormById(id: $id) {
      id
      openYard
      user {
        id
        firstName
        lastName
        emailAddress
        phoneNumber
      }
      pets {
        id
        name
        age
        breedString
        sex
        preferredTimeOfService
        harnessLocation
        dropOffLocation
        freeRoaming
        isSprayed
        allergies
        medications
        goodWithStrangers
        temperament
      }
      vet {
        id
        name
        phoneNumber
        address
      }
      address {
        id
        addressLine1
        city
        state
        zipPostalCode
      }
    }
  }
`;

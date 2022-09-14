import { gql } from '@apollo/client';

export const GET_NEW_CLIENT_FORMS = gql`
  query getNewClientForms {
    getNewClientForms {
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
        breedString
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

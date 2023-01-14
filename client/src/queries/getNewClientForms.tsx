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

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($emailAddress: String!) {
    getUserByEmail(emailAddress: $emailAddress)
  }
`;

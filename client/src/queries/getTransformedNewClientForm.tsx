import { gql } from '@apollo/client';

export const GET_TRANSFORMED_NEW_CLIENT_FORM = gql`
  query getTransformedNewClientForm {
    getTransformedNewClientForm {
      firstName
      lastName
      emailAddress
      phoneNumber
      pets
    }
  }
`;

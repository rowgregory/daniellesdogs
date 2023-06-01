import { gql } from '@apollo/client';

export const GET_CONTACT_FORM_BY_ID = gql`
  query GetContactFormById($id: ID!) {
    contactFormById(id: $id) {
      firstName
      lastName
      emailAddress
      subject
      message
      createdAt
    }
  }
`;

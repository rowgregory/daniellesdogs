import { gql } from '@apollo/client';

export const GET_CONTACT_FORMS = gql`
  query contactFormList {
    contactFormList {
      id
      firstName
      lastName
      emailAddress
      subject
      message
    }
  }
`;

import { gql } from '@apollo/client';

export const CREATE_CONTACT_FORM = gql`
  mutation createContactForm($contactFormInput: ContactFormInput) {
    createContactForm(contactFormInput: $contactFormInput) {
      id
      firstName
    }
  }
`;

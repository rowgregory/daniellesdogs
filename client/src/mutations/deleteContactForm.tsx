import { gql } from '@apollo/client';

export const DELETE_CONTACT_FORM = gql`
  mutation deleteContactForm($id: ID!) {
    deleteContactForm(id: $id) {
      id
    }
  }
`;

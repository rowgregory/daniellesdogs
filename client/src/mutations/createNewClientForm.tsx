import { gql } from '@apollo/client';

export const CREATE_NEW_CLIENT_FORM = gql`
  mutation Mutation($newClientFormInput: NewClientFormInput) {
    createNewClientForm(newClientFormInput: $newClientFormInput) {
      id
    }
  }
`;

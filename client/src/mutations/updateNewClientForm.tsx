import { gql } from '@apollo/client';

export const UPDATE_NEW_CLIENT_FORM = gql`
  mutation updateNewClientForm(
    $id: ID!
    $userId: ID!
    $addressId: ID!
    $vetId: ID!
    $newClientFormEditInput: NewClientFormEditInput
  ) {
    updateNewClientForm(
      id: $id
      userId: $userId
      addressId: $addressId
      vetId: $vetId
      newClientFormEditInput: $newClientFormEditInput
    ) {
      id
    }
  }
`;

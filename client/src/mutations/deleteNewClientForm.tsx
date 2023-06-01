import { gql } from '@apollo/client';

export const DELETE_NEW_CLIENT_FORM = gql`
  mutation deleteNewClientForm(
    $id: ID
    $userId: ID
    $petsId: [ID]
    $vetId: ID
    $addressId: ID
  ) {
    deleteNewClientForm(
      id: $id
      userId: $userId
      petsId: $petsId
      vetId: $vetId
      addressId: $addressId
    ) {
      id
    }
  }
`;

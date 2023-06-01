import { gql } from '@apollo/client';

export const LOGOUT_USER = gql`
  mutation logoutUser($id: ID!) {
    logoutUser(id: $id) {
      id
    }
  }
`;

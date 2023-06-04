import { gql } from '@apollo/client';

export const DELETE_WAIVER = gql`
  mutation deleteWaiver($id: ID!) {
    deleteWaiver(id: $id) {
      id
    }
  }
`;

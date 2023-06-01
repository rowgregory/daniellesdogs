import { gql } from '@apollo/client';

export const DELETE_SERVICE = gql`
  mutation deleteService($id: ID!) {
    deleteService(id: $id) {
      id
    }
  }
`;

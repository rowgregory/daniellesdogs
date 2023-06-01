import { gql } from '@apollo/client';

export const GET_SERVICE_BY_ID = gql`
  query serviceById($id: ID!) {
    serviceById(id: $id) {
      id
      title
      displayUrl
      description
      price
    }
  }
`;

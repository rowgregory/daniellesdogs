import { gql } from '@apollo/client';

export const GET_SERVICES = gql`
  query serviceList {
    serviceList {
      id
      title
      price
      description
      displayUrl
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_WAIVER = gql`
  query getWaiver {
    getWaiver {
      id
      displayUrl
    }
  }
`;

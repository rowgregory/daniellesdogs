import { gql } from '@apollo/client';

export const CREATE_WAIVER = gql`
  mutation createWaiver($displayUrl: String) {
    createWaiver(displayUrl: $displayUrl) {
      displayUrl
    }
  }
`;

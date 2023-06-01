import { gql } from '@apollo/client';

export const GET_BIOS = gql`
  query bioList {
    bioList {
      id
      firstName
      lastName
      emailAddress
      title
      description
      displayUrl
    }
  }
`;

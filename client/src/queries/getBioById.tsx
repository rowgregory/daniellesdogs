import { gql } from '@apollo/client';

export const GET_BIO_BY_ID = gql`
  query bioById($id: ID!) {
    bioById(id: $id) {
      id
      firstName
      lastName
      emailAddress
      title
      description
      image
      publicId
    }
  }
`;

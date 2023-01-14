import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      emailAddress
      token
      tokenExpiration
      firstName
      userType
    }
  }
`;

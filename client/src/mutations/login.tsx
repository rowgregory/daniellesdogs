import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation loginClient($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      id
      emailAddress
      token
      tokenExpiration
      firstName
      userType
      lastLoginTime
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_REFRESH_TOKEN = gql`
  mutation getRefreshToken($userType: String, $firstName: String) {
    getRefreshToken(userType: $userType, firstName: $firstName) {
      refreshToken
    }
  }
`;

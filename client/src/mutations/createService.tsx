import { gql } from '@apollo/client';

export const CREATE_SERVICE = gql`
  mutation createService($serviceInput: ServiceInput) {
    createService(serviceInput: $serviceInput) {
      id
    }
  }
`;

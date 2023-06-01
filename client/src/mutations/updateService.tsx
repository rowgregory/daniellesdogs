import { gql } from '@apollo/client';

export const UPDATE_SERVICE = gql`
  mutation updateService($id: ID!, $serviceInput: ServiceInput) {
    updateService(id: $id, serviceInput: $serviceInput) {
      id
    }
  }
`;

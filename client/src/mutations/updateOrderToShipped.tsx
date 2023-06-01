import { gql } from '@apollo/client';

export const UPDATE_ORDER_TO_SHIPPED = gql`
  mutation updateOrderToShipped($id: ID!) {
    updateOrderToShipped(id: $id) {
      success
      message
    }
  }
`;

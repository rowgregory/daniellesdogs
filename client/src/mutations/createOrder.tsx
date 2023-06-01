import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation createOrder($orderInput: OrderInput!) {
    createOrder(orderInput: $orderInput) {
      id
    }
  }
`;

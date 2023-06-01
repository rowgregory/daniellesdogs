import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query orderList {
    orderList {
      id
      totalPrice
      isShipped
      shippedOn
      paypalOrderId
      name
      emailAddress
      cellPhoneNumber
      createdAt
    }
  }
`;

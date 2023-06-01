import { gql } from '@apollo/client';

export const GET_RECENT_ORDERS = gql`
  query getRecentOrders {
    getRecentOrders {
      displayUrl
      name
      productName
      totalPrice
      id
    }
  }
`;

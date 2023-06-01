import { gql } from '@apollo/client';

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    getOrderById(id: $id) {
      id
      name
      emailAddress
      orderItems {
        name
        qty
        displayUrl
        price
        product {
          name
          displayUrl
          description
          price
          countInStock
          sizes {
            size
            qty
          }
          category
        }
        size
      }
      taxPrice
      shippingPrice
      totalPrice
      paidOn
      paypalOrderId
      shippingAddress {
        addressLine1
        city
        state
        zipPostalCode
      }
      cellPhoneNumber
      isShipped
    }
  }
`;

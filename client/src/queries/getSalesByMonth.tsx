import { gql } from '@apollo/client';

export const GET_SALES_BY_MONTH = gql`
  query GetSalesByMonth {
    getSalesByMonth {
      datasets
    }
  }
`;

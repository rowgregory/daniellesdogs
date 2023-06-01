import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, Text } from '../elements';

export const Container = styled.div`
  padding: 80px 16px 16px;
  width: 100%;
`;

export const Wrapper = styled.div`
  padding-top: 60px;
  min-height: calc(100vh - 96px);
  background: linear-gradient(
    to right,
    #fafafa 0%,
    #fafafa 50%,
    #fff 50%,
    #fff 100%
  );
  width: 100%;
`;

export const InnerWrapper = styled.div`
  margin-inline: auto;
  max-width: 1000px;
  width: 100%;
`;

export const TitleText = styled(Text)`
  font-size: 32px;
  font-weight: 600;
  position: absolute;
  margin: -52px 0 0 0;
`;
export const StyledTable = styled(Table)`
  margin-top: 42px;
  width: 100%;
  margin-bottom: 100px;
  thead {
    display: block;
    tr {
      td {
        color: #9ba1ac;
        font-size: 12px;
        font-weight: 600;
        height: 80px;
      }
    }
  }
  tbody {
    display: block;
    height: 500px;
    overflow-y: auto;

    &.height {
      height: 350px;
    }

    tr {
      height: 120px;
      td {
        :nth-last-child(-n + 5) {
          border-top: 1px solid #f4f4f4;
        }
      }
    }
  }
`;

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-top: 70px solid ${({ theme }) => theme.colors.primary};
  border-left: 70px solid transparent;
  position: absolute;
  top: 27px;
`;

export const Line = styled.div`
  width: 42%;
  height: 5px;
  background: ${({ theme }) => theme.colors.primary};
  margin-top: -59px;
`;

export const BurgerWrapper = styled.div`
  position: fixed;
  top: 37px;
  right: 99px;
  z-index: 300;
`;
export const CartWrapper = styled.div`
  position: fixed;
  top: 42px;
  right: 169px;
`;

export const CheckoutBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 112px;
  width: 100%;
  z-index: 200;
  background: #373d4a;
  box-shadow: 0px 25px 17px 38px rgba(0, 0, 0, 0.3);
`;

export const DiagonalLines = styled.div`
  position: relative;
  border-top: 2px solid #526283;
  border-right: none;
  border-bottom: none;
  border-left: none;

  &.line1 {
    left: 386px;
    top: 0px;
    width: 250px;
    border-top: 2px solid #a6b2cb;
    transform: rotate(-45deg);
  }
  &.line2 {
    left: 400px;
    top: 49px;
    width: 180px;
    border-top: 2px solid #a6b2cb;
    transform: rotate(-45deg);
  }

  &.line3 {
    left: 48px;
    top: 48px;
    width: 300px;
    border-top: 2px solid #a6b2cb;
    transform: rotate(-45deg);
  }
`;

export const CheckoutBarInnerWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin-inline: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const SubtotalContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 38px;
  margin-top: 6px;
`;

export const SubtotalText = styled(Text)`
  margin-bottom: 6px;
  color: #fff;
  span {
    font-size: 24px;
    font-weight: 600;
  }
`;

export const CheckoutBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  width: fit-content;
  padding: 10px 20px;
  font-weight: 600;
  transition: 300ms;
  :hover {
    filter: brightness(0.9);
  }
`;

export const ShopLink = styled(Link)`
  transition: 300ms;
  color: #fff;
  :hover {
    color: #ccc;
  }
`;

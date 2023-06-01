import styled from 'styled-components';
import { Link } from '../elements';

export const Container = styled.aside`
  min-height: 100vh;
  max-width: 435px;
  width: 100%;
  background: #fff;
  position: fixed;
  z-index: 300;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 300ms;
  transform: translateX(435px);
  padding: 48px;
  &.move-left {
    transform: translateX(0px);
    transition: 300ms;
    transition-easing: linear;
  }
`;

export const QtyBtn = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #121212;
  transition: 300ms;
  cursor: pointer;
  &.plus {
    margin-bottom: 4px;
  }

  :hover {
    filter: brightness(0.9);
  }
`;

export const CheckoutBtn = styled(Link)`
  display: inline-block;
  position: relative;
  overflow: hidden;
  padding: 8px 32px;
  background-color: black;
  color: white;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  transition: all 0.5s;
  border: 2px solid black;
  border-right: 1px solid black;
  font-family: Roboto;
  letter-spacing: 2px;
  width: 100%;
  z-index: 1;
  :before {
    content: '';
    position: absolute;
    left: -100%;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    transition: all 0.5s;
    z-index: -1;
  }

  :hover {
    color: black;
    z-index: 2;
    :before {
      left: 0;
    }
  }
`;

export const ViewCartBtn = styled(Link)`
  display: inline-block;
  position: relative;
  overflow: hidden;
  padding: 8px 26px;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  transition: all 0.5s;
  border: 2px solid black;
  border-left: 1px solid black;
  font-family: Roboto;
  letter-spacing: 2px;
  width: 100%;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    right: -100%;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #000;
    transition: all 0.5s;
    z-index: -1;
  }

  &:hover {
    color: #fff;
    z-index: 2;
    &:before {
      right: 0;
    }
  }
`;

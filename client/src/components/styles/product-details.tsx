import { Button, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 96px 16px;
  max-width: 1000px;
  margin-inline: auto;
  width: 100%;
  min-height: 100vh;
`;

export const ProductDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 18px;
  img {
    margin-bottom: 24px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-content: center;
    gap: 24px;
    img,
    div {
      max-width: 500px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    gap: 48px;
  }
`;

export const ProductPrice = styled.div`
  font-family: 'Roboto';
  font-size: 16px;
`;

export const SelectInputContainer = styled.div`
  position: relative;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  width: 84px;

  select {
    appearance: none;
    background-image: ${({ theme }) =>
      `url("data:image/svg+xml;utf8,<svg fill='${
        theme.mode === 'day' ? 'black' : 'white'
      }' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`} !important;
    background-repeat: no-repeat !important;
    background-position-x: 60px !important;
    background-position-y: 18px !important;
    padding: 24px 32px 16px 16px !important;
  }
`;

export const Quantity = styled.div`
  font-size: 10.4px;
  position: absolute;
  top: 9px;
  left: 16px;
  z-index: 6;
  :hover {
    color: ${({ theme }) => theme.colors.quinary} !important;
  }
`;

export const SelectInput = styled(Form.Control)<{ bg?: any; color?: any }>`
  width: 90px;
  height: 65px !important;
  border: none;
  cursor: pointer;
  background: ${({ bg }) => (bg ? bg : '')};
  border: 1px solid #ededed;
  font-size: 16px;
  :focus-visible {
    outline: none !important;
  }
  :hover {
    color: ${({ theme, color }) =>
      color ? color : theme.colors.quinary} !important;
  }
`;

export const SizeAndQtyContainer = styled.div`
  height: fit-content;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  padding: 18px 14px;
`;

export const AddToCartBtn = styled(Button)`
  width: 100%;
  border-radius: 0.75rem;
  border: none;
  transition: 300ms;
  font-family: 'Libre Franklin', sans-serif;

  font-size: 0.9rem;
  outline: none;
  :hover {
    color: ${({ theme }) => theme.text};
    background: #f3ce13 !important;
    outline: none;
  }
  :focus,
  :active {
    outline: none;
    box-shadow: none;
    border: none;
  }
  :disabled {
    color: ${({ theme }) => theme.black};
  }
`;

export const CollapseOnMobile = styled(Col)`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: block;
  }
`;

export const HorizontalLine = styled.div<{
  margin?: string;
  width?: string;
  padding?: string;
}>`
  width: ${({ width }) => width ?? '100%'};
  padding: ${({ padding }) => padding ?? ''};
  margin: ${({ margin }) => (margin ? margin : '1.875rem 0')};
`;

export const DetailsBtn = styled.div`
  font-size: 0.9375rem;
  font-weight: bold;
`;

export const DetailsContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  padding: 2.5rem 1.875rem;
  margin-bottom: 5rem;
`;

export const PlusMinusBtn = styled.div<{ active: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme, active }) => (active ? `2px dashed #fff` : '')};
  i {
    color: ${({ theme }) => theme.text};
  }
`;

export const SizeContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const Size = styled.div<{ active?: boolean }>`
  height: 40px;
  width: 50px;
  border: 1px solid ${({ theme }) => theme.colors.quinary};
  color: ${({ theme, active }) =>
    active ? theme.white : theme.colors.quinary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ theme, active }) => (active ? theme.colors.quinary : '')};
  transition: 300ms;
  :hover {
    color: ${({ theme, active }) => theme.white};
    background: ${({ theme, active }) => (active ? '' : theme.colors.quinary)};
  }
`;

export const Mask = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0/0.5);
  position: fixed;
  z-index: 150;
  top:0;
  right:0;
  bottom:0;
  left:0:
`;

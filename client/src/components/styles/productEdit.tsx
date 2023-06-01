import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const SelectInputContainer = styled.div`
  width: 84px;
  border: 0;
  position: relative;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;

  select {
    appearance: none;
    background: transparent;
    background-image: ${({ theme }) =>
      `url("data:image/svg+xml;utf8,<svg fill='${
        theme.mode === 'day' ? 'black' : 'white'
      }' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`} !important;
    background-repeat: no-repeat !important;
    background-position-x: 83% !important;
    background-position-y: 18px !important;
    padding: 1.5rem 2rem 1rem 1rem !important;
  }
`;

export const Quantity = styled.div`
  font-size: 0.65rem;
  position: absolute;
  top: 9px;
  left: 16px;
  z-index: 6;
`;

export const SelectInput = styled(Form.Control)`
  width: 100%;
  border: none;
  background: none;
  height: 3.75rem !important;
  cursor: pointer;
  margin: 0 auto !important;
  font-size: 1rem;
  color: ${({ theme }) => theme.white};
  :focus-visible {
    outline: none !important;
  }
  border: 1px solid ${({ theme }) => theme.border} !important;
  :hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;

export const SizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

export const Size = styled.div<{ active?: boolean }>`
  margin: 0 1rem 0.5rem 0;
  height: 3.75rem;
  width: 81.77px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme, active }) =>
    !active ? theme.white : theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 300ms;
`;

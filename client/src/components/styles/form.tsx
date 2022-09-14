import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const FormContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 5rem 0;
  max-width: 36rem;
`;

export const FormInput = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.4rem 1.2rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border} !important;
  :active,
  :focus {
    box-shadow: none !important;
    outline: none !important;
    border-color: 0 !important;
  }
`;

export const SearchBar = styled(Form.Group)`
  width: 20rem;
`;

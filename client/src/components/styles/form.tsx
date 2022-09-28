import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 7.5rem 1rem 5rem 1rem;
  max-width: 75rem;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
`;

export const FormInput = styled.input`
  width: 235px;
  padding: 0.4rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.border};
  :active,
  :focus {
    box-shadow: none !important;
    outline: none !important;
    border-color: 0 !important;
  }
`;
export const FormTextArea = styled(Form.Control)`
  width: 235px;
  padding: 0.4rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.border};
  :active,
  :focus {
    box-shadow: none !important;
    outline: none !important;
    border-color: 0 !important;
  }
`;

export const FormSelect = styled.select`
  width: 235px;
  padding: 0.4rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 1rem;
  height: 38.78px;
  :active,
  :focus {
    box-shadow: none !important;
    outline: none !important;
    border-color: 0 !important;
  }
`;

export const FormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
`;
export const FormLabel = styled(Form.Label)`
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'Oxygen', sans-serif;
  margin-top: 1rem;
`;

export const SearchBar = styled(Form.Group)`
  width: 20rem;
`;

import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from '../elements';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 7.5rem 1rem 5rem 1rem;
  max-width: ${({ theme }) => theme.breakpoints[1]};
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 617px);
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
  font-family: Roboto;
  margin-top: 1rem;
  margin-bottom: 0;
`;

export const SearchBar = styled(Form.Group)`
  width: 50em;
`;

export const ErrorText = styled(Text)`
  font-family: 'Oxygen', sans-serif;
  font-size: 0.875rem;
  color: #d42825;
  font-weight: bold;
`;

export const PageTitle = styled(Text)`
  font-family: 'Oxygen', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

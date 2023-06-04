import styled from 'styled-components';
import { Link, Picture, Text } from '../elements';
import { Form } from 'react-bootstrap';

export const TableContainer = styled.div`
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  background: #161b23;

  .delete {
    display: flex;
    justify-content: center;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: calc(100vw - 250px);
  }
`;

export const PageTitle = styled(Text)`
  font-size: 26px;
  color: #d1d1d1;
  font-family: Roboto;
  margin-bottom: 24px;
`;

export const ContentWrapper = styled.div`
  padding: 32px 16px;
  max-width: 1200px;
  width: 100%;
  &.create,
  &.edit {
    margin-inline: auto;
    max-width: 650px;
  }

  table {
    thead {
      border-bottom: 1px solid #1f252b;
    }
  }
`;

export const Label = styled(Form.Label)`
  color: #d1d1d1;
  text-transform: uppercase;
  font-size: 11px;
  margin-bottom: 0;
`;

export const FilterInput = styled.input`
  max-width: 300px;
  width: 100%;
  background: #0e1117;
  color: #e6edf3;
  border: 1px solid #30363d;
  padding: 8px 12px;
  border-radius: 8px;
  :active,
  :focus,
  :focus-visible {
    box-shadow: none !important;
    outline: none !important;
  }
  :placeholder {
    color: '#e6edf3';
  }
`;

export const Input = styled.input`
  width: 100%;
  background: #0e1117;
  color: #e6edf3;
  border: 1px solid #30363d;
  padding: 8px 12px;
  border-radius: 8px;
  height: 50px;
  :active,
  :focus,
  :focus-visible {
    box-shadow: none !important;
    outline: none !important;
  }
`;
export const TextArea = styled.textarea`
  width: 100%;
  background: #0e1117;
  color: #e6edf3;
  border: 1px solid #30363d;
  padding: 8px 12px;
  border-radius: 8px;
  :active,
  :focus,
  :focus-visible {
    box-shadow: none !important;
    outline: none !important;
  }
`;

export const TableHeader = styled(Text)`
  font-family: Roboto;
  font-size: 14px;
  color: #d1d1d1;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #1f252b;
`;

export const TableData = styled(Text)`
  font-family: Roboto;
  font-size: 14px;
  color: #d1d1d1;
`;

export const SubNav = styled.div`
  padding-block: 16px;
  padding-inline: 24px;
  background: #0e1117;
  height: 57px;
  display: flex;
  align-items: center;

  margin-bottom: 0px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin-bottom: 16px;
  }
`;

export const CreateLink = styled(Link)`
  transition: 300ms;
  padding: 6px 8px;
  color: #d1d1d1;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  border: 2px solid #5a67ff;
  border-radius: 8px;
  :hover {
    background: #5a67ff;
    color: #fff;
  }
`;
export const GoToLink = styled(Link)`
  color: #5a67ff;
  font-family: Roboto;
  font-size: 14px;
  margin-left: 28px;
  transition: 300ms;
  :hover {
    filter: brightness(0.8);
    color: #5a67ff;
  }
`;

export const GoBackLink = styled(Link)`
  transition: 300ms;
  padding: 6px 8px;
  color: #d1d1d1;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  :hover {
    color: #5a67ff;
  }
`;
export const GalleryImageGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: repeat(auto-fit, 235px);
  }
`;

export const ImageCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 300ms;
  border-radius: 0.5rem;
  background: #0e1117;
  :hover {
    box-shadow: 0 4px 5px rgb(0 0 0 / 30%);
  }
  width: 100%;
  padding-top: 1.5px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 235px;
  }
`;

export const GalleryImage = styled(Picture)`
  object-fit: contain;
  background: #0e1117;
  width: 50%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border-radius: 0.5rem 0.5rem 0 0;
    height: 158px;
  }
`;

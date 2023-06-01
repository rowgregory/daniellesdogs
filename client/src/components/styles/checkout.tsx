import { FormControl, FormSelect } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from '../elements';

export const FormInput = styled(FormControl)`
  padding: 12px;
  box-shadow: none;
  outline: none;
  :focus,
  :active {
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const FormSelection = styled(FormSelect)`
  padding: 12px;
  margin-bottom: 14px;
  box-shadow: none;
`;

export const ProceedBtn = styled.button`
  background: #ffd813;
  color: #0f1111;
  font-weight: bold;
  font-family: Arial;
  box-shadow: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  :hover {
    filter: brightness(0.95);
    background: #ffd813;
    color: #0f1111;
  }
  :focus {
    background: #ffd813;
  }
`;

export const ErrorText = styled(Text)`
  color: #ec1616;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Arial';
  margin-bottom: 14px;
`;

export const Container = styled.div`
  width: 100%;
`;

export const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: calc(50% + 88px) 1fr;
  }
`;

export const LeftRail = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  margin-right: 0;
  max-width: 722px;
  justify-self: end;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 56px 66px 21px 84px;
    border-radius: 0.5rem;
  }
`;

export const LeftRailSectionTitle = styled.div`
  font-size: 22px;
  margin-bottom: 24px;
  background: ${({ theme }) => theme.secondaryBg};
  color: ${({ theme }) => theme.text};
`;

export const LeftRailContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  padding: 8px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
  }
`;

export const RightRailContainer = styled.aside`
  width: 100%;
  background: #f5f5f5;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    min-height: 100vh;
  }
`;

export const Accordion = styled.div<{ toggle: boolean; maxheight?: string }>`
  max-height: ${({ toggle, maxheight }) => (toggle ? maxheight : '0px')};
  overflow: hidden;
  transition: max-height 300ms ease-out;
`;

export const AccordionX = styled.div<{
  toggle: boolean;
  maxwidth?: string;
  minwidth?: string;
}>`
  max-width: ${({ toggle, maxwidth }) => (toggle ? maxwidth : '0px')};
  overflow: hidden;
  transition: max-width 300ms ease-out;
  min-width: ${({ minwidth }) => minwidth};
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100px;
  white-space: nowrap;
`;

export const QuestionContainer = styled.div`
  background: #ededed;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

export const QTY = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  background: #7f7f7f;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  left: -29px;
  top: -10px;
  font-family: 'Arial';
`;

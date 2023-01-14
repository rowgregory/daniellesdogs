import styled from 'styled-components';

export const Container = styled.div`
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
  padding-inline: 16px;
`;

export const ShopTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

export const CategoryContainer = styled.div`
  padding-left: 16px;
`;

export const Category = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  :hover {
  }
`;

export const PageContent = styled.div`
  width: 100%;
  margin-inline: auto;
  min-height: 700px;
`;

export const ProductContainer = styled.div<{ islargegrid: boolean }>`
  display: grid;
  grid-gap: 10px;
  transition: 300ms;
  grid-template-columns: ${({ islargegrid }) =>
    islargegrid ? '1fr 1fr 1fr' : '1fr 1fr'};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: ${({ islargegrid }) =>
      islargegrid ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};
  }
`;

export const ClearFilter = styled.div`
  padding: 8px 32px;
  cursor: pointer;
  border: 1px solid transparent;
  :hover {
  }
`;

export const GridIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 24px 0;
  font-weight: 600;
  border-bottom: 1px solid #ededed;
`;

export const FilterColumn = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    min-width: 250px;
    max-width: 250px;
    width: 100%;
    display: block;
    margin-right: 24px;
  }
`;

export const FilterIcon = styled.i`
  display: block;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`;

export const LargeGridSquareContainer = styled.div<{ active: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1px;
  div {
    width: 5px;
    height: 5px;
    background: ${({ active }) => (active ? '#9761aa' : '#ccc')};
  }
`;
export const SmallGridSquareContainer = styled.div<{ active: any }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1px;
  div {
    width: 5px;
    height: 5px;
    background: ${({ active }) => (!active ? '#9761aa' : '#ccc')};
  }
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

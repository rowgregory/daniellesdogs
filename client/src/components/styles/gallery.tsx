import styled from 'styled-components';
import { Picture } from '../elements';

export const GalleryGrid = styled.div`
  display: grid;
  width: 100%;
  gap: 0.5rem;

  grid-template-columns: auto;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: auto auto auto auto;
  }
`;

export const GalleryImage = styled(Picture)`
  aspect-ratio: 1/1;
  object-fit: cover;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: 300ms ease-out;
  max-width: 300px;
`;

export const Toggle = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  margin-inline: auto;
  top: 0px;
  z-index: 300;
  width: fit-content;
  font-family: Roboto;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 10px 16px;
`;

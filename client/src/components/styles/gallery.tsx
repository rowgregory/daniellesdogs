import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Picture } from '../elements';

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 100%;
  gap: 0.5rem;
`;

export const GalleryImage = styled(Picture)`
  aspect-ratio: 1/1;
  object-fit: cover;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: 300ms ease-out;
`;

export const Toggle = styled(Button)`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 1rem;
  z-index: 11;
  width: fit-content;
`;

export const FullScreenImage = styled(Picture)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const CloseBtn = styled.i`
  position: absolute;
  z-index: 12;
  color: #f6f6f6;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-inline: auto;
  right: 0;
  left: 0;
  top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 2000ms;
  :hover {
    transform: rotate(360deg);
  }
`;

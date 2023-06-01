import styled from 'styled-components';
import { Text } from '../elements';

export const BannerLogoText = styled(Text)`
  width: max-content;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 30px;
    left: 0;
    background-color: lightpink;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  :hover {
    &::before {
      visibility: visible;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
`;

export const Skew = styled.div`
  transform-origin: top left;
  transform: skewY(10deg);
  overflow: hidden;
  div {
    transform-origin: top left;
    transform: skewY(-10deg);
    height: 200px;
    background: linear-gradient(
      90deg,
      rgb(15, 15, 15) 0%,
      rgb(35, 35, 35) 100%
    );

    @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      height: 500px;
    }
  }
`;
export const Skew2 = styled.div`
  transform-origin: bottom left;
  transform: skewY(-10deg);
  overflow: hidden;
  div {
    transform-origin: top left;
    transform: skewY(10deg);
    height: 200px;
    background: linear-gradient(
      90deg,
      rgb(15, 15, 15) 0%,
      rgb(35, 35, 35) 100%
    );

    @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      height: 500px;
    }
  }
`;

export const SMContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    border: 2px solid #f3f3f3;
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 3.75rem;
    height: 3.75rem;
    transition: 500ms;
  }

  i {
    transform: scale(1) rotateY(0deg);
    transition: 250ms;
    color: #f3f3f3;
  }

  :hover {
    &::before {
      content: '';
      position: absolute;
      transform: scale(1.4) rotateY(360deg);
      transition: 0.5s;
    }
    i {
      transform: scale(1.4) rotateY(360deg);
      transition: 0.75s;
      &.fa-facebook-f {
        color: #1877f2;
      }
      &.fa-instagram {
        background: linear-gradient(
          45deg,
          #ebcc50 0%,
          #e14d3a 52%,
          #a7308f 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
`;

export const CenterArea = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
`;

export const TextStyled = styled(Text)`
  font-weight: 500;
  margin: 0;
  color: #fff;
`;

export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  transition: 1000ms;
  background: linear-gradient(90deg, rgb(15, 15, 15) 0%, rgb(35, 35, 35) 100%);
  z-index: 100;
  :hover {
    img {
      tranform: scale(1.2);
    }
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const ZoomImg = styled.div<{ text?: string }>`
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 3s ease-out;
  }

  :hover {
    &::before {
      content: '';
      position: absolute;
      transform: translate(-100%, 0);
    }
    img {
      transform: scale(1.3);
    }
  }
  &::before {
    font-family: Cormorant, serif;
    content: '${({ text }) => text}';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    box-sizing: border-box;
    z-index: 30;
    transition: transform 500ms;
    transform: translate(0, 0);
  }
`;

export const IntroSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 12.5rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: row;
  }
`;

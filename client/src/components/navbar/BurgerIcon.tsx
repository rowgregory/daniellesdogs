import { useContext } from 'react';
import styled from 'styled-components';
import { NavbarContext } from '../../context/navbarContext';

const Container = styled.div`
  transition: transform 0.3s, opacity: 0.25s;
  cursor: pointer;
  height: 32pt;
  width: 32pt;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 300ms;
  margin-right: 84px;
  transition-easing: linear; 
  position: fixed; 
  z-index: 500;
`;

export const InnerContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.burger-color {
    span {
      background: #fff;
    }
  }
  span {
    transition: color 0.3s, width 1s, background 0.3s;
    width: 20px;
    height: 3px;
    background: #fff;
    :nth-child(1) {
      margin-bottom: 4px;
    }
    :nth-child(2) {
      margin-bottom: 4px;
    }
    :nth-child(3) {
      margin-bottom: 0px;
    }
  }
`;

const BurgerIcon = () => {
  const { setShowSideBar, showSideBar } = useContext(NavbarContext);

  const scrollY = window.scrollY;

  const animations = {
    changeColor: scrollY === 0 ? 'burger-color' : '',
  };

  return (
    <Container onClick={() => setShowSideBar(!showSideBar)}>
      <InnerContainer className={animations.changeColor}>
        <span></span>
        <span></span>
        <span></span>
      </InnerContainer>
    </Container>
  );
};

export default BurgerIcon;

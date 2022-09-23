import React, { useEffect, useRef, useState } from 'react';
import { Container } from '../components/elements';
import styled from 'styled-components';
import AppLayoutWithSideBar from '../components/layouts/AppLayoutWithSideBar';
import Navigation from '../components/Navigation';
import AnimatedRoutes from './AnimatedRoutes';
import Footer from '../components/Footer';
import AdminSideBar from '../components/admin/AdminSideBar';

const RouteContainer = styled(Container)`
  background: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Burger = styled.div<{ moveLeft?: boolean }>`
  position: fixed;
  z-index: 70;
  top: 25px;
  right: 25px;
  border-radius: 200px;
  transition: transform 0.5s, opacity: 0.25s;
  cursor: pointer;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: ${({ moveLeft }) => (moveLeft ? 'translateX(-35vw)' : '0')};
  :hover {
    div {
      span {
        background: #121212;
        z-index: 1;
      }
    }
  }
  &::before {
    transition: transform 0.5s 0.25s, opacity 0.25s 0.25s;
    background: rgba(0, 0, 0, 0.3);
    border: solid #f3f3f3 2px;
    border-radius: 200px;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &::after {
    opacity: 0;
    transform: scale(0);
    transition: transform 0.25s, opacity 0.25s;
    background: #f3f3f3;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 200px;
    z-index: 0;
  }
  :hover {
    &::before {
      transform: scale(2);
      opacity: 0;
      transition: transform 0.5s, opacity 0.25s;
    }
    &::after {
      opacity: 1;
      transform: scale(1);
      transition: transform 0.5s 0.375s, opacity 0.5s 0.375s;
    }
  }
  span {
    transition: color 0.5s, width 1s;
    width: 40px;
    height: 3px;
    background: #f3f3f3;
    :nth-child(1) {
      margin-bottom: 8px;
    }
    :nth-child(2) {
      margin-bottom: 8px;
    }
    :nth-child(3) {
      margin-bottom: 0px;
    }
  }
`;

export const Routes = () => {
  const pgContent = useRef(null) as any;
  const burgerRef = useRef(null) as any;
  const [showSideBar, setShowSideBar] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    if (pgContent.current && showSideBar) {
      pgContent.current.style.transform = 'translateX(-550px)';
      pgContent.current.style.transition = '0.5s';
      pgContent.current.style.transitionEasing = 'ease-out';
    } else if (pgContent.current && showAdminPanel) {
      pgContent.current.style.transform = `translateX(300px)`;
      pgContent.current.style.transition = 'transform 0.5s, scale 0.5s 0.25s';
      pgContent.current.style.transitionEasing = 'linear';
      pgContent.current.style.transformOrigin = 'bottom left';
    } else {
      pgContent.current.style.transform = 'translateX(0)';
    }
    if (burgerRef.current && showSideBar) {
      burgerRef.current.style.transform = 'translateX(-550px)';
      burgerRef.current.style.transition = '0.5s';
      burgerRef.current.style.transitionEasing = 'linear';
    } else {
      burgerRef.current.style.transform = 'translateX(0)';
    }
  }, [showAdminPanel, showSideBar]);

  return (
    <>
      <AdminSideBar
        setShowAdminPanel={setShowAdminPanel}
        showSideBar={showSideBar}
        showAdminPanel={showAdminPanel}
        setShowSideBar={setShowSideBar}
      />

      <Burger
        ref={burgerRef}
        moveLeft={showSideBar}
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <InnerContainer>
          <span></span>
          <span></span>
          <span></span>
        </InnerContainer>
      </Burger>
      <AppLayoutWithSideBar
        sideBar={
          <Navigation show={showSideBar} setShowSideBar={setShowSideBar} />
        }
      >
        <RouteContainer
          ref={pgContent}
          onClick={() => {
            setShowAdminPanel(false);
            setShowSideBar(false);
          }}
        >
          <AnimatedRoutes />
        </RouteContainer>
      </AppLayoutWithSideBar>
      <Footer />
    </>
  );
};

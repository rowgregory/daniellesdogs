import React, { useRef, useState, useEffect, useContext } from 'react';
import { Container, Link, Text } from '../components/elements';
import styled from 'styled-components';
import AppLayoutWithSideBar from '../components/layouts/AppLayoutWithSideBar';
import Navigation from '../components/Navigation';
import { AuthContext } from '../context/authContext';
import AnimatedRoutes from './AnimatedRoutes';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

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

const AdminBtn = styled.div`
  position: fixed;
  z-index: 70;
  top: 25px;
  left: 25px;
  height: 70px;
  width: 70px;
  border-radius: 50px;
  border: 2px solid #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f3f3f3;
  transition: 300ms;
  cursor: pointer;
  font-family: 'Cormorant, serif';
  background: rgba(0, 0, 0, 0.3);
`;

export const Routes = () => {
  const pgContent = useRef(null) as any;
  const burgerRef = useRef(null) as any;
  const firstLinkRef = useRef(null) as any;
  const secondLinkRef = useRef(null) as any;
  const thirdLinkRef = useRef(null) as any;
  const [showSideBar, setShowSideBar] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
    if (user) {
      if (firstLinkRef.current && showAdminPanel) {
        firstLinkRef.current.style.opacity = '1';
        firstLinkRef.current.style.transition = 'opacity 0.5s 0.15s';
      } else {
        firstLinkRef.current.style.opacity = '0';
      }
      if (secondLinkRef.current && showAdminPanel) {
        secondLinkRef.current.style.opacity = '1';
        secondLinkRef.current.style.transition = 'opacity 0.5s 0.35s';
      } else {
        secondLinkRef.current.style.opacity = '0';
      }
      if (thirdLinkRef.current && showAdminPanel) {
        thirdLinkRef.current.style.opacity = '1';
        thirdLinkRef.current.style.transition = 'opacity 0.5s 0.55s';
      } else {
        thirdLinkRef.current.style.opacity = '0';
      }
    }
  }, [showAdminPanel, showSideBar, user]);

  return (
    <>
      {user?.userType === 'ADMIN' && (
        <>
          <AdminBtn
            onClick={() => {
              setShowAdminPanel(showSideBar ? true : !showAdminPanel);
              setShowSideBar(false);
            }}
          >
            {user?.firstName[0]}
          </AdminBtn>
          <div
            style={{
              position: 'fixed',
              top: '200px',
              left: '25px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              ref={firstLinkRef}
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.userId}/${user?.userType}/dashboard`}
              fontSize={['1.5rem']}
            >
              Dashboard
            </Link>
            <Link
              ref={secondLinkRef}
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.userId}/${user?.userType}/new-client-forms`}
              fontSize={['1.5rem']}
            >
              New Client Forms
            </Link>
            <Link
              ref={thirdLinkRef}
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.userId}/${user?.userType}/users`}
              fontSize={['1.5rem']}
            >
              Users
            </Link>
            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 4rem 0']}
              to={`/${user?.userId}/${user?.userType}/orders`}
              fontSize={['1.5rem']}
            >
              Orders
            </Link>
            <Text
              cursor='pointer'
              color={['#fff']}
              fontSize={['1.5rem']}
              onClick={() => {
                logout(navigate);
                setShowAdminPanel(false);
              }}
            >
              Log Out
            </Text>
          </div>
        </>
      )}
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

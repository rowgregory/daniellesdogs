import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';
import { NavbarContext } from '../context/navbarContext';
import { Text } from './elements';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  a,
  div {
    padding: 20px 0;
    text-decoration: none;
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: 3px;
    transition: 0.3s;
    width: fit-content;
    display: inline-block;
    padding-bottom: 2px;
    background-image: linear-gradient(#fff, #fff);
    background-position: right bottom; /* OR left bottom*/
    background-size: 0% 2px;
    background-repeat: no-repeat;
    transition: background-size 0.3s;
    cursor: pointer;
    :hover {
      background-size: 100% 2px;
    }
  }
`;

const Container = styled.aside`
  position: fixed;
  z-index: 200;
  top: 0;
  right: 0;
  bottom: 0;
  width: 550px;
  background-color: #232323;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
  transform: translateX(550px);
  &.move-left {
    transform: translateX(0px);
    transition: 300ms;
    transition-easing: linear;
  }
`;

export const headerLinkData = (user: any) => {
  return [
    {
      textKey: 'Home',
      linkPath: '/',
    },
    {
      textKey: 'Services',
      linkPath: '/services',
    },
    {
      textKey: 'About',
      linkPath: '/about',
    },
    {
      textKey: 'Gallery',
      linkPath: '/gallery',
    },
    {
      textKey: 'Shop',
      linkPath: '/shop',
    },
    {
      textKey: 'New Client Form',
      linkPath: '/new-client-form',
    },
    {
      textKey: 'Contact',
      linkPath: '/contact',
    },
    {
      textKey: user?.userType === 'ADMIN' ? 'Dashboard' : 'Login',
      linkPath: user?.userType === 'ADMIN' ? '/admin/dashboard' : '/login',
    },
  ];
};

const Navigation = () => {
  const { user } = useContext(AuthContext) as any;
  const { showSideBar, setShowSideBar } = useContext(NavbarContext);

  const animation = showSideBar ? 'move-left' : '';

  return (
    <Container className={animation}>
      <Wrapper>
        {headerLinkData(user).map((link, i) => (
          <Link
            replace
            onClick={() => setShowSideBar(!showSideBar)}
            key={i}
            to={link.linkPath}
          >
            <Text
              fontSize={['1.8rem']}
              color={['#fff']}
              fontWeight={['300']}
              className='d-flex flex-column'
            >
              {link.textKey}
            </Text>
          </Link>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Navigation;

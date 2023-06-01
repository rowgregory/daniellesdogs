import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from '../elements';
import BurgerIcon from './BurgerIcon';
import CartIcon from './CartIcon';
import Logo from './Logo';
import { useContext } from 'react';
import { NavbarContext } from '../../context/navbarContext';

const Container = styled(Flex)<{ block?: any; p?: any }>`
  display: ${({ block }) => (block === 'true' ? 'none' : 'flex')};
  justify-content: space-between;
  height: 56px;
  padding-inline: 12px;
  width: 100%;
  position: fixed;
  z-index: 201;
  &.add-bg {
    background: ${({ theme }) => theme.colors.secondary};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-inline: 84px;
  }
`;

const Navbar = () => {
  const { pathname } = useLocation();
  const { scrollPosition } = useContext(NavbarContext);

  const invalidPaths = ['/admin', '/cart', '/order/receipt', '/checkout'];
  const pagesToBlock = invalidPaths
    .some((path) => pathname.includes(path))
    ?.toString();

  const pagesToMakeNavbarTransparent = ![
    '/',
    '/about',
    '/services',
    '/shop',
  ].includes(pathname);

  const animations =
    scrollPosition !== 0 || pagesToMakeNavbarTransparent || pathname === '/shop'
      ? 'add-bg'
      : '';

  return (
    <Container className={animations} block={pagesToBlock} p={pathname}>
      <Logo />
      <Flex cursor={['pointer']} alignItems={['center']}>
        <CartIcon />
        <BurgerIcon />
      </Flex>
    </Container>
  );
};

export default Navbar;

import { useContext } from 'react';
import styled from 'styled-components';
import { NavbarContext } from '../../context/navbarContext';
import AnimatedRoutes from '../../routes/AnimatedRoutes';
import Navbar from '../navbar/Navbar';
import Navigation from '../Navigation';

const RouteContainer = styled.div`
  background: #fff;
  min-height: 100vh;
`;

const Main = styled.main`
  background: #232323;
`;

const AppLayoutWithSideBar = (): JSX.Element => {
  const { showSideBar, setShowSideBar } = useContext(NavbarContext);

  return (
    <>
      <Navbar />

      <Main>
        <RouteContainer onClick={() => showSideBar && setShowSideBar(false)}>
          <AnimatedRoutes />
        </RouteContainer>
      </Main>
      <Navigation />
    </>
  );
};

export default AppLayoutWithSideBar;

import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface AppLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}

const Container = styled.div`
  /* min-height: 100vh; */
`;

const Main = styled.main`
  background: #232323;
`;

const AppLayoutWithSideBar: FC<AppLayoutWithSideBarProps> = ({
  sideBar,
  children,
}): JSX.Element => {
  return (
    <Container>
      <Main>{children}</Main>
      <aside>{sideBar}</aside>
    </Container>
  );
};

export default AppLayoutWithSideBar;

import React, { ReactNode, FC, useContext } from 'react';
import styled from 'styled-components';
import DashboardModal from '../admin/dashboard/DashboardModal';
import { DashboardContext } from '../../context/dashboardContext';
import { Flex } from '../elements';
interface DashboardLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #1f252b;
`;

const Aside = styled.aside`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: block;
    min-height: 100vh;
    background: #2d363c;
  }
`;

const Menu = styled.div`
  height: 65px;
  width: 65px;
  border-radius: 50%;
  background: #5a67ff;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 300ms;

  :hover {
    rotate: 90deg;
  }

  i {
    color: #fff;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }
`;

export const DashboardLayoutWithSideBar: FC<
  DashboardLayoutWithSideBarProps
> = ({ sideBar, children }) => {
  const context = useContext(DashboardContext);
  return (
    <>
      <DashboardModal />
      <Flex>
        <Aside>{sideBar}</Aside>
        <Main>{children}</Main>
        <Menu onClick={() => context.setShowDashboardModal(true)}>
          <i className='fas fa-plus fa-2x'></i>
        </Menu>
      </Flex>
    </>
  );
};

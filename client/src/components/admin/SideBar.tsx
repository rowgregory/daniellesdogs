import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from '../elements';

const Container = styled.div``;

export const LinkContainer = styled.div<{ active?: string }>``;

export const SideBarLink = styled(Link)<{ active?: string }>`
  letter-spacing: 0.1rem;
  :hover {
    text-decoration: none;
  }
`;

export const sidebarData = (): {
  textKey: string;
  linkKey: string;
}[] => [
  {
    textKey: 'Dashboard',
    linkKey: 'dashboard',
  },
  {
    textKey: 'New Client Forms',
    linkKey: 'new-client-forms',
  },
];

const SideBar = () => {
  const { pathname } = useLocation();
  return (
    <Container className='d-flex flex-column'>
      {sidebarData().map((obj: any, i: number) => (
        <SideBarLink key={i} to={obj?.linkKey}>
          <LinkContainer
            active={(obj?.linkKey === pathname).toString()}
            className='d-flex align-items-center p-4'
          >
            <div>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Container>
  );
};

export default SideBar;

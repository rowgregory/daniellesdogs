import { FC, Fragment, ReactNode } from 'react';
import styled from 'styled-components';

interface DashboardLayoutWithSideBarProps {
  sideBar: ReactNode;
  children: ReactNode;
}
const Main = styled.main`
  width: 100%;
  margin-left: 0;
  /* @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin-left: 280px;
    width: calc(100vw - 335px);
  } */
`;

// const Aside = styled.aside`
//   display: none;
//   position: absolute;
//   @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
//     width: 280px;
//     height: 50px;
//     display: block;
//     position: fixed;
//   }
// `;

export const DashboardLayoutWithSideBar: FC<
  DashboardLayoutWithSideBarProps
> = ({ sideBar, children }) => {
  return (
    <Fragment>
      <div className='d-flex' style={{ padding: '10rem 1rem' }}>
        {/* <Aside>{sideBar}</Aside> */}
        <div className='d-flex flex-column w-100'>
          <Main>{children}</Main>
        </div>
      </div>
    </Fragment>
  );
};

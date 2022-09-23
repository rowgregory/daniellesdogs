import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  margin-left: 0;
`;

export const DashboardLayoutWithSideBar: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className='d-flex'
      style={{ padding: '10rem 1rem', minHeight: '100vh' }}
    >
      <div className='d-flex flex-column w-100'>
        <Main>{children}</Main>
      </div>
    </div>
  );
};

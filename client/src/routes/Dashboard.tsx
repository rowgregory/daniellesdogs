import styled from 'styled-components';
import BottomRow from '../components/admin/dashboard/BottomRow';
// import MiddleRow from '../components/admin/dashboard/MiddleRow';
import RightPanel from '../components/admin/dashboard/RightPanel';
import TopRow from '../components/admin/dashboard/TopRow';
import UserInitial from '../components/admin/dashboard/UserInitial';
import { Flex } from '../components/elements';

const Container = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

const Middle = styled.section`
  color: #fff;
  padding: 12px 12px 32px;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 70px 24px 24px;
  }
`;

const Dashboard = () => {
  return (
    <Container>
      <Middle>
        <Flex
          display={['block', 'block', 'block', 'none']}
          margin={['0 0 24px 0']}
        >
          <UserInitial />
        </Flex>
        <TopRow />
        {/* <MiddleRow /> */}
        <BottomRow />
      </Middle>
      <RightPanel />
    </Container>
  );
};

export default Dashboard;

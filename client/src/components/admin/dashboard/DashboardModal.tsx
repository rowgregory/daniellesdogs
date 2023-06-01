import { useContext } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { DashboardContext } from '../../../context/dashboardContext';
import { Content } from '../../DeleteModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutBtn, StyledLink, sidebarData } from '../AdminSideBar';
import { Flex, Link, Text } from '../../elements';
import { DDLogo } from '../../svg/Logo';
import { AuthContext } from '../../../context/authContext';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../../../mutations/logoutUser';

const DashboardModal = () => {
  const context = useContext(DashboardContext);
  const { logout, user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
    variables: { id: user?.id },
    onCompleted: () => {
      navigate('/logged-out');
    },
  });

  return (
    <Modal
      className='m-0'
      centered
      show={context.showDashboardModal}
      onHide={() => context.setShowDashboardModal(false)}
    >
      <Content>
        <Link
          onClick={() => context.setShowDashboardModal(false)}
          to='/'
          className='d-flex align-items-center justify-content-center w-100'
          margin={['0 0 32px 0']}
          padding={['0 8px']}
        >
          <DDLogo w='35pt' h='35pt' fill='#5a67ff' />
          <Text
            fontFamily='Roboto'
            color={['#fff']}
            margin={['0 0 0 8px']}
            fontWeight={['600']}
            fontSize={['14px']}
          >
            DANIELLE'S DOGS
          </Text>
        </Link>
        <Flex flexDirection={['column']}>
          {sidebarData().map((obj: any, i: number) => (
            <Flex margin={['0 8px 8px 8px']} key={i}>
              <StyledLink
                onClick={() => context.setShowDashboardModal(false)}
                isactive={[obj.linkKey]
                  .some((path) => pathname.includes(path))
                  .toString()}
                fontFamily='Roboto'
                color={['#9ea5ba']}
                to={obj.linkKey}
                fontSize={['14px']}
                width={['100%']}
              >
                {obj.icon}&nbsp;&nbsp;
                {obj.textKey}
              </StyledLink>
            </Flex>
          ))}
        </Flex>
        <LogoutBtn
          onClick={() => {
            logoutUser();
            logout();
            context.setShowDashboardModal(false);
            navigate('/logged-out');
          }}
          cursor='pointer'
          fontFamily='Roboto'
          color={['#9ea5ba']}
          fontSize={['14px']}
          margin={['40px 0 16px 8px']}
          padding={['10px']}
        >
          {loading ? (
            <Spinner
              animation='border'
              size='sm'
              style={{ color: '#5a67ff' }}
            />
          ) : (
            <i className='fas fa-sign-out-alt'></i>
          )}
          &nbsp;&nbsp; Log{loading ? 'ging' : ''} Out
        </LogoutBtn>
      </Content>
    </Modal>
  );
};

export default DashboardModal;

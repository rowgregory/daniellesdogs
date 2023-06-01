import { useContext } from 'react';
import { Link, Text } from '../elements';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { DDLogo } from '../../components/svg/Logo';
import styled from 'styled-components';

export const sidebarData = () => {
  const prefix = '/admin/';
  return [
    {
      textKey: 'Dashboard',
      linkKey: `${prefix}dashboard`,
      icon: <i className='fas fa-home'></i>,
    },
    {
      textKey: 'New Client Forms',
      linkKey: `${prefix}new-client-forms`,
      icon: <i className='fas fa-book'></i>,
    },
    {
      textKey: 'Orders',
      linkKey: `${prefix}orders`,
      icon: <i className='fas fa-box'></i>,
    },
    {
      textKey: 'Contact Forms',
      linkKey: `${prefix}contact-forms`,
      icon: <i className='fas fa-id-card'></i>,
    },
    {
      textKey: 'Gallery Images',
      linkKey: `${prefix}gallery-images`,
      icon: <i className='fas fa-images'></i>,
    },
    {
      textKey: 'Products',
      linkKey: `${prefix}products`,
      icon: <i className='fas fa-store'></i>,
    },
    {
      textKey: 'Bios',
      linkKey: `${prefix}bios`,
      icon: <i className='fas fa-newspaper'></i>,
    },
    {
      textKey: 'Services',
      linkKey: `${prefix}services`,
      icon: <i className='fas fa-bell-concierge'></i>,
    },
  ];
};

export const StyledLink = styled(Link)<{ isactive?: string }>`
  padding: 10px;
  transition: 300ms;
  border-radius: 8px;
  background: ${({ isactive }) => (isactive === 'true' ? '#5a67ff' : '')};
  color: ${({ isactive }) => (isactive === 'true' ? '#fff' : '')};

  :hover {
    background: #5a67ff;
    color: #fff;
  }
`;

export const LogoutBtn = styled(Text)`
  transition: 300ms;
  :hover {
    color: #5a67ff;
  }
`;

const AdminSideBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      style={{
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        transition: '300ms',
      }}
    >
      <Link
        to='/'
        className='d-flex align-items-center w-100'
        margin={['0 0 16px 0']}
        padding={['0 8px']}
        style={{
          background: pathname !== '/admin/dashboard' ? '#0e1117' : '',
          height: '57px',
        }}
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
      {sidebarData().map((obj: any, i: number) => (
        <StyledLink
          isactive={[obj.linkKey]
            .some((path) => pathname.includes(path))
            .toString()}
          key={i}
          fontFamily='Roboto'
          color={['#9ea5ba']}
          margin={['0 8px 16px 8px']}
          to={obj.linkKey}
          fontSize={['14px']}
          width={['232px']}
        >
          {obj.icon}&nbsp;&nbsp;
          {obj.textKey}
        </StyledLink>
      ))}
      <LogoutBtn
        onClick={() => {
          logout();
          navigate('/logged-out');
        }}
        cursor='pointer'
        fontFamily='Roboto'
        color={['#9ea5ba']}
        fontSize={['14px']}
        margin={['40px 0 16px 8px']}
        padding={['10px']}
      >
        <i className='fas fa-sign-out-alt'></i>&nbsp;&nbsp; Log Out
      </LogoutBtn>
    </div>
  );
};

export default AdminSideBar;

import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { Container, Link, Wrapper } from '../elements';
import { Text } from '../../components/elements';
import { useNavigate } from 'react-router-dom';

const Logo = styled(Link)`
  :hover {
    color: ${({ theme }) => theme.logo.hover.color};
  }
`;

const Header = () => {
  const { user, logout } = useContext(AuthContext) as any;
  const navigate = useNavigate();

  return (
    <Container
      backgroundColor={['transparent']}
      style={{ width: '100%', position: 'fixed' }}
    >
      <Wrapper
        maxWidth={['100%', '100%', '88rem']}
        width={['100%']}
        className='mx-auto p-3'
        justifyContent={['space-between']}
        display={['flex']}
        alignItems={['center']}
      >
        <Logo
          to='/'
          textDecoration={['none']}
          fontFamily={`Italianno, cursive`}
          fontSize={[
            '1.45rem',
            '1.65rem',
            '1.75rem',
            '2rem',
            '2.25rem',
            '4rem',
          ]}
          color={[
            '#bf0dbf',
            '#c43fc4',
            '#b558b5',
            '#c193c1',
            '#d1acd1',
            '#ead6ea',
          ]}
        >
          Danielle's Dogs
        </Logo>
        <div className='d-flex'>
          <Link color={['#fff']} to='/contact' margin={['0 1rem 0 0']}>
            Contact
          </Link>
          <Link color={['#fff']} to='/about' margin={['0 1rem 0 0']}>
            About
          </Link>
          <Link color={['#fff']} to='/gallery' margin={['0 1rem 0 0']}>
            Gallery
          </Link>
          <Link color={['#fff']} to='/shop' margin={['0 1rem 0 0']}>
            Shop
          </Link>
          <Link color={['#fff']} to='/new-client-form' margin={['0 1rem 0 0']}>
            New Client Form
          </Link>
          {user?.userType === 'ADMIN' && (
            <Link
              color={['#fff']}
              to={`${user?.userId}/${user?.userType}/dashboard`}
              margin={['0 1rem 0 0']}
            >
              Dashboard
            </Link>
          )}
          {user?.firstName ? (
            <Text color={['#fff']} margin={['0 1rem 0 0']}>
              {user?.firstName}
            </Text>
          ) : (
            <Link color={['#fff']} to='/login' margin={['0 1rem 0 0']}>
              Login
            </Link>
          )}
          {user?.firstName && (
            <Text
              cursor='pointer'
              color={['#fff']}
              onClick={() => logout(navigate)}
            >
              Log Out
            </Text>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export default Header;

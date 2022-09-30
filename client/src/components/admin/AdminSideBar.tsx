import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { Link, Text } from '../elements';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const AdminBtn = styled.div`
  position: fixed;
  z-index: 70;
  top: 25px;
  left: 25px;
  height: 70px;
  width: 70px;
  border-radius: 50px;
  border: 2px solid #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f3f3f3;
  transition: 300ms;
  cursor: pointer;
  font-family: 'Cormorant, serif';
  background: rgba(0, 0, 0, 0.3);
`;

interface AdminSideBarProps {
  setShowAdminPanel: any;
  showSideBar: any;
  showAdminPanel: any;
  setShowSideBar: any;
}

const AdminSideBar: FC<AdminSideBarProps> = ({
  setShowAdminPanel,
  showSideBar,
  showAdminPanel,
  setShowSideBar,
}) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {user?.userType === 'ADMIN' && (
        <>
          <AdminBtn
            onClick={() => {
              setShowAdminPanel(showSideBar ? true : !showAdminPanel);
              setShowSideBar(false);
            }}
          >
            {user?.firstName[0]}
          </AdminBtn>
          <div
            style={{
              position: 'fixed',
              top: '200px',
              left: '25px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.id}/${user?.userType}/dashboard`}
              fontSize={['1.5rem']}
            >
              Dashboard
            </Link>

            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.id}/${user?.userType}/new-client-forms`}
              fontSize={['1.5rem']}
            >
              New Client Forms
            </Link>
            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.id}/${user?.userType}/orders`}
              fontSize={['1.5rem']}
            >
              Orders
            </Link>
            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.id}/${user?.userType}/contact-forms`}
              fontSize={['1.5rem']}
            >
              Contact Forms
            </Link>
            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.id}/${user?.userType}/gallery-images`}
              fontSize={['1.5rem']}
            >
              Gallery Images
            </Link>

            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 1.5rem 0']}
              to={`/${user?.id}/${user?.userType}/products`}
              fontSize={['1.5rem']}
            >
              Products
            </Link>

            <Link
              onClick={() => setShowAdminPanel(false)}
              color={['#fff']}
              margin={['0 0 4rem 0']}
              to={`/${user?.id}/${user?.userType}/bios`}
              fontSize={['1.5rem']}
            >
              Bios
            </Link>
            <Text
              cursor='pointer'
              color={['#fff']}
              fontSize={['1.5rem']}
              onClick={() => {
                logout(navigate);
                setShowAdminPanel(false);
              }}
            >
              Log Out
            </Text>
          </div>
        </>
      )}
    </>
  );
};

export default AdminSideBar;

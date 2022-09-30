import React, { useContext } from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NewClientForm from './NewClientForm';
import Waiver from './Waiver';
import Dashboard from './Dashboard';
import NewClientForms from './NewClientForms';
import { DashboardLayoutWithSideBar } from '../components/layouts/DashboardLayoutWithSideBar';
import NewClientFormEdit from './NewClientFormEdit';
import LoggedOut from './LoggedOut';
import Gallery from './Gallery';
import Shop from './Shop';
import Contact from './Contact';
import About from './About';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NewClientFormAddress from './NewClientFormAddress';
import NewClientFormVet from './NewClientFormVet';
import NewClientFormPets from './NewClientFormPets';
import Complete from './Complete';
import GalleryImageList from './GalleryImageList';
import Products from './Products';
import Orders from './Orders';
import Services from './Services';
import { AuthContext } from '../context/authContext';
import ContactThankYou from './ContactThankYou';
import BioList from './BioList';
import BioCreate from './BioCreate';
import BioEdit from './BioEdit';
import ContactFormList from './ContactFormList';

const PrivateRoutes = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  return user?.userType === 'ADMIN' ? children : <Navigate to='/' />;
};

const RedirectLogin = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  return user?.userType === 'ADMIN' ? (
    <Navigate to={`/${user?.id}/${user?.userType}/dashboard`} />
  ) : (
    children
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route
          path='login'
          element={
            <RedirectLogin>
              <Login />
            </RedirectLogin>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route
          path='/:user_id/:user_type/*'
          element={
            <DashboardLayoutWithSideBar>
              <PrivateRoutes>
                <Routes>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='gallery-images' element={<GalleryImageList />} />
                  <Route path='products' element={<Products />} />
                  <Route path='orders' element={<Orders />} />
                  <Route path='bios' element={<BioList />} />
                  <Route path='bios/create' element={<BioCreate />} />
                  <Route path='bios/:id/edit' element={<BioEdit />} />
                  <Route path='contact-forms' element={<ContactFormList />} />
                  <Route
                    path='new-client-forms/*'
                    element={
                      <Routes>
                        <Route index={true} element={<NewClientForms />} />
                        <Route path=':formId' element={<NewClientFormEdit />} />
                      </Routes>
                    }
                  ></Route>
                </Routes>
              </PrivateRoutes>
            </DashboardLayoutWithSideBar>
          }
        />
        <Route
          path='/new-client-form/*'
          element={
            <Routes>
              <Route index={true} element={<NewClientForm />} />
              <Route path='address' element={<NewClientFormAddress />} />
              <Route path='vet' element={<NewClientFormVet />} />
              <Route path='pets' element={<NewClientFormPets />} />
              <Route path='waiver' element={<Waiver />} />
              <Route path='complete' element={<Complete />} />
            </Routes>
          }
        />
        <Route path='/logged-out' element={<LoggedOut />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/contact/thank-you' element={<ContactThankYou />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};

export default AnimatedRoutes;

import React from 'react';
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
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NewClientFormAddress from './NewClientFormAddress';
import NewClientFormVet from './NewClientFormVet';
import NewClientFormPets from './NewClientFormPets';
import Complete from './Complete';
import GalleryImages from './GalleryImages';
import Clients from './Clients';
import Orders from './Orders';
import Services from './Services';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/:user_id/:user_type/*'
          element={
            <DashboardLayoutWithSideBar>
              <Routes>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='gallery-images' element={<GalleryImages />} />
                <Route path='clients' element={<Clients />} />
                <Route path='orders' element={<Orders />} />
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
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

import React from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NewClientForm from './NewClientForm';
import Waiver from './Waiver';
import Dashboard from './Dashboard';
import NewClientForms from './NewClientForms';
import { DashboardLayoutWithSideBar } from '../components/layouts/DashboardLayoutWithSideBar';
import SideBar from '../components/admin/SideBar';
import NewClientFormEdit from './NewClientFormEdit';
import LoggedOut from './LoggedOut';
import Gallery from './Gallery';
import Shop from './Shop';
import Contact from './Contact';
import About from './About';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
            <DashboardLayoutWithSideBar sideBar={<SideBar />}>
              <Routes>
                <Route path='dashboard' element={<Dashboard />} />
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
        <Route path='/waiver' element={<Waiver />} />
        <Route path='/new-client-form' element={<NewClientForm />} />
        <Route path='/logged-out' element={<LoggedOut />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

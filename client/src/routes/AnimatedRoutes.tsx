import { useContext } from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NewClientForm from './NewClientForm';
import Dashboard from './Dashboard';
import NewClientForms from './NewClientFormList';
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
import Services from './Services';
import { AuthContext } from '../context/authContext';
import ContactThankYou from './ContactThankYou';
import BioList from './BioList';
import BioCreate from './BioCreate';
import BioEdit from './BioEdit';
import ContactFormList from './ContactFormList';
import ProductList from './ProductList';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import Secure from './Secure';
import Footer from '../components/Footer';
import ProductDetails from './ProductDetails';
import Confirmation from './Confirmation';
import AdminSideBar from '../components/admin/AdminSideBar';
import Cart from './Cart';
import CheckoutPayPal from './CheckoutPayPal';
import OrderReceipt from './OrderReceipt';
import OrderList from './OrderList';
import ContactFormView from './ContactFormView';
import ServiceList from './ServiceList';
import ServiceCreate from './ServiceCreate';
import ServiceEdit from './ServiceEdit';

const PrivateRoutes = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  return user?.userType === 'ADMIN' ? children : <Navigate to='/' />;
};

const RedirectLogin = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  return user?.userType === 'ADMIN' ? (
    <Navigate to={`/admin/dashboard`} />
  ) : (
    children
  );
};

const RedirectSecure = ({ children }: any) => {
  const { state } = useLocation() as any;
  const secretToken = process.env.REACT_APP_REGISTER_KEY;
  return state?.secureToken === secretToken ? (
    <Navigate to='/register' replace state={state?.secureToken} />
  ) : (
    children
  );
};

const RedirectRegister = ({ children }: any) => {
  const { state } = useLocation() as any;
  const secretToken = process.env.REACT_APP_REGISTER_KEY;
  return state?.secure_password !== secretToken ? (
    <Navigate to='/secure' />
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
        <Route
          path='/secure'
          element={
            <RedirectSecure>
              <Secure />
            </RedirectSecure>
          }
        />
        <Route
          path='/register'
          element={
            <RedirectRegister>
              <Register />
            </RedirectRegister>
          }
        />
        <Route
          path='/admin/*'
          element={
            <DashboardLayoutWithSideBar sideBar={<AdminSideBar />}>
              <PrivateRoutes>
                <Routes>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='services' element={<ServiceList />} />
                  <Route path='services/create' element={<ServiceCreate />} />
                  <Route path='services/:id/edit' element={<ServiceEdit />} />
                  <Route path='gallery-images' element={<GalleryImageList />} />
                  <Route path='products' element={<ProductList />} />
                  <Route path='products/create' element={<ProductCreate />} />
                  <Route path='products/:id/edit' element={<ProductEdit />} />
                  <Route path='orders' element={<OrderList />} />
                  <Route path='bios' element={<BioList />} />
                  <Route path='bios/create' element={<BioCreate />} />
                  <Route path='bios/:id/edit' element={<BioEdit />} />
                  <Route path='contact-forms' element={<ContactFormList />} />
                  <Route
                    path='contact-forms/:id/view'
                    element={<ContactFormView />}
                  />
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
              <Route path='complete' element={<Complete />} />
            </Routes>
          }
        />
        <Route path='/logged-out' element={<LoggedOut />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route
          path='/shop/*'
          element={
            <Routes>
              <Route index={true} element={<Shop />} />
              <Route path=':id' element={<ProductDetails />} />
            </Routes>
          }
        />
        <Route path='/contact' element={<Contact />} />
        <Route path='/contact/thank-you' element={<ContactThankYou />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/checkout/:id?' element={<CheckoutPayPal />} />
        <Route path='/confirmation' element={<Confirmation />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order/receipt/:id' element={<OrderReceipt />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AnimatedRoutes;

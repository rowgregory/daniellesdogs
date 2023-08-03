import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { ThemeProvider } from 'styled-components';
import { themes } from './utils/theme';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  concat,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './context/authContext';
import { authToken } from './utils/authToken';
import { GET_REFRESH_TOKEN } from './queries/getRefreshToken';
import jwtDecode from 'jwt-decode';
// import { CartProvider } from './context/cartContext';
import { NavbarProvider } from './context/navbarContext';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { DashboardProvider } from './context/dashboardContext';

const httpLink = createHttpLink({
  uri: '/graphql',
}) as any;

let client: any;

const authLink = setContext(async (req, { headers }) => {
  const opName = req.operationName;

  if (opName === 'getRefreshToken') {
    return {
      headers: { ...headers, authorization: '' },
    };
  }

  let { bearer, getTokenState, setToken } = authToken() as any;
  const shouldRefresh = getTokenState(bearer);

  if (bearer && shouldRefresh.needRefresh) {
    const decoded = jwtDecode(bearer) as any;
    const { data } = await client.mutate({
      variables: {
        userType: decoded.user_type,
        firstName: decoded.first_name,
      },
      mutation: GET_REFRESH_TOKEN,
    });

    if (shouldRefresh.valid === false) {
      bearer = await data.getRefreshToken.refreshToken;
      setToken(bearer);
    }
  }

  const authorizationHeader = bearer ? `Bearer ${bearer}` : '';

  return {
    headers: {
      ...headers,
      authorization: authorizationHeader,
    },
  };
});

client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const App = () => {
  // const PayPalOptions = {
  //   'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
  //   'merchant-id': process.env.REACT_APP_PAYPAL_MERCHANT_ID,
  //   currency: 'USD',
  //   intent: 'capture',
  //   components: 'buttons,funding-eligibility',
  //   'enable-funding': 'venmo',
  // } as any;

  return (
    // <PayPalScriptProvider options={PayPalOptions}>
    <AuthProvider>
      <ApolloProvider client={client}>
        {/* <CartProvider> */}
        <NavbarProvider>
          <DashboardProvider>
            <BrowserRouter>
              <ThemeProvider theme={themes['light']}>
                <Routes />
              </ThemeProvider>
            </BrowserRouter>
          </DashboardProvider>
        </NavbarProvider>
        {/* </CartProvider> */}
      </ApolloProvider>
    </AuthProvider>
    // </PayPalScriptProvider>
  );
};

export default App;

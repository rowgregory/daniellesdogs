import React, { Suspense, useEffect, useState } from 'react';
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
import { CartProvider } from './context/cartContext';
import { NavbarProvider } from './context/navbarContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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

const link = concat(authLink, httpLink);

client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const App = () => {
  const matchTheme = {
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  };

  const [theme, setTheme] = useState(matchTheme.theme);
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const theme = e.matches ? 'dark' : 'light';
        setTheme(theme);
      });
  }, []);

  const PayPalOptions = {
    'client-id':
      'AQRyRE44rXzYPGCSb_y5WfDv_31HaXOEhM0NTPHYO5Ege8R0MFleh7MGogjOQDo4ZJ5bchCfKRFhWq9f',
    'merchant-id': process.env.REACT_APP_PAYPAL_MERCHANT_ID,
    currency: 'USD',
    intent: 'capture',
    components: 'buttons,funding-eligibility',
    'enable-funding': 'venmo',
  } as any;
  console.log('PAYPAL CLIENT ID: ', process.env.REACT_APP_PAYPAL_CLIENT_ID);
  return (
    <PayPalScriptProvider options={PayPalOptions}>
      <AuthProvider>
        <ApolloProvider client={client}>
          <CartProvider>
            <NavbarProvider>
              <DashboardProvider>
                <BrowserRouter>
                  <ThemeProvider theme={themes['light']}>
                    <Suspense fallback={<></>}>
                      <Routes />
                    </Suspense>
                  </ThemeProvider>
                </BrowserRouter>
              </DashboardProvider>
            </NavbarProvider>
          </CartProvider>
        </ApolloProvider>
      </AuthProvider>
    </PayPalScriptProvider>
  );
};

export default App;

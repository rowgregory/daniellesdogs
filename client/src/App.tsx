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
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './context/authContext';
import { authToken } from './utils/authToken';
import { GET_REFRESH_TOKEN } from './queries/getRefreshToken';
import jwtDecode from 'jwt-decode';

const httpsLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
}) as any;

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);
  return forward(operation).map((data) => {
    console.log(`ending request for ${operation.operationName}`);
    return data;
  });
});

let client: any;

const authLink = setContext(async (req, { headers }) => {
  const opName = req.operationName;
  if (opName !== 'getRefreshToken') {
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
        bearer = await data.getRefreshToken.accessToken;
        setToken(bearer);
      }
    }

    if (bearer) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${bearer}`,
        },
      };
    }
    return {
      headers: { ...headers, authorization: '' },
    };
  }
  return {
    headers: { ...headers, authorization: '' },
  };
});

client = new ApolloClient({
  link: ApolloLink.from([consoleLink, authLink, httpsLink]),
  cache: new InMemoryCache(),
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

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={themes[theme]}>
            <Suspense fallback={<></>}>
              <Routes />
            </Suspense>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;

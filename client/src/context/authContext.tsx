import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { authToken } from '../utils/authToken';

const userDataFromStorage = localStorage.getItem('user-data')
  ? JSON.parse(localStorage.getItem('user-data') || '')
  : null;

const initialState = {
  user: userDataFromStorage,
  isLoggedIn: userDataFromStorage?.isLoggedIn || false,
} as any;

if (localStorage.getItem('token')) {
  const token = authToken();

  const decodedToken: any = jwtDecode(token.bearer);
  console.log('Decoding...', decodedToken);

  if (decodedToken.exp * 1000 < Date.now() + 5000) {
    console.log('REMOVING TOKEN');
    token.removeToken();
  } else {
    initialState.user = {
      id: decodedToken.user_id,
      firstName: decodedToken.first_name,
      lastName: decodedToken.last_name,
      emailAddress: decodedToken.email_address,
      userType: decodedToken.user_type,
    };
  }
}

const AuthContext = createContext({
  user: userDataFromStorage,
  isLoggedIn: false,
  login: (user: any) => user,
  logout: (navigate: any) => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user-data', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      authToken().removeToken();
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return { ...state };
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: any) => {
    authToken().setToken(user.token);
    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };

  const logout = (navigate: any) => {
    navigate('/logged-out');
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, isLoggedIn: state.isLoggedIn, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

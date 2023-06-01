import React, { useReducer, createContext } from 'react';
import { authToken } from '../utils/authToken';

const userDataFromStorage = localStorage.getItem('user-data')
  ? JSON.parse(localStorage.getItem('user-data') || '')
  : null;

const initialState = {
  user: userDataFromStorage,
  isLoggedIn: false,
} as any;

const AuthContext = createContext({
  user: userDataFromStorage,
  isLoggedIn: false,
  login: (user: any) => user,
  logout: () => {},
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

  const logout = () =>
    dispatch({
      type: 'LOGOUT',
    });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        login,
        logout,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

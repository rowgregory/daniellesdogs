import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { authToken } from '../utils/authToken';

const userDataFromStorage = localStorage.getItem('user-data')
  ? JSON.parse(localStorage.getItem('user-data') || '')
  : null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') || '')
  : [];

const initialState = {
  user: userDataFromStorage,
  isLoggedIn: userDataFromStorage?.isLoggedIn || false,
  cart: {
    cartItems: cartItemsFromStorage || [],
    cartItemsAmount: cartItemsFromStorage?.length || 0,
    loadingCartAddItem: false,
  },
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
  cart: {
    addItemToCart: (item: any) => item,
    cartItems: cartItemsFromStorage,
    cartItemsAmount: cartItemsFromStorage?.length,
    loadingCartAddItem: false,
  },
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
    case 'CART_ADD_ITEM_REQUEST':
      return {
        ...state,
        loadingCartAddItem: true,
      };
    case 'CART_ADD_ITEM_SUCCESS':
      const item = action.payload;
      console.log('item: ', item);
      console.log('cart items: ', state?.cartItems);

      const existItem: any = state?.cartItems?.find(
        (x: any) => x.product === item.product && x.size === item.size
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state?.cartItems.map((x: any) =>
            x.product === existItem.product && x.size === existItem.size
              ? item
              : x
          ),
          loadingCartAddItem: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...state?.cartItems, item],
          loadingCartAddItem: false,
        };
      }
    case 'CART_ADD_ITEM_FAIL':
      return {
        ...state,
        loadingCartAddItem: false,
        success: false,
      };
    default:
      return { ...state };
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log('state: ', state);

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

  const addItemToCart = (item: any, qty: any, size: any) => {
    try {
      dispatch({ type: 'CART_ADD_ITEM_REQUEST' });

      dispatch({
        type: 'CART_ADD_ITEM_SUCCESS',
        payload: {
          product: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          countInStock: item.countInStock,
          qty,
          size,
          sizes: item.sizes,
        },
      });

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    } catch (err: any) {
      dispatch({
        type: 'CART_ADD_ITEM_FAIL',
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        login,
        logout,
        cart: {
          addItemToCart,
          cartItems: state.cart.cartItems,
          cartItemsAmount: state.cart.cartItemsAmount,
          loadingCartAddItem: state.cart.loadingCartAddItem,
        },
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

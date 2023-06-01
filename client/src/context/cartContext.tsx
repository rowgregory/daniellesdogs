import { createContext, useReducer } from 'react';
import { cartReducer } from '../reducers/cartReducer';

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') || '')
  : [] || [];

const cartItemsAmount =
  cartItems?.reduce((acc: any, obj: any) => {
    return acc + +obj?.qty;
  }, 0) || 0;

const subtotal =
  cartItems?.reduce((acc: any, obj: any) => {
    return Number(acc + +obj?.qty * +obj?.price);
  }, 0) || 0;

const shippingPrice = 5;

const orderTotal = subtotal + shippingPrice;

interface CartStateProps {
  loadingCartAddItem: boolean;
  cartItems: [];
  cartItemsAmount: number;
  subtotal: number;
  shippingPrice: number;
  taxAmount: number;
  orderTotal: number;
  success: boolean;
}

const initialState: CartStateProps = {
  cart: {
    loadingCartAddItem: false,
    cartItems,
    cartItemsAmount,
    subtotal,
    shippingPrice,
    taxAmount: 0,
    orderTotal,
    success: false,
  },
} as any;

const CartContext = createContext({
  cart: {
    addItemToCart: (item: any) => item,
    cartItems,
    cartItemsAmount,
    loadingCartAddItem: false,
    subtotal,
    deleteItemFromCart: (item: any) => item,
    shippingPrice,
    calculateTaxAmount: (state: any) => state,
    taxAmount: 0,
    orderTotal,
    removeShippingPrice: (willPickUpInPerson: boolean) => willPickUpInPerson,
    success: false,
    closeCartDrawer: () => {},
    deleteOneItem: (e: any, item: any) => {},
    addOneItem: (e: any, item: any) => {},
    clearCart: () => {},
  },
});

const CartProvider = (props: any) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item: any, qty: any, size: any) => {
    const handleAsyncAddItemToCart = async () => {
      dispatch({ type: 'CART_ADD_ITEM_REQUEST' });
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch({
        type: 'CART_ADD_ITEM_SUCCESS',
        payload: {
          product: item?.id,
          name: item?.name,
          displayUrl: item?.displayUrl,
          price: item?.price,
          countInStock: item?.countInStock,
          qty,
          size,
          sizes: item?.sizes,
        },
      });
    };

    handleAsyncAddItemToCart();
  };

  const deleteItemFromCart = (item: any) => {
    try {
      dispatch({ type: 'DELETE_ITEM_FROM_CART', payload: item });
    } catch (err) {}
  };

  const calculateTaxAmount = (state: string) => {
    try {
      dispatch({ type: 'CALCULATE_TAX', payload: state });
    } catch (err) {
      console.log('ERR: ', err);
    }
  };

  const removeShippingPrice = (willPickUpInPerson: boolean) => {
    try {
      dispatch({ type: 'REMOVE_SHIPPING_PRICE', payload: willPickUpInPerson });
    } catch (err: any) {
      console.log({
        function: 'removeShippingPrice',
        state: willPickUpInPerson,
        message: err?.message,
      });
    }
  };

  const closeCartDrawer = () => dispatch({ type: 'CLOSE_CART_DRAWER' });

  const deleteOneItem = (e: any, item: any) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_ONE_ITEM', payload: { item } });
  };

  const addOneItem = (e: any, item: any) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ONE_ITEM', payload: { item } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: {
          addItemToCart,
          cartItems: state?.cart?.cartItems,
          cartItemsAmount: state?.cart?.cartItemsAmount,
          loadingCartAddItem: state?.cart?.loadingCartAddItem,
          subtotal: state?.cart?.subtotal,
          deleteItemFromCart,
          shippingPrice: state?.cart?.shippingPrice,
          calculateTaxAmount,
          taxAmount: state?.cart?.taxAmount,
          orderTotal: state?.cart?.orderTotal,
          removeShippingPrice,
          success: state?.cart?.success,
          closeCartDrawer,
          deleteOneItem,
          addOneItem,
          clearCart,
        },
      }}
      {...props}
    />
  );
};

export { CartContext, CartProvider };

import { STATES } from '../utils/states';

export const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CART_ADD_ITEM_REQUEST':
      return {
        cart: {
          ...state?.cart,
          loadingCartAddItem: true,
        },
      };
    case 'CART_ADD_ITEM_SUCCESS':
      const item = action.payload;

      const existItem: any = state?.cart?.cartItems?.find(
        (x: any) => x?.product === item?.product && x?.size === item?.size
      );

      if (existItem) {
        const updatedCartItems = state?.cart?.cartItems?.map((x: any) =>
          x?.product === existItem?.product && x?.size === existItem?.size
            ? item
            : x
        );

        const cartItemsAmount = updatedCartItems?.reduce(
          (acc: any, obj: any) => {
            return acc + +obj?.qty;
          },
          0
        );
        const subtotal = Number(
          updatedCartItems?.reduce((acc: any, obj: any) => {
            return acc + +obj?.qty * obj?.price;
          }, 0) || 0
        );

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return {
          cart: {
            ...state.cart,
            loadingCartAddItem: false,
            cartItems: updatedCartItems,
            cartItemsAmount,
            subtotal,
            orderTotal: subtotal + state?.cart?.shippingPrice,
            taxAmount: 0,
            shippingPrice: state?.cart?.shippingPrice,
            success: true,
          },
        };
      } else {
        const updatedCartItems = [...state?.cart?.cartItems, item];
        const cartItemsAmount = updatedCartItems?.reduce(
          (acc: any, obj: any) => {
            return acc + +obj.qty;
          },
          0
        );
        const subtotal = Number(
          updatedCartItems?.reduce((acc: any, obj: any) => {
            return acc + +obj?.qty * obj?.price;
          }, 0) || 0
        );

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return {
          cart: {
            ...state.cart,
            loadingCartAddItem: false,
            cartItems: updatedCartItems,
            cartItemsAmount,
            subtotal,
            orderTotal: subtotal + state?.cart?.shippingPrice,
            taxAmount: 0,
            shippingPrice: state?.cart?.shippingPrice,
            success: true,
          },
        };
      }
    case 'DELETE_ITEM_FROM_CART':
      const updatedItems = state.cart.cartItems.filter((item: any) =>
        item.size !== ''
          ? item.size !== action.payload.size &&
            item.product !== action.payload.id
          : item.product !== action.payload.id
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return {
        cart: {
          ...state.cart,
          cartItems: updatedItems,
          cartItemsAmount: updatedItems?.length,
        },
      };
    case 'CALCULATE_TAX':
      let taxRate: number = 0;

      // eslint-disable-next-line array-callback-return
      STATES.some((obj: any) => {
        if (obj.value === action.payload) return (taxRate = obj.taxRate / 100);
      });

      const taxAmount = state?.cart?.subtotal * taxRate;

      const orderTotal =
        state?.cart?.subtotal + state?.cart?.shippingPrice + taxAmount;

      return {
        cart: {
          ...state.cart,
          taxAmount,
          orderTotal,
        },
      };
    case 'REMOVE_SHIPPING_PRICE':
      const shippingPrice = 5;
      const MATaxRate = 0.0625;
      const tax = state?.cart?.subtotal * MATaxRate;

      const totalWithTaxOnly = state?.cart?.subtotal + tax;
      const totalWithShippingPrice = state?.cart?.subtotal + shippingPrice;

      return {
        cart: {
          ...state.cart,
          shippingPrice: action.payload ? 0 : shippingPrice,
          orderTotal: action.payload
            ? totalWithTaxOnly
            : totalWithShippingPrice,
          taxAmount: action.payload ? tax : 0,
        },
      };
    case 'CLOSE_CART_DRAWER':
      return {
        cart: {
          ...state.cart,
          success: false,
        },
      };
    case 'DELETE_ONE_ITEM':
      const productWithSizeQty =
        action.payload.item?.sizes.filter(
          (obj: any) => obj?.size === action?.payload?.item?.size
        )[0]?.qty ?? null;

      let updatedCartItems = [];

      if (productWithSizeQty === null) {
        const qty = state?.cart?.cartItems?.find(
          (item: any) =>
            item.product === action.payload.item.product && item.qty
        ).qty;

        if (qty === 1) {
          updatedCartItems = state?.cart?.cartItems?.filter(
            (item: any) => item.product !== action.payload.item.product
          );
        } else {
          updatedCartItems = state.cart.cartItems.map((item: any) =>
            item.product === action.payload.item.product
              ? {
                  ...item,
                  qty: Number(item.qty) - 1,
                }
              : item
          );
        }
      } else {
        const qty = state.cart.cartItems.find(
          (item: any) =>
            item.product === action.payload.item.product &&
            item.size === action.payload.item.size
        ).qty;

        if (qty === 1) {
          updatedCartItems = state?.cart?.cartItems?.filter(
            (item: any) =>
              item.product !== action.payload.item.product ||
              item.size !== action.payload.item.size
          );
        } else {
          updatedCartItems = state.cart.cartItems.map((item: any) => {
            if (
              item.product === action.payload.item.product &&
              item.size === action.payload.item.size
            ) {
              return {
                ...item,
                qty: Number(item.qty) - 1,
              };
            } else {
              return item;
            }
          });
        }
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      const subTotal =
        updatedCartItems?.reduce((acc: any, obj: any) => {
          return Number(acc + +obj?.qty * +obj?.price);
        }, 0) || 0;

      return {
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
          cartItemsAmount:
            updatedCartItems?.reduce((acc: any, obj: any) => {
              return acc + +obj?.qty;
            }, 0) || 0,
          success: true,
          subtotal: subTotal,
          orderTotal: subTotal + 5,
        },
      };
    case 'ADD_ONE_ITEM':
      const qtyWithSize =
        action?.payload?.item?.sizes.filter(
          (obj: any) => obj?.size === action?.payload?.item?.size
        )[0]?.qty ?? null;

      let cartItemsUpdated = [];

      if (qtyWithSize === null) {
        const qty = state.cart.cartItems.find(
          (item: any) => item.product === action.payload.item.product
        )?.qty;

        if (Number(qty) === Number(action.payload.item.countInStock)) {
          return { cart: { ...state?.cart } };
        }

        cartItemsUpdated = state.cart.cartItems.map((item: any) =>
          item.product === action.payload.item.product
            ? {
                ...item,
                qty: Number(item.qty) + 1,
              }
            : item
        );
      } else {
        const qty = state.cart.cartItems.find(
          (item: any) =>
            item.product === action.payload.item.product &&
            item.size === action.payload.item.size
        ).qty;

        if (qty === qtyWithSize) {
          return { cart: { ...state?.cart } };
        }

        cartItemsUpdated = state.cart.cartItems.map((item: any) => {
          if (
            item.product === action.payload.item.product &&
            item.size === action.payload.item.size
          ) {
            return {
              ...item,
              qty: Number(item.qty) + 1,
            };
          } else {
            return item;
          }
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItemsUpdated));

      const subtotal =
        cartItemsUpdated?.reduce((acc: any, obj: any) => {
          return Number(acc + +obj?.qty * +obj?.price);
        }, 0) || 0;

      return {
        cart: {
          ...state.cart,
          cartItems: cartItemsUpdated,
          cartItemsAmount:
            cartItemsUpdated?.reduce((acc: any, obj: any) => {
              return acc + +obj?.qty;
            }, 0) || 0,
          success: true,
          subtotal,
          orderTotal: subtotal + 5,
        },
      };
    case 'CLEAR_CART':
      return {
        cart: {
          ...state.cart,
          cartItems: [],
          cartItemsAmount: 0,
          subtotal: 0,
          orderTotal: 0,
        },
      };
    default:
      return { ...state, cart: { ...state.cart } };
  }
};

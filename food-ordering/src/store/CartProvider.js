import React, { useReducer } from "react";
import CartContext from "./Cart";
import AppConst from "../components/Constants/constants";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  /*
Consider moving this logic to the backend
The cart change is sent via rest and the final state of the cart
is returned to redux.
Cosider adding a mongo or json db for this

 */
  if (action.type === AppConst.CART_ACTIONS.ADD) {
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = prevState.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === AppConst.CART_ACTIONS.REMOVE) {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = prevState.items[existingCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - existingCartItem.price;

    let updatedItems;
    if (existingCartItem.amount === 1) {
      //    updatedItems = [...prevState.items];
      //    updatedItems.splice(existingCartItemIndex,1)

      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      let updatedItem = {
        ...existingCartItem,
        amount: --existingCartItem.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === AppConst.CART_ACTIONS.CLEAR_CART) {
    return {
      ...defaultCartState,
    };
  }

  return defaultCartState; //return a new state
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: AppConst.CART_ACTIONS.ADD,
      item: item,
    });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({
      type: AppConst.CART_ACTIONS.REMOVE,
      id: id,
    });
  };
  const clearCartHandler = () => {
    dispatchCartAction({
      type: AppConst.CART_ACTIONS.CLEAR_CART,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

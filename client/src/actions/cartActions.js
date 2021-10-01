/*
export const PRODUCT_ADDED_TO_CART = "PRODUCT_ADDED_TO_CART";
export const CHECKOUT = "CHECKOUT";

*/

import * as types from "../constants/ActionTypes";

export const productAddedToCart = (product) => {
  return { type: types.PRODUCT_ADDED_TO_CART, payload: { product: product } };
};

export const checkout = (cart) => {
  return { type: types.CHECKOUT, payload: { cart } };
};

export const fetchCart = (cart) => {
  return { type: types.FETCH_CART, payload: { cart } };
};

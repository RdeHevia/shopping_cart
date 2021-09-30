/*
import * as types from "../constants/ActionTypes";

export const commentsReceived = (newComments) => {
  return { type: types.COMMENTS_RECEIVED, payload: { comments: newComments } };
};

export const commentCreated = (newComment) => {
  return { type: types.COMMENT_CREATED, payload: { newComment } };
};

export const PRODUCTS_RECEIVED = "PRODUCTS_RECEIVED";
export const PRODUCT_CREATED = "PRODUCT_CREATED";
export const PRODUCT_DELETED = "PRODUCT_DELETED";
export const PRODUCT_UPDATED = "PRODUCT_UPDATED";
*/

import * as types from "../constants/ActionTypes";

export const productsReceived = (products) => {
  return { type: types.PRODUCTS_RECEIVED, payload: { products: products } };
};

export const productCreated = (newProduct) => {
  return { type: types.PRODUCT_CREATED, payload: { product: newProduct } };
};

export const productDeleted = (id) => {
  return { type: types.PRODUCT_DELETED, payload: { product: id } };
};

export const productUpdated = (product) => {
  return { type: types.PRODUCT_UPDATED, payload: { product: product } };
};

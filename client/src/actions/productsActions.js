import * as types from "../constants/ActionTypes";

export const productsReceived = (products) => {
  return { type: types.PRODUCTS_RECEIVED, payload: { products: products } };
};

export const productCreated = (newProduct) => {
  return { type: types.PRODUCT_CREATED, payload: { product: newProduct } };
};

export const productDeleted = (id) => {
  return { type: types.PRODUCT_DELETED, payload: { productId: id } };
};

export const productUpdated = (product) => {
  return { type: types.PRODUCT_UPDATED, payload: { product: product } };
};

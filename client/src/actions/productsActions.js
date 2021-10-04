import * as types from "../constants/ActionTypes";
import axios from "axios";
import apiClient from "../lib/ApiClient";
// export const productsReceived2 = (products) => {
//   return { type: types.PRODUCTS_RECEIVED, payload: { products: products } };
// };

export const productsReceived = () => {
  return async (dispatch) => {
    apiClient.fetchProducts((productsFetched) => {
      dispatch({
        type: types.PRODUCTS_RECEIVED,
        payload: { products: productsFetched },
      });
    });
    // try {
    //   const products = (await axios.get("/api/products")).data;
    //   dispatch({
    //     type: types.PRODUCTS_RECEIVED,
    //     payload: { products: products },
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };
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

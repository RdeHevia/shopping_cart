import * as types from "../../constants/ActionTypes.js";

const products = (state = [], action) => {
  switch (action.type) {
    case types.PRODUCTS_RECEIVED: {
      return action.payload.products;
    }

    case types.PRODUCT_CREATED: {
      return [...state, action.payload.product];
    }

    case types.PRODUCT_UPDATED: {
      return state.map((product) => {
        if (action.payload.product._id === product._id) {
          return action.payload.product;
        }

        return product;
      });
    }
    case types.PRODUCT_DELETED: {
    }
    default:
      return state;
  }
};
export default products;

// const updateProduct = (updatedProduct) => {

// const updatedProducts = products.map((product) => {
//   if (product._id === updatedProduct._id) {
//     return updatedProduct;
//   }

//   return product;
// });
//   console.log("end", updatedProducts);
//   setProducts([...updatedProducts]);
// };

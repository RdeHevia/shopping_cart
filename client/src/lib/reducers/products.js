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
      const newState = state.filter((product) => {
        return product._id !== action.payload.productId;
      });
      return newState;
    }

    default:
      return state;
  }
};
export default products;

// export const productDeleted = (id) => {
//   return { type: types.PRODUCT_DELETED, payload: { product: id } };
// };

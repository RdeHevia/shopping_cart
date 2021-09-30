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
      const rest = state.filter((product) => {});
    }
    case types.PRODUCT_DELETED: {
    }
    default:
      return state;
  }
};
export default products;

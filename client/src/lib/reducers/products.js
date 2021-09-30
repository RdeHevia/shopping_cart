import * as types from "../../constants/ActionTypes.js";

const products = (state = [], action) => {
  switch (action.type) {
    case types.PRODUCTS_RECEIVED: {
      return action.payload.products;
    }
    case types.PRODUCT_CREATED: {
    }
    case types.PRODUCT_UPDATED: {
    }
    case types.PRODUCT_DELETED: {
    }
    default:
      return state;
  }
};
export default products;

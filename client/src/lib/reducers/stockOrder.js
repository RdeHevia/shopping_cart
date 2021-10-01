import * as types from "../../constants/ActionTypes.js";

const stockOrder = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CART: {
      const newStockOrder = action.payload.cart.reduce(
        (newStockOrder, item) => {
          return { ...newStockOrder, [item.productId]: item.quantity };
        },
        {}
      );
      console.log(action.payload.cart, newStockOrder);
      return newStockOrder;
    }
    case types.PRODUCT_ADDED_TO_CART: {
      state[action.payload.product.productId] = action.payload.product.quantity;
      return state;
    }

    case types.CHECKOUT: {
      return {};
    }

    default:
      return state;
  }
};

export default stockOrder;

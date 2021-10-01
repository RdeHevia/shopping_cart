import * as types from "../../constants/ActionTypes.js";

const cart = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CART: {
      return action.payload.cart;
    }

    case types.PRODUCT_ADDED_TO_CART: {
      const newCart = [...state];
      let i = 0;
      while (i < newCart.length) {
        if (newCart[i].productId === action.payload.product.productId) {
          newCart[i] = action.payload.product;
          break;
        }
        i++;
      }

      if (i === newCart.length) {
        newCart.push(action.payload.product);
      }
      return newCart;
    }

    case types.CHECKOUT: {
      return [];
    }

    default:
      return state;
  }
};

export default cart;

// const handleAddToCart = async () => {
//   const response = await axios.post("/api/cart", {
//     productId: id,
//     title,
//     price,
//   });
//   const addedProduct = response.data;

//   setStockOrder({
//     ...stockOrder,
//     [addedProduct.productId]: addedProduct.quantity,
//   });

//   const newCart = [...cart];
//   let i = 0;
//   while (i < cart.length) {
//     if (newCart[i].productId === id) {
//       newCart[i] = addedProduct;
//       break;
//     }
//     i++;
//   }

//   if (i === cart.length) {
//     newCart.push(addedProduct);
//   }
//   setCart(newCart);
// };

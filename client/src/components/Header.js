import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../actions/cartActions";
import { checkout } from "../actions/cartActions";
const Cart = ({ cart, onCheckout }) => {
  const dispatch = useDispatch();
  // const currentCart = useSelector((state) => state.cart);
  const calTotalCost = () => {
    return cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/cart");
        dispatch(fetchCart(response.data));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <table class="cart-items">
        <tbody>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {cart.map((product) => {
            return (
              <tr>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
              </tr>
            );
          })}
          <tr>
            <td colspan="3" class="total">
              Total: ${calTotalCost()}
            </td>
          </tr>
        </tbody>
      </table>
      <a
        class={`button checkout ${cart.length === 0 ? "disabled" : ""}`}
        onClick={onCheckout}
      >
        Checkout
      </a>
    </>
  );
};

const Empty = () => {
  return (
    <>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
      <a class="button checkout disabled">Checkout</a>
    </>
  );
};

const Header = ({ cart, onCheckout }) => {
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state.cart);
  const handleCheckout = async () => {
    try {
      await axios.post("/api/cart/checkout");
      dispatch(checkout(currentCart));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <header>
      <h1>The Shop!</h1>
      <div class="cart">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <Empty />
        ) : (
          <Cart
            cart={cart}
            onCheckout={() => {
              onCheckout();
              handleCheckout();
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;

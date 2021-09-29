/*
[
  {
    "_id": "string",
    "title": "string",
    "price": 0,
    "quantity": 0,
    "productId": "string"
  }
]


*/
import axios from "axios";

const Cart = ({ cart }) => {
  const calTotalCost = () => {
    return cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    try {
      await axios.post("/api/cart/checkout");
      // iterate over products array. for each product:
      // if product.id ===
    } catch (e) {
      console.error(e);
    }
  };
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
      <a class={`button checkout ${cart.length === 0 ? "disabled" : ""}`}>
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

const Header = ({ cart }) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <div class="cart">
        <h2>Your Cart</h2>

        {cart.length === 0 ? <Empty /> : <Cart cart={cart} />}
      </div>
    </header>
  );
};

export default Header;

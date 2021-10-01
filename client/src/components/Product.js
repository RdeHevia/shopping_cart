import axios from "axios";
import { useState } from "react";
import EditForm from "./EditForm";
import { useSelector, useDispatch } from "react-redux";
import { productDeleted } from "../actions/productsActions";
import { productAddedToCart } from "../actions/cartActions";

const Product = ({
  id,
  title,
  quantity,
  price,
  onUpdate,
  handleXClick,
  cart,
  setCart,
  stockOrder,
  setStockOrder,
}) => {
  const [isEditFormHidden, setIsEditFormHidden] = useState(true);
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.filter((product) => product._id === id)
  )[0];
  // DELETE
  const handleAddToCart = async () => {
    const response = await axios.post("/api/cart", {
      productId: id,
      title,
      price,
    });
    const addedProduct = response.data;

    setStockOrder({
      ...stockOrder,
      [addedProduct.productId]: addedProduct.quantity,
    });

    const newCart = [...cart];
    let i = 0;
    while (i < cart.length) {
      if (newCart[i].productId === id) {
        newCart[i] = addedProduct;
        break;
      }
      i++;
    }

    if (i === cart.length) {
      newCart.push(addedProduct);
    }
    setCart(newCart);
  };
  const handleAddToCartRedux = async () => {
    const response = await axios.post("/api/cart", {
      productId: product._id,
      title: product.title,
      price: product.price,
    });

    const addedProduct = response.data;

    dispatch(productAddedToCart(addedProduct));
  };
  const handleDeleteProduct = async (id, callback) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      // deleteProduct(id);
      console.log(productDeleted(id));
      dispatch(productDeleted(id));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="product" key={id}>
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <a
            className="button add-to-cart"
            onClick={() => {
              handleAddToCart();
              handleAddToCartRedux();
            }}
          >
            Add to Cart
          </a>
          <a className="button edit" onClick={() => setIsEditFormHidden(false)}>
            Edit
          </a>
        </div>
        {isEditFormHidden || (
          <EditForm
            id={id}
            title={title}
            quantity={quantity}
            price={price}
            onUpdate={onUpdate}
            setIsEditFormHidden={setIsEditFormHidden}
          />
        )}
        <a className="delete-button">
          <span
            onClick={() => {
              // handleXClick(id);
              handleDeleteProduct(id);
            }}
          >
            X
          </span>
        </a>
      </div>
    </div>
  );
};

export default Product;

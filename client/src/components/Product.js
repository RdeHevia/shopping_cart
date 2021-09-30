import axios from "axios";
import { useState } from "react";
import EditForm from "./EditForm";

/*
X state: [isHidden, setIsHidden]
X conditional render EditForm if isHidden === false
X pass id, title, quantity, price
X make the form to read from the arguments we just passed (controlled form)
X EDIT button onClick: setIsHidden === false
- UPDATE button onClick: 
  - send a PUT request to api/products/${id}
  - map products array to replace the old product with the updated product
  - setProducts(...mappedProducts)
- CANCEL button onClick: setIsHidden(true)



*/
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

  return (
    <div className="product" key={id}>
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <a className="button add-to-cart" onClick={handleAddToCart}>
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
          <span onClick={() => handleXClick(id)}>X</span>
        </a>
      </div>
    </div>
  );
};

export default Product;

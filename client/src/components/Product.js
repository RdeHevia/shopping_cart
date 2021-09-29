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
}) => {
  const [isEditFormHidden, setIsEditFormHidden] = useState(true);

  const handleAddToCart = async () => {
    const response = await axios.post("/api/cart", {
      productId: id,
      title,
      price,
    });
    const addedProduct = response.data;
    const newCart = cart.map((item) => {
      if (item._id === id) {
        item.quantity++;
      }
      return item;
    });
    /*
    - addedProduct = response.data
    - updatedCart: map the original cart. for each product in the cart
      - if product.
    */
    setCart(newCart);
  };

  console.log(id, title, quantity, price);
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

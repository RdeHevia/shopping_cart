import { useState } from "react";
import axios from "axios";

const EditForm = ({
  id,
  title,
  quantity,
  price,
  onUpdate,
  setIsEditFormHidden,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedPrice, setUpdatedPrice] = useState(quantity);
  const [updatedQuantity, setUpdatedQuantity] = useState(price);

  const resetInputs = () => {
    setUpdatedTitle("");
    setUpdatedPrice("");
    setUpdatedQuantity("");
    setIsEditFormHidden(true);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label for="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label for="product-price">Price</label>
          <input
            type="text"
            id="product-price"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label for="product-quantity">Quantity</label>
          <input
            type="text"
            id="product-quantity"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(e.target.value)}
          />
        </div>

        <div className="actions form-actions">
          <a
            className="button"
            onClick={() =>
              onUpdate(
                {
                  id,
                  title: updatedTitle,
                  price: updatedPrice,
                  quantity: updatedQuantity,
                },
                resetInputs
              )
            }
          >
            Update
          </a>
          <a className="button" onClick={resetInputs}>
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default EditForm;

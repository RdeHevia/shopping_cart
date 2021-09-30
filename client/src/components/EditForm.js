import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productUpdated } from "../actions/productsActions";

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

  const dispatch = useDispatch();

  const handleUpdateProduct = async (updatedProductData, callback) => {
    try {
      const response = await axios.put(
        `/api/products/${updatedProductData.id}`,
        {
          ...updatedProductData,
        }
      );
      const updatedProduct = response.data;

      // updateProduct(updatedProduct);
      dispatch(productUpdated(updatedProduct));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            onClick={() => {
              onUpdate(
                {
                  id,
                  title: updatedTitle,
                  price: updatedPrice,
                  quantity: updatedQuantity,
                },
                resetInputs
              );
              handleUpdateProduct(
                {
                  id,
                  title: updatedTitle,
                  price: updatedPrice,
                  quantity: updatedQuantity,
                },
                resetInputs
              );
            }}
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

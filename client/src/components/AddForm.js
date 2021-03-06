import { useState } from "react";
import axios from "axios";
import AddProductButton from "./AddProductButton";
import { useSelect, useDispatch } from "react-redux";
import { productCreated } from "../actions/productsActions";
/*
  X define state: productName, price, quantity
  X handlers to control inputs: onChange={handleBlabla}
  - on Add buttton: onSubmit={handleAddNewProduct}
         handler defined in this component
         get at all the input values
         use those input values as the json for a POST request

  - (FUTURE) input validation
  - (FUTURE) recycle the component (same form for add and edit product)
*/

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isAddProductFormHidden, setIsAddProductFormHidden] = useState(true);

  const dispatch = useDispatch();

  // use toggle
  const handleShowAddProductForm = (event) => {
    event.preventDefault();
    setIsAddProductFormHidden(false);
  };

  const handleHideAddProductForm = (event) => {
    event.preventDefault();
    setIsAddProductFormHidden(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmission({ title, price, quantity }, resetInputs);
  };

  const handleFormSubmission = async (newProductData, callback) => {
    try {
      const response = await axios.post("/api/products", { ...newProductData });
      const newProduct = response.data;
      dispatch(productCreated(newProduct));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resetInputs = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
    setIsAddProductFormHidden(true);
  };

  return (
    <div className={isAddProductFormHidden ? "add-form" : "add-form visible"}>
      <p>
        <AddProductButton onClick={handleShowAddProductForm} />
      </p>
      <h3>Add Product</h3>
      <form>
        <div className="input-group">
          <label for="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label for="product-price">Price</label>
          <input
            type="text"
            id="product-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label for="product-quantity">Quantity</label>
          <input
            type="text"
            id="product-quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="actions form-actions">
          <a className="button" onClick={handleSubmit}>
            Add
          </a>
          <a className="button" onClick={handleHideAddProductForm}>
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default AddForm;

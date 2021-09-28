import { useState } from "react";
import axios from "axios";
import AddProductButton from "./AddProductButton";

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

/*
  {
  "title": "string",
  "price": 0,
  "quantity": 0
}
*/

const AddForm = ({ isHidden, onShowAddProduct, onCancelClick, onSubmit }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = async () => {
    const response = await axios.post("/api/products", {
      title: productName,
      price,
      quantity,
    });

    const newProduct = response.data;
    // newProduct = response.data
    // add the new product to the products array (const [products, setProducts] = useState([]);)
  };
  // WE ARE HERE!!!!!!!!
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit({ author, body }, resetInputs);
  // };

  // const resetInputs = () => {
  //   setAuthor("");
  //   setBody("");
  // };

  return (
    <div className={isHidden ? "add-form" : "add-form visible"}>
      <p>
        <AddProductButton onClick={onShowAddProduct} />
      </p>
      <h3>Add Product</h3>
      <form>
        <div className="input-group">
          <label for="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
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
          <a className="button" onClick={handleAddProduct}>
            Add
          </a>
          <a className="button" onClick={onCancelClick}>
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default AddForm;

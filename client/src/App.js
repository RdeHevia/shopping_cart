import React, { useState, useEffect } from "react";

import axios from "axios";

import Header from "./components/Header.js";
import Products from "./components/Products.js";
import AddForm from "./components/AddForm.js";

/*
X Fetch product data 
X Add Product button: onClick -> show the add product form (conditional product) {!isHidden && <Button />}
- hide add product form 
      - happens after ADDING a product
      X also happens after hitting CANCEL
- Add product form -> send a POST request to backend API
- hide/show edit product form

*/

const App = () => {
  const [products, setProducts] = useState([]);
  const [isAddProductFormHidden, setIsAddProductFormHidden] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = (await axios.get("/api/products")).data;
        setProducts(products);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  const handleShowAddProductForm = (event) => {
    event.preventDefault();
    setIsAddProductFormHidden(false);
  };

  const handleHideAddProductForm = (event) => {
    event.preventDefault();
    setIsAddProductFormHidden(true);
  };

  const handleFormSubmission = async (newProduct, callback) => {
    try {
      const response = await axios.post("/api/products", {
        title: productName,
        price,
        quantity,
      });
      const newProduct = response.data;
      setProducts([...products, newProduct]);

      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="app">
      <Header />

      <main>
        <Products products={products} />
        <AddForm
          onCancelClick={handleHideAddProductForm}
          isHidden={isAddProductFormHidden}
          onShowAddProduct={handleShowAddProductForm}
          onSubmit={handleFormSubmission}
        />
      </main>
    </div>
  );
};

export default App;

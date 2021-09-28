import React, { useState, useEffect } from "react";

import Header from "./components/Header.js";
import Products from "./components/Products.js";
import AddForm from "./components/AddForm.js";
import axios from "axios";
import data from "./lib/data.js";

/*
X Fetch product data 
X Add Product button: onClick -> show the add product form (conditional product) {!isHidden && <Button />}
- hide add product form
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

  return (
    <div id="app">
      <Header />

      <main>
        <Products products={products} />
        {/* <a
          className="button add-product-button"
          onClick={handleShowAddProductForm}
        >
          Add A Product
        </a> */}
        <AddForm
          isHidden={isAddProductFormHidden}
          onShowAddProduct={handleShowAddProductForm}
        />
      </main>
    </div>
  );
};

export default App;

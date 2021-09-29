import React, { useState, useEffect } from "react";

import axios from "axios";

import Header from "./components/Header.js";
import Products from "./components/Products.js";
import AddForm from "./components/AddForm.js";

/*
X Fetch product data 
X Add Product button: onClick -> show the add product form (conditional product) {!isHidden && <Button />}
X hide add product form 
      X happens after ADDING a product
      X also happens after hitting CANCEL
X Add product form -> send a POST request to backend API
- hide/show edit product form

finish up all the CRUD operations
     CREATE - done
     READ - done
     UPDATE - 
get the details of the cart working:
    you can't add more items than are left in stock
    decrementing quantity AT CHECKOUT, not when we add to cart
    once there are 0 items left, disable add to cart button

*/

const App = () => {
  const [products, setProducts] = useState([]);

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

  const handleFormSubmission = async (newProductData, callback) => {
    try {
      const response = await axios.post("/api/products", { ...newProductData });
      const newProduct = response.data;
      setProducts([...products, newProduct]);

      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateProduct = async (updatedProductData, callback) => {
    console.log(updatedProductData);
    try {
      const response = await axios.put(
        `/api/products/${updatedProductData.id}`,
        {
          ...updatedProductData,
        }
      );
      const updatedProduct = response.data;
      console.log(updatedProduct);
      updateProduct(updatedProduct);

      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateProduct = (updatedProduct) => {
    console.log("before", products);
    console.log("updatedProduct", updatedProduct);
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      }

      return product;
    });
    console.log("end", updatedProducts);
    setProducts([...updatedProducts]);
  };

  const deleteProduct = (id) => {};

  return (
    <div id="app">
      <Header />
      <main>
        <Products products={products} onUpdate={handleUpdateProduct} />
        <AddForm onFormSubmission={handleFormSubmission} />
      </main>
    </div>
  );
};

export default App;

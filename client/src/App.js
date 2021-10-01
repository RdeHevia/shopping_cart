import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Header from "./components/Header.js";
import Products from "./components/Products.js";
import AddForm from "./components/AddForm.js";

/*
products:
 - duplicate products state in redux store
 - start rewiring handlers, functions.... that act on products to products in redux store
 - finally, remove all duplications
*/

/*

STORE FULLY FUNCTIONAL
1. PRODUCT_DELETED feature
2. Create cart action creator, types and reducer
3. PRODUCT_ADDED_TO_CART feature
4. CHECKOUT feature

5. Create stockOrder reducer (reducer processes PRODUCT_ADDED_TO_CART and CHECKOUT actions)
6. add to stockOrder feature (uses PRODUCT_ADDED_TO_CART action)
7. clear stockOrder feature (uses CHECKOUT action)

REMOVE REACT STATE:
Start rewiring and removing state and any dependencies from children all the way up to App.js. That way we ensure
the app still works while we rewire everything.

1. AddProductForm
2. EditForm -> Product -> Products
3. Cart -> Header
4. App

THUNK REFACTORING (EXTRA):
1. Move all the code inside useEffect to action creators, one by one
*/

const App = () => {
  // DELETE products, cart, stockOrder
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // create cart reducer and action creator
  const [stockOrder, setStockOrder] = useState({}); // create stockOrder reducer and action creator

  // DELETE
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

  // COPY, MODIFY FOR REDUX AND MOVE TO HEADER COMPONENT
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart");
        setCart(response.data);
        const newStockOrder = response.data.reduce((newStockOrder, item) => {
          return { ...newStockOrder, [item.productId]: item.quantity };
        }, {});
        setStockOrder(newStockOrder);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCart();
  }, []);

  // DELETE
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
  // DELETE
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

  //DELETE
  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      }

      return product;
    });
    console.log("end", updatedProducts);
    setProducts([...updatedProducts]);
  };

  // COPY, MODIFY FOR REDUX AND MOVE TO PRODUCT COMPONENT
  const handleDeleteProduct = async (id, callback) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      deleteProduct(id);

      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // COPY, MODIFY FOR REDUX AND MOVE TO PRODUCT COMPONENT
  const deleteProduct = (id) => {
    setProducts((products) => products.filter((product) => product._id !== id));
  };

  // COPY, MODIFY FOR REDUX AND MOVE TO HEADER COMPONENT
  const handleCheckout = async () => {
    const updatedProducts = products.map((product) => {
      const orderedQuantity = stockOrder[product._id] || 0;
      if (product.quantity > orderedQuantity) {
        product.quantity -= orderedQuantity;
        return product;
      } else {
        product.quantity = 0;
        // update stock order pending (EXTRA)
        // update cart pending (EXTRA)
        return product;
      }
    });
    try {
      await axios.post("/api/cart/checkout");
      setProducts(updatedProducts);
      setCart([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="app">
      <Header cart={cart} onCheckout={handleCheckout} />
      <main>
        <Products
          products={products}
          onUpdate={handleUpdateProduct}
          handleXClick={handleDeleteProduct}
          cart={cart}
          setCart={setCart}
          stockOrder={stockOrder}
          setStockOrder={setStockOrder}
        />
        <AddForm onFormSubmission={handleFormSubmission} />
      </main>
    </div>
  );
};

export default App;

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
PRODUCTS:
 - ACTIONS
  - PRODUCTS_RECEIVED
  - PRODUCT_CREATED
  - PRODUCT_DELETED
  - PRODUCT_UPDATED
 - reducer
*/

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [stockOrder, setStockOrder] = useState({});

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

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart");
        console.log("cart", response.data);
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

  const deleteProduct = (id) => {
    setProducts((products) => products.filter((product) => product._id !== id));
  };

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

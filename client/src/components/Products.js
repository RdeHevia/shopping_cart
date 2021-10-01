import Product from "./Product.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { productsReceived } from "../actions/productsActions.js";

const Products = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = (await axios.get("/api/products")).data;
        dispatch(productsReceived(products));
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-listing">
      <h2>Products</h2>
      {props.products.map((product) => {
        return (
          <Product
            id={product._id}
            title={product.title}
            quantity={product.quantity}
            price={product.price}
            onUpdate={props.onUpdate}
            handleXClick={props.handleXClick}
            cart={props.cart}
            setCart={props.setCart}
            setStockOrder={props.setStockOrder}
            stockOrder={props.stockOrder}
          />
        );
      })}
    </div>
  );
};

export default Products;

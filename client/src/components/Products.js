import Product from "./Product.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { productsReceived } from "../actions/productsActions.js";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productsReceived());
  }, [dispatch]);

  return (
    <div className="product-listing">
      <h2>Products</h2>
      {products.map((product) => {
        return <Product id={product._id} />;
      })}
    </div>
  );
};

export default Products;

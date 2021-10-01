import Product from "./Product.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { productsReceived } from "../actions/productsActions.js";

const Products = () => {
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
      {products.map((product) => {
        return <Product id={product._id} />;
      })}
    </div>
  );
};

export default Products;

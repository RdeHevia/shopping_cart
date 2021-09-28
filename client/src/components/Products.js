import Product from "./Product.js";

const Products = (props) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      {props.products.map((product) => {
        return (
          <Product
            id={product.id}
            title={product.title}
            quantity={product.quantity}
            price={product.price}
          />
        );
      })}
    </div>
  );
};

export default Products;

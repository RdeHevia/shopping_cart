import Product from "./Product.js";

const Products = (props) => {
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
          />
        );
      })}
    </div>
  );
};

export default Products;

import Product from "./Product.js";

const Products = (props) => {
  console.log("products", props.products);
  return (
    <div className="product-listing">
      <h2>Products</h2>
      {props.products.map((product) => {
        console.log("product", product);
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

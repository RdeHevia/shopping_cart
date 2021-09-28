const EditForm = ({ id, title, quantity, price }) => {
  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label for="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value="Apple 10.5-Inch iPad Pro"
          />
        </div>

        <div className="input-group">
          <label for="product-price">Price</label>
          <input type="text" id="product-price" value="649.99" />
        </div>

        <div className="input-group">
          <label for="product-quantity">Quantity</label>
          <input type="text" id="product-quantity" value="2" />
        </div>

        <div className="actions form-actions">
          <a className="button">Update</a>
          <a className="button">Cancel</a>
        </div>
      </form>
    </div>
  );
};

export default EditForm;

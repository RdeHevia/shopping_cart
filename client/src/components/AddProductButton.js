const AddProductButton = ({ onClick }) => {
  return (
    <>
      <a className="button add-product-button" onClick={onClick}>
        Add A Product
      </a>
    </>
  );
};

export default AddProductButton;

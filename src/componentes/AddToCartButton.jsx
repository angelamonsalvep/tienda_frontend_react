import React from 'react';

const AddToCartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="add-to-cart-btn">
      Agregar al carrito
    </button>
  );
};

export default AddToCartButton;

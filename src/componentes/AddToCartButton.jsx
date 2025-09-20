import React from 'react';
import styles from '../estilos/AddToCartButton.module.css';

const AddToCartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.addToCartBtn}>
      Agregar al carrito
    </button>
  );
};

export default AddToCartButton;

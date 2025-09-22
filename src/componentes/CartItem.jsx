import React, { useState, useCallback } from 'react';
import { useCart } from '../contexts/CartContext';
import styles from '../estilos/CartItem.module.css';

const CartItem = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleIncrement = useCallback(() => {
    incrementQuantity(item.id_producto);
  }, [incrementQuantity, item.id_producto]);

  const handleDecrement = useCallback(() => {
    decrementQuantity(item.id_producto);
  }, [decrementQuantity, item.id_producto]);

  const handleRemove = useCallback(() => {
    removeFromCart(item.id_producto);
  }, [removeFromCart, item.id_producto]);

  const shouldShowImage = item.imagen_url && !imageError;
  const subtotal = item.precio * item.quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.productImage}>
        {shouldShowImage ? (
          <img 
            src={item.imagen_url} 
            alt={item.nombre_producto}
            onError={handleImageError}
          />
        ) : (
          <img 
            src="/vite.svg" 
            alt="Sin imagen" 
            className={styles.defaultImage}
          />
        )}
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{item.nombre_producto}</h3>
        <p className={styles.productDescription}>{item.descripcion}</p>
        <p className={styles.productPrice}>${item.precio}</p>
      </div>
      
      <div className={styles.quantityControls}>
        <button 
          className={styles.quantityBtn}
          onClick={handleDecrement}
          aria-label="Disminuir cantidad"
        >
          -
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button 
          className={styles.quantityBtn}
          onClick={handleIncrement}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>
      
      <div className={styles.subtotal}>
        <p>${subtotal}</p>
      </div>
      
      <button 
        className={styles.removeBtn}
        onClick={handleRemove}
        aria-label="Eliminar producto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
        </svg>
      </button>
    </div>
  );
};

export default React.memo(CartItem);
import React, { useState, useCallback } from 'react';
import styles from '../estilos/product.module.css';

const Product = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const shouldShowImage = product.imagen_url && !imageError;

  return (
    <div className={styles.productCard}>
      {shouldShowImage ? (
        <img 
          src={product.imagen_url} 
          alt={product.nombre_producto}
          onError={handleImageError}
        />
      ) : (
        <img 
          src="/vite.svg" 
          alt="Sin imagen" 
          className={styles.defaultImage}
        />
      )}
      <h2>{product.nombre_producto}</h2>
      <p>{product.descripcion}</p>
      <p>${product.precio}</p>
    </div>
  );
};

export default Product;
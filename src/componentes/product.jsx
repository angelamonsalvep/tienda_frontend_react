import React, { useState, useCallback } from 'react';
import styles from '../estilos/product.module.css';

const Product = ({ product }) => {
  const [imageError, setImageError] = useState({ principal: false, zoom: false });
  const [isHovering, setIsHovering] = useState(false);

  const handleImageError = useCallback((tipo) => {
    setImageError(prev => ({ ...prev, [tipo]: true }));
  }, []);

  // Función para obtener la URL de imagen por tipo
  const getImageUrl = (tipo) => {
    if (Array.isArray(product.imagen_url)) {
      const image = product.imagen_url.find(img => img.tipo === tipo);
      return image ? image.url : null;
    }
    // Compatibilidad con formato anterior (string)
    return tipo === 'principal' ? product.imagen_url : null;
  };

  const principalUrl = getImageUrl('principal');
  const zoomUrl = getImageUrl('zoom');

  // Determinar qué imagen mostrar
  const getCurrentImageUrl = () => {
    if (isHovering && zoomUrl && !imageError.zoom) {
      return zoomUrl;
    }
    return principalUrl;
  };

  const shouldShowImage = getCurrentImageUrl() && 
    (isHovering ? !imageError.zoom : !imageError.principal);

  return (
    <div className={styles.productCard}>
      <div 
        className={styles.imageContainer}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {shouldShowImage ? (
          <img 
            src={getCurrentImageUrl()} 
            alt={product.nombre_producto}
            onError={() => handleImageError(isHovering ? 'zoom' : 'principal')}
            className={isHovering && zoomUrl ? styles.zoomImage : styles.principalImage}
          />
        ) : (
          <img 
            src="/vite.svg" 
            alt="Sin imagen" 
            className={styles.defaultImage}
          />
        )}
      </div>
      <h2>{product.nombre_producto}</h2>
      <p>{product.descripcion}</p>
      <p>${product.precio}</p>
    </div>
  );
};

export default Product;
import styles from './product.module.css';

const Product = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.imagen_url} alt={product.nombre_producto} />
      <h2>{product.nombre_producto}</h2>
      <p>{product.descripcion}</p>
      <p>${product.precio}</p>
    </div>
  );
};

export default Product;
const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imagen_url} alt={product.nombre_producto} />
      <h2>{product.nombre_producto}</h2>
      <p>{product.descripcion}</p>
      <p>${product.precio}</p>
    </div>
  );
};

export default Product;
const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imagen} alt={product.nombre} />
      <h2>{product.nombre}</h2>
      <p>{product.descripcion}</p>
      <p>${product.precio}</p>      
    </div>
  );
};

export default Product;
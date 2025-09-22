import React from 'react';
import ProductRow from './ProductRow';
import styles from '../estilos/ProductTable.module.css';

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <ProductRow
            key={product.id_producto || product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

// Función de comparación para evitar re-renders innecesarios
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.products === nextProps.products &&
    prevProps.onEdit === nextProps.onEdit &&
    prevProps.onDelete === nextProps.onDelete
  );
};

export default React.memo(ProductTable, areEqual);

import React from 'react';
import ProductRow from './ProductRow';
import styles from './ProductTable.module.css';

export default function ProductTable({ products, onEdit, onDelete }) {
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
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

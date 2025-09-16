import React from 'react';
import ProductRow from './ProductRow';

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table width="100%" border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
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

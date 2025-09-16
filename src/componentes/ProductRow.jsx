import React from 'react';

export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr>
      <td style={{ textAlign: 'center' }}>
        {product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre_producto || product.nombre}
            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
            onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }}
          />
        ) : (
          <img src="/vite.svg" alt="Sin imagen" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, opacity: 0.5 }} />
        )}
      </td>
      <td>{product.nombre_producto || product.nombre}</td>
      <td>{product.descripcion}</td>
      <td>${product.precio}</td>
      <td style={{ textAlign: 'center' }}>
        <span
          title="Editar"
          style={{ cursor: 'pointer', marginRight: 10 }}
          onClick={() => onEdit(product)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#1976d2">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-9.04c.39-.39.39-1.02 0-1.41l-2.54-2.54a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </span>
        <span
          title="Eliminar"
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(product.id_producto)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#d32f2f">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
          </svg>
        </span>
      </td>
    </tr>
  );
}

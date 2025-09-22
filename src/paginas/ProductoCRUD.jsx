import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../hooks/useProductos';
import ProductTable from '../componentes/ProductTable';
import styles from '../estilos/ProductoCRUD.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function ProductoCRUD() {
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const { productos, loading, error } = useProductos(reload);

  // Eliminar producto
  const handleDelete = useCallback(async (id) => {
    try {
      await fetch(`${API_BASE_URL}/productos/${id}`, { method: 'DELETE' });
      setReload(r => !r);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }, []);

  const handleEdit = useCallback((product) => {
    navigate(`/crud-productos/editar/${product.id_producto}`);
  }, [navigate]);

  const handleAddNew = useCallback(() => {
    navigate('/crud-productos/nuevo');
  }, [navigate]);

  return (
    <div className={styles.crudContainer}>
      <div className={styles.crudHeader}>
        <h2 className={styles.crudTitle}>Listado de Productos</h2>
        <button
          onClick={handleAddNew}
          className={styles.addProductBtn}
          title="Agregar producto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"/>
          </svg>
        </button>
      </div>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p className={styles.errorMsg}>{error}</p>
      ) : (
        <div className={styles.tableContainer}>
          <ProductTable
            products={productos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../componentes/header';
import Productos from '../componentes/Productos';
import ProductTable from '../componentes/ProductTable';
import styles from '../estilos/ProductoCRUD.module.css';

export default function ProductoCRUD({ onToggleTheme, theme, onCartClick }) {
  const navigate = useNavigate();
  const [reload, setReload] = React.useState(false);

  // Eliminar producto
  const handleDelete = async (id) => {
    const { API_URL } = await import('../componentes/Productos');
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setReload(r => !r);
  };

  return (
    <>
  {/* El header global ya muestra el título */}
      <Productos reload={reload}>
        {({ productos, loading, error }) => (
          <div className={styles.crudContainer}>
            <div className={styles.crudHeader}>
              <h2 className={styles.crudTitle}>Listado de Productos</h2>
              <button
                onClick={() => navigate('/crud-productos/nuevo')}
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
                  onEdit={product => {
                    navigate(`/crud-productos/editar/${product.id_producto}`);
                  }}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        )}
      </Productos>
    </>
  );
}

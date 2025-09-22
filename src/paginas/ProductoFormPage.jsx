import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../componentes/header';
import { API_URL } from '../componentes/Productos';
import styles from '../estilos/ProductForm.module.css';

export default function ProductoFormPage({ onToggleTheme, theme, onCartClick }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    nombre_producto: '',
    imagen_url: [
      { tipo: 'principal', url: '' },
      { tipo: 'zoom', url: '' }
    ],
    descripcion: '',
    precio: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
          setForm({
            nombre_producto: data.nombre_producto || '',
            imagen_url: data.imagen_url || [
              { tipo: 'principal', url: '' },
              { tipo: 'zoom', url: '' }
            ],
            descripcion: data.descripcion || '',
            precio: data.precio || ''
          });
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (tipo, url) => {
    const newImagenUrl = form.imagen_url.map(img => 
      img.tipo === tipo ? { ...img, url } : img
    );
    setForm({ ...form, imagen_url: newImagenUrl });
  };

  const getImageUrl = (tipo) => {
    const imagen = form.imagen_url.find(img => img.tipo === tipo);
    return imagen ? imagen.url : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const principalUrl = getImageUrl('principal');
    const zoomUrl = getImageUrl('zoom');
    
    if (!form.nombre_producto || !form.precio || !principalUrl) return;
    
    setLoading(true);
    const body = {
      nombre_producto: form.nombre_producto,
      imagen_url: form.imagen_url,
      descripcion: form.descripcion,
      precio: Number(form.precio)
    };
    try {
      if (isEdit) {
        await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }
      navigate('/crud-productos');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.productFormContainer}>
      <div className={styles.productForm}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>
            {isEdit ? 'Editar Producto' : 'Crear Producto'}
          </h1>
          <p className={styles.formSubtitle}>
            {isEdit ? 'Actualiza la información del producto' : 'Completa los datos del nuevo producto'}
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <span>⏳</span>
            <span>Cargando...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formContent}>
            {/* Fila principal: Información básica */}
            <div className={styles.formGridMain}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>
                  <span className={styles.fieldIcon}>🏷️</span>
                  Nombre del Producto
                </label>
                <input
                  className={styles.formInput}
                  name="nombre_producto"
                  value={form.nombre_producto}
                  onChange={handleChange}
                  placeholder="Ej: Camiseta deportiva"
                  required
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel}>
                  <span className={styles.fieldIcon}>💰</span>
                  Precio (Pesos Colombianos)
                </label>
                <div className={styles.priceInputContainer}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    className={`${styles.formInput} ${styles.priceInput}`}
                    name="precio"
                    type="number"
                    step="5000"
                    min="0"
                    value={form.precio}
                    onChange={handleChange}
                    placeholder="25000"
                    required
                  />
                </div>
                {form.precio && (
                  <div className={styles.fieldHelper}>
                    Precio: {formatCurrency(form.precio)}
                  </div>
                )}
              </div>

              <div className={`${styles.formField} ${styles.descriptionField}`}>
                <label className={styles.fieldLabel}>
                  <span className={styles.fieldIcon}>📝</span>
                  Descripción
                </label>
                <textarea
                  className={styles.formTextarea}
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Describe las características del producto..."
                  rows={3}
                />
                <div className={styles.fieldHelper}>
                  Opcional. Proporciona detalles adicionales sobre el producto.
                </div>
              </div>
            </div>

            {/* Fila de imágenes: URLs y vistas previas */}
            <div className={styles.formGridImages}>
              <div className={styles.imageInputsSection}>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>
                    <span className={styles.fieldIcon}>🖼️</span>
                    Imagen Principal (Requerida)
                  </label>
                  <input
                    className={styles.formInput}
                    name="imagen_principal"
                    value={getImageUrl('principal')}
                    onChange={(e) => handleImageChange('principal', e.target.value)}
                    placeholder="https://ejemplo.com/imagen-principal.jpg"
                    maxLength={500}
                    required
                  />
                  <div className={styles.fieldHelper}>
                    Imagen que se muestra por defecto en el catálogo.
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>
                    <span className={styles.fieldIcon}>🔍</span>
                    Imagen de Zoom (Opcional)
                  </label>
                  <input
                    className={styles.formInput}
                    name="imagen_zoom"
                    value={getImageUrl('zoom')}
                    onChange={(e) => handleImageChange('zoom', e.target.value)}
                    placeholder="https://ejemplo.com/imagen-zoom.jpg"
                    maxLength={500}
                  />
                  <div className={styles.fieldHelper}>
                    Imagen que se muestra al pasar el mouse sobre el producto.
                  </div>
                </div>
              </div>

              <div className={styles.imagePreviewsSection}>
                {getImageUrl('principal') && (
                  <div className={styles.imagePreview}>
                    <div className={styles.imagePreviewHeader}>Imagen Principal</div>
                    <img
                      src={getImageUrl('principal')}
                      alt="Vista previa principal"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className={styles.noImageText} style={{ display: 'none' }}>
                      ❌ No se pudo cargar la imagen principal
                    </div>
                  </div>
                )}

                {getImageUrl('zoom') && (
                  <div className={styles.imagePreview}>
                    <div className={styles.imagePreviewHeader}>Imagen Zoom</div>
                    <img
                      src={getImageUrl('zoom')}
                      alt="Vista previa zoom"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className={styles.noImageText} style={{ display: 'none' }}>
                      ❌ No se pudo cargar la imagen de zoom
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={loading || !form.nombre_producto || !form.precio}
              >
                {loading ? '⏳ Guardando...' : (isEdit ? '✅ Actualizar' : '➕ Crear')}
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => navigate('/crud-productos')}
                disabled={loading}
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

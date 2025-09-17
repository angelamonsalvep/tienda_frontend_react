import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../componentes/header';
import ProductForm from '../componentes/ProductForm';
import { API_URL } from '../componentes/Productos';

export default function ProductoFormPage({ onToggleTheme, theme, onCartClick }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    nombre_producto: '',
    imagen_url: '',
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
            imagen_url: data.imagen_url || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre_producto || !form.precio) return;
    setLoading(true);
    const body = {
      nombre_producto: form.nombre_producto,
      imagen_url: form.imagen_url,
      descripcion: form.descripcion,
      precio: Number(form.precio)
    };
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
    setLoading(false);
    navigate('/crud-productos');
  };

  return (
    <>
      <Header title={isEdit ? 'Editar producto' : 'Agregar producto'} onToggleTheme={onToggleTheme} theme={theme} onCartClick={onCartClick} />
      <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
        <h2>{isEdit ? 'Editar producto' : 'Agregar producto'}</h2>
        {loading ? <p>Cargando...</p> : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label>Nombre:</label><br />
              <input
                name="nombre_producto"
                value={form.nombre_producto}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Imagen URL:</label><br />
              <input
                name="imagen_url"
                value={form.imagen_url}
                onChange={handleChange}
                style={{ width: '100%' }}
                maxLength={500}
                required
              />
              <small style={{ color: '#888' }}>
                Máximo 500 caracteres
              </small>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Descripción:</label><br />
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Precio:</label><br />
              <input
                name="precio"
                type="number"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={{ background: '#1976d2', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4 }}>
                {isEdit ? 'Actualizar' : 'Agregar'}
              </button>
              <button type="button" onClick={() => navigate('/crud-productos')} style={{ background: '#ccc', border: 'none', padding: '8px 16px', borderRadius: 4 }}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

import React from 'react';

export default function ProductForm({ form, onChange, onSubmit, editId, onCancel }) {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={onChange}
        style={{ marginRight: 10 }}
      />
      <input
        name="precio"
        type="number"
        placeholder="Precio"
        value={form.precio}
        onChange={onChange}
        style={{ marginRight: 10 }}
      />
      <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
      {editId && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
          Cancelar
        </button>
      )}
    </form>
  );
}

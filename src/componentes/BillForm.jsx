import React from 'react';
import styles from '../estilos/BillForm.module.css';

const BillForm = ({ form, onChange }) => (
  <div className={styles.billForm}>
    <input
      type="text"
      placeholder="Nombre"
      value={form.firstName}
      onChange={e => onChange({ ...form, firstName: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Apellido"
      value={form.lastName}
      onChange={e => onChange({ ...form, lastName: e.target.value })}
      required
    />
    <input
      type="email"
      placeholder="Correo electrónico"
      value={form.email || ''}
      onChange={e => onChange({ ...form, email: e.target.value })}
      className={styles.fullWidth}
      required
    />
  </div>
);

export default BillForm;

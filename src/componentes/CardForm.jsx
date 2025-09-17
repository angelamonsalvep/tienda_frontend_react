import React from 'react';
import styles from './CardForm.module.css';

const CardForm = ({ form, onChange }) => (
  <div className={styles.cardForm}>
    <input
      type="text"
      placeholder="Nombre del titular"
      value={form.ownerName}
      onChange={e => onChange({ ...form, ownerName: e.target.value })}
    />
    <input
      type="text"
      placeholder="Número de tarjeta"
      value={form.cardNumber}
      onChange={e => onChange({ ...form, cardNumber: e.target.value })}
    />
    <input
      type="text"
      placeholder="Mes de expiración"
      value={form.expirationMonth}
      onChange={e => onChange({ ...form, expirationMonth: e.target.value })}
    />
    <input
      type="text"
      placeholder="Año de expiración"
      value={form.expirationYear}
      onChange={e => onChange({ ...form, expirationYear: e.target.value })}
    />
    <input
      type="text"
      placeholder="CVV"
      value={form.cvv}
      onChange={e => onChange({ ...form, cvv: e.target.value })}
    />
  </div>
);

export default CardForm;

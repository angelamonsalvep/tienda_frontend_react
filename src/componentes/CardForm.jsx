import React from 'react';
import styles from '../estilos/CardForm.module.css';

const CardForm = ({ form, onChange }) => (
  <div className={styles.cardForm}>
    <input
      type="text"
      placeholder="Nombre del titular"
      value={form.ownerName}
      onChange={e => onChange({ ...form, ownerName: e.target.value })}
      maxLength="50"
    />
    <input
      type="text"
      placeholder="Número de tarjeta (16 dígitos)"
      value={form.cardNumber}
      onChange={e => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        onChange({ ...form, cardNumber: formattedValue });
      }}
      maxLength="19"
    />
    <div className={styles.dateRow}>
      <input
        type="text"
        placeholder="MM"
        value={form.expirationMonth}
        onChange={e => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 2) {
            onChange({ ...form, expirationMonth: value });
          }
        }}
        maxLength="2"
      />
      <input
        type="text"
        placeholder="YYYY"
        value={form.expirationYear}
        onChange={e => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 4) {
            onChange({ ...form, expirationYear: value });
          }
        }}
        maxLength="4"
      />
      <input
        type="text"
        placeholder="CVV"
        value={form.cvv}
        onChange={e => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 4) {
            onChange({ ...form, cvv: value });
          }
        }}
        maxLength="4"
      />
    </div>
  </div>
);

export default CardForm;

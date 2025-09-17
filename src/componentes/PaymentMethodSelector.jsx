import React from 'react';
import styles from './PaymentMethodSelector.module.css';

const PaymentMethodSelector = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={styles.paymentMethodSelector}
    >
      <option value="debito">Tarjeta Débito</option>
      <option value="credito">Tarjeta Crédito</option>
      <option value="pse">PSE</option>
    </select>
  );
};

export default PaymentMethodSelector;

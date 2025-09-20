import React from 'react';
import styles from '../estilos/PayButton.module.css';

const PayButton = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={styles.payBtn}>
    Pagar
  </button>
);

export default PayButton;

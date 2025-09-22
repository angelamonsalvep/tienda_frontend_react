import React, { useState } from 'react';
import PaymentMethodSelector from './PaymentMethodSelector';
import CardForm from './CardForm';
import BillForm from './BillForm';
import PayButton from './PayButton';
import styles from '../estilos/PaymentForm.module.css';

const PaymentForm = ({ totalAmount, onPay }) => {
  const [method, setMethod] = useState('pse');
  const [cardForm, setCardForm] = useState({ ownerName: '', cardNumber: '', expirationMonth: '', expirationYear: '', cvv: '' });
  const [billForm, setBillForm] = useState({ firstName: '', lastName: '', email: '' });

  const showCardForm = method === 'debito' || method === 'credito';

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.paymentForm}>
      <div className={styles.paymentHeader}>
        <h1 className={styles.paymentTitle}>Finalizar Compra</h1>
        <p className={styles.paymentSubtitle}>Completa tu información de pago</p>
      </div>

      <div className={`${styles.formContent} ${!showCardForm ? styles.singleColumn : ''}`}>
        <div className={styles.leftColumn}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>💳</span>
              Método de Pago
            </h3>
            <PaymentMethodSelector value={method} onChange={setMethod} />
          </div>

          {showCardForm && (
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🔒</span>
                Información de Tarjeta
              </h3>
              <CardForm form={cardForm} onChange={setCardForm} />
            </div>
          )}

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📋</span>
              Información de Facturación
            </h3>
            <BillForm form={billForm} onChange={setBillForm} />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.totalAmount}>
            Total a Pagar: {formatCurrency(totalAmount)}
          </div>

          <div className={styles.paymentFooter}>
            <PayButton onClick={() => onPay({ method, cardForm, billForm })} disabled={false} />
            <p className={styles.securityNote}>
              <span>🔐</span>
              Tu información está protegida con encriptación SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

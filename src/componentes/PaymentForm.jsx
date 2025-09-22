import React, { useState, useMemo } from 'react';
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

  // Validación de formularios
  const isFormValid = useMemo(() => {
    // Validar información de facturación (siempre requerida)
    const isBillFormValid = billForm.firstName.trim() !== '' && 
                           billForm.lastName.trim() !== '' && 
                           billForm.email.trim() !== '' &&
                           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billForm.email.trim());

    // Validar formulario de tarjeta (solo si se requiere)
    const isCardFormValid = !showCardForm || (
      cardForm.ownerName.trim() !== '' &&
      cardForm.cardNumber.replace(/\s/g, '').length === 16 &&
      cardForm.expirationMonth.length === 2 &&
      parseInt(cardForm.expirationMonth) >= 1 &&
      parseInt(cardForm.expirationMonth) <= 12 &&
      cardForm.expirationYear.length === 4 &&
      parseInt(cardForm.expirationYear) >= new Date().getFullYear() &&
      (parseInt(cardForm.expirationYear) > new Date().getFullYear() || 
       parseInt(cardForm.expirationMonth) > new Date().getMonth() + 1) &&
      cardForm.cvv.length >= 3 && cardForm.cvv.length <= 4
    );

    return isBillFormValid && isCardFormValid;
  }, [billForm, cardForm, showCardForm]);

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
            <PayButton 
              onClick={() => onPay({ method, cardForm, billForm })} 
              disabled={!isFormValid} 
            />
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

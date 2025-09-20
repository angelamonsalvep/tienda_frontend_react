import React, { useState } from 'react';
import PaymentMethodSelector from './PaymentMethodSelector';
import CardForm from './CardForm';
import BillForm from './BillForm';
import PayButton from './PayButton';
import styles from '../estilos/PaymentForm.module.css';

const PaymentForm = ({ totalAmount, onPay }) => {
  const [method, setMethod] = useState('debito');
  const [cardForm, setCardForm] = useState({ ownerName: '', cardNumber: '', expirationMonth: '', expirationYear: '', cvv: '' });
  const [billForm, setBillForm] = useState({ firstName: '', lastName: '', address: '', city: '' });

  const showCardForm = method === 'debito' || method === 'credito';

  return (
    <div className={styles.paymentForm}>
      <PaymentMethodSelector value={method} onChange={setMethod} />
      {showCardForm && <CardForm form={cardForm} onChange={setCardForm} />}
      <BillForm form={billForm} onChange={setBillForm} />
      <div className={styles.totalAmount}>Total: ${totalAmount}</div>
      <PayButton onClick={() => onPay({ method, cardForm, billForm })} disabled={false} />
    </div>
  );
};

export default PaymentForm;

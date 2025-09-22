import React from 'react';
import Header from '../componentes/header';
import PaymentForm from '../componentes/PaymentForm';
import styles from '../estilos/PaymentForm.module.css';


const PaymentFormPage = ({ cart, onPay }) => {
	const totalAmount = cart.reduce((sum, item) => sum + item.precio, 0);
	return (
		<div className={styles.paymentPageContainer}>
			<PaymentForm totalAmount={totalAmount} cart={cart} onPay={onPay} />
		</div>
	);
};

export default PaymentFormPage;

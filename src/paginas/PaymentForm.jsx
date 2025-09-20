import React from 'react';
import Header from '../componentes/header';
import PaymentForm from '../componentes/PaymentForm';
import styles from '../estilos/PaymentForm.module.css';

const PaymentFormPage = ({ cart, onPay, onToggleTheme, theme, onCartClick }) => {
	const totalAmount = cart.reduce((sum, item) => sum + item.precio, 0);

	return (
		<div className={styles.paymentPageContainer}>
			<Header title="Pago" onCartClick={onCartClick} onToggleTheme={onToggleTheme} theme={theme} />
			<PaymentForm totalAmount={totalAmount} onPay={onPay} />
		</div>
	);
};

export default PaymentFormPage;

import React from 'react';
import Header from '../componentes/header';
import PaymentForm from '../componentes/PaymentForm';

const PaymentFormPage = ({ cart, onPay, onToggleTheme }) => {
	const totalAmount = cart.reduce((sum, item) => sum + item.precio, 0);

	return (
		<div>
			<Header title="Pago" onCartClick={() => {}} onToggleTheme={onToggleTheme} />
			<PaymentForm totalAmount={totalAmount} onPay={onPay} />
		</div>
	);
};

export default PaymentFormPage;

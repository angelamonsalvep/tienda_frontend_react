import React from 'react';
import Header from '../componentes/header';
import Cart from '../componentes/Cart';

const ConfirmProducts = ({ cart, onGoToPay, onToggleTheme }) => {
	return (
		<div>
			<Header title="Confirmar Productos" onCartClick={() => {}} onToggleTheme={onToggleTheme} />
			<Cart cartItems={cart} />
			<button onClick={onGoToPay} className="go-to-pay-btn">Ir a pago</button>
		</div>
	);
};

export default ConfirmProducts;

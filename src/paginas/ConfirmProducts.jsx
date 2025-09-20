import React from 'react';
import Header from '../componentes/header';
import Cart from '../componentes/Cart';
import styles from '../estilos/ConfirmProducts.module.css';

const ConfirmProducts = ({ cart, onGoToPay, onToggleTheme }) => {
	return (
		<div className={styles.confirmContainer}>
			<Header title="Confirmar Productos" onCartClick={() => {}} onToggleTheme={onToggleTheme} />
			<Cart cartItems={cart} />
			<button onClick={onGoToPay} className={styles.goToPayBtn}>Ir a pago</button>
		</div>
	);
};

export default ConfirmProducts;

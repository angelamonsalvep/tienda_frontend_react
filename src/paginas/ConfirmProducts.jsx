import React from 'react';
import Cart from '../componentes/Cart';
import { useCart } from '../contexts/CartContext';
import styles from '../estilos/ConfirmProducts.module.css';

const ConfirmProducts = ({ onGoToPay }) => {
	const { cart, getTotalPrice } = useCart();

	const handleGoToPay = () => {
		if (cart.length === 0) {
			alert('No hay productos en el carrito');
			return;
		}
		onGoToPay();
	};

	return (
		<div className={styles.confirmContainer}>
			<Cart />
			{cart.length > 0 && (
				<div className={styles.checkoutSection}>
					<div className={styles.finalTotal}>
						<h3>Total a pagar: ${getTotalPrice()}</h3>
					</div>
					<button 
						onClick={handleGoToPay} 
						className={styles.goToPayBtn}
					>
						Proceder al pago
					</button>
				</div>
			)}
		</div>
	);
};

export default ConfirmProducts;

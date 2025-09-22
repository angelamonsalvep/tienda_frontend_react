import React from 'react';
import Product from './product';
import AddToCartButton from './AddToCartButton';
import styles from '../estilos/CardProduct.module.css';

const CardProduct = ({ product, onAddToCart }) => {
	const handleAddToCart = () => {
		onAddToCart(product);
	};

	return (
		<div className={styles.cardProduct}>
			<Product product={product} />
			<AddToCartButton onClick={handleAddToCart} />
		</div>
	);
};

// Función de comparación personalizada para React.memo
const areEqual = (prevProps, nextProps) => {
	return prevProps.product.id_producto === nextProps.product.id_producto &&
		   prevProps.onAddToCart === nextProps.onAddToCart;
};

export default React.memo(CardProduct, areEqual);

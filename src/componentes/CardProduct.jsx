import React from 'react';
import Product from './product';
import AddToCartButton from './AddToCartButton';
import styles from '../estilos/CardProduct.module.css';

const CardProduct = ({ product, onAddToCart }) => {
	return (
		<div className={styles.cardProduct}>
			<Product product={product} />
			<AddToCartButton onClick={onAddToCart} />
		</div>
	);
};

export default CardProduct;

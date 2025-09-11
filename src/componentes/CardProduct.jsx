import React from 'react';
import Product from './product';
import AddToCartButton from './AddToCartButton';

const CardProduct = ({ product, onAddToCart }) => {
	return (
		<div className="card-product">
			<Product product={product} />
			<AddToCartButton onClick={onAddToCart} />
		</div>
	);
};

export default CardProduct;

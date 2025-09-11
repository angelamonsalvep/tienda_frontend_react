import React, { useState } from 'react';
import Header from '../componentes/header';
import CardProduct from '../componentes/CardProduct';
import { productList } from '../datos/data';

const Catalog = ({ cart, setCart, onGoToCart, onToggleTheme }) => {
	const handleAddToCart = (product) => {
		setCart([...cart, product]);
	};

				return (
					<div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
						<Header title="Catálogo" onCartClick={onGoToCart} onToggleTheme={onToggleTheme} cartCount={cart.length} />
						<div className="main-content" style={{flex: 1}}>
							<div className="product-list">
								{productList.map(product => (
									<CardProduct key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
								))}
							</div>
						</div>
						<footer className="footer">MiniTienda © 2025</footer>
					</div>
				);
};

export default Catalog;

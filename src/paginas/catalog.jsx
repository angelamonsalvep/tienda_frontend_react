import React, { useState } from 'react';
import Header from '../componentes/header';
import CardProduct from '../componentes/CardProduct';
import Productos from '../componentes/Productos';

const Catalog = ({ cart, setCart, onGoToCart, onToggleTheme }) => {
	const handleAddToCart = (product) => {
		setCart([...cart, product]);
	};

	return (
		<div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
			<Header title="Catálogo" onCartClick={onGoToCart} onToggleTheme={onToggleTheme} cartCount={cart.length} />
			<div className="main-content" style={{flex: 1}}>
				<div className="product-list">
					<Productos>
						{({ productos, loading, error }) => (
							loading ? (
								<p>Cargando productos...</p>
							) : error ? (
								<p>{error}</p>
							) : (
								productos.map(product => (
									<CardProduct key={product.id_producto} product={product} onAddToCart={() => handleAddToCart(product)} />
								))
							)
						)}
					</Productos>
				</div>
			</div>
			<footer className="footer">MiniTienda © 2025</footer>
		</div>
	);
};

export default Catalog;

import React from 'react';
import Header from '../componentes/header';
import CardProduct from '../componentes/CardProduct';
import Productos from '../componentes/Productos';
import styles from '../estilos/Catalog.module.css';

const Catalog = ({ cart, setCart, onGoToCart, onToggleTheme }) => {
	const handleAddToCart = (product) => {
		setCart([...cart, product]);
	};

	return (
		<div className={styles.catalogContainer}>
			<Header title="Catálogo" onCartClick={onGoToCart} onToggleTheme={onToggleTheme} cartCount={cart.length} />
			<main className={styles.catalogMain}>
				<h2 className={styles.title}>Catálogo de Productos</h2>
				<div className={styles.productList}>
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
			</main>
			<footer style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>MiniTienda © 2025</footer>
		</div>
	);
};

export default Catalog;

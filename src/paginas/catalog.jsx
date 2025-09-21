import React, { useRef } from 'react';
// import Header from '../componentes/header';
import CardProduct from '../componentes/CardProduct';
import Productos from '../componentes/Productos';
import styles from '../estilos/Catalog.module.css';

const Catalog = ({ cart, setCart, onGoToCart, onToggleTheme }) => {
	const scrollRef = useRef(null);

	const handleAddToCart = (product) => {
		setCart([...cart, product]);
	};

	const scrollLeft = () => {
		scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
	};

	const scrollRight = () => {
		scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
	};

	return (
			<div className={styles.catalogContainer}>
				<main className={styles.catalogMain}>
					  {/* Título eliminado, ya lo muestra el header global */}
					<div className={styles.carouselContainer}>
						<button className={styles.carouselBtn} onClick={scrollLeft}>‹</button>
						<div className={styles.productList} ref={scrollRef}>
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
						<button className={styles.carouselBtn} onClick={scrollRight}>›</button>
					</div>
			</main>
			<footer style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>MiniTienda © 2025</footer>
		</div>
	);
};

export default Catalog;

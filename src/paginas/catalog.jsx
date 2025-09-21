import React, { useRef, useCallback } from 'react';
import CardProduct from '../componentes/CardProduct';
import { useProductos } from '../hooks/useProductos';
import { useCart } from '../contexts/CartContext';
import styles from '../estilos/Catalog.module.css';

const Catalog = () => {
	const scrollRef = useRef(null);
	const { productos, loading, error } = useProductos();
	const { addToCart } = useCart();

	const scrollLeft = useCallback(() => {
		scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
	}, []);

	const scrollRight = useCallback(() => {
		scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
	}, []);

	return (
		<div className={styles.catalogContainer}>
			<main className={styles.catalogMain}>
				<div className={styles.carouselContainer}>
					<button className={styles.carouselBtn} onClick={scrollLeft}>‹</button>
					<div className={styles.productList} ref={scrollRef}>
						{loading ? (
							<p>Cargando productos...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							productos.map(product => (
								<CardProduct 
									key={product.id_producto} 
									product={product} 
									onAddToCart={addToCart}
								/>
							))
						)}
					</div>
					<button className={styles.carouselBtn} onClick={scrollRight}>›</button>
				</div>
			</main>
			<footer style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>MiniTienda © 2025</footer>
		</div>
	);
};

export default Catalog;

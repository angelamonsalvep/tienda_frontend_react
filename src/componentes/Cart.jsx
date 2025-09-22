import React from 'react';
import CartItem from './CartItem';
import { useCart } from '../contexts/CartContext';
import styles from '../estilos/Cart.module.css';

const Cart = () => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.cart}>
        <h2>Carrito de compras</h2>
        <div className={styles.emptyCart}>
          <p>El carrito está vacío.</p>
          <p>¡Agrega algunos productos para comenzar!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <h2>Carrito de compras</h2>
        <span className={styles.itemCount}>
          {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
        </span>
      </div>
      
      <div className={styles.cartItemsContainer}>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <CartItem 
              key={item.id_producto} 
              item={item} 
            />
          ))}
        </div>
      </div>
      
      <div className={styles.cartActions}>
        <button 
          className={styles.clearCartBtn}
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;

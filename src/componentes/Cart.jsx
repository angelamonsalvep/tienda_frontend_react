import React from 'react';
import styles from './Cart.module.css';

const Cart = ({ cartItems }) => {
  return (
    <div className={styles.cart}>
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.nombre} - ${item.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

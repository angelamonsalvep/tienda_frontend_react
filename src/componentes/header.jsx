import React from 'react';

const Header = ({ title, onToggleTheme, onCartClick, cartCount }) => (
  <header className="header">
    <button onClick={onCartClick} className="cart-icon">
      🛒
      {cartCount > 0 && (
        <span className="cart-count">{cartCount}</span>
      )}
    </button>
    <h1>{title}</h1>
    <button onClick={onToggleTheme} className="theme-toggle">🌗</button>
  </header>
);

export default Header;

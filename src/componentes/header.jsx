import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

const Header = ({ title, onToggleTheme, onCartClick, cartCount, theme }) => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={onCartClick} className={styles.cartIcon}>
          🛒
          {cartCount > 0 && (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
        </button>
        <button
          onClick={() => navigate('/')}
          className={styles.catalogIcon}
          title="Ir al catálogo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#388e3c">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M3 6v16h18V6H3zm16 14H5V8h14v12zm-7-9h2v2h-2zm0 4h2v2h-2zm-4-4h2v2H7zm0 4h2v2H7zm8-4h2v2h-2zm0 4h2v2h-2z"/>
          </svg>
        </button>
        <button
          onClick={() => navigate('/crud-productos')}
          className={styles.crudIcon}
          title="Ir al CRUD de productos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M18 6h-2V4c0-1.1-.9-2-2-2s-2 .9-2 2v2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c0-.55.45-1 1-1s1 .45 1 1v2h-2V4zm8 16c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12z"/>
            <path d="M9 12h6v2H9zm0 4h6v2H9z" opacity="0.5"/>
          </svg>
        </button>
      </div>
      <h1 style={{ margin: '0 0 0 32px' }}>{title}</h1>
      <button onClick={onToggleTheme} className={styles.themeToggle}>🌗</button>
    </header>
  );
};

export default Header;

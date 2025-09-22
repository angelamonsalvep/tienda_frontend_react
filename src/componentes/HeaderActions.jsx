
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../estilos/header.module.css';

const HeaderActions = ({ cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isAdminSection = (
    location.pathname === '/admin' ||
    location.pathname.startsWith('/admin/') ||
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/crud-productos')
  );
  const isUserSection = (
    location.pathname === '/usuario' ||
    location.pathname.startsWith('/usuario/') ||
    location.pathname === '/catalogo' ||
    location.pathname === '/carrito' ||
    location.pathname === '/pay'
  );
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={styles.headerActions}>
      {!isHomePage && (
        <>
          {isUserSection ? (
            <>
              <button onClick={() => navigate('/carrito')} className={styles.cartIcon}>
                🛒
                {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
              </button>
            </>
          ) : isAdminSection ? (
            <>
              <button onClick={() => navigate('/crud-productos')} className={styles.crudIcon} title="Ir al CRUD de productos">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M18 6h-2V4c0-1.1-.9-2-2-2s-2 .9-2 2v2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c0-.55.45-1 1-1s1 .45 1 1v2h-2V4zm8 16c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12z"/>
                  <path d="M9 12h6v2H9zm0 4h6v2H9z" opacity="0.5"/>
                </svg>
              </button>
            </>
          ) : (
            // Para páginas generales (como /pay) solo mostrar navegación básica
            <button onClick={() => navigate('/carrito')} className={styles.cartIcon}>
              🛒
              {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </button>
          )}
        </>
      )}
      <button onClick={toggleTheme} className={styles.themeToggle} title="Cambiar tema claro/oscuro">🌗</button>
    </div>
  );
}
export default HeaderActions;

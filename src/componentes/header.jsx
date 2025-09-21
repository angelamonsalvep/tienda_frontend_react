
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../estilos/header.module.css';

const Header = ({ title, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
    location.pathname === '/pay' ||
    location.pathname.startsWith('/pay/')
  );
  return (
    <header className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minHeight: '20px', marginBottom: '8px' }}>
        {location.pathname !== '/' && (
          <>
            <button onClick={() => navigate('/')} className={styles.homeLink}>Inicio</button>
            {/* Hierarchical breadcrumbs based on app structure */}
            {(() => {
              const path = location.pathname;
              const breadcrumbs = [];
              
              // Admin section
              if (path === '/admin' || path === '/dashboard' || path.startsWith('/crud-productos')) {
                breadcrumbs.push(<button key="admin" onClick={() => navigate('/admin')} className={styles.sectionTag}>Admin</button>);
                
                if (path.startsWith('/crud-productos')) {
                  breadcrumbs.push(<button key="crud" onClick={() => navigate('/crud-productos')} className={styles.sectionTag}>CRUD Productos</button>);
                }
              }
              
              // User section
              else if (path === '/usuario' || path === '/catalogo' || path === '/carrito' || path === '/pay') {
                breadcrumbs.push(<button key="usuario" onClick={() => navigate('/usuario')} className={styles.sectionTag}>Usuario</button>);
                
                if (path === '/carrito') {
                  breadcrumbs.push(<button key="catalogo" onClick={() => navigate('/catalogo')} className={styles.sectionTag}>Catálogo</button>);
                }
                else if (path === '/pay') {
                  breadcrumbs.push(<button key="catalogo" onClick={() => navigate('/catalogo')} className={styles.sectionTag}>Catálogo</button>);
                  breadcrumbs.push(<button key="carrito" onClick={() => navigate('/carrito')} className={styles.sectionTag}>Carrito</button>);
                }
              }
              
              return breadcrumbs;
            })()}
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', marginBottom: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{title}</h1>
        {children}
      </div>
    </header>
  );
};

export default Header;

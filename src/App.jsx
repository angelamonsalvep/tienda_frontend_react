import React, { useState, useCallback } from 'react';
import { procesarPago } from './services/procesoCompraService';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { CartProvider, useCart } from './contexts/CartContext';
import Catalog from './paginas/catalog';
import ConfirmProducts from './paginas/ConfirmProducts';
import PaymentFormPage from './paginas/PaymentForm';
import ProductoCRUD from './paginas/ProductoCRUD';
import ProductoFormPage from './paginas/ProductoFormPage';
import LiveDashboard from './paginas/LiveDashboard';
import './estilos/App.css';
import Inicio from './paginas/Inicio';
import AdminHome from './paginas/AdminHome';
import UserHome from './paginas/UserHome';
import Header from './componentes/header';
import HeaderActions from './componentes/HeaderActions';

function App() {
  const handlePay = async (paymentData, cart, clearCart) => {
    try {
      const resp = await procesarPago(paymentData, cart);
      console.log('Usuario creado:', resp);
      alert('¡Pago realizado y usuario creado!');
      clearCart();
    } catch (error) {
      alert('Error al crear usuario');
      console.error(error);
    }
  };

  function AppRoutes() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { cart, clearCart, cartCount } = useCart();
    
    // Map de rutas a títulos
    const headerTitles = {
      '/': 'MiniTienda',
      '/admin': 'Panel Administrador',
      '/usuario': 'Panel Usuario',
      '/catalogo': 'Catálogo',
      '/carrito': 'Carrito',
      '/pay': 'Pago',
      '/crud-productos': 'CRUD Productos',
      '/crud-productos/nuevo': 'Nuevo Producto',
      '/dashboard': 'Dashboard',
    };
    // Para rutas con parámetros
    let headerTitle = headerTitles[location.pathname] || 'MiniTienda';
    if (location.pathname.startsWith('/crud-productos/editar')) {
      headerTitle = 'Editar Producto';
    }
    const navigate = useNavigate();
    return (
      <div className={`app-container${theme === 'dark' ? ' dark' : ''}`}>
        <Header title={headerTitle}>
          <HeaderActions cartCount={cartCount} />
        </Header>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/usuario" element={<UserHome />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route
            path="/carrito"
            element={
              <ConfirmProducts
                cart={cart}
                onGoToPay={() => navigate('/pay')}
              />
            }
          />
          <Route
            path="/pay"
            element={
              <PaymentFormPage
                cart={cart}
                onPay={(paymentData) => handlePay(paymentData, cart, clearCart)}
              />
            }
          />
          <Route
            path="/crud-productos"
            element={<ProductoCRUD />}
          />
          <Route
            path="/crud-productos/nuevo"
            element={<ProductoFormPage />}
          />
          <Route
            path="/crud-productos/editar/:id"
            element={<ProductoFormPage />}
          />
          <Route
            path="/dashboard"
            element={<LiveDashboard />}
          />
        </Routes>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

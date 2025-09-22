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
import PaymentSuccessModal from './componentes/PaymentSuccessModal';
import './estilos/App.css';
import Inicio from './paginas/Inicio';
import AdminHome from './paginas/AdminHome';
import UserHome from './paginas/UserHome';
import Header from './componentes/header';
import HeaderActions from './componentes/HeaderActions';

function App() {
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    info: null
  });

  const handlePay = async (paymentData, cart, clearCart) => {
    try {
      const resp = await procesarPago(paymentData, cart);
      
      // Calcular el total del carrito
      const totalAmount = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
      
      // Configurar información del modal
      const modalInfo = {
        success: true,
        userAlreadyExists: resp.usuario.usuario_existente,
        userMessage: resp.usuario.usuario_existente 
          ? 'El usuario ya existía en el sistema, pero tu pedido ha sido procesado correctamente.'
          : 'Usuario creado exitosamente.',
        paymentMessage: 'Tu pedido ha sido procesado correctamente.',
        totalAmount: totalAmount
      };
      
      setPaymentModal({
        isOpen: true,
        info: modalInfo
      });
      
      console.log('Proceso completado:', resp);
      clearCart();
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      
      // Mostrar modal de error
      const modalInfo = {
        success: false,
        paymentMessage: 'Error al procesar el pago. Por favor, inténtalo de nuevo.',
        totalAmount: 0
      };
      
      setPaymentModal({
        isOpen: true,
        info: modalInfo
      });
    }
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      info: null
    });
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
          <PaymentSuccessModal 
            isOpen={paymentModal.isOpen}
            onClose={closePaymentModal}
            paymentInfo={paymentModal.info}
          />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

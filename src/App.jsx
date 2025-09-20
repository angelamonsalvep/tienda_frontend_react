import React, { useState, useEffect } from 'react';
import { procesarPago } from './services/procesoCompraService';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Catalog from './paginas/catalog';
import ConfirmProducts from './paginas/ConfirmProducts';
import PaymentFormPage from './paginas/PaymentForm';
import ProductoCRUD from './paginas/ProductoCRUD';
import ProductoFormPage from './paginas/ProductoFormPage';
import LiveDashboard from './paginas/LiveDashboard';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handlePay = async (paymentData) => {
    try {
      const resp = await procesarPago(paymentData, cart);
      console.log('Usuario creado:', resp);
      alert('¡Pago realizado y usuario creado!');
      setCart([]);
    } catch (error) {
      alert('Error al crear usuario');
      console.error(error);
    }
  };
  const handleToggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  function AppRoutes() {
    const navigate = useNavigate();
    const commonProps = {
      onToggleTheme: handleToggleTheme,
      theme,
      onCartClick: () => navigate('/confirm'),
    };
    return (
      <div className={`app-container${theme === 'dark' ? ' dark' : ''}`}>
  <Routes>
          <Route
            path="/"
            element={
              <Catalog
                cart={cart}
                setCart={setCart}
                onGoToCart={() => navigate('/confirm')}
                {...commonProps}
              />
            }
          />
          <Route
            path="/confirm"
            element={
              <ConfirmProducts
                cart={cart}
                onGoToPay={() => navigate('/pay')}
                {...commonProps}
              />
            }
          />
          <Route
            path="/pay"
            element={
              <PaymentFormPage
                cart={cart}
                onPay={handlePay}
                {...commonProps}
              />
            }
          />
          <Route
            path="/crud-productos"
            element={<ProductoCRUD {...commonProps} />}
          />
          <Route
            path="/crud-productos/nuevo"
            element={<ProductoFormPage {...commonProps} />}
          />
          <Route
            path="/crud-productos/editar/:id"
            element={<ProductoFormPage {...commonProps} />}
          />
          <Route
            path="/dashboard"
            element={<LiveDashboard {...commonProps} />}
          />
        </Routes>
      </div>
    );
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

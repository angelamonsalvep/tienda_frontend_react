import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './paginas/catalog';
import ConfirmProducts from './paginas/ConfirmProducts';
import PaymentFormPage from './paginas/PaymentForm';
import ProductoCRUD from './paginas/ProductoCRUD';
import ProductoFormPage from './paginas/ProductoFormPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('light');

  const handlePay = (paymentData) => {
    alert('¡Pago realizado!');
    setCart([]);
  };
  const handleToggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Router>
      <div className={`app-container${theme === 'dark' ? ' dark-theme' : ''}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Catalog
                cart={cart}
                setCart={setCart}
                onGoToCart={() => window.location.replace('/confirm')}
                onToggleTheme={handleToggleTheme}
              />
            }
          />
          <Route
            path="/confirm"
            element={
              <ConfirmProducts
                cart={cart}
                onGoToPay={() => window.location.replace('/pay')}
                onToggleTheme={handleToggleTheme}
              />
            }
          />
          <Route
            path="/pay"
            element={
              <PaymentFormPage
                cart={cart}
                onPay={handlePay}
                onToggleTheme={handleToggleTheme}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

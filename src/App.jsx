import React, { useState } from 'react';
import Catalog from './paginas/catalog';
import ConfirmProducts from './paginas/ConfirmProducts';
import PaymentFormPage from './paginas/PaymentForm';
import './App.css';

function App() {
  const [page, setPage] = useState('catalog');
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('light');

  const handleGoToCart = () => setPage('confirm');
  const handleGoToPay = () => setPage('pay');
  const handlePay = (paymentData) => {
    alert('¡Pago realizado!');
    setCart([]);
    setPage('catalog');
  };
  const handleToggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className={`app-container${theme === 'dark' ? ' dark-theme' : ''}`}>
      {page === 'catalog' && (
        <Catalog cart={cart} setCart={setCart} onGoToCart={handleGoToCart} onToggleTheme={handleToggleTheme} />
      )}
      {page === 'confirm' && (
        <ConfirmProducts cart={cart} onGoToPay={handleGoToPay} onToggleTheme={handleToggleTheme} />
      )}
      {page === 'pay' && (
        <PaymentFormPage cart={cart} onPay={handlePay} onToggleTheme={handleToggleTheme} />
      )}
    </div>
  );
}

export default App;

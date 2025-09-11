import React from 'react';

const PayButton = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="pay-btn">
    Pagar
  </button>
);

export default PayButton;

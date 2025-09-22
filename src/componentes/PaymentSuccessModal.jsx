import React from 'react';
import styles from '../estilos/PaymentSuccessModal.module.css';

const PaymentSuccessModal = ({ isOpen, onClose, paymentInfo }) => {
  if (!isOpen) return null;

  const { success, userAlreadyExists, userMessage, paymentMessage, totalAmount } = paymentInfo;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.successIcon}>
            {success ? '✅' : '❌'}
          </div>
          <h2 className={styles.modalTitle}>
            {success ? '¡Pago Realizado Exitosamente!' : 'Error en el Pago'}
          </h2>
        </div>

        <div className={styles.modalBody}>
          {success && (
            <>
              <div className={styles.paymentInfo}>
                <div className={styles.amountSection}>
                  <span className={styles.amountLabel}>Total Pagado:</span>
                  <span className={styles.amountValue}>{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className={styles.paymentConfirmation}>
                <div className={styles.infoIcon}>✅</div>
                <div className={styles.infoText}>
                  <p>
                    {userAlreadyExists 
                      ? 'Tu pedido ha sido procesado correctamente. El usuario ya existía en el sistema.'
                      : 'Tu pedido ha sido procesado correctamente y tu usuario ha sido creado.'
                    }
                  </p>
                </div>
              </div>
            </>
          )}

          {!success && (
            <div className={styles.errorInfo}>
              <p>{paymentMessage || 'Hubo un error al procesar tu pago. Por favor, inténtalo de nuevo.'}</p>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
          >
            {success ? 'Continuar Comprando' : 'Intentar de Nuevo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
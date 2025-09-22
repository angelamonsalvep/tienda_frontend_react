import React, { useMemo } from 'react';
import styles from '../estilos/CardForm.module.css';

const CardForm = ({ form, onChange }) => {
  // Validaciones individuales
  const validation = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    return {
      ownerName: {
        isValid: form.ownerName.trim() !== '',
        message: form.ownerName.trim() === '' ? 'Nombre del titular requerido' : ''
      },
      cardNumber: {
        isValid: form.cardNumber.replace(/\s/g, '').length === 16,
        message: form.cardNumber.replace(/\s/g, '').length !== 16 ? 'Debe tener 16 dígitos' : ''
      },
      expirationMonth: {
        isValid: form.expirationMonth.length === 2 && 
                parseInt(form.expirationMonth) >= 1 && 
                parseInt(form.expirationMonth) <= 12,
        message: (form.expirationMonth.length !== 2 || parseInt(form.expirationMonth) < 1 || parseInt(form.expirationMonth) > 12) 
                 ? 'Mes inválido (01-12)' : ''
      },
      expirationYear: {
        isValid: form.expirationYear.length === 4 && 
                parseInt(form.expirationYear) >= currentYear &&
                (parseInt(form.expirationYear) > currentYear || 
                 parseInt(form.expirationMonth) > currentMonth),
        message: (() => {
          if (form.expirationYear.length !== 4) return 'Año debe tener 4 dígitos';
          if (parseInt(form.expirationYear) < currentYear) return 'Tarjeta expirada';
          if (parseInt(form.expirationYear) === currentYear && parseInt(form.expirationMonth) <= currentMonth) {
            return 'Tarjeta expirada';
          }
          return '';
        })()
      },
      cvv: {
        isValid: form.cvv.length >= 3 && form.cvv.length <= 4,
        message: (form.cvv.length < 3 || form.cvv.length > 4) ? 'CVV debe tener 3-4 dígitos' : ''
      }
    };
  }, [form]);

  const getInputClass = (fieldName) => {
    if (!form[fieldName]) return styles.input;
    const field = validation[fieldName];
    if (field.isValid) return `${styles.input} ${styles.valid}`;
    if (field.message) return `${styles.input} ${styles.invalid}`;
    return styles.input;
  };

  return (
    <div className={styles.cardForm}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Nombre del titular"
          value={form.ownerName}
          onChange={e => onChange({ ...form, ownerName: e.target.value })}
          maxLength="50"
          className={getInputClass('ownerName')}
        />
        {validation.ownerName.message && (
          <div className={styles.errorMessage}>
            ⚠️ {validation.ownerName.message}
          </div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Número de tarjeta (16 dígitos)"
          value={form.cardNumber}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, '');
            const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            onChange({ ...form, cardNumber: formattedValue });
          }}
          maxLength="19"
          className={getInputClass('cardNumber')}
        />
        {validation.cardNumber.message && (
          <div className={styles.errorMessage}>
            ⚠️ {validation.cardNumber.message}
          </div>
        )}
      </div>

      <div className={styles.dateRow}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="MM"
            value={form.expirationMonth}
            onChange={e => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 2) {
                onChange({ ...form, expirationMonth: value });
              }
            }}
            maxLength="2"
            className={getInputClass('expirationMonth')}
          />
          {validation.expirationMonth.message && (
            <div className={styles.errorMessage}>
              ⚠️ {validation.expirationMonth.message}
            </div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="YYYY"
            value={form.expirationYear}
            onChange={e => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 4) {
                onChange({ ...form, expirationYear: value });
              }
            }}
            maxLength="4"
            className={getInputClass('expirationYear')}
          />
          {validation.expirationYear.message && (
            <div className={styles.errorMessage}>
              ⚠️ {validation.expirationYear.message}
            </div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="CVV"
            value={form.cvv}
            onChange={e => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 4) {
                onChange({ ...form, cvv: value });
              }
            }}
            maxLength="4"
            className={getInputClass('cvv')}
          />
          {validation.cvv.message && (
            <div className={styles.errorMessage}>
              ⚠️ {validation.cvv.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardForm;

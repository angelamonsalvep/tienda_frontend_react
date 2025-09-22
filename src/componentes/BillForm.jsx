import React from 'react';
import styles from '../estilos/BillForm.module.css';

const BillForm = ({ form, onChange }) => {
  // Validar formato de email
  const isEmailValid = (email) => {
    if (!email.trim()) return null; // No mostrar error si está vacío
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const emailValidation = isEmailValid(form.email);

  return (
    <div className={styles.billForm}>
      <input
        type="text"
        placeholder="Nombre"
        value={form.firstName}
        onChange={e => onChange({ ...form, firstName: e.target.value })}
        className={!form.firstName.trim() && form.firstName !== '' ? styles.invalid : ''}
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={form.lastName}
        onChange={e => onChange({ ...form, lastName: e.target.value })}
        className={!form.lastName.trim() && form.lastName !== '' ? styles.invalid : ''}
        required
      />
      <div className={styles.emailContainer}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email || ''}
          onChange={e => onChange({ ...form, email: e.target.value })}
          className={`${styles.fullWidth} ${emailValidation === false ? styles.invalid : emailValidation === true ? styles.valid : ''}`}
          required
        />
        {emailValidation === false && (
          <div className={styles.errorMessage}>
            ⚠️ Por favor ingresa un correo electrónico válido
          </div>
        )}
        {emailValidation === true && (
          <div className={styles.successMessage}>
            ✅ Correo electrónico válido
          </div>
        )}
      </div>
    </div>
  );
};

export default BillForm;

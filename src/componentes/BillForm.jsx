import React from 'react';
import styles from '../estilos/BillForm.module.css';

const BillForm = ({ form, onChange }) => {
  // Validar formato de email
  const isEmailValid = (email) => {
    if (!email.trim()) return null; // No mostrar error si está vacío
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Validar campos de texto
  const isFieldValid = (value) => {
    if (!value) return null; // No mostrar error si está vacío inicialmente
    return value.trim() !== '';
  };

  const emailValidation = isEmailValid(form.email);
  const firstNameValidation = isFieldValid(form.firstName);
  const lastNameValidation = isFieldValid(form.lastName);

  return (
    <div className={styles.billForm}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.firstName}
          onChange={e => onChange({ ...form, firstName: e.target.value })}
          className={firstNameValidation === false ? styles.invalid : firstNameValidation === true ? styles.valid : ''}
          required
        />
        {firstNameValidation === false && (
          <div className={styles.errorMessage}>
            ⚠️ El nombre es requerido
          </div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Apellido"
          value={form.lastName}
          onChange={e => onChange({ ...form, lastName: e.target.value })}
          className={lastNameValidation === false ? styles.invalid : lastNameValidation === true ? styles.valid : ''}
          required
        />
        {lastNameValidation === false && (
          <div className={styles.errorMessage}>
            ⚠️ El apellido es requerido
          </div>
        )}
      </div>

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

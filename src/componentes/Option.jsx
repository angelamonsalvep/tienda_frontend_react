import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../estilos/Option.module.css';

const Option = ({ img, alt, title, route, color }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.optionBox} style={{ borderColor: color }}>
      <img src={img} alt={alt} className={styles.optionImg} />
      <h2>{title}</h2>
      <button style={{ background: color }} onClick={() => navigate(route)}>
        Acceder
      </button>
    </div>
  );
};

export default Option;

import React from 'react';
import Option from '../componentes/Option';
import OptionImg from '../assets/react.svg';
import styles from '../estilos/Inicio.module.css'; // importa el CSS module

const Inicio = () => {
  return (
    <div className={styles.inicioContainer}>
      <div className={styles.opciones}>
        <Option
          img={OptionImg}
          alt="Admin"
          title="Administrador"
          route="/admin"
          color="#1976d2"
        />
        <Option
          img={OptionImg}
          alt="Usuario"
          title="Usuario"
          route="/usuario"
          color="#388e3c"
        />
      </div>
    </div>
  );
};

export default Inicio;

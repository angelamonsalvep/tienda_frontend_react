import React from 'react';
import Option from '../componentes/Option';
import OptionImg from '../assets/react.svg';
import styles from '../estilos/Inicio.module.css';

const Inicio = () => {
  return (
    <div className={styles.inicioContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleHighlight}>Mini</span>Tienda
          </h1>
          <p className={styles.heroSubtitle}>
            Tu tienda online moderna y fácil de usar
          </p>
          <p className={styles.heroDescription}>
            Gestiona productos, realiza ventas y lleva el control de tu negocio 
            de manera simple y eficiente. Diseñada para pequeñas empresas que 
            buscan crecer.
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>🛍️</div>
            <span>Fácil de usar</span>
          </div>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>📊</div>
            <span>Control total</span>
          </div>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>💳</div>
            <span>Pagos seguros</span>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section className={styles.accessSection}>
        <h2 className={styles.sectionTitle}>Elige tu tipo de acceso</h2>
        <p className={styles.sectionSubtitle}>
          Selecciona el perfil que mejor se adapte a tus necesidades
        </p>
        
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
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>¿Por qué elegir MiniTienda?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Rápido y eficiente</h3>
            <p>Interfaz optimizada para realizar tareas rápidamente</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Seguro y confiable</h3>
            <p>Tus datos están protegidos con la mejor seguridad</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3>Responsive</h3>
            <p>Funciona perfectamente en cualquier dispositivo</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💝</div>
            <h3>Fácil de usar</h3>
            <p>Diseño intuitivo que no requiere capacitación</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;

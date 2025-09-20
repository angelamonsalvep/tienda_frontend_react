import React, { useEffect, useState } from 'react';
import { getVentasTop, getVentasSerie } from '../services/analiticaService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import styles from '../estilos/LiveDashboard.module.css';
import Header from '../componentes/header';

// Este componente será el dashboard para mostrar las gráficas
const LiveDashboard = ({onToggleTheme, theme, onCartClick}) => {
  const [topProductos, setTopProductos] = useState([]);
  const [ventasSerie, setVentasSerie] = useState({ labels: [], series: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const top = await getVentasTop({ days: 30, metric: 'cantidad', limit: 6 });
        setTopProductos(top);
        const serie = await getVentasSerie({ days: 30, metric: 'cantidad', top: 5 });
        setVentasSerie(serie);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
  <Header title="Dashboard de Gráficas en Vivo" onCartClick={onCartClick} onToggleTheme={onToggleTheme} theme={theme}/>
      <div className={styles['dashboard-container']}>
        {loading && <p>Cargando datos...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <div className={styles['dashboard-sections-wrapper']}>
          {/* Gráfica de productos top */}
          <section className={styles['dashboard-section']}>
            <h3>Productos más vendidos (últimos 30 días)</h3>
            <div className={styles['dashboard-chart']}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="nombre_producto" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cantidad" fill="#8884d8" name="Cantidad Vendida" />
                  <Bar dataKey="subtotal" fill="#82ca9d" name="Ingresos ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Serie temporal de ventas por producto top */}
          <section className={styles['dashboard-section']}>
            <h3>Serie temporal de ventas por producto</h3>
            <div className={styles['dashboard-chart']}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ventasSerie.labels.map((fecha, idx) => {
                  const row = { fecha };
                  ventasSerie.series.forEach(s => {
                    row[s.titulo] = s.data[idx];
                  });
                  return row;
                })} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {ventasSerie.series.map(s => (
                    <Line key={s.titulo} type="monotone" dataKey={s.titulo} stroke="#8884d8" />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LiveDashboard;

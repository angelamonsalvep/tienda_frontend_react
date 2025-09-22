import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const API_URL = `${API_BASE_URL}/productos`;

function Productos({ children, reload }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.productos);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar productos");
        setLoading(false);
      });
  }, [reload]);

  return children({ productos, loading, error });
}

// Memoizar el componente para evitar re-renders innecesarios
export default React.memo(Productos);

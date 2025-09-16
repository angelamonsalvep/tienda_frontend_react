import React, { useEffect, useState } from "react";

export const API_URL = "http://localhost:5000/productos";

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

export default Productos;

import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/productos";

function Productos({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  return children({ productos, loading, error });
}

export default Productos;

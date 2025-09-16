import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/usuarios"; // Cambia la URL si tu API corre en otro puerto o ruta

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data.usuarios);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar usuarios");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id_usuario}>
            {u.nombre_usuario} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;

// Servicio para consumir endpoints relacionados a usuarios

const API_URL = "http://127.0.0.1:5000/usuarios";

export async function crearUsuario({ nombre_usuario, email }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre_usuario, email })
  });
  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }
  return await response.json();
}

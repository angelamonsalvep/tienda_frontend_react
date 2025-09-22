// Servicio para consumir endpoints relacionados a usuarios

const API_URL = "http://127.0.0.1:5000/usuarios";

export async function crearUsuario({ nombre_usuario, email }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre_usuario, email })
  });
  
  if (response.ok) {
    return await response.json();
  }
  
  // Manejar caso específico de usuario existente (409 CONFLICT)
  if (response.status === 409) {
    const errorData = await response.json();
    const error = new Error(errorData.mensaje || "El usuario ya existe");
    error.status = 409;
    error.existingUser = true;
    error.existingUserData = errorData; // Incluir datos del usuario existente
    
    // Intentar extraer el ID del usuario del mensaje de error si está disponible
    if (errorData.id_usuario) {
      error.id_usuario = errorData.id_usuario;
    }
    
    throw error;
  }
  
  // Otros errores
  throw new Error("Error al crear usuario");
}

// Nueva función para buscar usuario por email
export async function buscarUsuarioPorEmail(email) {
  try {
    // Intentar buscar por parámetro de query
    const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    // Si no funciona con query parameter, intentar con endpoint específico
    const response2 = await fetch(`${API_URL}/buscar/${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response2.ok) {
      return await response2.json();
    }
    
    throw new Error("No se pudo buscar el usuario");
  } catch (error) {
    throw new Error("Error al buscar usuario: " + error.message);
  }
}

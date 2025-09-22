// Configuración centralizada de la API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  ENDPOINTS: {
    PRODUCTOS: "/productos",
    USUARIOS: "/usuarios", 
    PEDIDOS: "/pedidos",
    DETALLES_PEDIDO: "/detalles_pedido",
    VENTAS_TOP: "/api/ventas-top",
    VENTAS_SERIE: "/api/ventas-serie"
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint, id = null) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  return id ? `${url}/${id}` : url;
};
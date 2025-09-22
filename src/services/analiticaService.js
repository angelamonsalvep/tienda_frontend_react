// src/services/analiticaService.js
// Servicio para consumir los endpoints de analítica del backend

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Obtiene los productos más vendidos o con más ingresos en el rango de días.
 * @param {Object} params - { days, metric, limit }
 * @returns {Promise<Array>} Array de productos top
 */
export async function getVentasTop(params = {}) {
  const { days = 30, metric = "cantidad", limit = 6 } = params;
  const url = `${API_BASE}/api/ventas-top?days=${days}&metric=${metric}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener productos top");
  return await res.json();
}

/**
 * Obtiene la serie temporal de ventas o ingresos para los productos top en el rango de días.
 * @param {Object} params - { days, metric, top }
 * @returns {Promise<Object>} { labels: [], series: [] }
 */
export async function getVentasSerie(params = {}) {
  const { days = 30, metric = "cantidad", top = 5 } = params;
  const url = `${API_BASE}/api/ventas-serie?days=${days}&metric=${metric}&top=${top}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener serie de ventas");
  return await res.json();
}

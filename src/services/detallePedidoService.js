// Servicio para consumir el endpoint de detalles de pedido
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const DETALLE_URL = `${API_BASE_URL}/detalles_pedido`;

export async function crearDetallePedido({ id_pedido, id_producto, cantidad, precio_unitario }) {
  const response = await fetch(DETALLE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_pedido, id_producto, cantidad, precio_unitario })
  });
  if (!response.ok) throw new Error("Error al crear detalle de pedido");
  return await response.json();
}

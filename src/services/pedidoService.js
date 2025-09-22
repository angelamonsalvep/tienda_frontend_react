// Servicio para consumir el endpoint de pedidos
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const PEDIDO_URL = `${API_BASE_URL}/pedidos`;

export async function crearPedido({ id_usuario, fecha_pedido, total }) {
  const response = await fetch(PEDIDO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_usuario, fecha_pedido, total })
  });
  if (!response.ok) throw new Error("Error al crear pedido");
  return await response.json();
}

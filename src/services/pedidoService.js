// Servicio para consumir el endpoint de pedidos
const PEDIDO_URL = "http://127.0.0.1:5000/pedidos";

export async function crearPedido({ id_usuario, fecha_pedido, total }) {
  const response = await fetch(PEDIDO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_usuario, fecha_pedido, total })
  });
  if (!response.ok) throw new Error("Error al crear pedido");
  return await response.json();
}

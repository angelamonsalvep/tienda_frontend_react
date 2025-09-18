// Servicio para consumir el endpoint de detalles de pedido
const DETALLE_URL = "http://127.0.0.1:5000/detalles_pedido";

export async function crearDetallePedido({ id_pedido, id_producto, cantidad, precio_unitario }) {
  const response = await fetch(DETALLE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_pedido, id_producto, cantidad, precio_unitario })
  });
  if (!response.ok) throw new Error("Error al crear detalle de pedido");
  return await response.json();
}

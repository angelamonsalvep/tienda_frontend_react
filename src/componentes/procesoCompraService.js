// Servicio para manejar el proceso completo de compra
import { crearUsuario } from './usuarioService';
import { crearPedido } from './pedidoService';
import { crearDetallePedido } from './detallePedidoService';

export async function procesarPago(paymentData, cart) {
  const { billForm } = paymentData;
  const usuario = {
    nombre_usuario: `${billForm.firstName} ${billForm.lastName}`,
    email: billForm.email
  };
  try {
    // 1. Crear usuario
    const respUsuario = await crearUsuario(usuario);
    const id_usuario = respUsuario.id_usuario;

    // 2. Crear pedido
    const fecha_pedido = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
    const total = cart.reduce((sum, item) => sum + item.precio, 0);
    const respPedido = await crearPedido({ id_usuario, fecha_pedido, total });
    const id_pedido = respPedido.id_pedido;

    // 3. Crear detalles de pedido
    for (const item of cart) {
      await crearDetallePedido({
        id_pedido,
        id_producto: item.id_producto || item.id, // depende de cómo esté en el carrito
        cantidad: item.cantidad || 1, // ajusta si tienes cantidad
        precio_unitario: item.precio
      });
    }

    return { usuario: respUsuario, pedido: respPedido };
  } catch (error) {
    throw error;
  }
}

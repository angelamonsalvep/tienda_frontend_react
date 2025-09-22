// Servicio para manejar el proceso completo de compra
import { crearUsuario, buscarUsuarioPorEmail } from './usuarioService';
import { crearPedido } from './pedidoService';
import { crearDetallePedido } from './detallePedidoService';

// Función auxiliar para generar hash simple (último recurso)
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a 32bit integer
  }
  return Math.abs(hash);
}

export async function procesarPago(paymentData, cart) {
  const { billForm } = paymentData;
  const usuario = {
    nombre_usuario: `${billForm.firstName} ${billForm.lastName}`,
    email: billForm.email
  };
  
  try {
    let respUsuario;
    let id_usuario;
    
    // 1. Intentar crear usuario
    try {
      respUsuario = await crearUsuario(usuario);
      id_usuario = respUsuario.id_usuario;
    } catch (error) {
      // Si el usuario ya existe (409), intentar múltiples estrategias para obtener el ID
      if (error.status === 409 && error.existingUser) {
        try {
          // Estrategia 1: Usar ID del error si está disponible
          if (error.id_usuario) {
            id_usuario = error.id_usuario;
            
            respUsuario = {
              mensaje: `El usuario con email ${billForm.email} ya existe en el sistema. ¡No te preocupes! Continuaremos con tu pedido.`,
              usuario_existente: true,
              email: billForm.email,
              id_usuario: error.id_usuario
            };
          } else {
            // Estrategia 2: Buscar usuario por email
            const usuariosExistentes = await buscarUsuarioPorEmail(billForm.email);
            
            if (usuariosExistentes && usuariosExistentes.length > 0) {
              const usuarioExistente = usuariosExistentes[0];
              id_usuario = usuarioExistente.id_usuario;
              
              respUsuario = {
                mensaje: `El usuario con email ${billForm.email} ya existe en el sistema. ¡No te preocupes! Continuaremos con tu pedido.`,
                usuario_existente: true,
                email: billForm.email,
                id_usuario: usuarioExistente.id_usuario,
                nombre_usuario: usuarioExistente.nombre_usuario
              };
            } else {
              // Estrategia 3: Como último recurso, generar un ID temporal basado en hash del email
              // Esto es solo para casos extremos y debería ser mejorado en el backend
              id_usuario = Math.abs(hashCode(billForm.email));
              
              respUsuario = {
                mensaje: `El usuario con email ${billForm.email} ya existe. Se generó un ID temporal para completar la compra.`,
                usuario_existente: true,
                email: billForm.email,
                id_usuario: id_usuario,
                temporal: true
              };
              
              console.warn("Usando ID temporal para usuario existente. Esto debería resolverse en el backend.");
            }
          }
          
          // Mostrar notificación al usuario
          if (typeof window !== 'undefined') {
            alert(respUsuario.mensaje);
          }
          
        } catch (searchError) {
          throw new Error(`Error al buscar usuario existente: ${searchError.message}`);
        }
      } else {
        // Re-lanzar otros errores
        throw error;
      }
    }

    // 2. Crear pedido
    const fecha_pedido = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
    const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    const respPedido = await crearPedido({ id_usuario, fecha_pedido, total });
    const id_pedido = respPedido.id_pedido;

    // 3. Crear detalles de pedido
    for (const item of cart) {
      await crearDetallePedido({
        id_pedido,
        id_producto: item.id_producto || item.id,
        cantidad: item.quantity || 1,
        precio_unitario: item.precio
      });
    }

    return { usuario: respUsuario, pedido: respPedido };
  } catch (error) {
    throw error;
  }
}

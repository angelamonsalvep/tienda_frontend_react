CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    imagen_url VARCHAR(200),
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL
);
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
    fecha_pedido DATE,
    total NUMERIC(10, 2) NOT NULL
);
CREATE TABLE IF NOT EXISTS detalles_pedido (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INTEGER NOT NULL REFERENCES pedidos(id_pedido),
    id_producto INTEGER NOT NULL REFERENCES productos(id_producto),
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL
);
INSERT INTO productos (nombre_producto, imagen_url, descripcion, precio) VALUES
('Producto 1', 'https://via.placeholder.com/150', 'Descripción del producto 1', 10.00),
('Producto 2', 'https://via.placeholder.com/150', 'Descripción del producto 2', 20.00),
('Producto 3', 'https://via.placeholder.com/150', 'Descripción del producto 3', 30.00);

INSERT INTO usuarios (nombre_usuario, email) VALUES
('Usuario 1', 'usuario1@example.com'),
('Usuario 2', 'usuario2@example.com'),
('Usuario 3', 'usuario3@example.com');

-- Para los inserts de pedidos y detalles_pedido, debes conocer los IDs generados por los inserts anteriores.
-- Ejemplo:
-- INSERT INTO pedidos (id_usuario, fecha_pedido, total) VALUES (1, '2023-10-01', 30.00);
-- INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (1, 1, 2, 10.00);
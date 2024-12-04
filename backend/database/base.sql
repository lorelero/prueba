-- Conectar a la base de datos
\c viveoutdoors;

-- Eliminar tablas no deseadas
DROP TABLE IF EXISTS detallesPedido CASCADE;
DROP TABLE IF EXISTS productos_categorias CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS direcciones CASCADE;
DROP TABLE IF EXISTS productos_sale CASCADE;
DROP TABLE IF EXISTS imagenes_productos CASCADE;

-- Crear tablas necesarias
CREATE TABLE usuarios ( 
    id_usuario SERIAL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    telefono VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    rol VARCHAR(7) CHECK (rol IN ('admin', 'cliente')) DEFAULT 'cliente' 
);

CREATE TABLE direcciones ( 
    id_direccion SERIAL PRIMARY KEY, 
    id_usuario INT NOT NULL, 
    direccion VARCHAR(255) NOT NULL, 
    ciudad VARCHAR(100) NOT NULL, 
    region VARCHAR(100) NOT NULL, 
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE productos ( 
    id_producto SERIAL PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL, 
    descripcion TEXT, 
    stock INT NOT NULL, 
    precio INT NOT NULL, 
    url_imagen VARCHAR(255) NOT NULL, 
    texto_alternativo VARCHAR(255) NOT NULL
);

CREATE TABLE productos_sale ( 
    id_producto INT NOT NULL, 
    descuento INT NOT NULL, 
    estado VARCHAR(8) CHECK (estado IN ('activo', 'inactivo')) NOT NULL DEFAULT 'inactivo', 
    PRIMARY KEY (id_producto), 
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE 
);

CREATE TABLE pedidos ( 
    id_pedido SERIAL PRIMARY KEY, 
    id_usuario INT NOT NULL, 
    fecha_pedido TIMESTAMP NOT NULL, 
    estado VARCHAR(10) CHECK (estado IN ('pendiente', 'enviado', 'completado', 'cancelado')) DEFAULT 'pendiente', 
    total INT NOT NULL, 
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE 
); 

CREATE TABLE detallesPedido ( 
    id_detalle SERIAL PRIMARY KEY, 
    id_pedido INT NOT NULL, 
    id_producto INT NOT NULL, 
    cantidad INT NOT NULL, 
    precio INT NOT NULL, 
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE, 
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE 
); 

CREATE TABLE carrito ( 
    id_carrito SERIAL PRIMARY KEY, 
    id_usuario INT NOT NULL, 
    fecha_creacion TIMESTAMP NOT NULL, 
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE 
); 

CREATE TABLE detallesCarrito ( 
    id_detalle_carrito SERIAL PRIMARY KEY, 
    id_carrito INT NOT NULL, 
    id_producto INT NOT NULL, 
    cantidad INT NOT NULL, 
    precio INT NOT NULL, 
    FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito) ON DELETE CASCADE, 
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE 
);

CREATE TABLE publicaciones ( 
    id_publicacion SERIAL PRIMARY KEY, 
    id_producto INT NOT NULL, 
    id_usuario INT NOT NULL, 
    estado VARCHAR(8) CHECK (estado IN ('activo', 'inactivo')) DEFAULT 'inactivo', 
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE, 
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Insertar datos en las tablas
INSERT INTO usuarios (nombre, apellido, email, telefono, password, rol) VALUES 
('juan', 'perez', 'admin1@example.com', '1234567890', '$2a$10$brMjQTyiKsRz3gPyZdjJsepKn2hF4Es70FoFg36DbxGHN7ZzogUr6', 'admin'),
('ana', 'gomez', 'admin2@example.com', '0987654321', '$2a$10$brMjQTyiKsRz3gPyZdjJsepKn2hF4Es70FoFg36DbxGHN7ZzogUr6', 'admin'),
('maria', 'lopez', 'cliente1@example.com', '1122334455', '$2a$10$I8B.uHHNCZVhi/UXTX6cs.l5ZlDx9fBQLhOk4vBR3RHMSYCjkQOc.', 'cliente');

INSERT INTO direcciones (id_usuario, direccion, ciudad, region) VALUES 
(1, 'Calle Admin1', 'Santiago', 'Metropolitana'),
(2, 'Calle Admin2', 'Santiago', 'Metropolitana'),
(3, 'Calle 123', 'Santiago', 'Metropolitana'),
(3, 'Avenida 456', 'Casablanca', 'Valparaíso');

INSERT INTO productos (nombre, descripcion, stock, precio, url_imagen, texto_alternativo) VALUES 
('Carpa Everest', 'Carpa de alta montaña', 10, 200000, 'https://m.media-amazon.com/images/I/61zzlUv-4eL._AC_SL1500_.jpg', 'Imagen de Carpa Everest - Cerrada'),
('Carpa Igloo', 'Carpa para 4 personas', 15, 120000, 'https://m.media-amazon.com/images/I/61+B+9TQYhL._AC_SX679_.jpg', 'Imagen de Carpa Igloo - Dos modos'),
('Mochila Montañista', 'Mochila de 70 litros', 20, 40000, 'https://m.media-amazon.com/images/I/61lYcYQnRBL._AC_SL1000_.jpg', 'Imagen de Mochila Montañista - Frente'),
('Mochila Trekking', 'Mochila ligera de 30 litros', 30, 30000, 'https://m.media-amazon.com/images/I/81siwI2UxEL._AC_SX679_.jpg', 'Imagen de Mochila Trekking - Frente'),
('Saco de Dormir Invierno', 'Saco térmico para bajas temperaturas', 25, 60000, 'https://m.media-amazon.com/images/I/51QlEPuyJuL._AC_SL1100_.jpg', 'Imagen de Saco de Dormir'),
('Colchoneta Autoinflable', 'Colchoneta para camping', 20, 30000, 'https://m.media-amazon.com/images/I/710FSXg104L._AC_SL1500_.jpg', 'Imagen de Colchoneta'),
('Linterna LED', 'Linterna resistente al agua', 50, 15000, 'https://m.media-amazon.com/images/I/81HsUrL1r3L._AC_SL1500_.jpg', 'Imagen de Linterna LED'),
('Filtro de Agua Portátil', 'Filtro compacto para purificar agua', 40, 25000, 'https://m.media-amazon.com/images/I/61LxBlQKmkL._SL1500_.jpg', 'Imagen de Filtro de Agua Portátil');

INSERT INTO productos_sale (id_producto, descuento, estado) VALUES 
(1, 20, 'activo'),
(2, 0, 'inactivo'),
(3, 0, 'inactivo'),
(4, 5, 'activo'),
(5, 0, 'inactivo'),
(6, 0, 'activo'),
(7, 0, 'inactivo'),
(8, 15, 'activo');

INSERT INTO pedidos (id_usuario, fecha_pedido, estado, total) VALUES 
(3, '2024-11-10 10:30:00', 'pendiente', 240000),
(3, '2024-11-11 15:45:00', 'pendiente', 135000);

INSERT INTO detallesPedido (id_pedido, id_producto, cantidad, precio) VALUES 
(1, 1, 1, 200000), 
(1, 3, 1, 40000),
(2, 2, 1, 120000), 
(2, 7, 1, 15000);

INSERT INTO carrito (id_usuario, fecha_creacion) VALUES 
(3, '2024-11-10 09:00:00');

INSERT INTO detallesCarrito (id_carrito, id_producto, cantidad, precio) VALUES 
(1, 1, 1, 200000), 
(1, 3, 1, 40000);

INSERT INTO publicaciones (id_producto, id_usuario, estado, fecha_creacion, fecha_actualizacion) VALUES 
(1, 1, 'activo', '2024-11-10 10:00:00', '2024-11-10 10:00:00'),
(2, 1, 'activo', '2024-11-10 11:00:00', '2024-11-10 11:00:00'),
(3, 2, 'activo', '2024-11-11 10:00:00', '2024-11-11 10:00:00'),
(4, 2, 'activo', '2024-11-11 11:00:00', '2024-11-11 11:00:00'),
(5, 1, 'activo', '2024-11-12 10:00:00', '2024-11-12 10:00:00'),
(6, 1, 'activo', '2024-11-12 11:00:00', '2024-11-12 11:00:00'),
(7, 2, 'activo', '2024-11-13 10:00:00', '2024-11-13 10:00:00'),
(8, 2, 'activo', '2024-11-13 11:00:00', '2024-11-13 11:00:00');

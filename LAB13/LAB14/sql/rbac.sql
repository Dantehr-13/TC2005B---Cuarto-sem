-- Tablas RBAC para la base de datos lol
-- Ejecutar después de lol.sql

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_rol` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

CREATE TABLE `privilegios` (
  `id_privilegio` int(11) NOT NULL AUTO_INCREMENT,
  `accion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_privilegio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

CREATE TABLE `roles_privilegios` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL,
  PRIMARY KEY (`id_rol`, `id_privilegio`),
  FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios`(`id_privilegio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

CREATE TABLE `usuarios_roles` (
  `username` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`username`, `id_rol`),
  FOREIGN KEY (`username`) REFERENCES `usuarios`(`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO `roles` (`id_rol`, `descripcion_rol`) VALUES
(1, 'admin'),
(2, 'editor'),
(3, 'viewer');

INSERT INTO `privilegios` (`id_privilegio`, `accion`) VALUES
(1, 'ver_personajes'),
(2, 'crear_personaje'),
(3, 'ver_materiales'),
(4, 'crear_material'),
(5, 'editar_material'),
(6, 'gestionar_usuarios');

INSERT INTO `roles_privilegios` (`id_rol`, `id_privilegio`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
(3, 1), (3, 3);

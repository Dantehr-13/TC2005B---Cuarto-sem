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

-- --------------------------------------------------------

DELIMITER $$

--Verifica si un usuario tiene un privilegio específico
CREATE PROCEDURE `std_1_verpril`(
  IN p_username VARCHAR(50),
  IN p_accion   VARCHAR(100),
  OUT p_tiene   TINYINT(1)
)
BEGIN
  SELECT COUNT(*) INTO p_tiene
  FROM tiene t
  JOIN posee p ON t.id_rol = p.id_rol
  JOIN privilegios pr ON p.id_privilegio = pr.id
  WHERE t.id_usuario = p_username
    AND pr.nombre_privilegio = p_accion;
END$$

--Asigna un rol a un usuario validando existencia y evitando duplicados
CREATE PROCEDURE `std_2_asirol`(
  IN p_username VARCHAR(50),
  IN p_id_rol   INT
)
BEGIN
  DECLARE v_usuario_existe INT DEFAULT 0;
  DECLARE v_rol_existe     INT DEFAULT 0;
  DECLARE v_ya_asignado    INT DEFAULT 0;

  SELECT COUNT(*) INTO v_usuario_existe FROM usuarios WHERE username = p_username;
  SELECT COUNT(*) INTO v_rol_existe     FROM roles    WHERE id       = p_id_rol;
  SELECT COUNT(*) INTO v_ya_asignado   FROM tiene     WHERE id_usuario = p_username AND id_rol = p_id_rol;

  IF v_usuario_existe = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario no existe.';
  ELSEIF v_rol_existe = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El rol no existe.';
  ELSEIF v_ya_asignado > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario ya tiene ese rol asignado.';
  ELSE
    INSERT INTO tiene (id_usuario, id_rol) VALUES (p_username, p_id_rol);
  END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

-- Transacción 1: Registrar un nuevo usuario y asignarle un rol por defecto
DELIMITER $$
CREATE PROCEDURE `txn_1_registro_usuario`(
  IN p_username VARCHAR(50),
  IN p_nombre   VARCHAR(100),
  IN p_password VARCHAR(500),
  IN p_correo   VARCHAR(100),
  IN p_id_rol   INT
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
    INSERT INTO usuarios (username, nombre, password, correo)
      VALUES (p_username, p_nombre, p_password, p_correo);
    INSERT INTO tiene (id_usuario, id_rol)
      VALUES (p_username, p_id_rol);
  COMMIT;
END$$
DELIMITER ;

-- --------------------------------------------------------

-- Transacción 2: Crear un nuevo personaje validando que el tipo exista
DELIMITER $$
CREATE PROCEDURE `txn_2_crear_personaje`(
  IN p_nombre      VARCHAR(100),
  IN p_descripcion VARCHAR(500),
  IN p_tipo_id     INT,
  IN p_imagen      VARCHAR(500)
)
BEGIN
  DECLARE v_tipo_existe INT DEFAULT 0;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
    SELECT COUNT(*) INTO v_tipo_existe FROM tipo WHERE id = p_tipo_id;

    IF v_tipo_existe = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El tipo de personaje no existe.';
    END IF;

    INSERT INTO personajes (nombre, descripcion, tipo_id, imagen)
      VALUES (p_nombre, p_descripcion, p_tipo_id, p_imagen);
  COMMIT;
END$$
DELIMITER ;

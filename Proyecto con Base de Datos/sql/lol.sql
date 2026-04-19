SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `lol`
CREATE DATABASE IF NOT EXISTS `lol` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci;
USE `lol`;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `tipo`
CREATE TABLE `tipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- 5 Dummys para `tipo`
INSERT INTO `tipo` (`id`, `tipo`) VALUES
(1, 'Peleador'),
(2, 'Mago'),
(3, 'Tanque'),
(4, 'Asesino'),
(5, 'Tirador');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `personajes`
CREATE TABLE `personajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tipo_id` (`tipo_id`),
  CONSTRAINT `personajes_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `tipo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- 5 Dummys para `personajes`
INSERT INTO `personajes` (`id`, `nombre`, `descripcion`, `tipo_id`, `imagen`) VALUES
(1, 'Gwen', 'Gwen, una antigua muñeca que se transformó y cobró vida a través de la magia.', 2, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg'),
(2, 'Mordekaiser', 'Mordekaiser es un señor de la guerra nigromante que domina el carril superior.', 3, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg'),
(3, 'Jax', 'Inigualable tanto en sus habilidades de armamentos únicos como en su mordaz sarcasmo.', 1, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg'),
(4, 'Ekko', 'Ekko es un prodigio que creció en las duras calles de Zaun.', 4, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_0.jpg'),
(5, 'Jinx', 'Una criminal impulsiva y maniática de Zaun, Jinx vive para sembrar el caos.', 5, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `roles`
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- 5 Dummys para `roles`
INSERT INTO `roles` (`id`, `nombre_rol`) VALUES
(1, 'invocador'),
(2, 'administrador'),
(3, 'editor'),
(4, 'moderador'),
(5, 'espectador');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `privilegios`
CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_privilegio` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- 5 Dummys para `privilegios`
INSERT INTO `privilegios` (`id`, `nombre_privilegio`) VALUES
(1, 'ver_personajes'),
(2, 'crear_personajes'),
(3, 'editar_personajes'),
(4, 'eliminar_personajes'),
(5, 'gestionar_usuarios');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `posee` (Roles - Privilegios)
CREATE TABLE `posee` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_rol`,`id_privilegio`),
  KEY `id_privilegio` (`id_privilegio`),
  CONSTRAINT `posee_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`),
  CONSTRAINT `posee_ibfk_2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Dummys para las relaciones Rol-Privilegio
INSERT INTO `posee` (`id_rol`, `id_privilegio`) VALUES
(1, 1), -- Invocador: solo ver
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), -- Admin: todo
(3, 1), (3, 2), (3, 3), -- Editor: ver, crear, editar
(4, 1), (4, 3), (4, 4), -- Moderador: ver, editar, eliminar
(5, 1); -- Espectador: solo ver

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `usuarios`
CREATE TABLE `usuarios` (
  `username` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- 5 Dummys para `usuarios` (La contraseña de todos es: 123456)
INSERT INTO `usuarios` (`username`, `nombre`, `password`, `correo`) VALUES
('admin_lol', 'Admin Supremo', '$2b$12$Trhu5g8emvTgIH577h4XuO0vT3t97RPbDe6ZduHrADdgepTYc0Nha', 'admin@lol.com'),
('joel123', 'Joel García', '$2b$12$Trhu5g8emvTgIH577h4XuO0vT3t97RPbDe6ZduHrADdgepTYc0Nha', 'joeleoj@gmail.com'),
('valentino123', 'Valentino Ortiz', '$2b$12$Trhu5g8emvTgIH577h4XuO0vT3t97RPbDe6ZduHrADdgepTYc0Nha', 'valentinoortiz@gmail.com'),
('dante_prog', 'Dante Dev', '$2b$12$Trhu5g8emvTgIH577h4XuO0vT3t97RPbDe6ZduHrADdgepTYc0Nha', 'dante@dev.com'),
('noobmaster', 'Noob Master 69', '$2b$12$Trhu5g8emvTgIH577h4XuO0vT3t97RPbDe6ZduHrADdgepTYc0Nha', 'noob@marvel.com');

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `tiene` (Usuarios - Roles)
CREATE TABLE `tiene` (
  `id_usuario` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_usuario`,`id_rol`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`username`),
  CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Dummys para asignación de roles a usuarios
INSERT INTO `tiene` (`id_usuario`, `id_rol`) VALUES
('admin_lol', 2),
('joel123', 3),
('dante_prog', 4),
('valentino123', 1),
('noobmaster', 5);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
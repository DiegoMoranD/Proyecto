-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2025 a las 01:19:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `paciente_id` bigint(20) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `atendido_por` varchar(255) NOT NULL,
  `empresa_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `paciente_id`, `fecha`, `hora`, `motivo`, `estado`, `atendido_por`, `empresa_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-07-22', '17:30:00', 'Dolores estomacales', 'registrado', ' Castillo Pinal', 9, '2025-07-22 19:18:02', '2025-07-22 19:18:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita_detalles`
--

CREATE TABLE `cita_detalles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cita_id` bigint(20) UNSIGNED NOT NULL,
  `peso` varchar(255) NOT NULL,
  `altura` varchar(255) NOT NULL,
  `imc` varchar(255) NOT NULL,
  `sintomas` varchar(255) NOT NULL,
  `alergias` varchar(255) NOT NULL,
  `diagnostico` varchar(255) NOT NULL,
  `recomendaciones` varchar(255) NOT NULL,
  `atendido_por` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `rfc` varchar(255) NOT NULL,
  `tocken_acceso` varchar(255) DEFAULT NULL,
  `cuenta_valida` int(11) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `suscripcion_id` bigint(20) UNSIGNED NOT NULL,
  `fecha_registro` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `fecha_compra` datetime NOT NULL,
  `tocken_acceso_expiracion` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id`, `nombre`, `correo`, `telefono`, `rfc`, `tocken_acceso`, `cuenta_valida`, `cedula`, `suscripcion_id`, `fecha_registro`, `fecha_vencimiento`, `fecha_compra`, `tocken_acceso_expiracion`, `created_at`, `updated_at`) VALUES
(9, 'ATE', 'ate@gmail.com', '5553219438', '212414510', NULL, 0, 'fgvjfjij1234asdf', 1, '2025-05-15', '2025-12-31', '2025-05-15 00:00:00', NULL, NULL, NULL),
(10, 'DIEGO MED', 'morandiazdiegoarmando@gmail.com', '3111959116', 'default_rfc', 'cfcbd5589', 0, 'asdfgf1243sdf', 1, '2025-05-15', '2025-12-31', '2025-05-15 00:00:00', '2025-05-31 01:39:10', NULL, NULL),
(11, 'ATE 2', 'ate3@gmail.com', '5553216425', 'default_rfc', NULL, 0, 'ffjnqwnfi2', 1, '2025-05-28', '2025-12-31', '2025-05-28 00:00:00', NULL, NULL, NULL),
(12, 'example 7', '33example33@gmail.com', '3', '33example33', '11e78a27e', 1, '3fsadvdsr322f', 1, '2022-01-10', '2022-02-08', '2021-04-09 00:00:00', NULL, NULL, NULL),
(13, 'Umbrella', 'umbrela12@gmail.com', '5555743288', '3476tjg915f', NULL, 0, 'fdgsDFWE', 1, '2025-06-05', '2025-06-19', '2025-06-05 00:00:00', NULL, NULL, NULL),
(15, 'ATE 2', 'ate2@gmail.com', '9997541145', 'nkkonas8878', 'ba01c389f', 1, 'CEL54745SDG', 1, '2025-06-06', '2025-06-20', '2025-06-06 00:00:00', NULL, NULL, NULL),
(16, 'Medic Track', 'examplemedictrack@gmail.com', '5554651278', '9844GGGGGG', 'c9b354f7a', 1, 'CEL94564IBNO', 1, '2025-06-06', '2025-06-20', '2025-06-06 00:00:00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `presentacion` varchar(255) NOT NULL,
  `empresa_id` bigint(20) UNSIGNED NOT NULL,
  `stock` int(11) NOT NULL,
  `receta` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medicamentos`
--

INSERT INTO `medicamentos` (`id`, `nombre`, `descripcion`, `categoria`, `presentacion`, `empresa_id`, `stock`, `receta`, `created_at`, `updated_at`) VALUES
(1, 'eadsa', 'gggg', 'Analgésicos', 'Gel', 9, 200, 0, NULL, NULL),
(2, 'Parecetamol', 'Parecetamol- 100mg', 'Analgésicos', 'Tabletas', 10, 111, 0, NULL, NULL),
(10, 'Amoxil', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 9, 50, 0, NULL, NULL),
(11, 'Amoxina', 'Amoxicilina - 750mg', 'Antibióticos', 'Cápsulas', 10, 100, 1, NULL, NULL),
(12, 'Amoxibac', 'Amoxicilina - 1000mg', 'Antibióticos', 'Cápsulas', 11, 55, 1, NULL, NULL),
(13, 'Bactimox', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 12, 95, 1, NULL, NULL),
(14, 'Amoxigran', 'Amoxicilina - 875mg', 'Antibióticos', 'Cápsulas', 13, 65, 1, NULL, NULL),
(15, 'Amoxx', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 15, 70, 1, NULL, NULL),
(16, 'Amoxinor', 'Amoxicilina - 750mg', 'Antibióticos', 'Cápsulas', 16, 80, 1, NULL, NULL),
(17, 'Amoxicina', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 9, 60, 1, NULL, NULL),
(18, 'Maximox', 'Amoxicilina - 1000mg', 'Antibióticos', 'Cápsulas', 10, 85, 1, NULL, NULL),
(19, 'Normoxil', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 11, 75, 1, NULL, NULL),
(20, 'Clavamox', 'Amoxicilina - 875mg', 'Antibióticos', 'Cápsulas', 12, 90, 1, NULL, NULL),
(21, 'Amoxita', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 13, 55, 1, NULL, NULL),
(22, 'Amoxin', 'Amoxicilina - 750mg', 'Antibióticos', 'Cápsulas', 15, 70, 1, NULL, NULL),
(23, 'Bioamox', 'Amoxicilina - 1000mg', 'Antibióticos', 'Cápsulas', 16, 50, 1, NULL, NULL),
(25, 'Amoximed Forte', 'Amoxicilina - 875mg', 'Antibióticos', 'Cápsulas', 10, 80, 1, NULL, NULL),
(26, 'Amoxifarm', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 11, 65, 1, NULL, NULL),
(27, 'Farmamox', 'Amoxicilina - 750mg', 'Antibióticos', 'Cápsulas', 12, 70, 1, NULL, NULL),
(28, 'Medimox', 'Amoxicilina - 1000mg', 'Antibióticos', 'Cápsulas', 13, 90, 1, NULL, NULL),
(29, 'Amoxical', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 15, 60, 1, NULL, NULL),
(30, 'Amoxiclina', 'Amoxicilina - 875mg', 'Antibióticos', 'Cápsulas', 16, 85, 1, NULL, NULL),
(31, 'Dismox', 'Amoxicilina - 500mg', 'Antibióticos', 'Cápsulas', 9, 70, 1, NULL, NULL),
(32, 'Amoxidro', 'Amoxicilina - 750mg', 'Antibióticos', 'Cápsulas', 10, 80, 1, NULL, NULL),
(33, 'Paracetamol', 'Alivia fiebre y dolor leve', 'Analgésico', 'Tabletas 500mg', 9, 500, 0, NULL, NULL),
(34, 'Amoxicilina', 'Antibiótico de amplio espectro', 'Antibiótico', 'Cápsulas 250mg', 10, 300, 1, NULL, NULL),
(35, 'Ibuprofeno', 'Reduce inflamación y dolor', 'Antiinflamatorio', 'Tabletas 400mg', 11, 450, 0, NULL, NULL),
(36, 'Omeprazol', 'Protector gástrico', 'Inhibidor de bomba de protones', 'Cápsulas 20mg', 12, 600, 1, NULL, NULL),
(37, 'Loratadina', 'Antialérgico de segunda generación', 'Antihistamínico', 'Tabletas 10mg', 13, 350, 0, NULL, NULL),
(38, 'Metformina', 'Control de glucosa en sangre', 'Antidiabético', 'Tabletas 850mg', 15, 200, 1, NULL, NULL),
(39, 'Salbutamol', 'Broncodilatador en casos de asma', 'Antiasmático', 'Inhalador 100mcg', 16, 150, 1, NULL, NULL),
(40, 'Diclofenaco', 'Alivio del dolor e inflamación', 'Antiinflamatorio', 'Gel tópico 1%', 9, 400, 0, NULL, NULL),
(41, 'Azitromicina', 'Antibiótico de dosis única', 'Antibiótico', 'Tabletas 500mg', 10, 180, 1, NULL, NULL),
(42, 'Losartán', 'Tratamiento de hipertensión', 'Antihipertensivo', 'Tabletas 50mg', 11, 320, 1, NULL, NULL),
(43, 'Cetirizina', 'Control de alergias', 'Antihistamínico', 'Tabletas 10mg', 12, 270, 0, NULL, NULL),
(44, 'Furosemida', 'Diurético para retención de líquidos', 'Diurético', 'Tabletas 40mg', 13, 230, 1, NULL, NULL),
(45, 'Naproxeno', 'Dolor muscular y articular', 'Antiinflamatorio', 'Tabletas 500mg', 15, 300, 0, NULL, NULL),
(46, 'Clonazepam', 'Ansiedad y trastornos del sueño', 'Ansiolítico', 'Tabletas 2mg', 16, 100, 1, NULL, NULL),
(47, 'Prednisona', 'Antiinflamatorio sistémico', 'Corticoide', 'Tabletas 5mg', 9, 350, 1, NULL, NULL),
(48, 'Insulina NPH', 'Tratamiento de la diabetes', 'Hormonal', 'Frasco 100UI/ml', 10, 90, 1, NULL, NULL),
(49, 'Ranitidina', 'Alivio de acidez estomacal', 'Antiácido', 'Tabletas 150mg', 11, 400, 0, NULL, NULL),
(50, 'Enalapril', 'Control de presión arterial', 'Antihipertensivo', 'Tabletas 10mg', 12, 280, 1, NULL, NULL),
(51, 'Claritromicina', 'Antibiótico macrólido', 'Antibiótico', 'Tabletas 500mg', 13, 190, 1, NULL, NULL),
(52, 'Vitamina C', 'Suplemento inmunológico', 'Vitaminas', 'Tabletas 1g', 15, 700, 0, NULL, NULL),
(53, 'Meloxicam', 'Dolor articular crónico', 'Antiinflamatorio', 'Tabletas 15mg', 16, 210, 1, NULL, NULL),
(54, 'Diazepam', 'Trastornos de ansiedad', 'Ansiolítico', 'Tabletas 10mg', 9, 160, 1, NULL, NULL),
(55, 'Doxiciclina', 'Antibiótico de amplio espectro', 'Antibiótico', 'Cápsulas 100mg', 10, 220, 1, NULL, NULL),
(56, 'Levotiroxina', 'Terapia para hipotiroidismo', 'Hormonal', 'Tabletas 100mcg', 11, 350, 1, NULL, NULL),
(57, 'Ibuprofeno infantil', 'Dolor y fiebre en niños', 'Analgésico', 'Suspensión 100mg/5ml', 12, 300, 0, NULL, NULL),
(58, 'Clorfenamina', 'Alivio de alergias leves', 'Antihistamínico', 'Tabletas 4mg', 13, 270, 0, NULL, NULL),
(59, 'Ácido fólico', 'Prevención de malformaciones fetales', 'Vitaminas', 'Tabletas 5mg', 15, 800, 0, NULL, NULL),
(60, 'Ketorolaco', 'Analgésico potente', 'Analgésico', 'Inyectable 30mg/ml', 16, 120, 1, NULL, NULL),
(61, 'Aspirina', 'Prevención de eventos cardiovasculares', 'Antiplaquetario', 'Tabletas 100mg', 9, 900, 0, NULL, NULL),
(62, 'Lansoprazol', 'Tratamiento de úlceras gástricas', 'Inhibidor de bomba de protones', 'Cápsulas 30mg', 10, 270, 1, NULL, NULL),
(63, 'Clindamicina', 'Tratamiento de infecciones bacterianas', 'Antibiótico', 'Cápsulas 300mg', 11, 200, 1, NULL, NULL),
(64, 'Bromhexina', 'Expectorante para vías respiratorias', 'Mucolítico', 'Jarabe 4mg/5ml', 12, 400, 0, NULL, NULL),
(65, 'Metoclopramida', 'Alivio de náuseas y vómitos', 'Antiemético', 'Tabletas 10mg', 13, 240, 1, NULL, NULL),
(66, 'Simvastatina', 'Reducción de colesterol', 'Hipolipemiante', 'Tabletas 20mg', 15, 310, 1, NULL, NULL),
(67, 'Amlodipino', 'Tratamiento de hipertensión', 'Antihipertensivo', 'Tabletas 5mg', 16, 260, 1, NULL, NULL),
(68, 'Albendazol', 'Tratamiento antiparasitario', 'Antiparasitario', 'Tabletas 400mg', 9, 210, 0, NULL, NULL),
(69, 'Ciprofloxacino', 'Infecciones urinarias', 'Antibiótico', 'Tabletas 500mg', 10, 190, 1, NULL, NULL),
(70, 'Loperamida', 'Alivio de diarrea', 'Antidiarreico', 'Tabletas 2mg', 11, 380, 0, NULL, NULL),
(71, 'Desloratadina', 'Tratamiento de rinitis alérgica', 'Antihistamínico', 'Tabletas 5mg', 12, 220, 0, NULL, NULL),
(72, 'Trimetoprima/Sulfametoxazol', 'Infecciones urinarias', 'Antibiótico', 'Tabletas 160/800mg', 13, 240, 1, NULL, NULL),
(73, 'Pantoprazol', 'Reducción de acidez estomacal', 'Inhibidor de bomba de protones', 'Tabletas 40mg', 15, 290, 1, NULL, NULL),
(74, 'Vitamina D', 'Salud ósea y muscular', 'Vitaminas', 'Tabletas 1000 UI', 16, 600, 0, NULL, NULL),
(75, 'Clonidina', 'Tratamiento de hipertensión', 'Antihipertensivo', 'Tabletas 0.1mg', 9, 120, 1, NULL, NULL),
(76, 'Mebendazol', 'Eliminación de lombrices intestinales', 'Antiparasitario', 'Tabletas 100mg', 10, 350, 0, NULL, NULL),
(77, 'Ambroxol', 'Fluidificante bronquial', 'Mucolítico', 'Jarabe 15mg/5ml', 11, 310, 0, NULL, NULL),
(78, 'Eritromicina', 'Infecciones respiratorias', 'Antibiótico', 'Tabletas 250mg', 12, 200, 1, NULL, NULL),
(79, 'Carbamazepina', 'Control de epilepsia', 'Antiepiléptico', 'Tabletas 200mg', 13, 180, 1, NULL, NULL),
(80, 'Glibenclamida', 'Control de glucosa', 'Antidiabético', 'Tabletas 5mg', 15, 300, 1, NULL, NULL),
(81, 'Topiramato', 'Epilepsia y migraña', 'Antiepiléptico', 'Tabletas 50mg', 16, 150, 1, NULL, NULL),
(82, 'Clopidogrel', 'Prevención de trombosis', 'Antiplaquetario', 'Tabletas 75mg', 9, 230, 1, NULL, NULL),
(83, 'Fentanilo', 'Ta fuerte a 10 mg', 'Analgésicos', 'Tabletas', 9, 12, 1, NULL, NULL),
(84, 'Amoxicilina', 'Tabletas 100 mg', 'Antibióticos', 'Tabletas', 11, 111, 1, NULL, NULL),
(85, 'Atea', 'Parecetamol- 100mg', 'Antiinflamatorios', 'Tabletas', 10, 22, 1, NULL, NULL),
(86, 'Atea', 'Parecetamol- 100mg', 'Antiinflamatorios', 'Tabletas', 10, 22, 1, NULL, NULL),
(87, 'Atea', 'Parecetamol- 100mg', 'Antiinflamatorios', 'Tabletas', 10, 223, 0, NULL, NULL),
(88, 'Atea', 'Parecetamol- 100mg', 'Antiinflamatorios', 'Tabletas', 10, 223, 0, NULL, NULL),
(89, 'Atea', 'Parecetamol- 100mg', 'Antiinflamatorios', 'Tabletas', 10, 223, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_03_18_184321_create_tipo_usuarios_table', 1),
(2, '2025_03_18_184419_create_suscripcions_table', 2),
(3, '2025_03_18_183930_create_empresas_table', 3),
(4, '2025_03_18_184029_create_pacientes_table', 4),
(6, '0001_01_01_000001_create_cache_table', 6),
(7, '0001_01_01_000002_create_jobs_table', 6),
(8, '2019_12_14_000001_create_personal_access_tokens_table', 6),
(9, '2025_03_21_191954_create_permission_tables', 6),
(10, '2025_05_12_172045_failed_logins', 7),
(11, '2025_07_01_120855_medicamentos', 8),
(16, '2025_07_11_161036_citas', 9),
(17, '2025_07_11_161100_cita_detalles', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 10),
(1, 'App\\Models\\User', 12),
(2, 'App\\Models\\User', 7),
(3, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 4),
(3, 'App\\Models\\User', 5),
(3, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 11),
(4, 'App\\Models\\User', 8),
(4, 'App\\Models\\User', 15),
(5, 'App\\Models\\User', 9),
(5, 'App\\Models\\User', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo_sangre` varchar(255) NOT NULL,
  `peso` varchar(255) NOT NULL,
  `altura` varchar(255) NOT NULL,
  `imc` varchar(255) NOT NULL,
  `fecha_registro` date NOT NULL,
  `empresa_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombre`, `fecha_nacimiento`, `tipo_sangre`, `peso`, `altura`, `imc`, `fecha_registro`, `empresa_id`, `created_at`, `updated_at`, `sex`) VALUES
(1, 'David', '2015-05-29', 'O-', '77', '1.77', '24.58', '2025-05-02', 9, NULL, NULL, NULL),
(4, 'Jaime Diaz', '1988-03-05', 'B+', '88', '1.8', '27.16', '2025-02-06', 10, NULL, NULL, NULL),
(6, 'Paloma Coronado', '2002-06-23', 'A+', '78', '1.71', '26.67', '2025-09-14', 10, NULL, NULL, NULL),
(7, 'Carmen Janet', '2002-05-09', 'A-', '78', '1.70', '26.99', '2025-05-29', 9, NULL, NULL, NULL),
(11, 'Yohari Giselle', '2002-07-04', 'B-', '67', '1.65', '24.61', '2021-05-24', 11, NULL, NULL, NULL),
(12, 'Maximiliano Cienfuegos', '2001-02-07', 'AB+', '66', '1.50', '29.33', '2024-04-12', 10, NULL, NULL, NULL),
(13, 'Angel Flores', '2000-02-04', 'B+', '78', '1.78', '24.62', '2022-07-15', 10, NULL, NULL, NULL),
(14, 'Diego Torres', '2003-07-30', 'AB-', '77', '1.71', '26.33', '2019-04-04', 11, NULL, NULL, NULL),
(15, 'Valerio Diaz', '1998-05-10', 'B-', '79', '1.75', '25.80', '2023-05-12', 10, NULL, NULL, NULL),
(16, 'Michelle Carrillo', '1991-04-19', 'AB+', '89', '1.7', '30.80', '2028-02-18', 11, NULL, NULL, NULL),
(17, 'Valentina Reyes', '2001-11-26', 'O+', '60', '1.54', '25.30', '2019-04-14', 10, NULL, NULL, NULL),
(18, 'Jose Angel Medina Trinidad', '2002-08-06', 'B+', '77', '1.78', '24.30', '2025-06-12', 9, NULL, NULL, NULL),
(19, 'Brisa Garay', '2002-03-21', 'O-', '76', '1.66', '27.58', '2025-09-13', 16, NULL, NULL, NULL),
(20, 'Ramon Torres', '2000-06-14', 'AB+', '76', '1.76', '24.54', '2025-02-14', 9, NULL, NULL, NULL),
(21, 'Maria Flores', '1994-04-04', 'AB+', '68', '1.77', '21.71', '2025-02-13', 9, NULL, NULL, NULL),
(22, 'Mary Bloody', '1980-08-13', 'B+', '66', '1.71', '22.57', '2025-06-13', 9, NULL, NULL, NULL),
(23, 'Rosa Campos', '2000-12-05', 'AB-', '78', '1.87', '22.31', '2025-06-13', 9, NULL, NULL, NULL),
(24, 'Lisa Cody', '1997-02-09', 'AB-', '67', '1.67', '24.02', '2025-06-13', 9, NULL, NULL, NULL),
(25, 'Lisa Greyson', '2000-03-19', 'B-', '67', '1.67', '24.02', '2025-06-15', 9, NULL, NULL, NULL),
(26, 'Javier Flores', '2001-07-26', 'B-', '90', '1.72', '30.42', '2024-05-13', 9, NULL, NULL, NULL),
(27, 'Jose Flores', '2001-07-26', 'AB+', '85.8', '1.72', '29.00', '2024-05-13', 9, NULL, NULL, NULL),
(28, 'Steve Wild', '1998-06-29', 'A-', '101', '1.77', '32.24', '2025-06-12', 9, NULL, NULL, NULL),
(29, 'Juan Pérez', '1990-03-15', 'O+', '72.5', '1.75', '23.67', '2025-07-04', 9, NULL, NULL, NULL),
(30, 'María Gómez', '1985-06-20', 'A-', '65.0', '1.68', '23.03', '2025-07-04', 10, NULL, NULL, NULL),
(31, 'Carlos Díaz', '1978-12-03', 'B+', '80.2', '1.80', '24.75', '2025-07-04', 13, NULL, NULL, NULL),
(32, 'Ana Torres', '1992-09-18', 'AB-', '54.3', '1.60', '21.21', '2025-07-04', 15, NULL, NULL, NULL),
(33, 'Luis Ramírez', '1988-04-10', 'O-', '90.0', '1.82', '27.17', '2025-07-04', 16, NULL, NULL, NULL),
(34, 'Laura Suárez', '1995-01-25', 'A+', '68.5', '1.70', '23.70', '2025-07-04', 10, NULL, NULL, NULL),
(35, 'Pedro Martínez', '1980-11-11', 'B-', '77.0', '1.78', '24.30', '2025-07-04', 9, NULL, NULL, NULL),
(36, 'Sofía Herrera', '1997-08-30', 'O+', '59.2', '1.65', '21.74', '2025-07-04', 13, NULL, NULL, NULL),
(37, 'Jorge López', '1983-05-19', 'AB+', '85.7', '1.85', '25.04', '2025-07-04', 15, NULL, NULL, NULL),
(38, 'Camila Morales', '1991-02-14', 'A-', '61.0', '1.66', '22.14', '2025-07-04', 16, NULL, NULL, NULL),
(39, 'Laura Ruiz', '1993-07-12', 'O+', '62.5', '1.68', '22.14', '2025-07-04', 9, NULL, NULL, NULL),
(40, 'Mario Gutiérrez', '1987-03-21', 'A-', '78.0', '1.82', '23.55', '2025-07-04', 10, NULL, NULL, NULL),
(41, 'Valentina Herrera', '1990-10-09', 'B+', '69.3', '1.70', '23.98', '2025-07-04', 13, NULL, NULL, NULL),
(42, 'Tomás Díaz', '1985-12-17', 'AB+', '85.6', '1.80', '26.42', '2025-07-04', 16, NULL, NULL, NULL),
(43, 'Lucía Mendoza', '1996-06-25', 'O-', '55.0', '1.60', '21.48', '2025-07-04', 15, NULL, NULL, NULL),
(44, 'Ricardo Salinas', '1989-04-30', 'A+', '90.4', '1.85', '26.41', '2025-07-04', 9, NULL, NULL, NULL),
(45, 'Sofía Vargas', '1992-01-15', 'B-', '63.8', '1.66', '23.15', '2025-07-04', 10, NULL, NULL, NULL),
(46, 'Julián Torres', '1983-09-28', 'O+', '75.9', '1.73', '25.36', '2025-07-04', 13, NULL, NULL, NULL),
(47, 'Carla Romero', '1997-11-05', 'AB-', '58.2', '1.64', '21.64', '2025-07-04', 15, NULL, NULL, NULL),
(48, 'Felipe Castro', '1984-02-20', 'A-', '82.3', '1.78', '25.98', '2025-07-04', 16, NULL, NULL, NULL),
(49, 'Isabel Molina', '1995-05-11', 'B+', '60.0', '1.67', '21.51', '2025-07-04', 9, NULL, NULL, NULL),
(50, 'Daniel Peralta', '1988-08-13', 'AB+', '88.7', '1.83', '26.49', '2025-07-04', 10, NULL, NULL, NULL),
(51, 'Andrea Núñez', '1994-03-08', 'O-', '59.4', '1.62', '22.63', '2025-07-04', 13, NULL, NULL, NULL),
(52, 'Héctor Paredes', '1990-06-29', 'A+', '77.2', '1.76', '24.92', '2025-07-04', 15, NULL, NULL, NULL),
(53, 'Natalia Rivera', '1986-12-02', 'B-', '65.5', '1.68', '23.21', '2025-07-04', 16, NULL, NULL, NULL),
(54, 'Gonzalo León', '1982-04-19', 'O+', '91.0', '1.90', '25.21', '2025-07-04', 9, NULL, NULL, NULL),
(55, 'Elena Silva', '1999-09-17', 'A-', '56.1', '1.59', '22.19', '2025-07-04', 10, NULL, NULL, NULL),
(56, 'Samuel Ortega', '1981-07-24', 'B+', '83.3', '1.80', '25.71', '2025-07-04', 13, NULL, NULL, NULL),
(57, 'Camila Flores', '1993-10-04', 'AB-', '62.7', '1.67', '22.48', '2025-07-04', 15, NULL, NULL, NULL),
(58, 'Diego Rojas', '1987-01-01', 'O-', '79.0', '1.75', '25.80', '2025-07-04', 16, NULL, NULL, NULL),
(59, 'Fernanda Cruz', '1996-11-10', 'A+', '64.2', '1.69', '22.48', '2025-07-04', 9, NULL, NULL, NULL),
(60, 'Luis Peña', '1984-03-23', 'B-', '81.5', '1.82', '24.60', '2025-07-04', 10, NULL, NULL, NULL),
(61, 'Marina Herrera', '1998-08-16', 'O+', '58.9', '1.63', '22.17', '2025-07-04', 13, NULL, NULL, NULL),
(62, 'Jorge Medina', '1991-05-07', 'AB+', '86.4', '1.79', '26.97', '2025-07-04', 15, NULL, NULL, NULL),
(63, 'Paula Aguirre', '1989-02-26', 'A-', '61.8', '1.65', '22.70', '2025-07-04', 16, NULL, NULL, NULL),
(64, 'Adrián Campos', '1986-06-03', 'B+', '84.2', '1.81', '25.70', '2025-07-04', 9, NULL, NULL, NULL),
(65, 'Beatriz León', '1994-12-30', 'O-', '60.5', '1.66', '21.96', '2025-07-04', 10, NULL, NULL, NULL),
(66, 'Francisco Soto', '1983-10-11', 'A+', '89.1', '1.86', '25.75', '2025-07-04', 13, NULL, NULL, NULL),
(67, 'Daniela Vargas', '1992-02-19', 'AB-', '57.6', '1.61', '22.22', '2025-07-04', 15, NULL, NULL, NULL),
(68, 'Rodrigo Navarro', '1980-01-08', 'O+', '92.0', '1.88', '26.03', '2025-07-04', 16, NULL, NULL, NULL),
(69, 'Cecilia Fuentes', '1990-09-22', 'B-', '67.0', '1.70', '23.18', '2025-07-04', 9, NULL, NULL, NULL),
(70, 'Martín Robles', '1987-07-30', 'A-', '79.4', '1.74', '26.23', '2025-07-04', 10, NULL, NULL, NULL),
(71, 'Rosa Delgado', '1995-04-05', 'B+', '60.9', '1.64', '22.64', '2025-07-04', 13, NULL, NULL, NULL),
(72, 'Andrés Acosta', '1993-06-18', 'AB+', '76.6', '1.79', '23.91', '2025-07-04', 15, NULL, NULL, NULL),
(73, 'Carolina Cárdenas', '1988-11-29', 'O-', '58.3', '1.62', '22.21', '2025-07-04', 16, NULL, NULL, NULL),
(74, 'José Barrera', '1982-08-12', 'A+', '83.7', '1.83', '24.99', '2025-07-04', 9, NULL, NULL, NULL),
(75, 'Patricia Montoya', '1991-03-01', 'B-', '66.4', '1.68', '23.53', '2025-07-04', 10, NULL, NULL, NULL),
(76, 'Iván Reyes', '1986-09-06', 'O+', '87.5', '1.85', '25.57', '2025-07-04', 13, NULL, NULL, NULL),
(77, 'Mónica Valenzuela', '1997-01-13', 'AB-', '62.1', '1.66', '22.54', '2025-07-04', 15, NULL, NULL, NULL),
(78, 'Gabriel Miranda', '1990-10-27', 'A-', '74.8', '1.75', '24.42', '2025-07-04', 16, NULL, NULL, NULL),
(79, 'Lina Carrillo', '1998-05-09', 'B+', '59.6', '1.60', '23.28', '2025-07-04', 9, NULL, NULL, NULL),
(80, 'Esteban Blanco', '1985-11-14', 'O-', '82.9', '1.79', '25.87', '2025-07-04', 10, NULL, NULL, NULL),
(81, 'Florencia Sáenz', '1996-07-03', 'A+', '63.3', '1.65', '23.25', '2025-07-04', 13, NULL, NULL, NULL),
(82, 'Raúl Ibáñez', '1989-02-06', 'B-', '78.1', '1.77', '24.93', '2025-07-04', 15, NULL, NULL, NULL),
(83, 'Renata Cabrera', '1993-09-25', 'AB+', '61.9', '1.63', '23.30', '2025-07-04', 16, NULL, NULL, NULL),
(84, 'Óscar Vera', '1984-04-15', 'O+', '85.2', '1.82', '25.72', '2025-07-04', 9, NULL, NULL, NULL),
(85, 'Julia Méndez', '1992-12-06', 'A-', '58.7', '1.61', '22.65', '2025-07-04', 10, NULL, NULL, NULL),
(86, 'Raul Perez Lopez', '2006-03-20', 'A-', '150', '1.60', '58.59', '2025-07-10', 9, NULL, NULL, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(197, 'App\\Models\\User', 6, 'caja.app', '9ab798d7afd9afd7d6c519a648b4a58c6bf3cbb8b1b83a6e25733bf8a8098e3b', '[\"*\"]', NULL, NULL, '2025-07-21 18:41:49', '2025-07-21 18:41:49'),
(198, 'App\\Models\\User', 6, 'caja.app', 'bc3b56c94b87ef042d599fdbe61e417ab71bf47a51e6d709bda25e316ad6dd2b', '[\"*\"]', NULL, NULL, '2025-07-21 23:13:54', '2025-07-21 23:13:54'),
(199, 'App\\Models\\User', 6, 'caja.app', 'deafaa814ca42cbaa70e8e19e7a2917d1878c1926a1f67dca2345a246a8c35e2', '[\"*\"]', NULL, NULL, '2025-07-22 17:56:41', '2025-07-22 17:56:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'root', 'web', '2025-05-06 01:00:57', '2025-05-06 01:00:57'),
(2, 'admin', 'web', '2025-05-06 01:00:57', '2025-05-06 01:00:57'),
(3, 'medico', 'web', '2025-05-06 01:00:57', '2025-05-06 01:00:57'),
(4, 'paciente', 'web', '2025-05-06 01:00:57', '2025-05-06 01:00:57'),
(5, 'recepcion', 'web', '2025-05-06 01:00:57', '2025-05-06 01:00:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcions`
--

CREATE TABLE `suscripcions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` double(8,2) NOT NULL,
  `descuento` int(11) NOT NULL,
  `dias` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `suscripcions`
--

INSERT INTO `suscripcions` (`id`, `nombre`, `precio`, `descuento`, `dias`, `created_at`, `updated_at`) VALUES
(1, 'Demo', 0.00, 0, 14, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuarios`
--

CREATE TABLE `tipo_usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_tipo` varchar(255) NOT NULL,
  `registro_paciente` int(11) NOT NULL,
  `registro_medicamento` int(11) NOT NULL,
  `agendar_cita` int(11) NOT NULL,
  `eliminar_paciente` int(11) NOT NULL,
  `eliminar_cita` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_usuarios`
--

INSERT INTO `tipo_usuarios` (`id`, `nombre_tipo`, `registro_paciente`, `registro_medicamento`, `agendar_cita`, `eliminar_paciente`, `eliminar_cita`, `created_at`, `updated_at`) VALUES
(1, 'root', 1, 1, 1, 1, 1, NULL, NULL),
(2, 'admin', 1, 1, 1, 1, 1, NULL, NULL),
(3, 'medico', 1, 1, 1, 1, 1, NULL, NULL),
(4, 'paciente', 1, 1, 1, 1, 1, NULL, NULL),
(5, 'recepcion', 1, 1, 1, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `paterno` varchar(255) NOT NULL,
  `materno` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `intentos` int(11) NOT NULL DEFAULT 0,
  `last_attempt_at` timestamp NULL DEFAULT NULL,
  `tipo_usuario_id` bigint(20) UNSIGNED NOT NULL,
  `empresa_id` bigint(20) UNSIGNED NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tocken_acceso_expiracion` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `paterno`, `materno`, `email`, `telefono`, `username`, `password`, `intentos`, `last_attempt_at`, `tipo_usuario_id`, `empresa_id`, `remember_token`, `created_at`, `updated_at`, `tocken_acceso_expiracion`) VALUES
(3, 'Joel', 'Gomez', 'Torres', 'ate@gmail.com', '5553219438', 'default_username', '$2y$12$lQZAQTfaRvcfiPq2jUtZKO0AetGaqdN.Xgw4QsDcJzewmoQGF54Qe', 0, '2025-05-16 19:54:58', 3, 9, 'RECUPa1j4', '2025-05-15 18:48:49', '2025-06-11 19:38:05', '2025-06-11 20:38:05'),
(4, 'Diego', 'Moran', 'Diaz', 'morandiazdiegoarmando@gmail.com', '3111959116', 'DiegoDiaz', '$2y$12$tD6e1pysgpfCnakN9./hY.heGxgRCV25njjv7RGF8qSozPsqG5Dky', 0, NULL, 3, 10, 'RECUPwJiR', '2025-05-15 18:50:06', '2025-06-23 21:27:43', '2025-06-23 22:27:43'),
(6, 'Pedro', 'Castillo', 'Pinal', 'medico@gmail.com', '31243246', 'DiegoM', '$2y$12$mLe.JduC4FYwuAPLwtd0H.R2m4MNqVMoVANQdyuV.1kgmG7lkajK2', 0, '2025-07-08 18:55:43', 3, 9, NULL, '2025-05-19 20:18:47', '2025-07-08 18:55:55', NULL),
(7, 'Paul', 'Hernandez', 'Lopez', 'admin@gmail.com', '31243246', 'DiegoM', '$2y$12$1bCEqdp8vqshWydBDVR9XeR9qT9ZhjmsIpgtGPuAso8WQ6TSPmdt2', 0, '2025-05-19 23:56:01', 2, 9, NULL, '2025-05-19 20:24:54', '2025-05-19 23:56:11', NULL),
(8, 'Nelson', 'Mercado', 'Garcia', 'paciente@gmail.com', '31243246', 'DiegoMPaciente', '$2y$12$Dc3wfbmpV.5oDcMS86LMnejOC.Gfn/PwPObSiQZAcEFfomhxAmk7a', 0, NULL, 4, 9, NULL, '2025-05-19 21:07:55', '2025-05-19 21:07:55', NULL),
(9, 'David', 'Santos', 'Ruvalcaba', 'ate6@gmail.com', '5553219438', 'DiegoMRecepcion', '$2y$12$uv3g3KEFxnS.jnbr/MxoyuylT9vcDQG7S652uVmmDxxxPbXdfHxWO', 0, '2025-05-22 00:46:57', 5, 9, NULL, '2025-05-20 19:19:13', '2025-05-28 20:07:06', NULL),
(10, 'God', 'Of', 'Systems', 'root@gmail.com', '3112223111', 'rooter', '$2y$12$92MkitH5sLIwTE8saHHcc.WlUpnqR38pxHqt1iCVr8fMaJxLJPegi', 0, '2025-06-09 18:50:50', 1, 9, NULL, '2025-05-28 20:11:52', '2025-06-09 18:50:56', NULL),
(11, 'Jairo', 'Robles', 'Trinidad', 'ate3@gmail.com', '5553216425', 'default_username', '$2y$12$K2/rDAJ/0RcQEPKgBFbyuOm3q5z3lSZyY/sddQAa/h8JDZm2bL6Eu', 0, NULL, 3, 11, NULL, '2025-05-29 00:42:43', '2025-05-29 00:42:43', NULL),
(12, 'Valerio', 'Adame', 'Diaz', 'exampleValerio@gmail.com', '9998453456', 'ValeAD', '$2y$12$wYk32uwzO3Oq/aPMp30F6ewQ1ctXD7/9aIvMTmlXwE6/zfVh1wa8C', 0, NULL, 1, 13, NULL, '2025-06-06 21:09:53', '2025-06-06 21:09:53', NULL),
(13, 'Alejantro', 'Marquez', 'Flores', 'exampleUser1@gmail.com', '8887654123', 'AleMF', '$2y$12$UV9bIqnRCmhS0KbjqYJV9eelSpKhV0wt.hlAR8yZJHNXz6mzMtu.y', 0, NULL, 5, 9, NULL, '2025-06-06 22:36:24', '2025-06-06 22:36:24', NULL),
(15, 'Isela', 'Romez', 'Real', 'exampleIsela@gmail.com', '4445556511', 'Isela', '$2y$12$TxwhotKKVo9ziFcttR67WuawAao4JHb/Nl/Gxd8HwVXkPNMpMXqea', 0, NULL, 4, 16, NULL, '2025-06-12 21:14:58', '2025-06-12 21:14:58', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `citas_paciente_id_foreign` (`paciente_id`),
  ADD KEY `citas_empresa_id_foreign` (`empresa_id`);

--
-- Indices de la tabla `cita_detalles`
--
ALTER TABLE `cita_detalles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cita_detalles_cita_id_foreign` (`cita_id`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empresas_suscripcion_id_foreign` (`suscripcion_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicamentos_empresa_id_foreign` (`empresa_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pacientes_empresa_id_foreign` (`empresa_id`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `suscripcions`
--
ALTER TABLE `suscripcions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_tipo_usuario_id_foreign` (`tipo_usuario_id`),
  ADD KEY `users_empresa_id_foreign` (`empresa_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cita_detalles`
--
ALTER TABLE `cita_detalles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `suscripcions`
--
ALTER TABLE `suscripcions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_usuarios`
--
ALTER TABLE `tipo_usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_empresa_id_foreign` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `citas_paciente_id_foreign` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cita_detalles`
--
ALTER TABLE `cita_detalles`
  ADD CONSTRAINT `cita_detalles_cita_id_foreign` FOREIGN KEY (`cita_id`) REFERENCES `citas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD CONSTRAINT `empresas_suscripcion_id_foreign` FOREIGN KEY (`suscripcion_id`) REFERENCES `suscripcions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD CONSTRAINT `medicamentos_empresa_id_foreign` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_empresa_id_foreign` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_empresa_id_foreign` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_tipo_usuario_id_foreign` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

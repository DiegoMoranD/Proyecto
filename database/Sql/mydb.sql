-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2025 a las 22:53:57
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
(10, 'DIEGO MED', 'morandiazdiegoarmando@gmail.com', '3111959116', 'default_rfc', '78fb04422', 0, 'asdfgf1243sdf', 1, '2025-05-15', '2025-12-31', '2025-05-15 00:00:00', '2025-05-31 01:39:10', NULL, NULL),
(11, 'ATE 2', 'ate3@gmail.com', '5553216425', 'default_rfc', '2093b2162', 1, 'ffjnqwnfi2', 1, '2025-05-28', '2025-12-31', '2025-05-28 00:00:00', NULL, NULL, NULL);

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
(10, '2025_05_12_172045_failed_logins', 7);

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
(2, 'App\\Models\\User', 7),
(3, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 4),
(3, 'App\\Models\\User', 5),
(3, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 11),
(4, 'App\\Models\\User', 8),
(5, 'App\\Models\\User', 9);

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombre`, `fecha_nacimiento`, `tipo_sangre`, `peso`, `altura`, `imc`, `fecha_registro`, `empresa_id`, `created_at`, `updated_at`) VALUES
(1, 'David', '2015-05-29', 'O-', '77', '1.77', '24.58', '2025-05-02', 9, NULL, NULL),
(2, 'Pablo Gomez', '1997-03-11', 'A-', '70', '1.75', '22.86', '2022-02-12', 10, NULL, NULL),
(4, 'Jaime Diaz', '1988-03-05', 'B+', '88', '1.8', '27.16', '2025-02-06', 10, NULL, NULL),
(5, 'Sinai Hermosillo', '2002-08-27', 'B+', '79', '1.73', '26.40', '2022-04-08', 9, NULL, NULL),
(6, 'Paloma Coronado', '2002-06-23', 'A+', '78', '1.71', '26.67', '2025-09-14', 10, NULL, NULL),
(7, 'Carmen Janet', '2002-05-09', 'A-', '78', '1.70', '26.99', '2025-05-29', 9, NULL, NULL),
(8, 'Erick Gamboa', '1999-11-05', 'AB+', '89', '1.75', '29.06', '2022-06-14', 11, NULL, NULL),
(9, 'Cesar Lopez', '1997-07-06', 'O+', '70', '1.74', '23.12', '2020-09-07', 9, NULL, NULL),
(10, 'Alexa Rosales', '2004-08-06', 'B-', '70', '1.68', '24.80', '2022-09-09', 10, NULL, NULL),
(11, 'Yohari Giselle', '2002-07-04', 'B-', '67', '1.65', '24.61', '2021-05-24', 11, NULL, NULL),
(12, 'Maximiliano Cienfuegos', '2001-02-07', 'AB+', '66', '1.50', '29.33', '2024-04-12', 10, NULL, NULL),
(13, 'Angel Flores', '2000-02-04', 'B+', '78', '1.78', '24.62', '2022-07-15', 10, NULL, NULL),
(14, 'Diego Torres', '2003-07-30', 'AB-', '77', '1.71', '26.33', '2019-04-04', 11, NULL, NULL),
(15, 'Valerio Diaz', '1998-05-10', 'B-', '79', '1.75', '25.80', '2023-05-12', 10, NULL, NULL),
(16, 'Michelle Carrillo', '1991-04-19', 'AB+', '89', '1.7', '30.80', '2028-02-18', 11, NULL, NULL),
(17, 'Valentina Reyes', '2001-11-26', 'O+', '60', '1.54', '25.30', '2019-04-14', 10, NULL, NULL);

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
(120, 'App\\Models\\User', 10, 'caja.app', '07199b94c3917d05396580feb6b1aa5400599b1b5f7c3cabfa07f6551d67684a', '[\"*\"]', NULL, NULL, '2025-06-03 20:58:39', '2025-06-03 20:58:39'),
(121, 'App\\Models\\User', 10, 'caja.app', '20aca6799429a927d2063a3a67a47a3e1370808f7f84afe201abbd41a7fb4551', '[\"*\"]', NULL, NULL, '2025-06-04 19:14:05', '2025-06-04 19:14:05');

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
(3, 'Joel', 'Gomez', 'Torres', 'ate@gmail.com', '5553219438', 'default_username', '$2y$12$lQZAQTfaRvcfiPq2jUtZKO0AetGaqdN.Xgw4QsDcJzewmoQGF54Qe', 0, '2025-05-16 19:54:58', 3, 9, NULL, '2025-05-15 18:48:49', '2025-05-28 19:09:18', NULL),
(4, 'Diego', 'Moran', 'Diaz', 'morandiazdiegoarmando@gmail.com', '3111959116', 'DiegoDiaz', '$2y$12$MvZagDtBngBr3eGyhl8Axu2wajkWkf6e6il/X5EFQeaxj8mO.XHGO', 0, NULL, 3, 10, 'RECUPVFIB', '2025-05-15 18:50:06', '2025-06-03 00:37:23', '2025-06-03 01:37:23'),
(6, 'Pedro', 'Castillo', 'Pinal', 'medico@gmail.com', '31243246', 'DiegoM', '$2y$12$mLe.JduC4FYwuAPLwtd0H.R2m4MNqVMoVANQdyuV.1kgmG7lkajK2', 0, '2025-05-27 00:19:56', 3, 9, NULL, '2025-05-19 20:18:47', '2025-05-27 00:20:09', NULL),
(7, 'Paul', 'Hernandez', 'Lopez', 'admin@gmail.com', '31243246', 'DiegoM', '$2y$12$1bCEqdp8vqshWydBDVR9XeR9qT9ZhjmsIpgtGPuAso8WQ6TSPmdt2', 0, '2025-05-19 23:56:01', 2, 9, NULL, '2025-05-19 20:24:54', '2025-05-19 23:56:11', NULL),
(8, 'Nelson', 'Mercado', 'Garcia', 'paciente@gmail.com', '31243246', 'DiegoMPaciente', '$2y$12$Dc3wfbmpV.5oDcMS86LMnejOC.Gfn/PwPObSiQZAcEFfomhxAmk7a', 0, NULL, 4, 9, NULL, '2025-05-19 21:07:55', '2025-05-19 21:07:55', NULL),
(9, 'David', 'Santos', 'Ruvalcaba', 'ate6@gmail.com', '5553219438', 'DiegoMRecepcion', '$2y$12$uv3g3KEFxnS.jnbr/MxoyuylT9vcDQG7S652uVmmDxxxPbXdfHxWO', 0, '2025-05-22 00:46:57', 5, 9, NULL, '2025-05-20 19:19:13', '2025-05-28 20:07:06', NULL),
(10, 'God', 'Of', 'Systems', 'root@gmail.com', '3112223111', 'rooter', '$2y$12$92MkitH5sLIwTE8saHHcc.WlUpnqR38pxHqt1iCVr8fMaJxLJPegi', 0, '2025-05-28 20:20:09', 1, 9, NULL, '2025-05-28 20:11:52', '2025-05-28 20:20:18', NULL),
(11, 'Jairo', 'Robles', 'Trinidad', 'ate3@gmail.com', '5553216425', 'default_username', '$2y$12$K2/rDAJ/0RcQEPKgBFbyuOm3q5z3lSZyY/sddQAa/h8JDZm2bL6Eu', 0, NULL, 3, 11, NULL, '2025-05-29 00:42:43', '2025-05-29 00:42:43', NULL);

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
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD CONSTRAINT `empresas_suscripcion_id_foreign` FOREIGN KEY (`suscripcion_id`) REFERENCES `suscripcions` (`id`) ON DELETE CASCADE;

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

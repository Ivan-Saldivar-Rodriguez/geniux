use `geniux_db`;

DROP TABLE IF EXISTS `geniux_sesion_activa`;

CREATE TABLE IF NOT EXISTS `geniux_sesion_activa` (
	`id_usuario` INT NOT NULL,
	`id_session` varchar(500) NOT NULL,
	`fecha_conexion` DATETIME NULL,
	`fecha_live_conex` DATETIME NULL,
	PRIMARY KEY (`id_usuario`,`id_session`))
ENGINE = InnoDB DEFAULT CHARSET=utf8;


use `geniux_db`;

DROP TABLE IF EXISTS `geniux_tramo_nivel_logro_xmapa`;

CREATE TABLE `geniux_tramo_nivel_logro_xmapa` (
	`id_configuracion` int(11) NOT NULL,
	`id_ambito` int(11) NOT NULL,
	`id_nucleo` int(11) NOT NULL,
	`id_mapa` int(11) NOT NULL,
	`id_rango_nivel_logro` int(11) NOT NULL,
	`descripcion_logro_aprendizaje` text NOT NULL,

	`id_usuario_crea` int(11) NOT NULL,
	`fecha_crea` datetime NOT NULL,
	`id_usuario_actualiza` int(11) NOT NULL,
	`fecha_actualiza` datetime NOT NULL, 
	PRIMARY KEY (`id_configuracion`,`id_ambito`,`id_nucleo`,`id_mapa`,`id_rango_nivel_logro`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
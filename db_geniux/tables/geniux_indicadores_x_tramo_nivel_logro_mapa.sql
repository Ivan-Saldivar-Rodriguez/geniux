use `geniux_db`;

DROP TABLE IF EXISTS `geniux_indicadores_x_tramo_nivel_logro_mapa`;

CREATE TABLE `geniux_indicadores_x_tramo_nivel_logro_mapa` (
	`id_indicador` int(11) NOT NULL AUTO_INCREMENT,
	`id_configuracion` int(11) NOT NULL,
	`id_ambito` int(11) NOT NULL,
	`id_nucleo` int(11) NOT NULL,
	`id_mapa` int(11) NOT NULL,
	`id_rango_nivel_logro` int(11) NOT NULL,
    `id_tipointeligencia` int(11) NOT NULL,
	`descripcion_indicador` text NOT NULL,

	`id_usuario_crea` int(11) NOT NULL,
	`fecha_crea` datetime NOT NULL,
	`id_usuario_actualiza` int(11) NOT NULL,
	`fecha_actualiza` datetime NOT NULL, 
	PRIMARY KEY (`id_indicador`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE INDEX idx_indicador_001 
ON `geniux_indicadores_x_tramo_nivel_logro_mapa` (`id_configuracion`,`id_ambito`,`id_nucleo`,`id_mapa`,`id_rango_nivel_logro`);

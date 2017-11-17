use `geniux_db`;

DROP TABLE IF EXISTS `geniux_ambito_mapas_progreso`;

CREATE TABLE `geniux_ambito_mapas_progreso` (
  `id_ambito` int(11) NOT NULL AUTO_INCREMENT,
  `id_configuracion` int(11) NOT NULL,
  `desc_ambito` varchar(500) NOT NULL,
  `alpha_2_code_pais` varchar(2) DEFAULT NULL,
  `color_ambito` varchar(20) DEFAULT NULL,
  `id_usuario_crea` int(11) NOT NULL,
  `fecha_crea` datetime NOT NULL,
  `id_usuario_actualiza` int(11) NOT NULL,
  `fecha_actualiza` datetime NOT NULL,
  PRIMARY KEY (`id_ambito`,`id_configuracion`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


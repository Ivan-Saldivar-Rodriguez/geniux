use `geniux_db`;

DROP TABLE IF EXISTS `geniux_nivel_logro_rango`;
CREATE TABLE `geniux_nivel_logro_rango` (
  `id_nivel_logro_rango` int(11) NOT NULL AUTO_INCREMENT,
  `id_nivel_logro` int(11) NOT NULL ,
  `nombre_rango_nivel_logro` varchar(500) NOT NULL,
  `descripcion_rango_nivel_logro` varchar(500) NOT NULL,
  `year_from` int NOT NULL,
  `month_from` int NOT NULL,
  `year_until` int NOT NULL,
  `month_until` int NOT NULL,
  `id_usuario_crea` int(11) NOT NULL,
  `fecha_crea` datetime NOT NULL,
  `id_usuario_actualiza` int(11) NOT NULL,
  `fecha_actualiza` datetime NOT NULL,  
  PRIMARY KEY (`id_nivel_logro_rango`,`id_nivel_logro`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

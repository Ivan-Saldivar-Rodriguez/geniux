use `geniux_db`;

DROP TABLE IF EXISTS `geniux_nivel_logro`;
CREATE TABLE `geniux_nivel_logro` (
  `id_nivel_logro` int(11) NOT NULL AUTO_INCREMENT,
  `desc_nivel_logro` varchar(500) NOT NULL,
  `year_nivel_logro` int NOT NULL,
  `scope_nivel_logro` bit NULL,
  `alpha_2_code_pais_nivel_logro` varchar(2) NULL,	
  `id_institucion` int(11) NULL,
  `id_usuario_crea` int(11) NOT NULL,
  `fecha_crea` datetime NOT NULL,
  `id_usuario_actualiza` int(11) NOT NULL,
  `fecha_actualiza` datetime NOT NULL,  
  PRIMARY KEY (`id_nivel_logro`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/*
TRUNCATE TABLE `geniux_nivel_logro`;

*/
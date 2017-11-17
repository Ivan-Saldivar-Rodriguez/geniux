use `geniux_db`;

DROP TABLE IF EXISTS `geniux_serial_conexion`;

CREATE TABLE `geniux_serial_conexion` (
  `id_serial` varchar(1000) NOT NULL,
  `operatorincsvr` varchar(1000) NOT NULL,
  `fecha_creacion` datetime NOT NULL, 
  PRIMARY KEY (`id_serial`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

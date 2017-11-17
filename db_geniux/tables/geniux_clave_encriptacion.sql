use `geniux_db`;

DROP TABLE IF EXISTS `geniux_clave_encriptacion`;

CREATE TABLE `geniux_clave_encriptacion` (
  `id_clave` int(11) NOT NULL AUTO_INCREMENT,
  `valor_clave` varchar(8192) NULL,
  `estado` bit NULL,
  `id_usuario_crea` int(11) NULL,
  `fecha_crea` datetime NOT NULL,
  `id_usuario_actualiza` int(11) NULL,
  `fecha_actualiza` datetime NOT NULL,
  PRIMARY KEY (`id_clave`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*
INSERT INTO `geniux_clave_encriptacion`(`valor_clave`,`estado`,`id_usuario_crea`,`fecha_crea`,`id_usuario_actualiza`,`fecha_actualiza`)
VALUES('ajspedno29096jjkkliwsb209ndbcuhd',1,1,now(),1,now());

*/
use `geniux_db`;

DROP TABLE IF EXISTS `geniux_perfil`;

CREATE TABLE `geniux_perfil` (
  `id_perfil` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_perfil` varchar(100) CHARACTER SET utf8 NOT NULL,
  `id_usuario_crea` int(11) NOT NULL,
  `fecha_crea` datetime NOT NULL,
  `id_usuario_actualiza` int(11) NOT NULL,
  `fecha_actualiza` datetime NOT NULL, 
  PRIMARY KEY (`id_perfil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*
TRUNCATE TABLE `geniux_perfil`;

INSERT INTO `geniux_perfil`
(`descripcion_perfil`, `id_usuario_crea`, `fecha_crea`, `id_usuario_actualiza`, `fecha_actualiza`)
VALUES
('ADMINISTRADOR',1,now(),1,now()),
('TUTOR(A)',1,now(),1,now()),
('DOCENTE',1,now(),1,now()),
('DIRECTOR(A)',1,now(),1,now()),
('JEFE(A) UTP',1,now(),1,now()),
('EDUCADOR(A)',1,now(),1,now());
*/
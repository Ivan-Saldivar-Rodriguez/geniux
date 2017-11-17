
use `geniux_db`;

DROP TABLE IF EXISTS `geniux_usuario`;

CREATE TABLE `geniux_usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `rut` varchar(20) CHARACTER SET utf8 NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `paterno` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `materno` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `mail` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `foto` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `telefono` text CHARACTER SET utf8 DEFAULT NULL,
  `celular` varchar(45) CHARACTER SET utf8 DEFAULT NULL, 
  `genero` varchar(1) CHARACTER SET utf8 DEFAULT NULL,
  `nombreusuario` varchar(50) CHARACTER SET utf8 NOT NULL,
  `contraseña` blob NOT NULL,
  `id_usuario_crea` int(11) NULL,
  `fecha_crea` datetime NOT NULL,
  `id_usuario_actualiza` int(11) NULL,
  `fecha_actualiza` datetime NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `rut_UNIQUE` (`rut`,`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*
TRUNCATE TABLE `geniux_usuario`;

INSERT INTO `geniux_usuario`
(
`rut`,
`nombre`,
`paterno`,
`materno`,
`mail`,
`foto`,
`telefono`,
`celular`,
`genero`,
`nombreusuario`,
`contraseña`,
`id_usuario_crea`,
`fecha_crea`,
`id_usuario_actualiza`,
`fecha_actualiza`)
VALUES(
'104611249',
'IVAN',
'SALDIVAR',
'RODRIGUEZ',
'ivansaldivar@nativecodex.com',
'user1.jpg',
'56-2-29321997',
'56-9-97137935',
'M',
'ivan',
AES_ENCRYPT('master1968','ajspedno29096jjkkliwsb209ndbcuhd'),
null,
now(),
null,
now());


INSERT INTO `geniux_usuario`
(
`rut`,
`nombre`,
`paterno`,
`materno`,
`mail`,
`foto`,
`telefono`,
`celular`,
`genero`,
`nombreusuario`,
`contraseña`,
`id_usuario_crea`,
`fecha_crea`,
`id_usuario_actualiza`,
`fecha_actualiza`)
VALUES(
'169113718',
'RODRIGO',
'FIERRO',
'ACEITUNO',
'rodrigofierro@cognox.org',
'user2.jpg',
'56-2-29321997',
'56-9-97137935',
'M',
'rodrigo',
AES_ENCRYPT('12345678','ajspedno29096jjkkliwsb209ndbcuhd'),
null,
now(),
null,
now());
*/

use `geniux_db`;

DROP TABLE IF EXISTS `geniux_rel_perfil_usuario`;

CREATE TABLE `geniux_rel_perfil_usuario` (
  `id_perfil` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_usuario_crea` int(11) NOT NULL,
  `fecha_crea` datetime NOT NULL,
  `id_usuario_actualiza` int(11) NOT NULL,
  `fecha_actualiza` datetime NOT NULL,  
  PRIMARY KEY (`id_perfil`,`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*
TRUNCATE TABLE `geniux_rel_perfil_usuario`;

INSERT INTO `geniux_db`.`geniux_rel_perfil_usuario`
(`id_perfil`,
`id_usuario`,
`id_usuario_crea`,
`fecha_crea`,
`id_usuario_actualiza`,
`fecha_actualiza`)
VALUES (1,1,1,now(),1,now());


INSERT INTO `geniux_db`.`geniux_rel_perfil_usuario`
(`id_perfil`,
`id_usuario`,
`id_usuario_crea`,
`fecha_crea`,
`id_usuario_actualiza`,
`fecha_actualiza`)
VALUES (1,2,1,now(),1,now());

-- ,(1,2,1,now(),1,now()),(1,3,1,now(),1,now()),(1,4,1,now(),1,now());
*/
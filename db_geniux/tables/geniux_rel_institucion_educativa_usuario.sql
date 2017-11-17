use `geniux_db`;

DROP TABLE IF EXISTS `geniux_rel_institucion_educativa_usuario`;

CREATE TABLE IF NOT EXISTS `geniux_rel_institucion_educativa_usuario` (
	`id_institucion` INT(11) NOT NULL ,
	`id_usuario` INT(11) NOT NULL,
	`id_usuario_crea` int(11) NOT NULL,
	`fecha_crea` datetime NOT NULL,
	`id_usuario_actualiza` int(11) NOT NULL,
	`fecha_actualiza` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;


CREATE UNIQUE INDEX idx_geniux_rel_institucion_educativa_usuario
ON `geniux_rel_institucion_educativa_usuario` (`id_institucion`, `id_usuario`); 
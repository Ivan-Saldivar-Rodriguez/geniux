use `geniux_db`;

DROP TABLE IF EXISTS `geniux_configuracion_mapas_progreso`;

CREATE TABLE IF NOT EXISTS `geniux_configuracion_mapas_progreso` (
	`id_configuracion` int(11)  NOT NULL AUTO_INCREMENT,
	`desc_configuracion` varchar(500) NOT NULL,
    `id_nivel_logro` int(11) NOT NULL,
    `alpha_2_code_pais_configuracion` varchar(2) NULL,	
    `scope_configuracion` bit NULL,
    `id_institucion` int(11) NULL,
    
	`id_usuario_crea` int(11) NOT NULL,
	`fecha_crea` datetime NOT NULL,
	`id_usuario_actualiza` int(11) NOT NULL,
	`fecha_actualiza` datetime NOT NULL,
    PRIMARY KEY (`id_configuracion`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

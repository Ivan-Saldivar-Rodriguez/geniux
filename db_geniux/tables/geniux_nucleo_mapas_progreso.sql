use `geniux_db`;

DROP TABLE IF EXISTS `geniux_nucleo_mapas_progreso`;

CREATE TABLE IF NOT EXISTS `geniux_nucleo_mapas_progreso` (
	`id_nucleo` int(11)  NOT NULL AUTO_INCREMENT,
	`id_ambito` int(11)  NOT NULL ,
	`id_configuracion` int(11)  NOT NULL,
	`nombre_nucleo` varchar(500) NOT NULL,
    `desc_nucleo` text NULL,
    `alpha_2_code_pais` varchar(2) NULL,	
    `color_nucleo` varchar(20) NULL,	
    
	`id_usuario_crea` int(11) NOT NULL,
	`fecha_crea` datetime NOT NULL,
	`id_usuario_actualiza` int(11) NOT NULL,
	`fecha_actualiza` datetime NOT NULL,
    PRIMARY KEY (`id_nucleo`,`id_ambito`,`id_configuracion`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

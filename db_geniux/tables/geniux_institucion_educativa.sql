use `geniux_db`;

DROP TABLE IF EXISTS `geniux_institucion_educativa`;

CREATE TABLE IF NOT EXISTS `geniux_institucion_educativa` (
	`id_institucion` INT(11) NOT NULL AUTO_INCREMENT,
	`institucion_url_base` varchar(1000) NULL,
	`institucion_nombre` varchar(500) NOT NULL,
	`institucion_tipo` int NOT NULL,
	`institucion_identificador_pais_origen` varchar(50) NULL,
	`institucion_escudo` varchar(1000) NULL,
	`institucion_escudo_tipo_imagen` varchar(5) NULL,
    `codigo_pais_iso_3166_alpha_3` varchar(10) NULL,
    `codigo_estado` varchar(10) NULL,    
	`codigo_region` varchar(255) NULL,
	`id_comuna` varchar(255) NULL,
	`telefono1` varchar(50) NULL,
	`telefono2` varchar(50) NULL,
	`telefono3` varchar(50) NULL,
	`ciudad` varchar(255) NULL,
	`direccion` varchar(1000) NULL,
	`numdireccion` varchar(20) NULL,
	`director` varchar(500) NULL,
	`institucion_activa` bit NULL,
	`sistema_gestion_activo` bit NULL,
	
    `RECONOCIMIENTO_OFICIAL_LEY_DS_RES_EXENTA_cl` varchar(500) NULL,
	`RECONOCIMIENTO_OFICIAL_FECHA_cl` datetime NULL,
	`FIRMA_DIRECTOR_DIGITALIZADA_cl` varchar(500) NULL,
	`FIRMA_DIRECTOR_DIGITALIZADA_EXTENSION_cl` varchar(5) NULL,
	`MEMBRETE_CERTIFICADOS_DIGITALIZADO_cl` varchar(500) NULL,
	`MEMBRETE_CERTIFICADOS_DIGITALIZADO_EXTENSION_cl` varchar(5) NULL,       
	`JORNADA_ESCOLAR_COMPLETA_cl` bit NULL,

	PRIMARY KEY (`id_institucion`)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

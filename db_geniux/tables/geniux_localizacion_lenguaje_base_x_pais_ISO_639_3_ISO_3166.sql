
use `geniux_db`;

DROP TABLE IF EXISTS `geniux_localizacion_lenguaje_base_x_pais_ISO_639_3_ISO_3166`;
CREATE TABLE `geniux_localizacion_lenguaje_base_x_pais_ISO_639_3_ISO_3166` (
    `id_regitro` int(11) NOT NULL AUTO_INCREMENT,
    `639-3` char(3) NULL,
    `alpha_2_code` varchar(2) NULL,
    `alpha_3_code` varchar(3) NULL,
    `id_usuario_crea` int(11),
	`fecha_crea` datetime,
	`id_usuario_actualiza` int(11),
	`fecha_actualiza` datetime,
  PRIMARY KEY (`id_regitro`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;


TRUNCATE TABLE `geniux_localizacion_lenguaje_base_x_pais_ISO_639_3_ISO_3166`;

INSERT INTO `geniux_localizacion_lenguaje_base_x_pais_ISO_639_3_ISO_3166` (
    `639-3`,
    `alpha_2_code`,
    `alpha_3_code`,
    `id_usuario_crea`,
	`fecha_crea`,
	`id_usuario_actualiza`,
	`fecha_actualiza`
)
VALUES
('spa','CL','CHL',1,now(),1,now()),
('eng','US','USA',1,now(),1,now()),
('eng','GB','GBR',1,now(),1,now()),
('fra','FR','FRA',1,now(),1,now()),
('spa','ES','ESP',1,now(),1,now()),
('por','PT','PRT',1,now(),1,now()),
('por','BR','BRA',1,now(),1,now()),
('deu','DE','DEU',1,now(),1,now()),
('ita','IT','ITA',1,now(),1,now());

/*
SELECT * FROM geniux_db.geniux_localizacion_codigo_pais_iso_3166
where english_short_name like 'italy%';

SELECT * FROM `geniux_db`.`geniux_localizacion_lenguaje_iso_639_3`
where `geniux_localizacion_lenguaje_iso_639_3`.`Language Name` like 'ita%';

*/
use `geniux_db`;

DROP TABLE IF EXISTS `geniux_tipo_inteligencia`;

CREATE TABLE IF NOT EXISTS `geniux_tipo_inteligencia` (
	`id_tipointeligencia` int(11)  NOT NULL AUTO_INCREMENT,
	`descripcion_tipointeligencia` varchar(500) NOT NULL,
    `descripcion_tipointeligencia_eng` varchar(500) NOT NULL,
    `img_tipointeligencia` varchar(500) NOT NULL,
    
 	`id_usuario_crea` int(11) NOT NULL,
	`fecha_crea` datetime NOT NULL,
	`id_usuario_actualiza` int(11) NOT NULL,
	`fecha_actualiza` datetime NOT NULL,
    PRIMARY KEY (`id_tipointeligencia`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

TRUNCATE TABLE `geniux_tipo_inteligencia`;

INSERT INTO `geniux_tipo_inteligencia`(
`descripcion_tipointeligencia`,`descripcion_tipointeligencia_eng`,`img_tipointeligencia`,`id_usuario_crea`,`fecha_crea`,`id_usuario_actualiza`,`fecha_actualiza`)
VALUES
('Inteligencia lingüística','Linguistic Intelligence','images/reading_32x.png',1,now(),1,now()),
('Inteligencia lógico-matemática','Logical-Mathematical Intelligence','images/maths-symbols_32x.png',1,now(),1,now()),
('Inteligencia espacial','Spatial Intelligence','images/3d-cube_32x.png',1,now(),1,now()),
('Inteligencia musical','Musical Intelligence','images/music-player_32x.png',1,now(),1,now()),
('Inteligencia corporal y cinestésica','Bodily-Kinesthetic Intelligence','images/running_32x.png',1,now(),1,now()),
('Inteligencia intrapersonal','Intra-personal Intelligence','images/thinking_32x.png',1,now(),1,now()),
('Inteligencia interpersonal','Interpersonal Intelligence','images/conversation_32x.png',1,now(),1,now()),
('Inteligencia emocional','Emotional Intelligence','images/hearts32x.png',1,now(),1,now()), 
('Inteligencia naturalista','Naturalist Intelligence','images/sprout3_32x.png',1,now(),1,now()),
('Inteligencia existencial','Existential Intelligence','images/meditation_32x.png',1,now(),1,now()),
('Inteligencia creativa','Creative Intelligence','images/creativo32.png',1,now(),1,now()),  
('Inteligencia colaborativa','Collaborative Intelligence','images/collaborative32x.png',1,now(),1,now());



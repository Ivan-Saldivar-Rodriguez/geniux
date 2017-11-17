--
-- Procedimientos
--
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_localiza_consulta_glosas_portal`$$
CREATE  PROCEDURE `geniux_localiza_consulta_glosas_portal` (
	IN opcion_lenguaje VARCHAR(50), 
    IN opcion_llamado VARCHAR(500), 
    IN ip_conexion_remota VARCHAR(100)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE total_glosas_ int;
    DECLARE v1_ int;
    DECLARE orden_ int;
	DECLARE seccion_app_ varchar(100);
	DECLARE id_object_ varchar(500);
	DECLARE type_object_ varchar(500);
	DECLARE attribute_object_ varchar(500);
	DECLARE gls_lengua_ text;
	DECLARE total_glosas int;
    DECLARE lengua_ varchar(500);
    
	CREATE TEMPORARY TABLE tmp_list_localizacion_portal(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`seccion_app` varchar(100) NOT NULL,
		`id_object` varchar(500) NOT NULL,
		`type_object` varchar(500) NOT NULL,
		`attribute_object` varchar(500) NOT NULL,
		`gls_lengua` text NOT NULL
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

    INSERT INTO tmp_list_localizacion_portal(
		`seccion_app`,
		`id_object`,
		`type_object`,
		`attribute_object`,
		`gls_lengua`
	)
    SELECT
		`geniux_localizacion_portal`.`seccion_app`,
		`geniux_localizacion_portal`.`id_object`,
		`geniux_localizacion_portal`.`type_object`,
		`geniux_localizacion_portal`.`attribute_object`,
		`geniux_localizacion_portal`.`gls_lengua`
	FROM 
		`geniux_localizacion_portal`
    WHERE 
		`geniux_localizacion_portal`.`639-3` = opcion_lenguaje
	AND `geniux_localizacion_portal`.`seccion_app` = opcion_llamado;
    
	SELECT COUNT(1)
    INTO total_glosas_
	FROM tmp_list_localizacion_portal;
        
	SELECT `geniux_localizacion_lenguaje_iso_639_3`.`Language Name`
    INTO lengua_
    FROM `geniux_localizacion_lenguaje_iso_639_3`
	WHERE `639-3`=opcion_lenguaje;
	-- SELECT total_glosas_ as total_glosas;
    -- SELECT * FROM tmp_list_localizacion_portal;
    
	SET v1_ =1;
    
	WHILE v1_ <= total_glosas_ DO
		
		SELECT
			tmp_list_localizacion_portal.seccion_app,
			tmp_list_localizacion_portal.id_object,
			tmp_list_localizacion_portal.type_object,
			tmp_list_localizacion_portal.attribute_object,
			tmp_list_localizacion_portal.gls_lengua
        INTO
			seccion_app_,
			id_object_,
			type_object_,
			attribute_object_,
			gls_lengua_
		FROM
			tmp_list_localizacion_portal
		WHERE
			tmp_list_localizacion_portal.orden = v1_;
			
		IF v1_ = total_glosas_ THEN
			SET salida_ = CONCAT(
							salida_,
							'[',
                            '"',seccion_app_,'",',
                            '"',id_object_,'",',
                            '"',type_object_,'",',
                            '"',attribute_object_,'",',
                            '"',gls_lengua_,'"',
                            ']'
						  );
        ELSE
			SET salida_ = CONCAT(
							salida_,
							'[',
                            '"',seccion_app_,'",',
                            '"',id_object_,'",',
                            '"',type_object_,'",',
                            '"',attribute_object_,'",',
                            '"',gls_lengua_,'"',
                            '],'
						  );
        END IF;
        
		SET v1_ = v1_ + 1;
    END WHILE;
	DROP TABLE tmp_list_localizacion_portal;
    
	SET salida_ = CONCAT('{"fx":"SELECCIONALENGUA","lengua":"',lengua_,'","etiquetas":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END$$

-- call `geniux_localiza_consulta_glosas_portal`('spa','portal','');

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_admin_obtener_serial_conexion`$$
CREATE  PROCEDURE `geniux_admin_obtener_serial_conexion` ()  
BEGIN
	DECLARE salida_ text default '';
    DECLARE id_serial_ varchar(1000);
    DECLARE operatorincsvr_ varchar(1000);
    
    SET id_serial_ = REPLACE(REPLACE( CONCAT(REPLACE(CAST(RAND() as char(500)),'.',''), DATE_FORMAT(now(),"%Y%m%d"),CURTIME(6) ) ,':',''),'.','');
    SET operatorincsvr_ =REPLACE(REPLACE( CONCAT( CAST(RAND() as char(500)), CURTIME(6) ) ,':',''),'.','');
    
    INSERT INTO `geniux_serial_conexion`(
		`id_serial`,
		`operatorincsvr`,
		`fecha_creacion`)
	VALUES(
		id_serial_,
		operatorincsvr_,
		now());

	SET salida_ = CONCAT('{"fx":"CARGASERIAL","operatorincsvr":"', REVERSE(operatorincsvr_),'","serial":"',id_serial_,'"}');
    
	SELECT salida_ AS resultado;
END$$
-- CALL geniux_admin_obtener_serial_conexion();


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_admin_desencriptar_con_serial_conexion`$$
CREATE  PROCEDURE `geniux_admin_desencriptar_con_serial_conexion` (
	IN indexdecrypt varchar(1000),
    IN parametro varchar(200)
)  
BEGIN
    DECLARE operatorincsvr_ varchar(1000);
    DECLARE largoOperatorEncrypt_ int;
    DECLARE largoParametro_ int;
    DECLARE pos_ int;
    DECLARE posOp_ int;
    DECLARE pos_param_ int;
    DECLARE char1_ char;
    DECLARE char1_ascii_ int;
    DECLARE char2_ char;
    DECLARE char2_ascii_ varchar(3);
    DECLARE char2_ascii_decrypt_ int;
    DECLARE parametroDecrypt_ varchar(50) default '';
    
    SELECT `geniux_serial_conexion`.`operatorincsvr`
    INTO operatorincsvr_
	FROM 
		`geniux_serial_conexion`    
	WHERE
		`geniux_serial_conexion`.`id_serial` = indexdecrypt;

	SET largoOperatorEncrypt_ = LENGTH(operatorincsvr_);
    SET largoParametro_ = LENGTH(parametro)/3;
    
    SET pos_=1;
    SET posOp_ =1;
    -- SELECT operatorincsvr_ as operatorincsvr_;
    
    WHILE pos_ <= largoParametro_ DO
    
		IF posOp_ <= largoOperatorEncrypt_ THEN
			SET char1_ = SUBSTRING(operatorincsvr_,posOp_,1);
		ELSE
			SET posOp_ = 1;
			SET char1_ = SUBSTRING(operatorincsvr_,posOp_,1);
        END IF;
        SET char1_ascii_ = ASCII(char1_);
        
        SET pos_param_ = 1 + (pos_- 1) * 3;
        SET char2_ascii_ = SUBSTRING(parametro,pos_param_,3);
        
        SET char2_ascii_decrypt_ =  CAST(char2_ascii_ as unsigned)- char1_ascii_;
        
        -- select char2_ascii_decrypt_ as char2_ascii_decrypt_, char2_ascii_ as char2_ascii_, char1_ascii_ as char1_ascii_, char1_ as char1_;
        
        SET parametroDecrypt_ = CONCAT(parametroDecrypt_,CHAR(char2_ascii_decrypt_));
        
        SET posOp_ = posOp_ + 1;
        SET pos_ = pos_ + 1;
    END WHILE;
    
	SELECT parametroDecrypt_ AS resultado;
END$$

-- CALL `geniux_admin_desencriptar_con_serial_conexion`('157149171173155165098108111112','153170153167');
-- CALL `geniux_admin_desencriptar_con_serial_conexion`('0729028849610154420171012161119111936','153170153167');


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_admin_consulta_credenciales`$$
CREATE  PROCEDURE `geniux_admin_consulta_credenciales` (
	IN usrname varchar(50),
    IN usrpwd varchar(50),
    IN idioma varchar(3)
)  
BEGIN
    DECLARE salida_ text default '';
    DECLARE valor_clave_ text default '';
    DECLARE id_usuario_ int(11);
	DECLARE nombre_ varchar(150);
    DECLARE apellido_ varchar(150);
	DECLARE foto_ varchar(500);
	DECLARE genero_ varchar(1);
    DECLARE descripcion_perfil_ varchar(100);
    DECLARE actionpage_ varchar(100);
    DECLARE id_session_ varchar(500);
    DECLARE saludo_ varchar(100);
    
    
    SELECT `geniux_clave_encriptacion`.`valor_clave`
    INTO valor_clave_
    FROM `geniux_clave_encriptacion`;
    
    SELECT 
		`geniux_usuario`.`id_usuario`,
		`geniux_usuario`.`nombre`,
		IFNULL(`geniux_usuario`.`foto`,'user.png'),
		`geniux_usuario`.`genero`,
        `geniux_perfil`.`descripcion_perfil`
	INTO 
		id_usuario_,
		nombre_ ,
		foto_ ,
		genero_,
		descripcion_perfil_
	FROM 
		`geniux_usuario`
        INNER JOIN `geniux_rel_perfil_usuario`
        ON `geniux_rel_perfil_usuario`.`id_usuario` = `geniux_usuario`.`id_usuario`
        INNER JOIN `geniux_perfil`
        ON `geniux_perfil`.`id_perfil` = `geniux_rel_perfil_usuario`.`id_perfil`
	WHERE
		`geniux_usuario`.`nombreusuario`=usrname
    AND `geniux_usuario`.`contraseña`= AES_ENCRYPT(usrpwd,valor_clave_);
    
    
    IF descripcion_perfil_ = 'ADMINISTRADOR' THEN
		SET actionpage_='geniux_administrator.html';
	ELSE
		IF descripcion_perfil_ = 'JEFE(A) UTP' OR descripcion_perfil_ = 'DIRECTOR(A)' THEN
			SET actionpage_='geniux_utp.html';
		ELSE
			IF descripcion_perfil_ = 'EDUCADOR(A)' OR descripcion_perfil_ = 'DOCENTE' THEN
				SET actionpage_='geniux_docente.html';
			ELSE
				SET actionpage_='geniux_tutor.html';
			END IF;
        END IF;
	END IF;
    
    IF IFNULL(id_usuario_,0) = 0 THEN
		SET salida_ = CONCAT('{"fx":"CREDENCIALESINVALIDAS"}');
    ELSE
		DELETE FROM `geniux_sesion_activa`
		WHERE `geniux_sesion_activa`.`id_usuario`=id_usuario_;
		
        SET id_session_  = REPLACE(REPLACE( CONCAT(REPLACE(CAST(RAND() as char(500)),'.',''), DATE_FORMAT(now(),"%Y%m%d"),CURTIME(6) ) ,':',''),'.','');
        
		INSERT INTO `geniux_db`.`geniux_sesion_activa`
		(`id_usuario`,
		`id_session`,
		`fecha_conexion`,
		`fecha_live_conex`)
		VALUES
		(id_usuario_,
		id_session_,
		now(),
		now());
        IF genero_="F" THEN
			SET saludo_='BIENVENIDA ';
        ELSE
			SET saludo_='BIENVENIDO ';
        END IF;
		SET salida_ = CONCAT('{"fx":"SESIONASIGNADA","id_usuario":"',CAST(id_usuario_  AS CHAR CHARACTER SET utf8),'","id_session":"',id_session_,'","nombre":"',nombre_,'","genero":"',genero_,'","foto":"',foto_,'","perfil":"',descripcion_perfil_,'","actionpage":"',actionpage_,'","saludo":"',saludo_,'"}');
    END IF;
    
	SELECT salida_ AS resultado;
END$$

-- call `geniux_admin_consulta_credenciales` ('ivan','master1968','spa');


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_admin_cerrar_sesion`$$
CREATE  PROCEDURE `geniux_admin_cerrar_sesion` (
	IN id_usuario int(11),
    IN id_session varchar(500)
)  
BEGIN
	DECLARE salida_ text default '';
    
    DELETE FROM `geniux_sesion_activa` 
    WHERE 
		`geniux_sesion_activa`.`id_usuario` =id_usuario
    AND `geniux_sesion_activa`.`id_session` =id_session;
    
	SET salida_ = CONCAT('{"fx":"CIERRESESIONOK"}');
    
	SELECT salida_ AS resultado;
END$$


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_pais_iso_3166`$$
CREATE  PROCEDURE `geniux_obtener_pais_iso_3166` (
	IN country varchar(3)
)  
BEGIN
	DECLARE salida_ text default '';
    DECLARE language_ varchar(3);
    DECLARE country_ varchar(500);

	SELECT 
		`geniux_localizacion_codigo_pais_iso_3166`.`english_short_name`,
        `geniux_localizacion_lenguaje_base_x_pais_iso_639_3_iso_3166`.`639-3`
    INTO 
		country_,
        language_
    FROM 
		`geniux_localizacion_codigo_pais_iso_3166`
        INNER JOIN `geniux_localizacion_lenguaje_base_x_pais_iso_639_3_iso_3166`
        ON `geniux_localizacion_lenguaje_base_x_pais_iso_639_3_iso_3166`.`alpha_3_code` = `geniux_localizacion_codigo_pais_iso_3166`.`alpha_3_code`
    WHERE 
		`geniux_localizacion_codigo_pais_iso_3166`.`alpha_2_code`=country;
        
	SET salida_ = CONCAT('{"pais":"',country_,'","lenguaje":"',language_,'"}');
	SELECT salida_ AS resultado;
END$$

-- CALL `geniux_obtener_pais_iso_3166`('CL');


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_nivel_logros_mapas`$$
CREATE  PROCEDURE `geniux_obtener_listado_nivel_logros_mapas` (
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
	DECLARE id_nivel_logro_ int(11);
	DECLARE year_nivel_logro_ int;
	DECLARE scope_nivel_logro_ bit;
	DECLARE alpha_2_code_pais_nivel_logro_ varchar(2);
	DECLARE desc_nivel_logro_ varchar(500);	
	DECLARE id_institucion_ int(11);
    DECLARE nombrepais_nivel_logro_ varchar(500);
    DECLARE uso_nivel_logro_ int;
	DECLARE cantNivelLogros_ int;
    DECLARE v1_ int;
    
    CREATE TEMPORARY TABLE tmp_list_nivel_logro(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_nivel_logro` int(11) NOT NULL,
		`year_nivel_logro` int NOT NULL,
		`scope_nivel_logro` bit NOT NULL,
		`alpha_2_code_pais_nivel_logro` varchar(2) NOT NULL,	
		`desc_nivel_logro` varchar(500) NOT NULL,	
		`id_institucion` int(11) NULL,
        `uso_nivel_logro` int
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		INSERT INTO  tmp_list_nivel_logro(
			`id_nivel_logro`,
			`year_nivel_logro`,
			`scope_nivel_logro`,
			`alpha_2_code_pais_nivel_logro`,
			`desc_nivel_logro`,
			`id_institucion`,
            `uso_nivel_logro` 
		)
		SELECT DISTINCT
			`geniux_nivel_logro`.`id_nivel_logro`,
			`geniux_nivel_logro`.`year_nivel_logro`,
			IFNULL(`geniux_nivel_logro`.`scope_nivel_logro`,0),
			IFNULL(`geniux_nivel_logro`.`alpha_2_code_pais_nivel_logro`,''),
			`geniux_nivel_logro`.`desc_nivel_logro`,
			IFNULL(`geniux_nivel_logro`.`id_institucion`,0),
            IFNULL(COUNT(`geniux_configuracion_mapas_progreso`.`id_nivel_logro`),0)
		FROM 
			`geniux_nivel_logro`
            LEFT JOIN `geniux_configuracion_mapas_progreso`
			ON `geniux_configuracion_mapas_progreso`.`id_nivel_logro` = `geniux_nivel_logro`.`id_nivel_logro`
		WHERE 
			`geniux_nivel_logro`.`scope_nivel_logro` = 1
		OR	`geniux_nivel_logro`.`id_institucion` IN (
													SELECT `geniux_rel_institucion_educativa_usuario`.`id_institucion`
													FROM `geniux_rel_institucion_educativa_usuario` 
													WHERE `geniux_rel_institucion_educativa_usuario`.`id_usuario` = id_usuario
													) 
		OR	`geniux_nivel_logro`.`alpha_2_code_pais_nivel_logro` = alpha_2_code_pais
		GROUP BY 
			`geniux_nivel_logro`.`id_nivel_logro`,
			`geniux_nivel_logro`.`year_nivel_logro`,
			IFNULL(`geniux_nivel_logro`.`scope_nivel_logro`,0),
			IFNULL(`geniux_nivel_logro`.`alpha_2_code_pais_nivel_logro`,''),
			`geniux_nivel_logro`.`desc_nivel_logro`,
			IFNULL(`geniux_nivel_logro`.`id_institucion`,0)
		ORDER BY 
			`geniux_nivel_logro`.`id_nivel_logro`;
        
		SELECT COUNT(1)
        INTO cantNivelLogros_
        FROM tmp_list_nivel_logro;
        
        -- SELECT cantNivelLogros_ as cantNivelLogros_;
        
        SET v1_ = 1;
        
        IF IFNULL(cantNivelLogros_,0) > 0 THEN
			WHILE v1_ <= cantNivelLogros_ DO
				SELECT
					tmp_list_nivel_logro.id_nivel_logro,
					tmp_list_nivel_logro.year_nivel_logro,
					IFNULL(tmp_list_nivel_logro.scope_nivel_logro,0),
					IFNULL(tmp_list_nivel_logro.alpha_2_code_pais_nivel_logro,''),
					tmp_list_nivel_logro.desc_nivel_logro,
					IFNULL(tmp_list_nivel_logro.id_institucion,0),
                    IFNULL(`geniux_localizacion_codigo_pais_iso_3166`.`english_short_name`,''),
					tmp_list_nivel_logro.uso_nivel_logro
				INTO
					id_nivel_logro_,
					year_nivel_logro_,
					scope_nivel_logro_,
					alpha_2_code_pais_nivel_logro_,
					desc_nivel_logro_,
					id_institucion_,
                    nombrepais_nivel_logro_,
                    uso_nivel_logro_
				FROM
					tmp_list_nivel_logro
                    LEFT JOIN `geniux_localizacion_codigo_pais_iso_3166`
                    ON `geniux_localizacion_codigo_pais_iso_3166`.`alpha_2_code`=  tmp_list_nivel_logro.alpha_2_code_pais_nivel_logro                    
				WHERE 
					tmp_list_nivel_logro.orden = v1_;
                    
				IF v1_ < cantNivelLogros_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
									CAST(year_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
									CAST(CAST(scope_nivel_logro_ as unsigned) AS CHAR CHARACTER SET utf8),',',
									'"',CAST(alpha_2_code_pais_nivel_logro_ AS CHAR CHARACTER SET utf8),'",',
									'"',desc_nivel_logro_,'",',
									'"',nombrepais_nivel_logro_,'",',
									CAST(uso_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_institucion_ AS CHAR CHARACTER SET utf8),
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
									CAST(year_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
									CAST(CAST(scope_nivel_logro_ as unsigned) AS CHAR CHARACTER SET utf8),',',
									'"',CAST(alpha_2_code_pais_nivel_logro_ AS CHAR CHARACTER SET utf8),'",',
									'"',desc_nivel_logro_,'",',
									'"',nombrepais_nivel_logro_,'",',
									CAST(uso_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_institucion_ AS CHAR CHARACTER SET utf8),
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;
	END IF;
    
    DROP TABLE tmp_list_nivel_logro;
    
    SET salida_ = CONCAT('{"fx":"CARGARLISTADONIVELGRUPOS","cantidad":"',CAST(IFNULL(cantNivelLogros_,0) AS CHAR CHARACTER SET utf8),'","listado":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END
$$

-- CALL geniux_obtener_listado_nivel_logros_mapas(1,'0810488833869331320171001111916737880','spa','CL');


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_crear_grupo_nivel_logro_mapa`$$
CREATE  PROCEDURE `geniux_crear_grupo_nivel_logro_mapa`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN year_nivel_logro int,
    IN descrip_cfg_nivel_logro varchar(500),
    IN nivel_logro_scope int,
    IN insert_values_rangos text,
    IN id_institucion int
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE id_nivel_logro_ INT(11);
    DECLARE cantSessionActiva_ int;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORGUARDARNUEVOGRUPONIVELLOGRO","mensaje":"Se ha producido una excepción al guardar el nuevo nivel de logro. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;
   
   	CREATE TEMPORARY TABLE tmp_list_nivel_logro(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`nombre_rango_nivel_logro` varchar(500) NOT NULL,
		`descripcion_rango_nivel_logro` varchar(500) NOT NULL,
		`year_from` int NOT NULL,
		`month_from` int NOT NULL,
		`year_until` int NOT NULL,
		`month_until` int NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
     
		SET @stmt_insert_rangos_ = CONCAT(
								'INSERT INTO tmp_list_nivel_logro',
                                '(',
								'`nombre_rango_nivel_logro`,',
								'`descripcion_rango_nivel_logro`,',
								'`year_from`,',
								'`month_from`,',
								'`year_until`,',
								'`month_until`',
                                ')',
								'VALUES ',
                                insert_values_rangos
                                );
	
		PREPARE stmt_rangos FROM @stmt_insert_rangos_; 
		EXECUTE stmt_rangos;
		DEALLOCATE PREPARE stmt_rangos;    
    
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
    
		INSERT INTO `geniux_nivel_logro`(
			`desc_nivel_logro`,
			`year_nivel_logro`,
			`scope_nivel_logro`,
			`alpha_2_code_pais_nivel_logro`,
			`id_institucion`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`
		)
		VALUES(
			descrip_cfg_nivel_logro,
			year( now()),
			nivel_logro_scope,
			alpha_2_code_pais,
			id_institucion,
			id_usuario,
			now(),
			id_usuario,
			now()
		);
        
        SET id_nivel_logro_ = LAST_INSERT_ID();
        
        INSERT INTO `geniux_nivel_logro_rango`(
			`id_nivel_logro`,
			`nombre_rango_nivel_logro`,
			`descripcion_rango_nivel_logro`,
			`year_from`,
			`month_from`,
			`year_until`,
			`month_until`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`
		)
		SELECT
			id_nivel_logro_,
			tmp_list_nivel_logro.nombre_rango_nivel_logro,
			tmp_list_nivel_logro.descripcion_rango_nivel_logro,
			tmp_list_nivel_logro.year_from,
			tmp_list_nivel_logro.month_from,
			tmp_list_nivel_logro.year_until,
			tmp_list_nivel_logro.month_until,
            id_usuario,
			now(),
            id_usuario,
			now()
        FROM 
			tmp_list_nivel_logro
        ORDER BY 
			tmp_list_nivel_logro.orden;
		
        COMMIT;
		
        SET salida_ = '{"fx":"REGISTROEXITOSODENIVELDELOGRO"}';
    END IF;
    DROP TABLE tmp_list_nivel_logro;
    
	SELECT salida_ AS resultado;
    
END
$$

                                                                                             
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_rangos_nivel_logros_mapas`$$
CREATE  PROCEDURE `geniux_obtener_listado_rangos_nivel_logros_mapas` (
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN id_nivel_logro int(11),
    IN id_nivel_logro_indexSel int
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
	DECLARE id_nivel_logro_rango_ int(11);
	DECLARE id_nivel_logro_ int(11);
	DECLARE nombre_rango_nivel_logro_ varchar(500);
	DECLARE descripcion_rango_nivel_logro_ varchar(500);
	DECLARE year_from_ int(11);
	DECLARE month_from_ int(11);
	DECLARE year_until_ int(11);
	DECLARE month_until_ int(11);
	DECLARE cantNivelLogrosRangos_ int;
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_nivel_logro_rango(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_nivel_logro_rango` int(11) NOT NULL,
		`id_nivel_logro` int(11) NOT NULL,
		`nombre_rango_nivel_logro` varchar(500) NOT NULL,
		`descripcion_rango_nivel_logro` varchar(500) NOT NULL,
		`year_from` int(11) NOT NULL,
		`month_from` int(11) NOT NULL,
		`year_until` int(11) NOT NULL,
		`month_until` int(11) NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		INSERT INTO  tmp_list_nivel_logro_rango(
			`id_nivel_logro_rango`,
			`id_nivel_logro`,
			`nombre_rango_nivel_logro`,
			`descripcion_rango_nivel_logro`,
			`year_from`,
			`month_from`,
			`year_until`,
			`month_until` 
		)
		SELECT DISTINCT
			`geniux_nivel_logro_rango`.`id_nivel_logro_rango`,
			`geniux_nivel_logro_rango`.`id_nivel_logro`,
			`geniux_nivel_logro_rango`.`nombre_rango_nivel_logro`,
			`geniux_nivel_logro_rango`.`descripcion_rango_nivel_logro`,
			`geniux_nivel_logro_rango`.`year_from`,
			`geniux_nivel_logro_rango`.`month_from`,
			`geniux_nivel_logro_rango`.`year_until`,
			`geniux_nivel_logro_rango`.`month_until` 
		FROM 
			`geniux_nivel_logro_rango`
 		WHERE 
			`geniux_nivel_logro_rango`.`id_nivel_logro` = id_nivel_logro
		ORDER BY 
			`geniux_nivel_logro_rango`.`id_nivel_logro_rango`;
            
		SELECT COUNT(1)
        INTO cantNivelLogrosRangos_
        FROM tmp_list_nivel_logro_rango;
        
        SET v1_ = 1;
        
        IF IFNULL(cantNivelLogrosRangos_,0) > 0 THEN
			WHILE v1_ <= cantNivelLogrosRangos_ DO
				SELECT
					tmp_list_nivel_logro_rango.id_nivel_logro_rango,
					tmp_list_nivel_logro_rango.id_nivel_logro,
					tmp_list_nivel_logro_rango.nombre_rango_nivel_logro,
					tmp_list_nivel_logro_rango.descripcion_rango_nivel_logro,
					tmp_list_nivel_logro_rango.year_from,
					tmp_list_nivel_logro_rango.month_from,
					tmp_list_nivel_logro_rango.year_until,
					tmp_list_nivel_logro_rango.month_until
				INTO
					id_nivel_logro_rango_,
					id_nivel_logro_,
					nombre_rango_nivel_logro_,
					descripcion_rango_nivel_logro_,
					year_from_,
					month_from_,
					year_until_,
					month_until_
				FROM
					tmp_list_nivel_logro_rango
 				WHERE 
					tmp_list_nivel_logro_rango.orden = v1_;
                    
				IF v1_ < cantNivelLogrosRangos_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nivel_logro_rango_ AS CHAR CHARACTER SET utf8),',',
									'"',nombre_rango_nivel_logro_,'",',
									'"',descripcion_rango_nivel_logro_,'",',
									CAST(year_from_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_from_ AS CHAR CHARACTER SET utf8),',',
									CAST(year_until_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_until_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8),
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nivel_logro_rango_ AS CHAR CHARACTER SET utf8),',',
									'"',nombre_rango_nivel_logro_,'",',
									'"',descripcion_rango_nivel_logro_,'",',
									CAST(year_from_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_from_ AS CHAR CHARACTER SET utf8),',',
									CAST(year_until_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_until_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8), 
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;
	END IF;
    
    DROP TABLE tmp_list_nivel_logro_rango;
    
    SET salida_ = CONCAT('{"fx":"CARGARLISTADORANGOSXNIVELGRUPOS","id_nivel_logro_indexSel":"',CAST(id_nivel_logro_indexSel AS CHAR CHARACTER SET utf8),'","cantidad":"',CAST(IFNULL(cantNivelLogrosRangos_,0) AS CHAR CHARACTER SET utf8),'","listado":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END
$$

-- call`geniux_obtener_listado_rangos_nivel_logros_mapas`(1,'0922715892011966520170930000432070086','spa','CL',1,0);


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_actualizar_grupo_nivel_logro_mapa`$$
CREATE  PROCEDURE `geniux_actualizar_grupo_nivel_logro_mapa`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN year_nivel_logro int,
    IN descrip_cfg_nivel_logro varchar(500),
    IN id_nivel_logro int(11),
    IN nivel_logro_scope int,
    IN insert_values_rangos text,
    IN id_institucion int
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE id_nivel_logro_ INT(11);
    DECLARE cantSessionActiva_ int;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORACTUALIZARGRUPONIVELLOGRO","mensaje":"Se ha producido una excepción al actualizar el gruopo nivel de logro seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;
   
   	CREATE TEMPORARY TABLE tmp_list_nivel_logro(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`nombre_rango_nivel_logro` varchar(500) NOT NULL,
		`descripcion_rango_nivel_logro` varchar(500) NOT NULL,
		`year_from` int NOT NULL,
		`month_from` int NOT NULL,
		`year_until` int NOT NULL,
		`month_until` int NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
     
	SET @stmt_insert_rangos_ = CONCAT(
								'INSERT INTO tmp_list_nivel_logro',
                                '(',
								'`nombre_rango_nivel_logro`,',
								'`descripcion_rango_nivel_logro`,',
								'`year_from`,',
								'`month_from`,',
								'`year_until`,',
								'`month_until`',
                                ')',
								'VALUES ',
                                insert_values_rangos
                                );
	
		PREPARE stmt_rangos FROM @stmt_insert_rangos_; 
		EXECUTE stmt_rangos;
		DEALLOCATE PREPARE stmt_rangos;    
    
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
		
		UPDATE `geniux_nivel_logro`
		SET
			`desc_nivel_logro` = descrip_cfg_nivel_logro,
			`year_nivel_logro` = year( now()),
			`scope_nivel_logro` = nivel_logro_scope,
			`alpha_2_code_pais_nivel_logro` = alpha_2_code_pais,
			`id_institucion` = id_institucion,
			`id_usuario_actualiza` = id_usuario,
			`fecha_actualiza` = now()
		WHERE 
			`geniux_nivel_logro`.`id_nivel_logro` =id_nivel_logro;

		DELETE FROM `geniux_nivel_logro_rango`
		WHERE `geniux_nivel_logro_rango`.`id_nivel_logro` =id_nivel_logro;
            
        INSERT INTO `geniux_nivel_logro_rango`(
			`id_nivel_logro`,
			`nombre_rango_nivel_logro`,
			`descripcion_rango_nivel_logro`,
			`year_from`,
			`month_from`,
			`year_until`,
			`month_until`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`
		)
		SELECT
			id_nivel_logro,
			tmp_list_nivel_logro.nombre_rango_nivel_logro,
			tmp_list_nivel_logro.descripcion_rango_nivel_logro,
			tmp_list_nivel_logro.year_from,
			tmp_list_nivel_logro.month_from,
			tmp_list_nivel_logro.year_until,
			tmp_list_nivel_logro.month_until,
            id_usuario,
			now(),
            id_usuario,
			now()
        FROM 
			tmp_list_nivel_logro
        ORDER BY 
			tmp_list_nivel_logro.orden;
		
        COMMIT;
		
        SET salida_ = '{"fx":"ACTUALIZACIONEXITOSODENIVELDELOGRO"}';
    END IF;
    DROP TABLE tmp_list_nivel_logro;
    
	SELECT salida_ AS resultado;
    
END
$$

            
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_eliminar_nivel_logros_mapas`$$
CREATE  PROCEDURE `geniux_eliminar_nivel_logros_mapas`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN id_nivel_logro int(11)
)  
BEGIN
	DECLARE salida_ text default '';
    DECLARE cantSessionActiva_ int;
  
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORELIMINACIONNIVELLOGRO","mensaje":"Se ha producido una excepción al eliminar el gruopo nivel de logro seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
        
		DELETE 
        FROM `geniux_nivel_logro`
		WHERE `geniux_nivel_logro`.`id_nivel_logro` =id_nivel_logro;

		DELETE 
        FROM `geniux_nivel_logro_rango`
		WHERE `geniux_nivel_logro_rango`.`id_nivel_logro` =id_nivel_logro;
     
		COMMIT;
        
        SET salida_ = '{"fx":"ELIMINACIONEXITOSANIVELLOGRO"}';
    END IF;

	SELECT salida_ AS resultado;
    
END
$$                                


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_configuraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_obtener_listado_configuraciones_base_mapa` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN alpha_2_code_pais varchar(2),
    IN idioma varchar(3)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
    DECLARE id_configuracion_ int(11);
    DECLARE desc_configuracion_ varchar(500);
    DECLARE id_nivel_logro_ int(11);
    DECLARE alpha_2_code_pais_configuracion_ varchar(2);
    DECLARE scope_configuracion_  bit;
    DECLARE id_institucion_ int(11);
    DECLARE institucion_nombre_ varchar(500);
    DECLARE uso_configuracion_ int; 
    DECLARE english_short_name_ varchar(500);
    DECLARE year_configuracion_ int;
	DECLARE cantConfigMapas_ int;
    
    DECLARE salida_nl_ text default '';
    DECLARE cantNivelLogros_ int;
	DECLARE id_nivel_logro_cmb_ int(11);
	DECLARE year_nivel_logro_cmb_ int;
	DECLARE scope_nivel_logro_cmb_ bit;
	DECLARE alpha_2_code_pais_nivel_logro_cmb_ varchar(2);
	DECLARE desc_nivel_logro_cmb_ varchar(500);	
	DECLARE id_institucion_cmb_ int(11);
    DECLARE nombrepais_nivel_logro_cmb_ varchar(500);
    
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_config_mapa(
	`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	`id_configuracion` int(11)  NOT NULL,
	`desc_configuracion` varchar(500) NOT NULL,
    `id_nivel_logro` int(11) NOT NULL,
    `alpha_2_code_pais_configuracion` varchar(2) NULL,	
    `scope_configuracion` bit NULL,
    `id_institucion` int(11) NULL,
    `institucion_nombre` varchar(500),
    `uso_configuracion` int,
    `english_short_name` varchar(500),
    `year_configuracion` int
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
    CREATE TEMPORARY TABLE tmp_list_nivel_logro(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_nivel_logro` int(11) NOT NULL,
		`year_nivel_logro` int NOT NULL,
		`scope_nivel_logro` bit NOT NULL,
		`alpha_2_code_pais_nivel_logro` varchar(2) NOT NULL,	
		`desc_nivel_logro` varchar(500) NOT NULL,	
		`id_institucion` int(11) NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
        
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		SET cantConfigMapas_ = 0;
		SET salida_ = '';
        
        
		-- LISTADO TIPO NIVEL LOGRO (COMBO)
		INSERT INTO  tmp_list_nivel_logro(
			`id_nivel_logro`,
			`year_nivel_logro`,
			`scope_nivel_logro`,
			`alpha_2_code_pais_nivel_logro`,
			`desc_nivel_logro`,
			`id_institucion`
		)
		SELECT DISTINCT
			`geniux_nivel_logro`.`id_nivel_logro`,
			`geniux_nivel_logro`.`year_nivel_logro`,
			IFNULL(`geniux_nivel_logro`.`scope_nivel_logro`,0),
			IFNULL(`geniux_nivel_logro`.`alpha_2_code_pais_nivel_logro`,''),
			`geniux_nivel_logro`.`desc_nivel_logro`,
			IFNULL(`geniux_nivel_logro`.`id_institucion`,0)
		FROM 
			`geniux_nivel_logro`

		WHERE 
			`geniux_nivel_logro`.`scope_nivel_logro` = 1
		OR	`geniux_nivel_logro`.`id_institucion` IN (
													SELECT `geniux_rel_institucion_educativa_usuario`.`id_institucion`
													FROM `geniux_rel_institucion_educativa_usuario` 
													WHERE `geniux_rel_institucion_educativa_usuario`.`id_usuario` = id_usuario
													) 
		OR	`geniux_nivel_logro`.`alpha_2_code_pais_nivel_logro` = alpha_2_code_pais
		ORDER BY 
			`geniux_nivel_logro`.`id_nivel_logro`;
                
		-- LISTADO CONFIGURACION MAPAS
		INSERT INTO tmp_list_config_mapa(
			`id_configuracion`,
			`desc_configuracion`,
			`id_nivel_logro`,
			`alpha_2_code_pais_configuracion`,
			`scope_configuracion`,
			`id_institucion`,
            `institucion_nombre`,
            `uso_configuracion`,
            `english_short_name`,
            `year_configuracion`
		)
		SELECT 
			`geniux_configuracion_mapas_progreso`.`id_configuracion`,
			`geniux_configuracion_mapas_progreso`.`desc_configuracion`,
			`geniux_configuracion_mapas_progreso`.`id_nivel_logro`,
			`geniux_configuracion_mapas_progreso`.`alpha_2_code_pais_configuracion`,
			`geniux_configuracion_mapas_progreso`.`scope_configuracion`,
			`geniux_configuracion_mapas_progreso`.`id_institucion`,
            `geniux_institucion_educativa`.`institucion_nombre`,
            0,
            `geniux_localizacion_codigo_pais_iso_3166`.`english_short_name`,
            YEAR(`geniux_configuracion_mapas_progreso`.`fecha_crea`)
		FROM 
			`geniux_configuracion_mapas_progreso`
            LEFT JOIN `geniux_institucion_educativa`
            ON `geniux_institucion_educativa`.`id_institucion` = `geniux_configuracion_mapas_progreso`.`id_institucion`
            INNER JOIN `geniux_localizacion_codigo_pais_iso_3166`
            ON `geniux_localizacion_codigo_pais_iso_3166`.`alpha_2_code`= `geniux_configuracion_mapas_progreso`.`alpha_2_code_pais_configuracion`
		WHERE

			`geniux_configuracion_mapas_progreso`.`scope_configuracion` = 1
		OR	`geniux_configuracion_mapas_progreso`.`id_institucion` IN (
													SELECT `geniux_rel_institucion_educativa_usuario`.`id_institucion`
													FROM `geniux_rel_institucion_educativa_usuario` 
													WHERE `geniux_rel_institucion_educativa_usuario`.`id_usuario` = id_usuario
													) 
		OR	`geniux_configuracion_mapas_progreso`.`alpha_2_code_pais_configuracion` = alpha_2_code_pais;            

		-- ARMA JSON LISTADO DE NIVEL LOGRO
        SELECT COUNT(1)
        INTO cantNivelLogros_
        FROM tmp_list_nivel_logro;
        
        SET v1_ = 1;
        IF IFNULL(cantNivelLogros_,0) > 0 THEN
			WHILE v1_ <= cantNivelLogros_ DO
				SELECT
					tmp_list_nivel_logro.id_nivel_logro,
					tmp_list_nivel_logro.year_nivel_logro,
					CAST(IFNULL(tmp_list_nivel_logro.scope_nivel_logro,0) AS unsigned),
					IFNULL(tmp_list_nivel_logro.alpha_2_code_pais_nivel_logro,''),
					tmp_list_nivel_logro.desc_nivel_logro,
					IFNULL(tmp_list_nivel_logro.id_institucion,0),
                    IFNULL(`geniux_localizacion_codigo_pais_iso_3166`.`english_short_name`,'')
				INTO
					id_nivel_logro_cmb_,
					year_nivel_logro_cmb_,
					scope_nivel_logro_cmb_,
					alpha_2_code_pais_nivel_logro_cmb_,
					desc_nivel_logro_cmb_,
					id_institucion_cmb_,
                    nombrepais_nivel_logro_cmb_
				FROM
					tmp_list_nivel_logro
                    LEFT JOIN `geniux_localizacion_codigo_pais_iso_3166`
                    ON `geniux_localizacion_codigo_pais_iso_3166`.`alpha_2_code`=  tmp_list_nivel_logro.alpha_2_code_pais_nivel_logro                    
				WHERE 
					tmp_list_nivel_logro.orden = v1_;
                    
				IF v1_ < cantNivelLogros_ THEN
					SET salida_nl_ = CONCAT(
									salida_nl_,
                                    '[',
                                    CAST(id_nivel_logro_cmb_ AS CHAR CHARACTER SET utf8),',',
									CAST(year_nivel_logro_cmb_ AS CHAR CHARACTER SET utf8),',',
									CAST(CAST(scope_nivel_logro_cmb_ as unsigned) AS CHAR CHARACTER SET utf8),',',
									'"',CAST(alpha_2_code_pais_nivel_logro_cmb_ AS CHAR CHARACTER SET utf8),'",',
									'"',desc_nivel_logro_cmb_,'",',
									'"',nombrepais_nivel_logro_cmb_,'",',
                                    CAST(id_institucion_cmb_ AS CHAR CHARACTER SET utf8),
                                    '],'
								  );
                ELSE
					SET salida_nl_ = CONCAT(
									salida_nl_,
                                    '[',
                                    CAST(id_nivel_logro_cmb_ AS CHAR CHARACTER SET utf8),',',
									CAST(year_nivel_logro_cmb_ AS CHAR CHARACTER SET utf8),',',
									CAST(CAST(scope_nivel_logro_cmb_ as unsigned) AS CHAR CHARACTER SET utf8),',',
									'"',CAST(alpha_2_code_pais_nivel_logro_cmb_ AS CHAR CHARACTER SET utf8),'",',
									'"',desc_nivel_logro_cmb_,'",',
									'"',nombrepais_nivel_logro_cmb_,'",',
                                    CAST(id_institucion_cmb_ AS CHAR CHARACTER SET utf8),
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;        
		-- SELECT salida_nl_ AS salida_nl_;
         
		-- ARMA JSON LISTADO CONFIGURACIONES
		SELECT COUNT(1)
        INTO cantConfigMapas_
        FROM tmp_list_config_mapa;
        
        SET v1_ = 1;
        IF IFNULL(cantConfigMapas_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapas_ DO
                          
				SELECT
					tmp_list_config_mapa.`id_configuracion`,
					tmp_list_config_mapa.`desc_configuracion`,
					tmp_list_config_mapa.`id_nivel_logro`,
					tmp_list_config_mapa.`alpha_2_code_pais_configuracion`,
					tmp_list_config_mapa.`scope_configuracion`,
					tmp_list_config_mapa.`id_institucion`,
                    tmp_list_config_mapa.`institucion_nombre`,
                    tmp_list_config_mapa.`uso_configuracion`,
                    tmp_list_config_mapa.`english_short_name`,
                    tmp_list_config_mapa.`year_configuracion`
				INTO
					id_configuracion_,
					desc_configuracion_,
					id_nivel_logro_,
					alpha_2_code_pais_configuracion_,
					scope_configuracion_,
					id_institucion_,
                    institucion_nombre_,
                    uso_configuracion_,
                    english_short_name_,
                    year_configuracion_
				FROM
					tmp_list_config_mapa
 				WHERE 
					tmp_list_config_mapa.orden = v1_;
                    
				IF v1_ < cantConfigMapas_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',desc_configuracion_,'",',
                                    '"',alpha_2_code_pais_configuracion_,'",',
									CAST(CAST(IFNULL(scope_configuracion_,0) AS unsigned) AS CHAR CHARACTER SET utf8),',',
                                    '"',IFNULL(institucion_nombre_,''),'",',
                                    CAST(uso_configuracion_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    '"',IFNULL(english_short_name_,''),'",',
                                    CAST(year_configuracion_ AS CHAR CHARACTER SET utf8),
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',desc_configuracion_,'",',
                                    '"',alpha_2_code_pais_configuracion_,'",',
									CAST(CAST(IFNULL(scope_configuracion_,0) AS unsigned) AS CHAR CHARACTER SET utf8),',',
                                    '"',IFNULL(institucion_nombre_,''),'",',
									CAST(uso_configuracion_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    '"',IFNULL(english_short_name_,''),'",',
                                    CAST(year_configuracion_ AS CHAR CHARACTER SET utf8),
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
           
        END IF;
         
	END IF;
    
    DROP TABLE tmp_list_config_mapa;
    DROP TABLE tmp_list_nivel_logro;
    
    SET salida_ = CONCAT('{"fx":"CARGARLISTADOMAPASCONFIGURADOS","cantidad":"',CAST(cantConfigMapas_ AS CHAR CHARACTER SET utf8),'","listado":[',salida_,'], "listado_nl":[',salida_nl_,']}');
    
	SELECT salida_ AS resultado;
END
-- CALL `geniux_obtener_listado_configuraciones_base_mapa`(1,'0857589869627347120171009142405653619','CL','spa');
$$ 


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_guardar_configuraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_guardar_configuraciones_base_mapa`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN alpha_2_code_pais varchar(2),
    IN idioma varchar(3),
	IN year_country varchar(500),
	IN descrip_config_mapa varchar(500),
	IN id_institucion int,
	IN config_mapa_scope int,
    IN id_nivel_logro int(11)
)  
BEGIN
	DECLARE salida_ text default '';
    DECLARE cantSessionActiva_ int;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		INSERT INTO `geniux_configuracion_mapas_progreso`(
			`desc_configuracion`,
			`id_nivel_logro`,
			`alpha_2_code_pais_configuracion`,
			`scope_configuracion`,
            `id_institucion`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`)
		VALUES
		(
			descrip_config_mapa,
			id_nivel_logro,
			alpha_2_code_pais,
			config_mapa_scope,
            id_institucion,
			id_usuario,
			now(),
			id_usuario,
			now()
		);

        SET salida_ = '{"fx":"CREACIONEXITOSACONFIGURACIONBASE"}';
    END IF;

	SELECT salida_ AS resultado;
    
END
$$   
                             


/*
call `geniux_guardar_configuraciones_base_mapa`(
1,
'01177866171279797520171006154244160961',
'CL',
'spa',
'2017 / Chile',
'Configuración mapa de progreso Educación Parvularia',
0,
0,
1);
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_actualizar_configuraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_actualizar_configuraciones_base_mapa`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN alpha_2_code_pais varchar(2),
    IN idioma varchar(3),
	IN year_country varchar(500),
	IN descrip_config_mapa varchar(500),
	IN id_institucion int,
	IN config_mapa_scope int,
    IN id_nivel_logro int(11),
    IN id_configuracion int(11)
)  
BEGIN
	DECLARE salida_ text default '';
    DECLARE cantSessionActiva_ int;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		UPDATE `geniux_configuracion_mapas_progreso`
		SET
			`desc_configuracion` = descrip_config_mapa,
			`id_nivel_logro` = id_nivel_logro,
			`alpha_2_code_pais_configuracion` = alpha_2_code_pais,
			`scope_configuracion` = config_mapa_scope,
			`id_usuario_actualiza` = id_usuario,
			`fecha_actualiza` = now()
		WHERE 
			`geniux_configuracion_mapas_progreso`.`id_configuracion` = id_configuracion;


        SET salida_ = '{"fx":"ACTUALIZACIONEXITOSACONFIGURACIONBASE"}';
    END IF;

	SELECT salida_ AS resultado;
    
END
$$    

CALL `geniux_actualizar_configuraciones_base_mapa`(
1,
'01177866171279797520171006154244160961',
'CL',
'spa',
'2017 / Chile',
'Configuración Mapa de Progreso Educación Parvularia',
0,
0,
1,
1
);

/*
geniux_eliminar_configuraciones_base_mapa(
'$this->id_user',
'$this->id_session',
'$this->alpha_2_code_pais',
'$this->idioma',
'$this->id_configuracion')");
*/
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_eliminar_configuraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_eliminar_configuraciones_base_mapa`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN alpha_2_code_pais varchar(2),
    IN idioma varchar(3),
    IN id_configuracion int(11)
)  
BEGIN
	DECLARE salida_ text default '';
    DECLARE cantSessionActiva_ int;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORELIMINACIONCONFIGMAPA","mensaje":"Se ha producido una excepción al tratar de eliminar la configuración de mapa de progreso seleccionada. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;

		-- 1 ELIMINO CONFIG BASE
		DELETE FROM `geniux_configuracion_mapas_progreso`
        WHERE `geniux_configuracion_mapas_progreso`.`id_configuracion`= id_configuracion;
		
        -- 2 ELIMINO AMBITOS
 		DELETE FROM `geniux_ambito_mapas_progreso`
		WHERE `geniux_ambito_mapas_progreso`.`id_configuracion`=id_configuracion;
        
        -- 3 ELIMINO NUCLEOS
		DELETE FROM `geniux_nucleo_mapas_progreso`
		WHERE `geniux_nucleo_mapas_progreso`.`id_configuracion`=id_configuracion;
        
        -- 4 ELIMINO EJES/MAPAS
        DELETE FROM `geniux_mapa_eje_mapas_progreso`
		WHERE `geniux_mapa_eje_mapas_progreso`.`id_configuracion`=id_configuracion;        
            
        -- 5 ELIMINO TRAMO NVEL LOGRO E INDICADORES DE DESEMPEÑO
        DELETE FROM `geniux_tramo_nivel_logro_xmapa`
		WHERE 			
			`geniux_tramo_nivel_logro_xmapa`.`id_configuracion`=id_configuracion;
        
        DELETE FROM `geniux_indicadores_x_tramo_nivel_logro_mapa`
		WHERE 			
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion`=id_configuracion;
        
		COMMIT;
        
        SET salida_ = '{"fx":"ELIMINACIONEXITOSACONFIGURACIONBASE"}';
    END IF;

	SELECT salida_ AS resultado;
    
END
$$    

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_ambitos_xconfiguraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_obtener_listado_ambitos_xconfiguraciones_base_mapa` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
	DECLARE id_ambito_ int(11);
	DECLARE id_configuracion_ int(11);
	DECLARE desc_ambito_ varchar(500);
	DECLARE alpha_2_code_pais_ varchar(2);
	DECLARE color_ambito_ varchar(20);
	DECLARE cantConfigMapasAmbitos_ int;
        
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_config_mapa_ambitos(
		`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_ambito` int(11)  NOT NULL,
		`id_configuracion` int(11)  NOT NULL,
		`desc_ambito` varchar(500) NOT NULL,
		`alpha_2_code_pais` varchar(2) NULL,	
		`color_ambito` varchar(20) NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
        
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		SET cantConfigMapasAmbitos_ = 0;
		SET salida_ = '';
        
		-- LISTADO AMBITOS DE CONFIGURACION DE MAPA 
		INSERT INTO  tmp_list_config_mapa_ambitos(
			`id_ambito`,
			`id_configuracion`,
			`desc_ambito`,
			`alpha_2_code_pais`,
			`color_ambito`
		)
		SELECT 
			`geniux_ambito_mapas_progreso`.`id_ambito`,
			`geniux_ambito_mapas_progreso`.`id_configuracion`,
			`geniux_ambito_mapas_progreso`.`desc_ambito`,
			`geniux_ambito_mapas_progreso`.`alpha_2_code_pais`,
			`geniux_ambito_mapas_progreso`.`color_ambito`
		FROM 
			`geniux_db`.`geniux_ambito_mapas_progreso`
		WHERE
			`geniux_ambito_mapas_progreso`.`id_configuracion`=id_configuracion
		ORDER BY 
			`geniux_ambito_mapas_progreso`.`id_ambito`;
                

		-- ARMA JSON LISTADO DE AMBITOS
        SELECT COUNT(1)
        INTO cantConfigMapasAmbitos_
        FROM tmp_list_config_mapa_ambitos;
        
        SET v1_ = 1;
        IF IFNULL(cantConfigMapasAmbitos_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapasAmbitos_ DO
				SELECT
					tmp_list_config_mapa_ambitos.id_ambito,
                    tmp_list_config_mapa_ambitos.id_configuracion,
                    REPLACE(tmp_list_config_mapa_ambitos.desc_ambito,'"',"'"),
                    tmp_list_config_mapa_ambitos.alpha_2_code_pais,
                    tmp_list_config_mapa_ambitos.color_ambito
				INTO
					id_ambito_,
					id_configuracion_,
					desc_ambito_,
					alpha_2_code_pais_,
					color_ambito_
				FROM
					tmp_list_config_mapa_ambitos
  				WHERE 
					tmp_list_config_mapa_ambitos.orden = v1_;
                    
				IF v1_ < cantConfigMapasAmbitos_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_ambito_ AS CHAR CHARACTER SET utf8),',',
									CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',REPLACE(desc_ambito_,'\n',' '),'",',
									'"',alpha_2_code_pais_,'",',
                                    '"',color_ambito_,'"',
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_ambito_ AS CHAR CHARACTER SET utf8),',',
									CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',REPLACE(desc_ambito_,'\n',' '),'",',
									'"',alpha_2_code_pais_,'",',
                                    '"',color_ambito_,'"',
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;        
         
	END IF;
    
    DROP TABLE tmp_list_config_mapa_ambitos;
    
    SET salida_ = CONCAT('{"fx":"CARGARLISTADOAMBITOS","cantidad":"',CAST(cantConfigMapasAmbitos_ AS CHAR CHARACTER SET utf8),'","listado":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_guardar_ambito_xconfiguraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_guardar_ambito_xconfiguraciones_base_mapa` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN descripcionAmbito varchar(500),
    IN colorAmbito varchar(20)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		INSERT INTO `geniux_ambito_mapas_progreso`(
			`id_configuracion`,
			`desc_ambito`,
			`alpha_2_code_pais`,
			`color_ambito`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`)
		VALUES(
			id_configuracion,
			descripcionAmbito,
			alpha_2_code_pais,
			colorAmbito,
			id_usuario,
			now(),
			id_usuario,
			now());

	END IF;
    
    SET salida_ = CONCAT('{"fx":"CREACIONEXITOSADEAMBITO"}');
    
	SELECT salida_ AS resultado;
END
-- CALL `geniux_guardar_ambito_xconfiguraciones_base_mapa`(1,'0857589869627347120171009142405653619','spa','CL','1','Formación Personal y Social','#D54B13');
$$ 


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_eliminar_ambito_xconfiguraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_eliminar_ambito_xconfiguraciones_base_mapa` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
  
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORELIMINACIONCONFIGMAPAAMBITO","mensaje":"Se ha producido una excepción al tratar de eliminar el ámbito de mapa de progreso seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
        
        -- 1 ELIMINO AMBITO
		DELETE FROM `geniux_ambito_mapas_progreso`
		WHERE 
			`geniux_ambito_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_ambito_mapas_progreso`.`id_configuracion`=id_configuracion;

        -- 2 ELIMINO NUCLEOS
		DELETE FROM `geniux_nucleo_mapas_progreso`
		WHERE 
			`geniux_nucleo_mapas_progreso`.`id_configuracion`=id_configuracion
		AND `geniux_nucleo_mapas_progreso`.`id_ambito`=id_ambito;
        
        -- 3 ELIMINO EJES/MAPAS
        DELETE FROM `geniux_mapa_eje_mapas_progreso`
		WHERE 
			`geniux_mapa_eje_mapas_progreso`.`id_configuracion`=id_configuracion
		AND	`geniux_mapa_eje_mapas_progreso`.`id_ambito`=id_ambito;        
        
        -- 4 ELIMINO TRAMO NVEL LOGRO E INDICADORES DE DESEMPEÑO
        DELETE FROM `geniux_tramo_nivel_logro_xmapa`
		WHERE 			
			`geniux_tramo_nivel_logro_xmapa`.`id_configuracion`=id_configuracion
		AND	`geniux_tramo_nivel_logro_xmapa`.`id_ambito`=id_ambito;
        
        DELETE FROM `geniux_indicadores_x_tramo_nivel_logro_mapa`
		WHERE 			
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion`=id_configuracion
		AND	`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_ambito`=id_ambito;
        
		COMMIT;
	END IF;
    
    SET salida_ = CONCAT('{"fx":"ELIMINACIONEXITOSADEAMBITO"}');
    
	SELECT salida_ AS resultado;
END
$$


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_actualizar_ambito_xconfiguraciones_base_mapa`$$
CREATE  PROCEDURE `geniux_actualizar_ambito_xconfiguraciones_base_mapa` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
    IN descripcionAmbito varchar(500),
    IN colorAmbito varchar(20)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		UPDATE `geniux_ambito_mapas_progreso`
		SET
			`desc_ambito` =descripcionAmbito,
			`alpha_2_code_pais` =alpha_2_code_pais,
			`color_ambito` =colorAmbito,
			`id_usuario_actualiza` =id_usuario,
			`fecha_actualiza` = now()
		WHERE 
			`geniux_ambito_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_ambito_mapas_progreso`.`id_configuracion`=id_configuracion;


	END IF;
    
    SET salida_ = CONCAT('{"fx":"ACTUALIZACIONEXITOSADEAMBITO"}');
    
	SELECT salida_ AS resultado;
END
$$-- call `geniux_actualizar_ambito_xconfiguraciones_base_mapa`(1,'20857589869627347120171009142405653619','spa','CL',4,'Formación Personal y Social','#D54B13',1);


-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_nucleos_xambito`$$
CREATE  PROCEDURE `geniux_obtener_listado_nucleos_xambito` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
	DECLARE id_nucleo_ int(11);
	DECLARE id_ambito_ int(11);
	DECLARE id_configuracion_ int(11);
	DECLARE nombre_nucleo_ varchar(500);
	DECLARE desc_nucleo_ varchar(8000);
	DECLARE alpha_2_code_pais_ varchar(2);
	DECLARE color_nucleo_ varchar(20);    
	DECLARE cantConfigMapasNucleos_ int;
        
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_config_mapa_nucleos(
		`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_nucleo` int(11)  NOT NULL,
		`id_ambito` int(11)  NOT NULL ,
		`id_configuracion` int(11)  NOT NULL,
		`nombre_nucleo` varchar(500) NOT NULL,
		`desc_nucleo` varchar(8000) NULL,
		`alpha_2_code_pais` varchar(2) NULL,	
		`color_nucleo` varchar(20) NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
        
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		SET cantConfigMapasNucleos_ = 0;
		SET salida_ = '';
        
		-- LISTADO AMBITOS DE CONFIGURACION DE MAPA 
		INSERT INTO tmp_list_config_mapa_nucleos(
			`id_nucleo`,
			`id_ambito`,
			`id_configuracion`,
			`nombre_nucleo`,
			`desc_nucleo`,
			`alpha_2_code_pais`,
			`color_nucleo`
		)
        SELECT 
			`geniux_nucleo_mapas_progreso`.`id_nucleo`,
			`geniux_nucleo_mapas_progreso`.`id_ambito`,
			`geniux_nucleo_mapas_progreso`.`id_configuracion`,
			`geniux_nucleo_mapas_progreso`.`nombre_nucleo`,
			`geniux_nucleo_mapas_progreso`.`desc_nucleo`,
			`geniux_nucleo_mapas_progreso`.`alpha_2_code_pais`,
			`geniux_nucleo_mapas_progreso`.`color_nucleo`
		FROM 
			`geniux_nucleo_mapas_progreso`
		WHERE
			`geniux_nucleo_mapas_progreso`.`id_configuracion`=id_configuracion
		AND `geniux_nucleo_mapas_progreso`.`id_ambito`=id_ambito
		ORDER BY 
			`geniux_nucleo_mapas_progreso`.`id_nucleo`;
                

		-- ARMA JSON LISTADO DE AMBITOS
        SELECT COUNT(1)
        INTO cantConfigMapasNucleos_
        FROM tmp_list_config_mapa_nucleos;
        
        SET v1_ = 1;
        IF IFNULL(cantConfigMapasNucleos_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapasNucleos_ DO
				SELECT
					tmp_list_config_mapa_nucleos.`id_nucleo`,
					tmp_list_config_mapa_nucleos.`id_ambito`,
					tmp_list_config_mapa_nucleos.`id_configuracion`,
					REPLACE(tmp_list_config_mapa_nucleos.`nombre_nucleo`,'"',"'"),
					REPLACE(tmp_list_config_mapa_nucleos.`desc_nucleo`,'"',"'"),
					tmp_list_config_mapa_nucleos.`alpha_2_code_pais`,
					tmp_list_config_mapa_nucleos.`color_nucleo`
				INTO
					id_nucleo_,
					id_ambito_,
					id_configuracion_,
					nombre_nucleo_,
					desc_nucleo_,
					alpha_2_code_pais_,
					color_nucleo_
				FROM
					tmp_list_config_mapa_nucleos
  				WHERE 
					tmp_list_config_mapa_nucleos.orden = v1_;
                    
				IF v1_ < cantConfigMapasNucleos_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nucleo_ AS CHAR CHARACTER SET utf8),',',
									CAST(id_ambito_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',nombre_nucleo_,'",',
                                    '"',REPLACE(desc_nucleo_,'\n',' '),'",',
									'"',alpha_2_code_pais_,'",',
                                    '"',color_nucleo_,'"',
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nucleo_ AS CHAR CHARACTER SET utf8),',',
									CAST(id_ambito_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',nombre_nucleo_,'",',
                                    '"',REPLACE(desc_nucleo_,'\n',' '),'",',
									'"',alpha_2_code_pais_,'",',
                                    '"',color_nucleo_,'"',
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;        
         
	END IF;
    
    DROP TABLE tmp_list_config_mapa_nucleos;
    
    SET salida_ = CONCAT('{"fx":"CARGARLISTADONUCLEOS","cantidad":"',CAST(cantConfigMapasNucleos_ AS CHAR CHARACTER SET utf8),'","listado":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END
$$-- CALL `geniux_obtener_listado_nucleos_xambito`(1,'0857589869627347120171009142405653619','spa','CL',4,1);

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_guardar_nucleos_xambito`$$
CREATE  PROCEDURE `geniux_guardar_nucleos_xambito` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
    IN nucleo_nombre varchar(500),
    IN nucleo_descripcion text,
    IN nucleo_color varchar(20)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		INSERT INTO `geniux_nucleo_mapas_progreso`(
			`id_ambito`,
			`id_configuracion`,
			`nombre_nucleo`,
			`desc_nucleo`,
			`alpha_2_code_pais`,
			`color_nucleo`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`)
		VALUES(
			id_ambito,
			id_configuracion,
			nucleo_nombre,
			nucleo_descripcion,
			alpha_2_code_pais,
			nucleo_color,
			id_usuario,
			now(),
			id_usuario,
			now());

	END IF;
    
    SET salida_ = CONCAT('{"fx":"CREACIONEXITOSADENUCLEO"}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_eliminar_nucleos_xambito`$$
CREATE  PROCEDURE `geniux_eliminar_nucleos_xambito` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORELIMINACIONCONFIGMAPANUCLEO","mensaje":"Se ha producido una excepción al tratar de eliminar el núcleo de mapa de progreso seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;    
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
        
        -- 1 ELIMINO NUCLEO
		DELETE FROM `geniux_nucleo_mapas_progreso`
		WHERE 
			`geniux_nucleo_mapas_progreso`.`id_configuracion`=id_configuracion
		AND `geniux_nucleo_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_nucleo_mapas_progreso`.`id_nucleo`=id_nucleo;

        -- 2 ELIMINO EJES/MAPAS
        DELETE FROM `geniux_mapa_eje_mapas_progreso`
		WHERE 
			`geniux_mapa_eje_mapas_progreso`.`id_configuracion`=id_configuracion
		AND	`geniux_mapa_eje_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_mapa_eje_mapas_progreso`.`id_nucleo`=id_nucleo;
        
        -- 3 ELIMINO TRAMO NVEL LOGRO E INDICADORES DE DESEMPEÑO
        DELETE FROM `geniux_tramo_nivel_logro_xmapa`
		WHERE 			
			`geniux_tramo_nivel_logro_xmapa`.`id_configuracion`=id_configuracion
		AND	`geniux_tramo_nivel_logro_xmapa`.`id_ambito`=id_ambito
        AND `geniux_tramo_nivel_logro_xmapa`.`id_nucleo`=id_nucleo;
        
        DELETE FROM `geniux_indicadores_x_tramo_nivel_logro_mapa`
		WHERE 			
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion`=id_configuracion
		AND	`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_ambito`=id_ambito
        AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_nucleo`=id_nucleo;
        
		COMMIT;
	END IF;
    
    SET salida_ = CONCAT('{"fx":"ELIMINACIONEXITOSADENUCLEO"}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_actualizar_nucleos_xambito`$$
CREATE  PROCEDURE `geniux_actualizar_nucleos_xambito` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN nucleo_nombre varchar(500),
    IN nucleo_descripcion text,
    IN nucleo_color varchar(20)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
	
		UPDATE `geniux_nucleo_mapas_progreso`
		SET
			`nombre_nucleo` = nucleo_nombre,
			`desc_nucleo` = nucleo_descripcion,
			`alpha_2_code_pais` = alpha_2_code_pais,
			`color_nucleo` = nucleo_color,
			`id_usuario_actualiza` = id_usuario,
			`fecha_actualiza` = now()
		WHERE 
			`geniux_nucleo_mapas_progreso`.`id_configuracion`=id_configuracion
		AND `geniux_nucleo_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_nucleo_mapas_progreso`.`id_nucleo`=id_nucleo;
        
	END IF;
    
    SET salida_ = CONCAT('{"fx":"ACTUALIZACIONEXITOSADENUCLEO"}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_mapas_ejes_xnucleo`$$
CREATE  PROCEDURE `geniux_obtener_listado_mapas_ejes_xnucleo` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
	IN id_nucleo int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
    DECLARE id_mapa_ int(11);
	DECLARE id_nucleo_ int(11);
	DECLARE id_ambito_ int(11);
	DECLARE id_configuracion_ int(11);
	DECLARE nombre_mapa_ varchar(500);
	DECLARE desc_mapa_ varchar(8000);
	DECLARE alpha_2_code_pais_ varchar(2);
	DECLARE color_mapa_ varchar(20);    
	DECLARE cantConfigMapasMapas_ int;
        
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_config_mapa_(
		`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        `id_mapa` int(11)  NOT NULL,
		`id_nucleo` int(11)  NOT NULL,
		`id_ambito` int(11)  NOT NULL ,
		`id_configuracion` int(11)  NOT NULL,
		`nombre_mapa` varchar(500) NOT NULL,
		`desc_mapa` varchar(8000) NULL,
		`alpha_2_code_pais` varchar(2) NULL,	
		`color_mapa` varchar(20) NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
        
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		SET cantConfigMapasMapas_ = 0;
		SET salida_ = '';
        
		-- LISTADO AMBITOS DE CONFIGURACION DE MAPA 
		INSERT INTO tmp_list_config_mapa_(
			`id_mapa`,
			`id_nucleo`,
			`id_ambito`,
			`id_configuracion`,
			`nombre_mapa`,
			`desc_mapa`,
			`alpha_2_code_pais`,
			`color_mapa`
		)
        SELECT 
			`geniux_mapa_eje_mapas_progreso`.`id_mapa`,
			`geniux_mapa_eje_mapas_progreso`.`id_nucleo`,
			`geniux_mapa_eje_mapas_progreso`.`id_ambito`,
			`geniux_mapa_eje_mapas_progreso`.`id_configuracion`,
			`geniux_mapa_eje_mapas_progreso`.`nombre_mapa`,
			`geniux_mapa_eje_mapas_progreso`.`desc_mapa`,
			`geniux_mapa_eje_mapas_progreso`.`alpha_2_code_pais`,
			`geniux_mapa_eje_mapas_progreso`.`color_mapa`
		FROM 
			`geniux_mapa_eje_mapas_progreso`
		WHERE
			`geniux_mapa_eje_mapas_progreso`.`id_configuracion`=id_configuracion
		AND `geniux_mapa_eje_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_mapa_eje_mapas_progreso`.`id_nucleo`=id_nucleo
		ORDER BY 
			`geniux_mapa_eje_mapas_progreso`.`id_mapa`;
                

		-- ARMA JSON LISTADO DE AMBITOS
        SELECT COUNT(1)
        INTO cantConfigMapasMapas_
        FROM tmp_list_config_mapa_;
        
        SET v1_ = 1;
        IF IFNULL(cantConfigMapasMapas_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapasMapas_ DO
				SELECT
					tmp_list_config_mapa_.`id_mapa`,
					tmp_list_config_mapa_.`id_nucleo`,
					tmp_list_config_mapa_.`id_ambito`,
					tmp_list_config_mapa_.`id_configuracion`,
					REPLACE(tmp_list_config_mapa_.`nombre_mapa`,'"',"'"),
					REPLACE(tmp_list_config_mapa_.`desc_mapa`,'"',"'"),
					tmp_list_config_mapa_.`alpha_2_code_pais`,
					tmp_list_config_mapa_.`color_mapa`
				INTO
					id_mapa_,
					id_nucleo_,
					id_ambito_,
					id_configuracion_,
					nombre_mapa_,
					desc_mapa_,
					alpha_2_code_pais_,
					color_mapa_
				FROM
					tmp_list_config_mapa_
  				WHERE 
					tmp_list_config_mapa_.orden = v1_;
                    
				IF v1_ < cantConfigMapasMapas_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_mapa_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nucleo_ AS CHAR CHARACTER SET utf8),',',
									CAST(id_ambito_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',nombre_mapa_,'",',
                                    '"',REPLACE(desc_mapa_,'\n',' '),'",',
									'"',alpha_2_code_pais_,'",',
                                    '"',color_mapa_,'"',
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
									CAST(id_mapa_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nucleo_ AS CHAR CHARACTER SET utf8),',',
									CAST(id_ambito_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_configuracion_ AS CHAR CHARACTER SET utf8),',',
									'"',nombre_mapa_,'",',
                                    '"',REPLACE(desc_mapa_,'\n',' '),'",',
									'"',alpha_2_code_pais_,'",',
                                    '"',color_mapa_,'"',
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;        
         
	END IF;
    
    DROP TABLE tmp_list_config_mapa_;
    
    SET salida_ = CONCAT('{"fx":"CARGARLISTADOMAPASXNUCLEO","cantidad":"',CAST(cantConfigMapasMapas_ AS CHAR CHARACTER SET utf8),'","listado":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_guardar_mapas_ejes_xnucleo`$$
CREATE  PROCEDURE `geniux_guardar_mapas_ejes_xnucleo` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN mapaeje_nombre varchar(500),
    IN mapaeje_descr text,
    IN mapaeje_color varchar(20)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    
	-- --------------------------------------
	SELECT  COUNT(*)
	INTO cantSessionActiva_ 
    FROM
		`geniux_sesion_activa`
	WHERE
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
			
		INSERT INTO `geniux_mapa_eje_mapas_progreso`(
			`id_nucleo`,
			`id_ambito`,
			`id_configuracion`,
			`nombre_mapa`,
			`desc_mapa`,
			`alpha_2_code_pais`,
			`color_mapa`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`)
		VALUES(
			id_nucleo,
			id_ambito,
			id_configuracion,
			mapaeje_nombre,
			mapaeje_descr,
			alpha_2_code_pais,
			mapaeje_color,
			id_usuario,
			now(),
			id_usuario,
			now());
        
	END IF;
    
    SET salida_ = CONCAT('{"fx":"CREACIONEXITOSADEMAPAEJE"}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_eliminar_mapas_ejes_xnucleo`$$
CREATE  PROCEDURE `geniux_eliminar_mapas_ejes_xnucleo` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN id_mapa int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORELIMINACIONCONFIGMAPAEJE","mensaje":"Se ha producido una excepción al tratar de eliminar el mapa/eje del mapa de progreso seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;    
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
        
        -- 1 ELIMINO EJES/MAPAS
        DELETE FROM `geniux_mapa_eje_mapas_progreso`
		WHERE 
			`geniux_mapa_eje_mapas_progreso`.`id_configuracion`=id_configuracion
		AND	`geniux_mapa_eje_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_mapa_eje_mapas_progreso`.`id_nucleo`=id_nucleo
        AND `geniux_mapa_eje_mapas_progreso`.`id_mapa`=id_mapa;

        -- 2 ELIMINO TRAMO NVEL LOGRO E INDICADORES DE DESEMPEÑO
        DELETE FROM `geniux_tramo_nivel_logro_xmapa`
		WHERE 			
			`geniux_tramo_nivel_logro_xmapa`.`id_configuracion`=id_configuracion
		AND	`geniux_tramo_nivel_logro_xmapa`.`id_ambito`=id_ambito
        AND `geniux_tramo_nivel_logro_xmapa`.`id_nucleo`=id_nucleo
        AND `geniux_tramo_nivel_logro_xmapa`.`id_mapa`=id_mapa;
        
        DELETE FROM `geniux_indicadores_x_tramo_nivel_logro_mapa`
		WHERE 			
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion`=id_configuracion
		AND	`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_ambito`=id_ambito
        AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_nucleo`=id_nucleo
        AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_mapa`=id_mapa;

		COMMIT;
	END IF;
    
    SET salida_ = CONCAT('{"fx":"ELIMINACIONEXITOSADEMAPAEJE"}');
    
	SELECT salida_ AS resultado;
END
$$                                                                                    
                                                                                    
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_actualizar_mapas_ejes_xnucleo`$$
CREATE  PROCEDURE `geniux_actualizar_mapas_ejes_xnucleo` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN id_mapa int(11),
    IN mapaeje_nombre varchar(500),
    IN mapaeje_descr text,
    IN mapaeje_color varchar(20)    
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;

	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		UPDATE `geniux_mapa_eje_mapas_progreso`
		SET
			`nombre_mapa` = mapaeje_nombre,
			`desc_mapa` = mapaeje_descr,
			`alpha_2_code_pais` = alpha_2_code_pais,
			`color_mapa` = mapaeje_color,
			`id_usuario_actualiza` = id_usuario,
			`fecha_actualiza` = now()
		WHERE 
			`geniux_mapa_eje_mapas_progreso`.`id_configuracion`=id_configuracion
		AND	`geniux_mapa_eje_mapas_progreso`.`id_ambito`=id_ambito
        AND `geniux_mapa_eje_mapas_progreso`.`id_nucleo`=id_nucleo
        AND `geniux_mapa_eje_mapas_progreso`.`id_mapa`=id_mapa;

	END IF;
    
    SET salida_ = CONCAT('{"fx":"ACTUALIZACIONEXITOSADEMAPAEJE"}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_tramos_nivellogro_xconfig_mapa`$$
CREATE  PROCEDURE `geniux_obtener_listado_tramos_nivellogro_xconfig_mapa` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
	IN id_configuracion int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
	DECLARE id_nivel_logro_rango_ int(11);
	DECLARE id_nivel_logro_ int(11);
	DECLARE nombre_rango_nivel_logro_ varchar(500);
	DECLARE descripcion_rango_nivel_logro_ varchar(500);
	DECLARE year_from_ int(11);
	DECLARE month_from_ int(11);
	DECLARE year_until_ int(11);
	DECLARE month_until_ int(11);
	DECLARE cantConfigMapasTramosNL_ int;
        
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_config_mapa_tramos_NL(
		`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_nivel_logro_rango` int(11) NOT NULL,
		`id_nivel_logro` int(11) NOT NULL,
		`nombre_rango_nivel_logro` varchar(500) NOT NULL,
		`descripcion_rango_nivel_logro` varchar(500) NOT NULL,
		`year_from` int(11) NOT NULL,
		`month_from` int(11) NOT NULL,
		`year_until` int(11) NOT NULL,
		`month_until` int(11) NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
  
  
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		SET cantConfigMapasTramosNL_ = 0;
		SET salida_ = '';
        
		-- LISTADO AMBITOS DE CONFIGURACION DE MAPA 
		INSERT INTO tmp_list_config_mapa_tramos_NL(
			`id_nivel_logro_rango`,
			`id_nivel_logro`,
			`nombre_rango_nivel_logro`,
			`descripcion_rango_nivel_logro`,
			`year_from`,
			`month_from`,
			`year_until`,
			`month_until`
		)
        SELECT 
			`geniux_nivel_logro_rango`.`id_nivel_logro_rango`,
			`geniux_nivel_logro_rango`.`id_nivel_logro`,
			`geniux_nivel_logro_rango`.`nombre_rango_nivel_logro`,
			`geniux_nivel_logro_rango`.`descripcion_rango_nivel_logro`,
			`geniux_nivel_logro_rango`.`year_from`,
			`geniux_nivel_logro_rango`.`month_from`,
			`geniux_nivel_logro_rango`.`year_until`,
			`geniux_nivel_logro_rango`.`month_until`
		FROM 
			`geniux_nivel_logro_rango`
            INNER JOIN `geniux_configuracion_mapas_progreso`
            ON `geniux_configuracion_mapas_progreso`.`id_nivel_logro`=`geniux_nivel_logro_rango`.`id_nivel_logro`
		WHERE
			`geniux_configuracion_mapas_progreso`.`id_configuracion`=id_configuracion
		ORDER BY 
			`geniux_nivel_logro_rango`.`id_nivel_logro_rango`;
                
        -- SELECT * FROM tmp_list_config_mapa_tramos_NL;
        
        
        SELECT COUNT(1)
        INTO cantConfigMapasTramosNL_
        FROM tmp_list_config_mapa_tramos_NL;
        
        SET v1_ = 1;
        IF IFNULL(cantConfigMapasTramosNL_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapasTramosNL_ DO
				SELECT
					tmp_list_config_mapa_tramos_NL.`id_nivel_logro_rango`,
					tmp_list_config_mapa_tramos_NL.`id_nivel_logro`,
					REPLACE(tmp_list_config_mapa_tramos_NL.`nombre_rango_nivel_logro`,'"',"'"),
					REPLACE(tmp_list_config_mapa_tramos_NL.`descripcion_rango_nivel_logro`,'"',"'"),
					tmp_list_config_mapa_tramos_NL.`year_from`,
					tmp_list_config_mapa_tramos_NL.`month_from`,
					tmp_list_config_mapa_tramos_NL.`year_until`,
					tmp_list_config_mapa_tramos_NL.`month_until`
				INTO
					id_nivel_logro_rango_,
					id_nivel_logro_,
					nombre_rango_nivel_logro_,
					descripcion_rango_nivel_logro_,
					year_from_,
					month_from_,
					year_until_,
					month_until_
				FROM
					tmp_list_config_mapa_tramos_NL
  				WHERE 
					tmp_list_config_mapa_tramos_NL.orden = v1_;
                    
				IF v1_ < cantConfigMapasTramosNL_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nivel_logro_rango_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_configuracion AS CHAR CHARACTER SET utf8),',',
									'"',nombre_rango_nivel_logro_,'",',
                                    '"',descripcion_rango_nivel_logro_,'",',
									CAST(year_from_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_from_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(year_until_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_until_ AS CHAR CHARACTER SET utf8),
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_nivel_logro_rango_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_configuracion AS CHAR CHARACTER SET utf8),',',
									'"',nombre_rango_nivel_logro_,'",',
                                    '"',descripcion_rango_nivel_logro_,'",',
									CAST(year_from_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_from_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(year_until_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(month_until_ AS CHAR CHARACTER SET utf8),
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;        
         
	END IF;
    
    DROP TABLE tmp_list_config_mapa_tramos_NL;
    
    SET salida_ = CONCAT('{"fx":"CARGARCOMBOTRAMOSNIVELLOGROMAPACONFIG","cantidad":"',CAST(cantConfigMapasTramosNL_ AS CHAR CHARACTER SET utf8),'","listado":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END
$$                                  
                                                                   
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_tipos_inteligencias`$$
CREATE  PROCEDURE `geniux_obtener_listado_tipos_inteligencias` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;
	DECLARE id_tipointeligencia_ int(11);
	DECLARE descripcion_tipointeligencia_ varchar(500);
	DECLARE img_tipointeligencia_ varchar(500);
	DECLARE cantConfigMapasTiposInteligencias_ int;
        
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_inteligencia(
		`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_tipointeligencia` int(11)  NOT NULL,
		`descripcion_tipointeligencia` varchar(500) NOT NULL,
		`img_tipointeligencia` varchar(500) NOT NULL	
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
  
  
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		SET cantConfigMapasTiposInteligencias_ = 0;
		SET salida_ = '';
        
		INSERT INTO tmp_list_inteligencia(
			`id_tipointeligencia`,
			`descripcion_tipointeligencia`,
			`img_tipointeligencia`
		)
        SELECT 
			`geniux_tipo_inteligencia`.`id_tipointeligencia`,
			`geniux_tipo_inteligencia`.`descripcion_tipointeligencia`,
			`geniux_tipo_inteligencia`.`img_tipointeligencia`
		FROM `geniux_db`.`geniux_tipo_inteligencia`
		ORDER BY 
			`geniux_tipo_inteligencia`.`id_tipointeligencia`;
                
        
        SELECT COUNT(1)
        INTO cantConfigMapasTiposInteligencias_
        FROM tmp_list_inteligencia;
        
        SET v1_ = 1;
        IF IFNULL(cantConfigMapasTiposInteligencias_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapasTiposInteligencias_ DO
				SELECT
					tmp_list_inteligencia.`id_tipointeligencia`,
					tmp_list_inteligencia.`descripcion_tipointeligencia`,
					tmp_list_inteligencia.`img_tipointeligencia`
				INTO
					id_tipointeligencia_,
					descripcion_tipointeligencia_,
					img_tipointeligencia_
				FROM
					tmp_list_inteligencia
  				WHERE 
					tmp_list_inteligencia.orden = v1_;
                    
				IF v1_ < cantConfigMapasTiposInteligencias_ THEN
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_tipointeligencia_ AS CHAR CHARACTER SET utf8),',',
									'"',descripcion_tipointeligencia_,'",',
                                    '"',img_tipointeligencia_,'"',
                                    '],'
								  );
                ELSE
					SET salida_ = CONCAT(
									salida_,
                                    '[',
                                    CAST(id_tipointeligencia_ AS CHAR CHARACTER SET utf8),',',
									'"',descripcion_tipointeligencia_,'",',
                                    '"',img_tipointeligencia_,'"',
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;        
         
	END IF;
    
    DROP TABLE tmp_list_inteligencia;
    
    SET salida_ = CONCAT('{"fx":"LISTADOTIPOSINTELIGENCIAS","cantidad":"',CAST(cantConfigMapasTiposInteligencias_ AS CHAR CHARACTER SET utf8),'","listado":[',salida_,']}');
    
	SELECT salida_ AS resultado;
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_guardar_listado_indicadores_xmapas_ejes`$$
CREATE  PROCEDURE `geniux_guardar_listado_indicadores_xmapas_ejes`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN configuracion_base int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN id_mapa int(11),
    IN id_rango_nivel_logro int(11),
    IN descripcion_logro_aprendizaje text,
    IN insert_values_rangos text
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE id_nivel_logro_ INT(11);
    DECLARE cantSessionActiva_ int;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORCREARINDICADORESXMAPASELECCIONADO","mensaje":"Se ha producido una excepción al intentar crear el nuevo grupo de indicadores de desempeño por tramo de nivel de logro en el mapa seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;

   	CREATE TEMPORARY TABLE tmp_list_indicadores(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
		`id_tipointeligencia` int(11) NOT NULL,
		`descripcion_indicador` varchar(8000) NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
     
		SET @stmt_insert_rangos_ = CONCAT(
								'INSERT INTO tmp_list_indicadores',
                                '(',
                                '`descripcion_indicador`,',
								'`id_tipointeligencia`',
                                ')',
								'VALUES ',
                                insert_values_rangos
                                );
	
		PREPARE stmt_rangos FROM @stmt_insert_rangos_; 
		EXECUTE stmt_rangos;
		DEALLOCATE PREPARE stmt_rangos;    
    
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
    
		INSERT INTO `geniux_tramo_nivel_logro_xmapa`(
			`id_configuracion`,
			`id_ambito`,
			`id_nucleo`,
			`id_mapa`,
			`id_rango_nivel_logro`,
			`descripcion_logro_aprendizaje`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`)
		VALUES(
			configuracion_base,
			id_ambito,
			id_nucleo,
			id_mapa,
			id_rango_nivel_logro,
			descripcion_logro_aprendizaje,
			id_usuario,
			now(),
			id_usuario,
			now());
        
		INSERT INTO `geniux_indicadores_x_tramo_nivel_logro_mapa`(
			`id_configuracion`,
			`id_ambito`,
			`id_nucleo`,
			`id_mapa`,
			`id_rango_nivel_logro`,
			`id_tipointeligencia`,
			`descripcion_indicador`,
			`id_usuario_crea`,
			`fecha_crea`,
			`id_usuario_actualiza`,
			`fecha_actualiza`)
		SELECT
			configuracion_base,
			id_ambito,
			id_nucleo,
			id_mapa,
			id_rango_nivel_logro,
            tmp_list_indicadores.id_tipointeligencia,
            tmp_list_indicadores.descripcion_indicador,
			id_usuario,
			now(),
			id_usuario,
			now()
        FROM tmp_list_indicadores
        ORDER BY tmp_list_indicadores.orden;
		
        COMMIT;
		
        SET salida_ = '{"fx":"CREACIONINDICADORESXMAPAEXITOSA"}';
    END IF;
    DROP TABLE tmp_list_indicadores;
    
	SELECT salida_ AS resultado;
    
END
$$
                                                       
-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_obtener_listado_indicadores_xmapas_ejes`$$
CREATE  PROCEDURE `geniux_obtener_listado_indicadores_xmapas_ejes` (
	IN id_usuario int(11),
	IN id_session varchar(500),    
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN configuracion_base int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN id_mapa int(11)
)  
BEGIN
	DECLARE salida_ text default '';
    
    DECLARE salida_indicadores_ text default '';
    DECLARE id_indicador_ int(11);
	DECLARE id_tipointeligencia_ int(11);
	DECLARE descripcion_indicador_ varchar(8000) ;
	DECLARE img_tipointeligencia_ varchar(500);
    DECLARE id_rango_nivel_logro_ int(11);    
    
    DECLARE salida_tramos_ text default '';
    DECLARE nombre_rango_nivel_logro_ varchar(500);
	DECLARE descripcion_logro_aprendizaje_ varchar(8000);
    
	DECLARE cantSessionActiva_ int;
    DECLARE orden_ INT;

	DECLARE cantConfigMapasIndicadores_ int;
	DECLARE cantConfigMapasTramosNL_ int;
    
    DECLARE v1_ int;
  
    CREATE TEMPORARY TABLE tmp_list_indicadores(
		`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        `id_indicador` int(11)  NOT NULL,
		`id_tipointeligencia` int(11)  NOT NULL,
		`descripcion_indicador` varchar(8000) NOT NULL,
		`img_tipointeligencia` varchar(500) NOT NULL,
        `id_rango_nivel_logro`  int(11)  NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
	
    CREATE TEMPORARY TABLE tmp_list_tramos_nivel_logro(
		`orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        `nombre_rango_nivel_logro` varchar(500) NOT NULL,
        `id_rango_nivel_logro` int(11)  NOT NULL,
		`descripcion_logro_aprendizaje` varchar(8000) NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
  
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;             

	
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE  
		SET cantConfigMapasIndicadores_ = 0;
        SET cantConfigMapasTramosNL_=0;
		SET salida_ = '';
        SET salida_indicadores_ = '';
        SET salida_tramos_ = '';
        
        -- --------------------------------------
        -- CARGO INDICADORES CREADOS EN MAPA SEECCIONADO
		INSERT INTO tmp_list_indicadores(
			`id_indicador`,
            `id_rango_nivel_logro`,
			`id_tipointeligencia`,
			`descripcion_indicador`,
			`img_tipointeligencia`
		)
        SELECT 
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_indicador`,
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_rango_nivel_logro`,
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_tipointeligencia`,
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`descripcion_indicador`,
            `geniux_tipo_inteligencia`.`img_tipointeligencia`
		FROM 
			`geniux_indicadores_x_tramo_nivel_logro_mapa`
			INNER JOIN `geniux_tipo_inteligencia`
            ON `geniux_tipo_inteligencia`.`id_tipointeligencia`=`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_tipointeligencia`
		WHERE
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion`=configuracion_base
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_ambito`=id_ambito
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_nucleo`=id_nucleo
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_mapa`=id_mapa
        ORDER BY 
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_rango_nivel_logro`,
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_indicador`;

        SELECT COUNT(1)
        INTO cantConfigMapasIndicadores_
        FROM tmp_list_indicadores;

		-- --------------------------------------
        -- CARGO TRAMOS CON INDICADORES CREADOS EN MAPA SEECCIONADO
		INSERT INTO tmp_list_tramos_nivel_logro(
			`nombre_rango_nivel_logro`,
			`id_rango_nivel_logro`,
			`descripcion_logro_aprendizaje`
		)        
        SELECT 
			`geniux_nivel_logro_rango`.`nombre_rango_nivel_logro`,
			`geniux_tramo_nivel_logro_xmapa`.`id_rango_nivel_logro`,
			`geniux_tramo_nivel_logro_xmapa`.`descripcion_logro_aprendizaje`
		FROM 
			`geniux_tramo_nivel_logro_xmapa`
            INNER JOIN `geniux_nivel_logro_rango`
            ON `geniux_nivel_logro_rango`.`id_nivel_logro_rango`=`geniux_tramo_nivel_logro_xmapa`.`id_rango_nivel_logro`
		WHERE 
			`geniux_tramo_nivel_logro_xmapa`.`id_configuracion`=configuracion_base
		AND `geniux_tramo_nivel_logro_xmapa`.`id_ambito`=id_ambito
		AND `geniux_tramo_nivel_logro_xmapa`.`id_nucleo`=id_nucleo
		AND `geniux_tramo_nivel_logro_xmapa`.`id_mapa`=id_mapa
		ORDER BY 
			`geniux_tramo_nivel_logro_xmapa`.`id_rango_nivel_logro`;
    
		SELECT COUNT(1)
        INTO cantConfigMapasTramosNL_
        FROM tmp_list_tramos_nivel_logro;
        
        -- --------------------------------------
        -- ARMO JSON DE INDICADORES
        SET v1_ = 1;
        IF IFNULL(cantConfigMapasIndicadores_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapasIndicadores_ DO
				SELECT
					tmp_list_indicadores.`id_indicador`,
					tmp_list_indicadores.`id_tipointeligencia`,
					tmp_list_indicadores.`descripcion_indicador`,
                    tmp_list_indicadores.`img_tipointeligencia`,
                    tmp_list_indicadores.`id_rango_nivel_logro`
				INTO
					id_indicador_,
					id_tipointeligencia_ ,
					descripcion_indicador_,
					img_tipointeligencia_,
					id_rango_nivel_logro_
				FROM
					tmp_list_indicadores
  				WHERE 
					tmp_list_indicadores.orden = v1_;
                    
				IF v1_ < cantConfigMapasIndicadores_ THEN
					SET salida_indicadores_ = CONCAT(
									salida_indicadores_,
                                    '[',
                                    CAST(id_rango_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_indicador_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_tipointeligencia_ AS CHAR CHARACTER SET utf8),',',
									'"',REPLACE(REPLACE(descripcion_indicador_,'"','&quot;'),'\n',' '),'",',
                                    '"',img_tipointeligencia_,'"',
                                    '],'
								  );
                ELSE
					SET salida_indicadores_ = CONCAT(
									salida_indicadores_,
                                    '[',
									CAST(id_rango_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_indicador_ AS CHAR CHARACTER SET utf8),',',
                                    CAST(id_tipointeligencia_ AS CHAR CHARACTER SET utf8),',',
									'"',REPLACE(REPLACE(descripcion_indicador_,'"','&quot;'),'\n',' '),'",',
                                    '"',img_tipointeligencia_,'"',
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;   
        
       -- --------------------------------------
        -- ARMO JSON DE TRAMOS DE INDICADORES
        SET v1_ = 1;
        IF IFNULL(cantConfigMapasTramosNL_,0) > 0 THEN
			WHILE v1_ <= cantConfigMapasTramosNL_ DO
				SELECT
					tmp_list_tramos_nivel_logro.`nombre_rango_nivel_logro`,
					tmp_list_tramos_nivel_logro.`id_rango_nivel_logro`,
					tmp_list_tramos_nivel_logro.`descripcion_logro_aprendizaje`
				INTO
					nombre_rango_nivel_logro_,
					id_rango_nivel_logro_,
					descripcion_logro_aprendizaje_ 
				FROM
					tmp_list_tramos_nivel_logro
  				WHERE 
					tmp_list_tramos_nivel_logro.orden = v1_;
                    
				IF v1_ < cantConfigMapasTramosNL_ THEN
					SET salida_tramos_ = CONCAT(
									salida_tramos_,
                                    '[',
                                    '"',nombre_rango_nivel_logro_,'",',
                                    CAST(id_rango_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
									'"',REPLACE(REPLACE(descripcion_logro_aprendizaje_,'"',"'"),'\n',' '),'"',
                                    '],'
								  );
                ELSE
					SET salida_tramos_ = CONCAT(
									salida_tramos_,
                                    '[',
                                    '"',nombre_rango_nivel_logro_,'",',
                                    CAST(id_rango_nivel_logro_ AS CHAR CHARACTER SET utf8),',',
									'"',REPLACE(REPLACE(descripcion_logro_aprendizaje_,'"',"'"),'\n',' '),'"',
                                    ']'
								  );                
                END IF;
                SET v1_ = v1_ + 1;
            END WHILE;
        END IF;        
         
	END IF;
    
    DROP TABLE tmp_list_indicadores;
    DROP TABLE tmp_list_tramos_nivel_logro;
    
    -- select cantConfigMapasTramosNL_ as cantConfigMapasTramosNL_, cantConfigMapasIndicadores_ as cantConfigMapasIndicadores_, salida_tramos_ as salida_tramos_, salida_indicadores_ as salida_indicadores_;
    
    SET salida_ = CONCAT('{"fx":"CARGALISTADOINDICADORESXMAPA","cantidad_tramos":"',CAST(cantConfigMapasTramosNL_ AS CHAR CHARACTER SET utf8),'","listado_tramos":[',salida_tramos_,'],"cantidad_indicadores":"',CAST(cantConfigMapasIndicadores_ AS CHAR CHARACTER SET utf8),'","listado_indicadores":[',salida_indicadores_,']}');
    
	SELECT salida_ AS resultado;
END
$$-- call `geniux_obtener_listado_indicadores_xmapas_ejes`(1,'0874938109773153620171010174517688780','spa','CL',4,1,6,6);

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_eliminar_grupo_indicadores_xmapas_ejes`$$
CREATE  PROCEDURE `geniux_eliminar_grupo_indicadores_xmapas_ejes`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN configuracion_base int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN id_mapa int(11),
    IN id_rango_nivel_logro int(11)
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE id_nivel_logro_ INT(11);
    DECLARE cantSessionActiva_ int;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORELIMINARGRUPONDICADORESXMAPASELECCIONADO","mensaje":"Se ha producido una excepción al intentar la eliminación del grupo de indicadores de desempeño del tramo seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;

   
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
		
        DELETE FROM `geniux_tramo_nivel_logro_xmapa`
		WHERE
			`geniux_tramo_nivel_logro_xmapa`.`id_configuracion`=configuracion_base
		AND `geniux_tramo_nivel_logro_xmapa`.`id_ambito`=id_ambito
		AND `geniux_tramo_nivel_logro_xmapa`.`id_nucleo`=id_nucleo
		AND `geniux_tramo_nivel_logro_xmapa`.`id_mapa`=id_mapa
        AND `geniux_tramo_nivel_logro_xmapa`.`id_rango_nivel_logro`=id_rango_nivel_logro;

		DELETE FROM `geniux_indicadores_x_tramo_nivel_logro_mapa`
		WHERE
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion`=configuracion_base
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_ambito`=id_ambito
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_nucleo`=id_nucleo
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_mapa`=id_mapa
        AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_rango_nivel_logro`=id_rango_nivel_logro;
		
        COMMIT;
		
        SET salida_ = '{"fx":"ELIMINACIONGRUPOINDICADORESXMAPAEXITOSA"}';
    END IF;
    
	SELECT salida_ AS resultado;
    
END
$$

-- ---------------------------------------------------
USE geniux_db;

DELIMITER $$
DROP PROCEDURE IF EXISTS `geniux_actualizar_listado_indicadores_xmapas_ejes`$$
CREATE  PROCEDURE `geniux_actualizar_listado_indicadores_xmapas_ejes`(
	IN id_usuario int(11),
	IN id_session varchar(500),
    IN idioma varchar(3),
    IN alpha_2_code_pais varchar(2),
    IN configuracion_base int(11),
    IN id_ambito int(11),
    IN id_nucleo int(11),
    IN id_mapa int(11),
    IN id_rango_nivel_logro int(11),
    IN descripcion_logro_aprendizaje text,
    IN insert_values_rangos text
)  
BEGIN
	DECLARE salida_ text default '';
	DECLARE id_nivel_logro_ INT(11);
    DECLARE cant_indicadores int;
    DECLARE id_indicador_ int(11);
	DECLARE id_tipointeligencia_ int(11);
	DECLARE descripcion_indicador_ text;
    DECLARE cantSessionActiva_ int;
	DECLARE V1_ int;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida_ = CONCAT('{"fx":"ERRORACTUALIZARINDICADORESXMAPASELECCIONADO","mensaje":"Se ha producido una excepción al intentar actualizar el grupo de indicadores de desempeño por tramo de nivel de logro en el mapa seleccionado. Por favor, intentar nuevamente, si el problema persiste informar al administrador."}');
		SELECT salida_ AS resultado;
	END;

   	CREATE TEMPORARY TABLE tmp_list_indicadores(
        `orden` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        `id_indicador` int(11) NOT NULL,
		`id_tipointeligencia` int(11) NOT NULL,
		`descripcion_indicador` varchar(8000) NOT NULL
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;
    
	-- --------------------------------------
	SELECT count(*) 
	INTO cantSessionActiva_
	FROM `geniux_sesion_activa`
	WHERE 
		`geniux_sesion_activa`.`id_usuario` = id_usuario
	AND `geniux_sesion_activa`.`id_session` = id_session;    
    
    	-- --------------------------------------
	IF cantSessionActiva_ = 0 THEN
		SET salida_ = '{"fx":"SESIOINACTIVA"}';
	ELSE 
     
		SET @stmt_insert_rangos_ = CONCAT(
								'INSERT INTO tmp_list_indicadores',
                                '(',
                                '`id_indicador`,',
                                '`descripcion_indicador`,',
								'`id_tipointeligencia`',
                                ')',
								'VALUES ',
                                insert_values_rangos
                                );
	
		PREPARE stmt_rangos FROM @stmt_insert_rangos_; 
		EXECUTE stmt_rangos;
		DEALLOCATE PREPARE stmt_rangos;    
    
		SELECT count(*) 
        INTO cant_indicadores
        FROM tmp_list_indicadores;
        
		-- SET autocommit =0;
		START TRANSACTION READ WRITE;
    
		-- ------------------------------------------
		UPDATE `geniux_tramo_nivel_logro_xmapa`
		SET
			`descripcion_logro_aprendizaje` = descripcion_logro_aprendizaje,
			`id_usuario_actualiza` =id_usuario,
			`fecha_actualiza` = now()
		WHERE 
			`geniux_tramo_nivel_logro_xmapa`.`id_configuracion`=configuracion_base 
		AND `geniux_tramo_nivel_logro_xmapa`.`id_ambito`=id_ambito 
		AND `geniux_tramo_nivel_logro_xmapa`.`id_nucleo`=id_nucleo 
		AND `geniux_tramo_nivel_logro_xmapa`.`id_mapa`=id_mapa 
		AND `geniux_tramo_nivel_logro_xmapa`.`id_rango_nivel_logro` =id_rango_nivel_logro;

		-- ------------------------------------------
        DELETE FROM `geniux_indicadores_x_tramo_nivel_logro_mapa`
		WHERE 
			`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion`=configuracion_base 
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_ambito`=id_ambito 
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_nucleo`=id_nucleo 
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_mapa`=id_mapa 
		AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_rango_nivel_logro` =id_rango_nivel_logro
        AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_indicador` NOT IN (select tmp_list_indicadores.`id_indicador` from tmp_list_indicadores);

		-- ------------------------------------------
		SET V1_=1;
		WHILE V1_ <= cant_indicadores DO
			SELECT
				tmp_list_indicadores.`id_indicador`,
				tmp_list_indicadores.`id_tipointeligencia`,
				tmp_list_indicadores.`descripcion_indicador`
			INTO
				id_indicador_,
				id_tipointeligencia_,
				descripcion_indicador_
			FROM tmp_list_indicadores
            WHERE tmp_list_indicadores.`orden`=V1_;
            
            IF id_indicador_ > 0 THEN
				UPDATE `geniux_indicadores_x_tramo_nivel_logro_mapa`
				SET
					`id_tipointeligencia` = id_tipointeligencia_,
					`descripcion_indicador` = descripcion_indicador_,
					`id_usuario_actualiza` = id_usuario,
					`fecha_actualiza` = now()
				WHERE
					`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_indicador` = id_indicador_
				AND `geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_configuracion` = configuracion_base
				AND	`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_ambito` = id_ambito
				AND	`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_nucleo` =id_nucleo
				AND	`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_mapa` = id_mapa
				AND	`geniux_indicadores_x_tramo_nivel_logro_mapa`.`id_rango_nivel_logro` = id_rango_nivel_logro;            
            ELSE
				INSERT INTO `geniux_indicadores_x_tramo_nivel_logro_mapa`(
					`id_configuracion`,
					`id_ambito`,
					`id_nucleo`,
					`id_mapa`,
					`id_rango_nivel_logro`,
					`id_tipointeligencia`,
					`descripcion_indicador`,
					`id_usuario_crea`,
					`fecha_crea`,
					`id_usuario_actualiza`,
					`fecha_actualiza`)
				VALUES(
					configuracion_base,
					id_ambito,
					id_nucleo,
					id_mapa,
					id_rango_nivel_logro,
					id_tipointeligencia_,
					descripcion_indicador_,
					id_usuario,
					now(),
					id_usuario,
					now());

            END IF;
            
            SET V1_=V1_+1;
        END WHILE;
		
        COMMIT;
		
        SET salida_ = '{"fx":"ACTUALIZACIONINDICADORESXMAPAEXITOSA"}';
    END IF;
    DROP TABLE tmp_list_indicadores;
    
	SELECT salida_ AS resultado;
    
END
$$-- call `geniux_actualizar_listado_indicadores_xmapas_ejes`(1,'0874938109773153620171010174517688780','spa','CL',4,1,6,6,27,'<p>test!!! 123<br></p>',"(52,'a',11)");

use `geniux_db`;

DROP PROCEDURE IF EXISTS `test`;

DELIMITER $$
CREATE PROCEDURE `test`(
  IN fruitArray text
)
BEGIN

	DECLARE IDENTITY_ int;
    
	CREATE TEMPORARY TABLE tmp_list_configuraciones(
		`orden` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`a` varchar(500),
		`b` varchar(500),
		`acceso_global` bit(1) DEFAULT NULL,
        `d` int,
        `e` int
	) ENGINE = MEMORY DEFAULT CHARSET=utf8;

	SET @sql = CONCAT('INSERT INTO tmp_list_configuraciones(a,b,acceso_global,d,e) VALUES ', fruitArray);
	PREPARE stmt FROM @sql;
	EXECUTE stmt;
    -- 
    EXECUTE stmt;
	DEALLOCATE PREPARE stmt;

	-- SELECT * FROM tmp_list_configuraciones;
    
    -- SET IDENTITY_ = LAST_INSERT_ID();
    
    select max(orden)
    into IDENTITY_ 
    from tmp_list_configuraciones;
    
    TRUNCATE TABLE tmp_list_configuraciones;
    DROP TABLE tmp_list_configuraciones;

	SELECT fruitArray AS fruitArray, IDENTITY_  AS IDENTITY;
END$$
DELIMITER ;


call test("('1','2',1,'10',11),('7','8',0,12,'13')");


SELECT * FROM geniux_nivel_logro;
SELECT * FROM geniux_nivel_logro_rangos;

truncate table geniux_nivel_logro;
truncate table geniux_nivel_logro_rangos;

   SELECT 
		`geniux_nivel_logro`.`id_nivel_logro`,
		`geniux_nivel_logro`.`alpha_2_code_pais`,
        `geniux_nivel_logro`.`year_nivel_logro`,
        `geniux_nivel_logro`.`nivel_logro_scope`,
        `geniux_nivel_logro`.`descrip_cfg_nivel_logro`
	FROM
		`geniux_nivel_logro`
	WHERE `geniux_nivel_logro`.`nivel_logro_scope` = 0;


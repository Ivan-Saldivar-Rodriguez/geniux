SELECT * FROM geniux_db.geniux_serial_conexion;

SELECT * FROM geniux_sesion_activa;

-- truncate table geniux_db.geniux_serial_conexion;
-- truncate table geniux_db.geniux_sesion_activa

select CAST(CHAR(105) AS CHAR CHARACTER SET utf8), ASCII('3');

select cast('125' as unsigned) - 25;

SELECT * FROM geniux_db.geniux_configuracion_mapas_progreso;

SELECT REPLACE('<a att="xyz">','"',"'");
        
        
call `geniux_guardar_listado_indicadores_xmapas_ejes`(
1,
'0874938109773153620171010174517688780',
'spa',
'CL',
4,
1,
6,
6,
24,
'<p>TEST<br></p>',
"('a',1),('b',2),('c',3)"
);

-- truncate table geniux_db.geniux_configuracion_mapas_progreso;

-- update geniux_db.geniux_configuracion_mapas_progreso set scope_configuracion= 1 where id_configuracion=2;

/*

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET salida = CONCAT('InformarRegistroRectificadoPagoCajaVolanteERROR("Se ha producido una excepción al procesar la rectificaci&oacute;n de pago de ticket en la caja volante. Por favor, intentar nuevamente, si el problema persiste informar al administrador.",',CAST(web_o_mobile AS CHAR CHARACTER SET utf8),');');
		SELECT salida AS resultado;
	END;
    
    SET autocommit =0;
	START TRANSACTION;

	COMMIT;
    

CAST(SelectRegiones AS CHAR CHARACTER SET utf8),
CAST(ID_REGION AS CHAR CHARACTER SET utf8),'-',
CAST(ReemplazarAcentosHTML(DESCRIPCION) AS CHAR CHARACTER SET utf8),'|');      
*/

select REPLACE(REPLACE( CONCAT(REPLACE(CAST(RAND() as char(500)),'.',''), DATE_FORMAT(now(),"%Y%m%d"),CURTIME(6) ) ,':',''),'.','');

select DATE_FORMAT(now(),"%Y%m%d%H%i%s%f"),CURTIME(6),UNIX_TIMESTAMP(),ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000);
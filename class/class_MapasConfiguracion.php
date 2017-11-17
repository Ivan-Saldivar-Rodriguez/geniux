<?php 

class ClassMapasConfiguracion
{
	//// atributos de objeto
	var $id_user	= "";
	var $id_session = "";
	var $idioma="";
    var $alpha_2_code_pais="";
    var $configuracion_base="";
    var $id_ambito="";
    var $id_nucleo="";
    var $id_mapa="";
    var $id_rango_nivel_logro="";
    var $descripcion_logro_aprendizaje="";
    var $valores_indicadores="";
    
    var $web_o_mobile = "";
    
    var $parametro="";
    var $indexdecrypt="";
    
    var $year_country="";
    var $descrip_config_mapa="";
    var $id_institucion="";
    var $config_mapa_scope="";
    var $nivelLogro="";
    var $id_configuracion="";
    
    var $descripcionAmbito=""; 
    var $colorAmbito=""; 
        
    var $nucleo_nombre="";
    var $nucleo_descripcion="";
    var $nucleo_color="";
    
    var $mapaeje_nombre="";
    var $mapaeje_descr="";
    var $mapaeje_color="";
            
    //CONFIG BASE 
    public function GuardarConfiguracionBase(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_guardar_configuraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->idioma',
                                                                                            '$this->year_country',
                                                                                            '$this->descrip_config_mapa',
                                                                                            '$this->id_institucion',
                                                                                            '$this->config_mapa_scope',
                                                                                            '$this->nivelLogro')");
		return $salida;
	}
    public function ActualizarConfiguracionBase(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_actualizar_configuraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->idioma',
                                                                                            '$this->year_country',
                                                                                            '$this->descrip_config_mapa',
                                                                                            '$this->id_institucion',
                                                                                            '$this->config_mapa_scope',
                                                                                            '$this->nivelLogro',
                                                                                            '$this->id_configuracion')");
		return $salida;
	}    
    public function EliminarConfiguracionBase(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_eliminar_configuraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->idioma',
                                                                                            '$this->id_configuracion')");
		return $salida;
	}
    public function ListadoMapasConfigurados(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_configuraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->idioma')");
        
		return $salida;
	}
    
    //AMBITOS
    public function ListadoAmbitosXMapaConfigurado(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_ambitos_xconfiguraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base')");
		return $salida;
	}	        
    public function GuardarAmbitoNuevoXMapaConfigurado(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_guardar_ambito_xconfiguraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->descripcionAmbito',
                                                                                            '$this->colorAmbito')");
		return $salida;
	}	
    public function ActualizarAmbitoXMapaConfigurado(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_actualizar_ambito_xconfiguraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito',
                                                                                            '$this->descripcionAmbito',
                                                                                            '$this->colorAmbito')");
		return $salida;
	}	        
    public function EliminarAmbitosXMapaConfigurado(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_eliminar_ambito_xconfiguraciones_base_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito')");
		return $salida;
	}	
    
    //NUCLEOS
    public function ListadoNucleosXAmbito(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_nucleos_xambito(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito')");
		return $salida;
	}
    public function GuardarNucleosXAmbito(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_guardar_nucleos_xambito(
                                                                                '$this->id_user',
                                                                                '$this->id_session',
                                                                                '$this->idioma',
                                                                                '$this->alpha_2_code_pais',
                                                                                '$this->configuracion_base',
                                                                                '$this->id_ambito',
                                                                                '$this->nucleo_nombre',
                                                                                '$this->nucleo_descripcion',
                                                                                '$this->nucleo_color')");
		return $salida;
	}
    public function EliminarNucleosXAmbito(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_eliminar_nucleos_xambito(
                                                                                '$this->id_user',
                                                                                '$this->id_session',
                                                                                '$this->idioma',
                                                                                '$this->alpha_2_code_pais',
                                                                                '$this->configuracion_base',
                                                                                '$this->id_ambito',
                                                                                '$this->id_nucleo')");
		return $salida;
	}
    public function ActualizarNucleosXAmbito(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_actualizar_nucleos_xambito(
                                                                                '$this->id_user',
                                                                                '$this->id_session',
                                                                                '$this->idioma',
                                                                                '$this->alpha_2_code_pais',
                                                                                '$this->configuracion_base',
                                                                                '$this->id_ambito',
                                                                                '$this->id_nucleo',
                                                                                '$this->nucleo_nombre',
                                                                                '$this->nucleo_descripcion',
                                                                                '$this->nucleo_color')");
		return $salida;
	}  
    
    //MAPAS/EJES
    public function ListadoMapasEjesXNucleo(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_mapas_ejes_xnucleo(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito',
                                                                                            '$this->id_nucleo')");
		return $salida;
	}
    public function GuardarMapasEjesXNucleo(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_guardar_mapas_ejes_xnucleo(
                                                                                    '$this->id_user',
                                                                                    '$this->id_session',
                                                                                    '$this->idioma',
                                                                                    '$this->alpha_2_code_pais',
                                                                                    '$this->configuracion_base',
                                                                                    '$this->id_ambito',
                                                                                    '$this->id_nucleo',
                                                                                    '$this->mapaeje_nombre',
                                                                                    '$this->mapaeje_descr',
                                                                                    '$this->mapaeje_color')");
		return $salida;
	}       
    public function EliminarMapasEjesXNucleo(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_eliminar_mapas_ejes_xnucleo(
                                                                                    '$this->id_user',
                                                                                    '$this->id_session',
                                                                                    '$this->idioma',
                                                                                    '$this->alpha_2_code_pais',
                                                                                    '$this->configuracion_base',
                                                                                    '$this->id_ambito',
                                                                                    '$this->id_nucleo',
                                                                                    '$this->id_mapa')");
		return $salida;
	}
    public function ActualizarMapasEjesXNucleo(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_actualizar_mapas_ejes_xnucleo(
                                                                                    '$this->id_user',
                                                                                    '$this->id_session',
                                                                                    '$this->idioma',
                                                                                    '$this->alpha_2_code_pais',
                                                                                    '$this->configuracion_base',
                                                                                    '$this->id_ambito',
                                                                                    '$this->id_nucleo',
                                                                                    '$this->id_mapa',
                                                                                    '$this->mapaeje_nombre',
                                                                                    '$this->mapaeje_descr',
                                                                                    '$this->mapaeje_color')");
		return $salida;
	}
    
    //INDICADORES DE DESEMPEÑO
    public function ListadoTiposInteligencias(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_tipos_inteligencias(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais')");
		return $salida;
	}            
    public function ListadoTramosNivelLogroXConfigMapas(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_tramos_nivellogro_xconfig_mapa(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base')");
		return $salida;
	}  
    
    public function GuardarIndicadoresXMapasEjes(){
		$dbObj = new ConectionDB();
        
        $insert_values_rangos="";
        
        $arrRangos = json_decode($this->valores_indicadores, true);
           
        for($x = 0; $x < count($arrRangos); $x++) {
            if($x < count($arrRangos)-1){
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        "'".$arrRangos[$x][0]."',".
                                        $arrRangos[$x][2].
                                        '),';             
            }
            else{
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        "'".$arrRangos[$x][0]."',".
                                        $arrRangos[$x][2].
                                        ')';             
            }
        }
        $insert_values_rangos = '"'.$insert_values_rangos.'"';
        
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_guardar_listado_indicadores_xmapas_ejes(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito',
                                                                                            '$this->id_nucleo',
                                                                                            '$this->id_mapa',
                                                                                            '$this->id_rango_nivel_logro',
                                                                                            '$this->descripcion_logro_aprendizaje',
                                                                                            $insert_values_rangos)");
                                                                                            
        //$salida='{"fx":"ERRORACTUALIZARINDICADORESXMAPASELECCIONADO","mensaje":"'.$insert_values_rangos.'"}';
		return $salida;
	}  
    public function ListadoIndicadoresXMapasEjes(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_indicadores_xmapas_ejes(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito',
                                                                                            '$this->id_nucleo',
                                                                                            '$this->id_mapa')");
		return $salida;
	}
    public function EliminarGrupoIndicadoresXMapasEjes(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_eliminar_grupo_indicadores_xmapas_ejes(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito',
                                                                                            '$this->id_nucleo',
                                                                                            '$this->id_mapa',
                                                                                            '$this->id_rango_nivel_logro')");
		return $salida;
	}

    public function ActualizarIndicadoresXMapasEjes(){
		$dbObj = new ConectionDB();
        
        $insert_values_rangos="";
        
        $arrRangos = json_decode($this->valores_indicadores, true);
           
        for($x = 0; $x < count($arrRangos); $x++) {
            if($x < count($arrRangos)-1){
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        $arrRangos[$x][0].",".
                                        "'".$arrRangos[$x][1]."',".
                                        $arrRangos[$x][3].
                                        '),';             
            }
            else{
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        $arrRangos[$x][0].",".
                                        "'".$arrRangos[$x][1]."',".
                                        $arrRangos[$x][3].
                                        ')';             
            }
        }
        
        $insert_values_rangos = '"'.$insert_values_rangos.'"';
        
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_actualizar_listado_indicadores_xmapas_ejes(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma',
                                                                                            '$this->alpha_2_code_pais',
                                                                                            '$this->configuracion_base',
                                                                                            '$this->id_ambito',
                                                                                            '$this->id_nucleo',
                                                                                            '$this->id_mapa',
                                                                                            '$this->id_rango_nivel_logro',
                                                                                            '$this->descripcion_logro_aprendizaje',
                                                                                            $insert_values_rangos)");
        
        //$salida='{"fx":"ERRORACTUALIZARINDICADORESXMAPASELECCIONADO","mensaje":"'.$insert_values_rangos.'"}';
		return $salida;
	}           

    public function FormularioNivelLogro(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_formulario_mapas_nivel_logro(
                                                                                            '$this->id_user',
                                                                                            '$this->id_session',
                                                                                            '$this->idioma')");
		return $salida;
	}     
    
}

?>


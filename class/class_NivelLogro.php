<?php 

class ClassNivelLogro
{
	//// atributos de objeto
	var $id_user	= "";
	var $id_session = "";
	var $idioma="";
    
    var $id_nivel_logro="";
    var $id_nivel_logro_indexSel="";
    var $descrip_cfg_nivel_logro_new="";
    var $b_check_nivel_logro_scope_new="0";
    var $alpha_2_code_pais="";
    var $year_nivel_logro="";
    var $json_ranges="";
    var $id_institucion="";
    
    public function CrearNivelLogro(){
		$dbObj = new ConectionDB();
        
        $insert_values_rangos="";
        
        $arrRangos = json_decode($this->json_ranges, true);
           
        for($x = 0; $x < count($arrRangos); $x++) {
            if($x < count($arrRangos)-1){
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        "'".$arrRangos[$x]["name"]."',".
                                        "'".$arrRangos[$x]["text"]."',".
                                        $arrRangos[$x]["yearFrom"].",".
                                        $arrRangos[$x]["monthFrom"].",".
                                        $arrRangos[$x]["yearUntil"].",".
                                        $arrRangos[$x]["monthUntil"].
                                        '),';             
            }
            else{
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        "'".$arrRangos[$x]["name"]."',".
                                        "'".$arrRangos[$x]["text"]."',".
                                        $arrRangos[$x]["yearFrom"].",".
                                        $arrRangos[$x]["monthFrom"].",".
                                        $arrRangos[$x]["yearUntil"].",".
                                        $arrRangos[$x]["monthUntil"].
                                        ')';             
            }
        }
        $insert_values_rangos = '"'.$insert_values_rangos.'"';
            
        $nivel_logro_scope=0;
        if($this->b_check_nivel_logro_scope_new=="true") $nivel_logro_scope=1;
            
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_crear_grupo_nivel_logro_mapa(
                                                                                    '$this->id_user',
                                                                                    '$this->id_session',
                                                                                    '$this->idioma',
                                                                                    '$this->alpha_2_code_pais',
                                                                                    '$this->year_nivel_logro',
                                                                                    '$this->descrip_cfg_nivel_logro_new',
                                                                                    $nivel_logro_scope,
                                                                                    $insert_values_rangos,
                                                                                    '$this->id_institucion')");
        return $salida;
	}
    public function ActualizarNivelLogro(){
		$dbObj = new ConectionDB();
        
        $insert_values_rangos="";
        
        $arrRangos = json_decode($this->json_ranges, true);
           
        for($x = 0; $x < count($arrRangos); $x++) {
            if($x < count($arrRangos)-1){
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        "'".$arrRangos[$x]["name"]."',".
                                        "'".$arrRangos[$x]["text"]."',".
                                        $arrRangos[$x]["yearFrom"].",".
                                        $arrRangos[$x]["monthFrom"].",".
                                        $arrRangos[$x]["yearUntil"].",".
                                        $arrRangos[$x]["monthUntil"].
                                        '),';             
            }
            else{
                $insert_values_rangos = $insert_values_rangos.
                                        '('.
                                        "'".$arrRangos[$x]["name"]."',".
                                        "'".$arrRangos[$x]["text"]."',".
                                        $arrRangos[$x]["yearFrom"].",".
                                        $arrRangos[$x]["monthFrom"].",".
                                        $arrRangos[$x]["yearUntil"].",".
                                        $arrRangos[$x]["monthUntil"].
                                        ')';             
            }
        }
        $insert_values_rangos = '"'.$insert_values_rangos.'"';
            
        $nivel_logro_scope=0;
        if($this->b_check_nivel_logro_scope_new=="true") $nivel_logro_scope=1;
            
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_actualizar_grupo_nivel_logro_mapa(
                                                                                    '$this->id_user',
                                                                                    '$this->id_session',
                                                                                    '$this->idioma',
                                                                                    '$this->alpha_2_code_pais',
                                                                                    '$this->year_nivel_logro',
                                                                                    '$this->descrip_cfg_nivel_logro_new',
                                                                                    '$this->id_nivel_logro',
                                                                                    $nivel_logro_scope,
                                                                                    $insert_values_rangos,
                                                                                    '$this->id_institucion')");
        return $salida;
	}    
    public function ListadoNivelLogro(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_nivel_logros_mapas('$this->id_user',
                                                                                              '$this->id_session',
                                                                                              '$this->idioma',
                                                                                              '$this->alpha_2_code_pais')");
        
		return $salida;
	}    
    public function ListadoRangosNivelLogro(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_obtener_listado_rangos_nivel_logros_mapas('$this->id_user',
                                                                                              '$this->id_session',
                                                                                              '$this->idioma',
                                                                                              '$this->alpha_2_code_pais',
                                                                                              '$this->id_nivel_logro',
                                                                                              '$this->id_nivel_logro_indexSel')");
        
		return $salida;
	}      
    public function EliminarNivelLogro(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_eliminar_nivel_logros_mapas('$this->id_user',
                                                                                       '$this->id_session',
                                                                                       '$this->idioma',
                                                                                       '$this->alpha_2_code_pais',
                                                                                       '$this->id_nivel_logro')");
		return $salida;
	}              


}
?>

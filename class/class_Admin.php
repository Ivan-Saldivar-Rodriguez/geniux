<?php 

class ClassAdmin
{
	//// atributos de objeto
	var $rut		= ""; 
	var $firstname	= ""; 
	var $lastname1	= "";
	var $lastname2	= ""; 
	var $fono		= ""; 
	var $direccion	= ""; 
	var $numdir		= ""; 
	var $email		= "";
	var $comuna		= "";
	var $region		= "";
	var $usrname	= "";
	var $usrpwd		= "";
	var $opcionReg  = "";
	var $id_user	= "";
	var $id_session = "";
	var $opcionMenuSeleccionado = "";

    var $web_o_mobile = "";
    
    var $parametro="";
    var $indexdecrypt="";
    var $idioma="";
    
    public function ObtenerSerialConexion(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_admin_obtener_serial_conexion()");
        
		return $salida;
    }
    public function DesencriptarParametro(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_admin_desencriptar_con_serial_conexion('$this->indexdecrypt','$this->parametro')");
        
		return $salida;        
    }
	public function ConsultarCredenciales(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_admin_consulta_credenciales('$this->usrname','$this->usrpwd','$this->idioma')");
        
		return $salida;
	}
	public function ConsultarCredenciales2(){
		$dbObj = new ConectionDB();   
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_admin_consulta_credenciales2('$this->usrname','$this->usrpwd')");

		return $salida;
	}	
	public function CerrarSesion(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_admin_cerrar_sesion('$this->id_user','$this->id_session')");

		 return $salida;
	}	
	public function ValidaConexion(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_admin_valida_sesion('$this->id_user','$this->id_session')");

		 return $salida;
	}	        

}

?>


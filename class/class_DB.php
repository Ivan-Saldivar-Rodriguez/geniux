<?php
class ConectionDB {
	///////////////////////////////////////////////////////
	//LA CLASE DE CONEXIÓN A DATOS, SÓLO PERMITE LA EJECUCIÓN DE
	//PROCEDIMIENTOS ALMACENADOS. ADEMÁS NO ES NECESARIO ENTREGARLE
	//LOS PARÁMETROS DE ACCESO A LA BD, PUES LO ADMINISTRA A TRAVÉS
	//SUS ATRIBUTOS ESTÁTICOS.

	///////////////////////////////////////////////////////
	//Sintaxis para llamar al método público de la clase ConectionDB y
	//que es el que permite ejecutar los procedimientos almacenados:
	//
	//  "CALL [nombre_procedimiento]( [param1],[param2],[param3],...,[param_N] )"
	//
	//Las extensión de la librería MySQLi permite la utilización de
	//las clases generadas por los creadores de MySQL para acdeder desde PHP
	//al servidor de datos MySQL. Aquí se utilizan las clases:
	// - Conexión	=> $conec
	// - Sentencia	=> $sentencia
	// - RecordSet	=> $resultado
	//
	//Con estos tres objetos base podemos realizar todos los tipos de interacciones
	//que se requieran con el motor de base de datos (SELECT, INSERT, UPDATE, DELETE).

	///////////////////////////////////////////////////////
	//ATRIBUTOS DE CLASE,

	//DESARROLLO
	/**/
	static $servername = "localhost:3306";
	static $username = "ivan";
	static $password = "paulina";
	static $DB = "geniux_db";
    var $conexionPDO = "mysql:host=localhost:3306;dbname=geniux_db";
    var $usernamePDO = "ivan";
    var $passwordPDO = "paulina";
	/**/

	//PRODUCCION
	/*
	static $servername = "TOLKIEN";
	static $username = "sageniux";
	static $password = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
	static $DB = "geniux_db";
    $conexionPDO = "mysql:host=TOLKIEN;dbname=geniux_db";
    $usernamePDO = "sageniux";
    $passwordPDO = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
	*/

	///////////////////////////////////////////////////////
    private function GetConec()
    {
		$mysqli = new mysqli(ConectionDB::$servername, ConectionDB::$username, ConectionDB::$password, ConectionDB::$DB) ;
		return $mysqli;
    }


    public function TestGetConec()
    {
		$mysqli = new mysqli(ConectionDB::$servername, ConectionDB::$username, ConectionDB::$password, ConectionDB::$DB) ;
		$salida = "OK";

		if ($mysqli->connect_error) {
		    $salida = 'MensajeSQL("ERROR EN OPERACIÓN DE BASE DE DATOS|Conexión falló: '. $mysqli->connect_error . '","error","");';
		}
		return $salida;
    }

    //ExecStoredProcedure: METODO UTILIZADO PARA RETORNAR CADENA DE TEXTO DIRECTAMENTE DESDE UN PROCEDIMIENTO ALMACENADO Y
    //QUE PERMITE ASIGNAR CODIGO HTML EN FORMA DINAMICA A UN TAG DIV DE LA PAGINA PRINCIPAL, USANDO JAVASCRIPT.
    public function ExecStoredProcedure($SP_call){

    	$salida = "";

    	//$salida = 'alert("SP_call='.$SP_call.'");';
		//return $salida;

    	//EJECUTO TEST DE CONEXIÓN A DATOS ANTES DE REALIZAR OPERACIONES
    	//Para probar que la conexión está operativa ejecutamos el método público TestGetConec de la clase ConectionDB
    	$salida = $this->TestGetConec(); 
    	if( $salida != "OK") return $salida;

    	//ESTABLECEMOS CONEXIÓN CON LA BASE DE DATOS MySQL
    	//Para obtener la conexión ejecutamos el método privado GetConec de la clase ConectionDB
   		$conec = $this->GetConec();
		$acentos = $conec->query("SET NAMES 'utf8'");

   		//mysql_set_charset('utf8',$conec);


		//PREPARAMOS LA SENTENCIA SQL A EJECUTAR     
		if (!($sentencia = $conec->prepare($SP_call))) {
		    $salida =  'MensajeSQL("ERROR EN OPERACIÓN DE BASE DE DATOS|Falló la preparación: ('. $conec->errno . ') ' . $conec->error . '","error","");';
		}
		else{

			//EJECUTAMOS EL PROCEDIMIENTO ALMACENADO
			/*
			if (!$sentencia->execute()) {
			    $salida = 'MensajeSQL("ERROR EN OPERACIÓN DE BASE DE DATOS|Falló la ejecución: ('.  $sentencia->errno . ') ' . $sentencia->error . '","error","");';
			}
			else{
			*/
				//EJECUTAMOS EL PROCEDIMIENTO ALMACENADO
				$sentencia->execute();
				//CAPTURAMOS LA SALIDA DE PROCEDIMIENTO
				//$resultado = $sentencia->get_result();
				/*
		        while ($fila = $resultado->fetch_array(MYSQLI_NUM))
		        {
		            foreach ($fila as $f)
		            {
						$salida = "$f ";
		            }
		        }
		        */


		        $sentencia->bind_result($resultado);


			    /* obtener valores */
			    while ($sentencia->fetch()) {
			        $salida = $resultado;
			    }
			//}
			//CERRAMOS EL OBJETO QUE ADMINISTRA LA SENTENCIA SQL SOBRE EL SERVIDOR MySQL
			$sentencia->close();
		}

		//CERRAMOS LA CONEXIÓN A DATOS PARA NO SATURAR LA MEMORIA DEL SERVIDOR MySQL
		$conec->close();

 		return $salida;
    }

    //ExecForRecordset: METODO UTILIZADO PARA RETORNAR UN RECORDSET DESDE UN PROCEDIMIENTO ALMACENADO. ESTOS RECORDSET SON PASADOS
    //AL METODO DE CLASE QUE LLAMO PARA QUE ESTE TRANSFORME EL RECORDSET EN UN CODIGO HTML, EL CUAL EN FORMA DINAMICA ES ASIGNADO
    //A UN TAG DIV DE LA PAGINA PRINCIPAL, USANDO JAVASCRIPT.
    public function ExecForRecordset($SP_call){

    	$salida = "";
		$rawdata = array();

  		$salida = $this->TestGetConec();

    	if( $salida != "OK") return $salida;

    	//ESTABLECEMOS CONEXIÓN CON LA BASE DE DATOS MySQL
    	//Para obtener la conexión ejecutamos el método privado GetConec de la clase ConectionDB
   		$conec = $this->GetConec();
   		mysql_set_charset('utf8',$conec);

		//PREPARAMOS LA SENTENCIA SQL A EJECUTAR
		if (!($sentencia = $conec->prepare($SP_call))) {
		    $salida =  'MensajeSQL("ERROR EN OPERACIÓN DE BASE DE DATOS|Falló la preparación: ('. $conec->errno . ') ' . $conec->error . '","error","");';
		}
		else{

			//EJECUTAMOS EL PROCEDIMIENTO ALMACENADO
			//if (!$sentencia->execute()) {
			//    $salida = 'MensajeSQL("ERROR EN OPERACIÓN DE BASE DE DATOS|Falló la ejecución: ('. $sentencia->errno . ') ' . $conec->error . '","error","");';
			//}
			//else{

				//EJECUTAMOS EL PROCEDIMIENTO ALMACENADO
				$sentencia->execute();
				//CAPTURAMOS LA SALIDA DE PROCEDIMIENTO
				//$resultado = $sentencia->get_result();

				$sentencia->bind_result($resultado);

   				$i=0;

 				//TRASPASAMOS CADA FILA AL ARREGLO QUE ASIGNAMOS A LA SALIDA DEL METODO
		        while ($fila = $resultado->fetch_array(MYSQLI_NUM))
		        {
					$rawdata[$i] = $fila;
       				$i++;
		        }

			//}
			//CERRAMOS EL OBJETO QUE ADMINISTRA LA SENTENCIA SQL SOBRE EL SERVIDOR MySQL
			$sentencia->close();
		}

		//CERRAMOS LA CONEXIÓN A DATOS PARA NO SATURAR LA MEMORIA DEL SERVIDOR MySQL
		$conec->close();

 		return $rawdata;
    }

}

?>

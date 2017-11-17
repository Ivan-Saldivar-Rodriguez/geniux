<?php
/**
 *
 * DB-IP.com database sample query code
 *
 * Copyright (C) 2016 db-ip.com
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 */
class ClassLocalizacion
{
    var $opcion_lenguaje="";
    var $ip_conexion_remota="";
    var $opcion_llamado="";
    
 	public function LocalizarIdioma(){
		$dbObj = new ConectionDB();
		$salida = $dbObj->ExecStoredProcedure("CALL geniux_localiza_consulta_glosas_portal('$this->opcion_lenguaje','$this->opcion_llamado','$this->ip_conexion_remota')");
        
		return $salida;
	}   

    public function GeolocalizaIP(){
        $dbObj = new ConectionDB();

        try {

            // Connect to the database
            $db = new PDO($dbObj->conexionPDO, $dbObj->usernamePDO, $dbObj->passwordPDO);

            // Alternatively connect to MySQL using the old interface
            // Comment the PDO statement above and uncomment the mysql_ calls
            // below if your PHP installation doesn't support PDO :
            // $db = mysql_connect("localhost", "root", "");
            // mysql_select_db("test", $db);

            // Instanciate a new DBIP object with the database connection
            $dbip = new DBIP($db);

            // Alternatively instanciate a DBIP_MySQL object
            // Comment the new statement above and uncomment below if your PHP
            // installation doesn't support PDO :
            // $dbip = new DBIP_MySQL($db);

            // Lookup an IP address
            $inf = $dbip->Lookup($this->ip_conexion_remota);

            // Show the associated country
            $jsonPais = $dbObj->ExecStoredProcedure("CALL geniux_obtener_pais_iso_3166('$inf->country')");
            
            $arrPais = json_decode($jsonPais, true);
            
            $salida = '{"fx":"CARGADATOSGEOLOCALIZACION","country":"'.$arrPais["pais"].'","lang":"'.$arrPais["lenguaje"].'","country_alpha2":"'.$inf->country.'","city":"'.$inf->city.'","ip":"'.$this->ip_conexion_remota.'","errormessage":""}';

        } catch (DBIP_Exception $e) {
            $salida = '{"fx":"CARGADATOSGEOLOCALIZACION","country":"","lang":"","country_alpha2":"","city":"","ip":"'.$this->ip_conexion_remota.'","errormessage":"'.$e->getMessage().'"}';

        }
        return $salida;
	}	
    public function GeolocalizaIP_OL(){
        $dbObj = new ConectionDB();

        try {
            $info=file_get_contents("http://api.db-ip.com/v2/3b3b0a06945fd95bd65cac791b5256f6a331b912/186.20.11.136"); //.$_SERVER['REMOTE_ADDR']);
            /*
            {
            "ipAddress": "186.20.11.136",
            "continentCode": "SA",
            "continentName": "South America",
            "countryCode": "CL",
            "countryName": "Chile",
            "stateProv": "Santiago Metropolitan",
            "city": "Huechuraba"
            }
            */
            $infoArr= json_decode($info, true);
            
            // Show the associated country
            $countryCode= $infoArr["countryCode"];
            $city= $infoArr["city"];
                
            $jsonPais = $dbObj->ExecStoredProcedure("CALL geniux_obtener_pais_iso_3166('$countryCode')");
            
            $arrPais = json_decode($jsonPais, true);
            
            $salida = '{"fx":"CARGADATOSGEOLOCALIZACION","country":"'.$arrPais["pais"].'","lang":"'.$arrPais["lenguaje"].'","country_alpha2":"'.$countryCode.'","city":"'.$city.'","ip":"'.$_SERVER['REMOTE_ADDR'].'","errormessage":""}';

        } catch (DBIP_Exception $e) {
            $salida = '{"fx":"CARGADATOSGEOLOCALIZACION","country":"","lang":"","country_alpha2":"","city":"","ip":"'.$this->ip_conexion_remota.'","errormessage":"'.$e->getMessage().'"}';

        }
        return $salida;
	}	    
}
?>
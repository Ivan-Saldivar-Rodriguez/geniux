<?php
////////////////////////////////////////////
// Hacemos nuestro propio manejo de errores
// 
require  "../class/control_error.php";

////////////////////////////////////////////
//INCLUIMOS LA CLASE class_DB, PARA ACCESAR LA CAPA DE DATOS
//LAS CLASE ES INSTANCIADA EN LAS CLASES QUE ENCAPSULAN LOS
//MÉTODOS PROPIOS DE CADA FUNCIONALIDAD
require  "../class/class_DB.php";

////////////////////////////////////////////
// Include the DB-IP class GEOLOCALZACION
require "../class/class_dbip.php";

////////////////////////////////////////////
//INCLUIMOS LAS CLASES CON LAS CUALES CREAREMOS LOS OBJETOS
//QUE UTILIZAREMOS PARA INTERARCTUAR CON LA BASE DE DATOS
include "../class/class_Admin.php";
include "../class/class_Localizacion.php";
include "../class/class_MapasConfiguracion.php";
include "../class/class_NivelLogro.php";

////////////////////////////////////////////
//   
$callOption = $_POST['operator'];
$salida = '{"fx":"FUNCIONALIDADOUTLINE"}';


switch ($callOption) {
    /////////////////////////////////////////////
    // OPERACIONES BASE
    case "getserialsvr":
        $OBJ_adm = new ClassAdmin();
        $salida = $OBJ_adm->ObtenerSerialConexion();
        break;

    case "geolocalizacion":
        $OBJ_localizacion = new ClassLocalizacion();
        //$OBJ_localizacion->ip_conexion_remota= $_SERVER['REMOTE_ADDR'];
        $OBJ_localizacion->ip_conexion_remota= "190.110.124.115";
        //$salida = $OBJ_localizacion->GeolocalizaIP();
        //$salida = $OBJ_localizacion->GeolocalizaIP_OL();
        $salida = '{"fx":"CARGADATOSGEOLOCALIZACION","country":"Chile","lang":"spa","country_alpha2":"CL","city":"Quinta Normal","ip":"190.110.124.115","errormessage":""}';
        break;

    case "CONNECT":
        $OBJ_adm = new ClassAdmin();
        $OBJ_adm->indexdecrypt=$_POST['param3'];

        $OBJ_adm->parametro=$_POST['param1'];
        $param1 = $OBJ_adm->DesencriptarParametro();

        $OBJ_adm->parametro=$_POST['param2'];
        $param2 = $OBJ_adm->DesencriptarParametro();

        $OBJ_adm->usrname= $param1;
        $OBJ_adm->usrpwd= $param2;
        $OBJ_adm->idioma= $_POST['param4'];
        //$salida = '{"fx":"TESTCRYPTO","param1":"'.$param1.'","param2":"'.$param2.'"}';
        $salida = $OBJ_adm->ConsultarCredenciales();
        break;

    case "CERRARSESION":
        $OBJ_adm = new ClassAdmin();
        $OBJ_adm->id_user= $_POST['param1'];
        $OBJ_adm->id_session= $_POST['param2'];
        $salida = $OBJ_adm->CerrarSesion();
        break;    

    case "SELECCIONALENGUA":
        $OBJ_localizacion = new ClassLocalizacion();
        $OBJ_localizacion->opcion_lenguaje= $_POST['param1'];
        $OBJ_localizacion->opcion_llamado= $_POST['param2'];
        $OBJ_localizacion->ip_conexion_remota= $_SERVER['REMOTE_ADDR'];
        $salida = $OBJ_localizacion->LocalizarIdioma();
        break; 

    case "VALIDACONEXION":
        $OBJ_adm = new ClassAdmin();
        $OBJ_adm->id_user= $_POST['param1'];
        $OBJ_adm->id_session= $_POST['param2'];
        $salida = $OBJ_adm->ValidaConexion();
        break;    

      
    /////////////////////////////////////////////
    //OPERACIONES CONFIGURACION BASE
    case "GUARDARCONFIGURACIONBASEMAPAPROGRESO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param3'];
        $OBJ_mapa->idioma= $_POST['param4'];
        $OBJ_mapa->year_country= $_POST['param5'];
        $OBJ_mapa->descrip_config_mapa= $_POST['param6'];
        $OBJ_mapa->id_institucion= $_POST['param7'];
        $OBJ_mapa->config_mapa_scope= $_POST['param8'];
        $OBJ_mapa->nivelLogro= $_POST['param9'];
        $salida = $OBJ_mapa->GuardarConfiguracionBase();   
        break;
        
    case "ACTUALIZARCONFIGURACIONBASEMAPAPROGRESO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param3'];
        $OBJ_mapa->idioma= $_POST['param4'];
        $OBJ_mapa->year_country= $_POST['param5'];
        $OBJ_mapa->descrip_config_mapa= $_POST['param6'];
        $OBJ_mapa->id_institucion= $_POST['param7'];
        $OBJ_mapa->config_mapa_scope= $_POST['param8'];
        $OBJ_mapa->nivelLogro= $_POST['param9'];
        $OBJ_mapa->id_configuracion= $_POST['param10'];
        $salida = $OBJ_mapa->ActualizarConfiguracionBase();   
        break;
        
    case "ELIMINARCONFIGURACIONBASEMAPAPROGRESO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param3'];
        $OBJ_mapa->idioma= $_POST['param4'];
        $OBJ_mapa->id_configuracion= $_POST['param5'];
        $salida = $OBJ_mapa->EliminarConfiguracionBase();           
        break;
        
    case "CARGARLISTADOMAPASCONFIGURADOS":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param3'];
        $OBJ_mapa->idioma= $_POST['param4'];
        $salida = $OBJ_mapa->ListadoMapasConfigurados();     
        break;
        
    /////////////////////////////////////////////
    //OPERACIONES AMBITOS
    case "GUARDARAMBITONUEVO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->descripcionAmbito= $_POST['param6'];
        $OBJ_mapa->colorAmbito= $_POST['param7']; 
        $salida = $OBJ_mapa->GuardarAmbitoNuevoXMapaConfigurado();     
        break;
        
    case "CARGARLISTADOAMBITOSXCONFIGBASE":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $salida = $OBJ_mapa->ListadoAmbitosXMapaConfigurado();             
        break;
 
    case "ELIMINARAMBITO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $salida = $OBJ_mapa->EliminarAmbitosXMapaConfigurado();                     
        break;

    case "ACTUALIZARAMBITO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->descripcionAmbito= $_POST['param6'];
        $OBJ_mapa->colorAmbito= $_POST['param7']; 
        $OBJ_mapa->id_ambito= $_POST['param8'];
        $salida = $OBJ_mapa->ActualizarAmbitoXMapaConfigurado();     
        break;        
    /////////////////////////////////////////////
    //OPERACIONES NUECLEOS        
    case "CARGARLISTADONUCLEOSXAMBITO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $salida = $OBJ_mapa->ListadoNucleosXAmbito();     
        break;

    case "GUARDARNUCLEOSXAMBITO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->nucleo_nombre= $_POST['param7'];
        $OBJ_mapa->nucleo_descripcion= $_POST['param8'];
        $OBJ_mapa->nucleo_color= $_POST['param9'];
        $salida = $OBJ_mapa->GuardarNucleosXAmbito();     
        break;

    case "ELIMINARNUCLEOSXAMBITO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $salida = $OBJ_mapa->EliminarNucleosXAmbito();     
        break;
       
    case "ACTUALIZARNUCLEOSXAMBITO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        
        $OBJ_mapa->nucleo_nombre= $_POST['param8'];
        $OBJ_mapa->nucleo_descripcion= $_POST['param9'];
        $OBJ_mapa->nucleo_color= $_POST['param10'];
        $salida = $OBJ_mapa->ActualizarNucleosXAmbito();     
        break;
            
    /////////////////////////////////////////////
    //OPERACIONES EJES - MAPAS        
    case "CARGARLISTADOMAPASXNUCLEO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $salida = $OBJ_mapa->ListadoMapasEjesXNucleo();     
        break;

    case "GUARDARMAPANUEVOXNUCLEO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $OBJ_mapa->mapaeje_nombre= $_POST['param8'];
        $OBJ_mapa->mapaeje_descr= $_POST['param9'];
        $OBJ_mapa->mapaeje_color= $_POST['param10'];
        $salida = $OBJ_mapa->GuardarMapasEjesXNucleo();     
        break;
        
    case "ELIMINARMAPASXNUCLEO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $OBJ_mapa->id_mapa= $_POST['param8'];
        $salida = $OBJ_mapa->EliminarMapasEjesXNucleo();     
        break;            
        
    case "ACTUALIZARMAPAXNUCLEO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $OBJ_mapa->id_mapa= $_POST['param8'];
        $OBJ_mapa->mapaeje_nombre= $_POST['param9'];
        $OBJ_mapa->mapaeje_descr= $_POST['param10'];
        $OBJ_mapa->mapaeje_color= $_POST['param11'];        
        $salida = $OBJ_mapa->ActualizarMapasEjesXNucleo();     
        break;
        
    /////////////////////////////////////////////
    //OPERACIONES INDICADORES DESEMPEÑO   
    case "LISTADOTIPOSINTELIGENCIAS":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];      
        $salida = $OBJ_mapa->ListadoTiposInteligencias();        
        break;
        
    case "CARGACOMBOTRAMOSNIVELLOGROCONFIGMAPA":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $salida = $OBJ_mapa->ListadoTramosNivelLogroXConfigMapas(); 
        break;
        
    case "GUARDARINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4']; 
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $OBJ_mapa->id_mapa= $_POST['param8'];                
        $OBJ_mapa->id_rango_nivel_logro= $_POST['param9'];
        $OBJ_mapa->descripcion_logro_aprendizaje= $_POST['param10'];
        $OBJ_mapa->valores_indicadores= $_POST['param11'];
        $salida = $OBJ_mapa->GuardarIndicadoresXMapasEjes(); 
        break;
        
    case "CARGARLISTADOINDICADORESXMAPA":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $OBJ_mapa->id_mapa= $_POST['param8'];        
        $salida = $OBJ_mapa->ListadoIndicadoresXMapasEjes();     
        break;

    case "ELIMINARGRUPOINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4'];
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $OBJ_mapa->id_mapa= $_POST['param8'];
        $OBJ_mapa->id_rango_nivel_logro= $_POST['param9'];   
        $salida = $OBJ_mapa->EliminarGrupoIndicadoresXMapasEjes();     
        break;
        
    case "ACTUALIZARINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO":
        $OBJ_mapa = new ClassMapasConfiguracion();
        $OBJ_mapa->id_user= $_POST['param1'];
        $OBJ_mapa->id_session= $_POST['param2'];
        $OBJ_mapa->idioma= $_POST['param3'];
        $OBJ_mapa->alpha_2_code_pais= $_POST['param4']; 
        $OBJ_mapa->configuracion_base= $_POST['param5'];
        $OBJ_mapa->id_ambito= $_POST['param6'];
        $OBJ_mapa->id_nucleo= $_POST['param7'];
        $OBJ_mapa->id_mapa= $_POST['param8'];                
        $OBJ_mapa->id_rango_nivel_logro= $_POST['param9'];
        $OBJ_mapa->descripcion_logro_aprendizaje= $_POST['param10'];
        $OBJ_mapa->valores_indicadores= $_POST['param11'];
        $salida = $OBJ_mapa->ActualizarIndicadoresXMapasEjes(); 
        break;


        
    /////////////////////////////////////////////
    //OPERACIONES NIVEL DE LOGRO
    case "CARGAFORMULARIONIVELDELOGRO":
        $OBJ_nivelLogro = new ClassNivelLogro();
        $OBJ_nivelLogro->id_user= $_POST['param1'];
        $OBJ_nivelLogro->id_session= $_POST['param2'];
        $OBJ_nivelLogro->idioma= $_POST['param3'];
        $OBJ_nivelLogro->alpha_2_code_pais= $_POST['param4'];
        $salida = $OBJ_nivelLogro->ListadoNivelLogro();     
        break;

    case "CARGARANGOSXNIVELDELOGRO":
        $OBJ_nivelLogro = new ClassNivelLogro();
        $OBJ_nivelLogro->id_user= $_POST['param1'];
        $OBJ_nivelLogro->id_session= $_POST['param2'];
        $OBJ_nivelLogro->idioma= $_POST['param3'];
        $OBJ_nivelLogro->alpha_2_code_pais= $_POST['param4'];
        $OBJ_nivelLogro->id_nivel_logro= $_POST['param5'];
        $OBJ_nivelLogro->id_nivel_logro_indexSel= $_POST['param6'];
        $salida = $OBJ_nivelLogro->ListadoRangosNivelLogro();     
        break;

    case "GUARDARCONFIGURACIONNIVELLOGRO":
        $OBJ_nivelLogro = new ClassNivelLogro();
        $OBJ_nivelLogro->id_user= $_POST['param1'];
        $OBJ_nivelLogro->id_session= $_POST['param2'];
        $OBJ_nivelLogro->idioma= $_POST['param3'];
        $OBJ_nivelLogro->descrip_cfg_nivel_logro_new= $_POST['param4'];
        $OBJ_nivelLogro->b_check_nivel_logro_scope_new= $_POST['param5'];
        $OBJ_nivelLogro->alpha_2_code_pais= $_POST['param6'];
        $OBJ_nivelLogro->year_nivel_logro= $_POST['param7'];
        $OBJ_nivelLogro->json_ranges= $_POST['param8'];  
        $OBJ_nivelLogro->id_institucion= $_POST['param9'];
        $salida = $OBJ_nivelLogro->CrearNivelLogro();
        break;
        
    case "ACTUALIZACONFIGURACIONNIVELLOGRO":
        $OBJ_nivelLogro = new ClassNivelLogro();
        $OBJ_nivelLogro->id_user= $_POST['param1'];
        $OBJ_nivelLogro->id_session= $_POST['param2'];
        $OBJ_nivelLogro->idioma= $_POST['param3'];
        $OBJ_nivelLogro->descrip_cfg_nivel_logro_new= $_POST['param4'];
        $OBJ_nivelLogro->b_check_nivel_logro_scope_new= $_POST['param5'];
        $OBJ_nivelLogro->alpha_2_code_pais= $_POST['param6'];
        $OBJ_nivelLogro->year_nivel_logro= $_POST['param7'];
        $OBJ_nivelLogro->json_ranges= $_POST['param8'];
        $OBJ_nivelLogro->id_nivel_logro= $_POST['param9'];
        $OBJ_nivelLogro->id_institucion= $_POST['param10'];
        $salida = $OBJ_nivelLogro->ActualizarNivelLogro();
        break;    
        
    case "ELIMINARNIVELDELOGRO":
        $OBJ_nivelLogro = new ClassNivelLogro();
        $OBJ_nivelLogro->id_user= $_POST['param1'];
        $OBJ_nivelLogro->id_session= $_POST['param2'];
        $OBJ_nivelLogro->idioma= $_POST['param3'];
        $OBJ_nivelLogro->alpha_2_code_pais= $_POST['param4'];
        $OBJ_nivelLogro->id_nivel_logro= $_POST['param5'];
        $salida = $OBJ_nivelLogro->EliminarNivelLogro();     
        break;

 
}

echo $salida;
?>



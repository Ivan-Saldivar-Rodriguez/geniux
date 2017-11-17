function FxOperaciones(opc) {
    //1: cerrar sesion
    //2: modifica idioma desde el portal
    //3: 
    
    //5: Modulo CONFIGURACION=> Idioma/Lengua
    //6: Modulo CONFIGURACION=> Perfiles
    //7: Modulo CONFIGURACION=> Instituciones
    //8: Modulo CONFIGURACION=> Usuarios

    //26: Modulo MAPAS DE PROGRESO=> Crear mapa
    //27: Modulo MAPAS DE PROGRESO=> Actualizar mapa
    //28: Modulo MAPAS DE PROGRESO=> Eliminar mapa
    //4:  Modulo MAPAS DE PROGRESO=> Editar mapa
    //14: Modulo MAPAS DE PROGRESO=> Buscar mapa
    
    //15: Modulo MAPAS DE PROGRESO=> Editar mapa => Carga listado de ambitos x configuracion base   
    //29  Modulo MAPAS DE PROGRESO=> Editar mapa => Guardar ambito nuevo
    //30  Modulo MAPAS DE PROGRESO=> Editar mapa => Eliminar ambito
    
    //16: Modulo MAPAS DE PROGRESO=> Editar mapa => Carga listado de nucleos x ambito
    //17: Modulo MAPAS DE PROGRESO=> Editar mapa => Carga listado de mapas x nucleo
    //18: Modulo MAPAS DE PROGRESO=> Editar mapa => Carga listado de indicadores de desempeño x mapa
    //24: Modulo MAPAS DE PROGRESO=> Editar mapa => Guadrar listado de indicadores de desempeño x mapa
    
    //19: Modulo MAPAS DE PROGRESO=> Nivel logro => Carga formulario niveles de logro configurados
    //20: Modulo MAPAS DE PROGRESO=> Nivel logro => Guardar configuración de niveles de logro
    //21: Modulo MAPAS DE PROGRESO=> Nivel logro => Carga rangos de niveles de logro seleccionado
    //22: Modulo MAPAS DE PROGRESO=> Nivel logro => Eliminar nivel de logro
    //23: Modulo MAPAS DE PROGRESO=> Nivel logro => Actualiza nivel de logro
    
    //9:  Modulo SOPORTE

    //10: Modulo ESTADISTICAS
    
    //11: GEOLOCALIZAR
    //MAXINDEX=42
    
try{
    

    if(variableDeControl_==1){
        MsjWait();
        return;
    }
    else{
        variableDeControl_=1;
    }
    switch(opc){
        case 1:
            var parameters = {
                "operator": "CERRARSESION",
                "param1": document.getElementById('id_usuario').value ,
                "param2": document.getElementById('id_session').value
            };
            GeniuxConnect(parameters);
            break;
        case 2:
            var parameters = {
                "operator": "SELECCIONALENGUA",
                "param1": document.getElementById('language_identificator').value,
                "param2": document.getElementById('fromCall').value,
            };
            GeniuxConnect(parameters);            
            break;
        case 11:
            var parameters = {
                "operator": "geolocalizacion"
            };
            GeniuxConnect(parameters);  
            break;
            
        ///////////////////////////////////////////////////////////////////
        //CONFIG BASE              
        case 4:
            var parameters = {
                "operator": "CARGARLISTADOMAPASCONFIGURADOS",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('alpha_code2_pais_x_ip').value,
                "param4": document.getElementById('language_identificator').value
            };
            GeniuxConnect(parameters);               
            break;
         case 26:
            var parameters = {
                "operator": "GUARDARCONFIGURACIONBASEMAPAPROGRESO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('alpha_code2_pais_x_ip').value,
                "param4": document.getElementById('language_identificator').value,
                "param5": document.getElementById("text_year_country_origin_config_mapa_new").value,
                "param6": document.getElementById("descrip_cfg_config_mapa_new").value,
                "param7": document.getElementById("text_institucion_origin_config_mapa_new").value,
                "param8": document.getElementById("chk_config_mapa_scope_new").value,
                "param9": document.getElementById("selNivelLogro_config_mapa_new").value
            }           
			GeniuxConnect(parameters);            
            break;
    
        case 27:
            var parameters = {
                "operator": "ACTUALIZARCONFIGURACIONBASEMAPAPROGRESO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('alpha_code2_pais_x_ip').value,
                "param4": document.getElementById('language_identificator').value,
                "param5": document.getElementById("text_year_country_origin_config_mapa_new").value,
                "param6": document.getElementById("descrip_cfg_config_mapa_new").value,
                "param7": document.getElementById("text_institucion_origin_config_mapa_new").value,
                "param8": document.getElementById("chk_config_mapa_scope_new").value,
                "param9": document.getElementById("selNivelLogro_config_mapa_new").value,
                "param10": document.getElementById("id_configuracion_mapa_selected").value
            }           
			GeniuxConnect(parameters);            
            break;

        case 28:
            var parameters = {
                "operator": "ELIMINARCONFIGURACIONBASEMAPAPROGRESO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('alpha_code2_pais_x_ip').value,
                "param4": document.getElementById('language_identificator').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value
            }           
			GeniuxConnect(parameters);            
            break;

        ///////////////////////////////////////////////////////////////////
        //AMBITOS                          
        case 15:
            var parameters = {
                "operator": "CARGARLISTADOAMBITOSXCONFIGBASE",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value
            };
			GeniuxConnect(parameters);
            break;
            
        case 29:
            var parameters = {
                "operator": "GUARDARAMBITONUEVO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("descrip_config_mapa_ambito_new").value,
                "param7": document.getElementById("text_color_cofig_mapa_ambito_new").value
            };
			GeniuxConnect(parameters);
            break;
    
        case 30:
            var parameters = {
                "operator": "ELIMINARAMBITO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value
            };
			GeniuxConnect(parameters);
            break;
            
        case 31:
            var parameters = {
                "operator": "ACTUALIZARAMBITO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("ambito_descr").value,  
                "param7": document.getElementById("ambito_color").value,
                "param8": document.getElementById("id_configuracion_ambito_selected").value
            };
			GeniuxConnect(parameters);
            break;
            
        ///////////////////////////////////////////////////////////////////
        //NUCLEOS                          
        case 16:
            var parameters = {
                "operator": "CARGARLISTADONUCLEOSXAMBITO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value
            };
			GeniuxConnect(parameters);
            break;   
            
        case 32:
            var parameters = {
                "operator": "GUARDARNUCLEOSXAMBITO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("nucleo_nombre").value,
                "param8": document.getElementById("nucleo_descr").value,
                "param9": document.getElementById("nucleo_color").value
            };            
            GeniuxConnect(parameters);
            break;

        case 33:
            var parameters = {
                "operator": "ELIMINARNUCLEOSXAMBITO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value
            };            
            GeniuxConnect(parameters);
            break;

        case 34:
            var parameters = {
                "operator": "ACTUALIZARNUCLEOSXAMBITO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("nucleo_nombre").value,
                "param9": document.getElementById("nucleo_descr").value,
                "param10": document.getElementById("nucleo_color").value
            };            
            GeniuxConnect(parameters);
            break;            
        ///////////////////////////////////////////////////////////////////
        //MAPAS - EJES            
        case 17:
            var parameters = {
                "operator": "CARGARLISTADOMAPASXNUCLEO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value
            };
			GeniuxConnect(parameters);
            break;  

        case 35:
            var parameters = {
                "operator": "GUARDARMAPANUEVOXNUCLEO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("mapaeje_nombre").value,
                "param9": document.getElementById("mapaeje_descr").value,
                "param10": document.getElementById("mapaeje_color").value
            };
			GeniuxConnect(parameters);
            break;

        case 36:
            var parameters = {
                "operator": "ELIMINARMAPASXNUCLEO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("id_configuracion_mapaeje_selected").value
            };
			GeniuxConnect(parameters);
            break;

        case 37:
            var parameters = {
                "operator": "ACTUALIZARMAPAXNUCLEO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("id_configuracion_mapaeje_selected").value,
                "param9": document.getElementById("mapaeje_nombre").value,
                "param10": document.getElementById("mapaeje_descr").value,
                "param11": document.getElementById("mapaeje_color").value
            };
			GeniuxConnect(parameters);
            break;
            
        ///////////////////////////////////////////////////////////////////
        //INDICADOR DE DESEMPEÑO            
        case 18:
            var parameters = {
                "operator": "CARGARLISTADOINDICADORESXMAPA",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("id_configuracion_mapaeje_selected").value
            };
			GeniuxConnect(parameters);
            break;

        case 38:
            variableDeControl_=0;
            var parameters = {
                "operator": "CARGACOMBOTRAMOSNIVELLOGROCONFIGMAPA",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value
            };
			GeniuxConnect(parameters);
            break;
      
        case 39:
            variableDeControl_=0;
            var parameters = {
                "operator": "LISTADOTIPOSINTELIGENCIAS",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value                
            };
			GeniuxConnect(parameters);
            break;

        case 40:
            var jsonLST_IND=JSON.parse(document.getElementById("jsonListaIndicadoresNew").value)
            var arrLstIndicadores=jsonLST_IND.listado;
            var parameters = {
                "operator": "GUARDARINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("id_configuracion_mapaeje_selected").value,
                "param9": document.getElementById("id_tramo_NL_selected").value, 
                "param10": document.getElementById("desc_tramo_NL_logro_aprendizaje").value,
                "param11": JSON.stringify(arrLstIndicadores)
            };
			GeniuxConnect(parameters);
            break;            

        case 41:
            var parameters = {
                "operator": "ELIMINARGRUPOINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("id_configuracion_mapaeje_selected").value,
                "param9": document.getElementById("id_configuracion_tramo_indicador_selected").value
            };
			GeniuxConnect(parameters);
            break;  

        case 42:
            var jsonLST_IND=JSON.parse(document.getElementById("jsonListaIndicadoresNew").value)
            var arrLstIndicadores=jsonLST_IND.listado;
            var parameters = {
                "operator": "ACTUALIZARINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById("id_configuracion_mapa_selected").value,
                "param6": document.getElementById("id_configuracion_ambito_selected").value,
                "param7": document.getElementById("id_configuracion_nucleo_selected").value,
                "param8": document.getElementById("id_configuracion_mapaeje_selected").value,
                "param9": document.getElementById("id_configuracion_tramo_indicador_selected").value, 
                "param10": document.getElementById("desc_tramo_NL_logro_aprendizaje").value,
                "param11": JSON.stringify(arrLstIndicadores)
            };
			GeniuxConnect(parameters);
            break;             
        ///////////////////////////////////////////////////////////////////
        // NIVEL LOGRO            
        case 19:
            CargaFormularioNivelLogros();
            var parameters = {
                "operator": "CARGAFORMULARIONIVELDELOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value
            };
            GeniuxConnect(parameters);
            break;
        case 20:
            var arrRangos=JSONObjNivelLogro.ranges;
            //alert(JSON.stringify(arrRangos));
            var parameters = {
                "operator": "GUARDARCONFIGURACIONNIVELLOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": EliminaEspacios(JSONObjNivelLogro.descrip_cfg_nivel_logro_new),
                "param5": EliminaEspacios(JSONObjNivelLogro.b_check_nivel_logro_scope_new),
                "param6": EliminaEspacios(JSONObjNivelLogro.alpha_code2_pais_x_ip),
                "param7": EliminaEspacios(JSONObjNivelLogro.year),
                "param8": JSON.stringify(arrRangos),
                "param9": document.getElementById('id_institucion').value
            };
            GeniuxConnect(parameters);
            break;  
        case 21:
            var parameters = {
                "operator": "CARGARANGOSXNIVELDELOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById('id_nivel_logro_selected').value,
                "param6": document.getElementById('index_nivel_logro_selected').value
            };
            GeniuxConnect(parameters);
            break;    
        case 22:
            var parameters = {
                "operator": "ELIMINARNIVELDELOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById('alpha_code2_pais_x_ip').value,
                "param5": document.getElementById('id_nivel_logro_selected').value
            };
            GeniuxConnect(parameters);
            break;  
        case 23:
            var arrRangos=JSONObjNivelLogro.ranges;
            //alert(JSON.stringify(arrRangos));
            var parameters = {
                "operator": "ACTUALIZACONFIGURACIONNIVELLOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": EliminaEspacios(JSONObjNivelLogro.descrip_cfg_nivel_logro_),
                "param5": EliminaEspacios(JSONObjNivelLogro.b_check_nivel_logro_scope_),
                "param6": EliminaEspacios(JSONObjNivelLogro.alpha_code2_pais_x_ip),
                "param7": EliminaEspacios(JSONObjNivelLogro.year),
                "param8": JSON.stringify(arrRangos),
                "param9": JSONObjNivelLogro.id_nivel_logro,
                "param10": document.getElementById('id_institucion').value
            };
            GeniuxConnect(parameters);
            break;
        case 24:
            var parameters = {
                "operator": "GUARDARINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById("id_configuracion_mapa_selected").value,
                "param5": document.getElementById("id_configuracion_ambito_selected").value,
                "param6": document.getElementById("id_configuracion_nucleo_selected").value,
                "param7": document.getElementById("id_configuracion_mapaeje_selected").value,
                "param8": document.getElementById("rango_nivel_logro_new").value,
                "param9": document.getElementById("descripcion_logro_aprendizaje_new").value,
                "param10": document.getElementById("valores_indicadores_new").value                
            };
			GeniuxConnect(parameters);
            break;     
        case 25:
            var parameters = {
                "operator": "ACTUALIZARINDICADORESDESEMPEÑOXMAPAYTRAMONIVELLOGRO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById("id_configuracion_mapa_selected").value,
                "param5": document.getElementById("id_configuracion_ambito_selected").value,
                "param6": document.getElementById("id_configuracion_nucleo_selected").value,
                "param7": document.getElementById("id_configuracion_mapaeje_selected").value,
                "param8": document.getElementById("rango_nivel_logro_new").value,
                "param9": document.getElementById("descripcion_logro_aprendizaje_new").value,
                "param10": document.getElementById("valores_indicadores_new").value                
            };
			GeniuxConnect(parameters);
            break; 
            
 
            
        default:
            BusyProcess(0);
            MensajeFormatoVariable("La funcionalidad asociada no está actualmente operativa. Por favor, contactar al administrador.","info","center");
            break;
    }
}
catch(e){
    MensajeFormatoVariable(e.message,"error","center");
    variableDeControl_=0;
}
}
function CargaSerialConennect(){
    var parameters = {
        "operator": "getserialsvr"
    };
    GeniuxConnect(parameters);
}
function EjecutaComando(JSONString){
    var jsonObj = null;
    var paramdinamico = "";
    jsonObj = JSON.parse(JSONString);
    
    BusyProcess(0);
    //alert(jsonObj.fx);
    
    switch(jsonObj.fx){
        case "SELECCIONALENGUA":        
            var arrEtiquetas = jsonObj.etiquetas;
            
            for(var k=0;k<=arrEtiquetas.length-1;k++){

                if(EliminaEspacios(arrEtiquetas[k][2]) != "title"){
                    eval("document.getElementById('"+arrEtiquetas[k][1]+"')."+arrEtiquetas[k][3]+'="'+arrEtiquetas[k][4]+'";');
                }
                else{
                    eval("document."+arrEtiquetas[k][2]+'="'+arrEtiquetas[k][4]+'";');
                }
            }
            var lengua = jsonObj.lengua;
            /*
            if(jsonObj.callfrom=="portal"){
                if( lengua.toLowerCase()=="spanish"){
                    document.getElementById("pENGLISH").style.display="none";     
                    document.getElementById("divENGLISH").style.display="none";     
                    document.getElementById("pSPANISH").style.display="block";
                    document.getElementById("divSPANISH").style.display="block";
                }
                else{
                    document.getElementById("pSPANISH").style.display="none";
                    document.getElementById("divSPANISH").style.display="none";
                    document.getElementById("pENGLISH").style.display="block";     
                    document.getElementById("divENGLISH").style.display="block";
                }
            }
            */
            break;
        case "SESIONASIGNADA":
            paramdinamico = ApplyCodeServer(jsonObj.nombre+"~"+jsonObj.saludo+"~"+jsonObj.genero+"~"+jsonObj.foto+"~"+jsonObj.perfil+"~"+jsonObj.actionpage+"~"+jsonObj.id_session+"~"+jsonObj.id_usuario);

            MensajeBienvenida(jsonObj.saludo+jsonObj.nombre);
            setTimeout(
                function () {
                    document.location.href = jsonObj.actionpage+"?uxp="+paramdinamico+"_"+serialsvr+"_"+operatorincsvr+"_"+document.getElementById("language_identificator").value+"_"+document.getElementById("alpha_code2_pais_x_ip").value+"_"+document.getElementById('pais_x_ip').value;
                },
                2500
            );  
            break;
        case "SESIOINACTIVA":
            MensajeFormatoVariable(glsSesionInactiva,"info","center")
            setTimeout(
                function () {
                    document.location.href = "geniux.html?lang="+document.getElementById('language_identificator').value+"&ac2="+document.getElementById("alpha_code2_pais_x_ip").value;
                },
                2000
            ); 
            break;
        case "CREDENCIALESINVALIDAS":
            document.getElementById('username').disabled = false;
            document.getElementById('password').disabled = false;            
            MensajeFormatoVariable(glsCedencialesInvalidas,"info","center")
            break;
        case "CARGASERIAL":
            operatorincsvr=ReversedChain(jsonObj.operatorincsvr);
            serialsvr=jsonObj.serial;
            break;
        case "CIERRESESIONOK":
            SalirSistema();
            break;
        case "SALUDAUSUARIO":
            getlocalizacionsvr();
            break;
        case "CONEXIONFINALIZADA":
            MensajeINFO2_V3(JSONGlsIdiomaLogin.gls2,"VolverAlPortal();");   
            break;
            
        /*------------------------------------ CONFIG BASE */
        case "CREACIONEXITOSACONFIGURACIONBASE":
            MensajeFormatoVariable("Ha creado una configuración base de mapa de progreso.","success","center");
            CancelarConfigMapaNuevo();
            FxOperaciones(4);
            break;
        case "ACTUALIZACIONEXITOSACONFIGURACIONBASE":
            MensajeFormatoVariable("Ha actualizado una configuración base de mapa de progreso.","success","center");
            CancelarConfigMapaNuevo();
            FxOperaciones(4);
            break;
        case "ELIMINACIONEXITOSACONFIGURACIONBASE":
            MensajeFormatoVariable("Ha eliminado una configuración base de mapa de progreso.","success","center");
            CancelarConfigMapaNuevo();
            FxOperaciones(4);            
            break;
        case "ERRORELIMINACIONCONFIGMAPA":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
        case "CARGARLISTADOMAPASCONFIGURADOS":
            CargaModuloMapaProgreso(JSONString);
            break;
        case "NOEXISTENCONFIGURACIONESDEMAPAS":
            CargaModuloMapaProgreso("");
            break;
            
        /*------------------------------------ AMBITOS */            
        case "CARGARLISTADOAMBITOS":
            CargaAmbitosMapaProgreso(JSONString);
            break;
        case "CREACIONEXITOSADEAMBITO":
            MensajeFormatoVariable("Ha creado un nuevo ámbito para el mapa de progreso.","success","center");
            CancelarConfigMapaAmbitoNuevo();
            FxOperaciones(15);
            break;
        case "ERRORELIMINACIONCONFIGMAPAAMBITO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
        case "ELIMINACIONEXITOSADEAMBITO":
            MensajeFormatoVariable("Ha eliminado un ámbito para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaAmbitoNuevo();
            FxOperaciones(15);            
            break;
        case "ACTUALIZACIONEXITOSADEAMBITO":
            MensajeFormatoVariable("Ha actualizado un ámbito para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaAmbitoNuevo();
            FxOperaciones(15);              
            break;
            
        /*------------------------------------ NUCLEOS */             
        case "CARGARLISTADONUCLEOS":
            CargaNucleosPorAmbitosMapaProgreso(JSONString);
            break;
        case "CREACIONEXITOSADENUCLEO":
            MensajeFormatoVariable("Ha creado un núcleo para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaNucleoNuevo();
            FxOperaciones(16);
            break;
        case "ACTUALIZACIONEXITOSADENUCLEO":
            MensajeFormatoVariable("Ha actualizado un núcleo para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaNucleoNuevo();
            FxOperaciones(16);            
            break;
        case "ELIMINACIONEXITOSADENUCLEO":
            MensajeFormatoVariable("Ha eliminado un núcleo para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaAmbitoNuevo();
            FxOperaciones(16);            
            break;
        case "ERRORELIMINACIONCONFIGMAPANUCLEO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
            
        /*------------------------------------ MAPAS/EJES */             
        case "CARGARLISTADOMAPASXNUCLEO":
            CargaMapasPorNucleoMapaProgreso(JSONString);
            break;
        case "CREACIONEXITOSADEMAPAEJE":
            MensajeFormatoVariable("Ha creado un mapa/eje para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaEjeNuevo();
            FxOperaciones(17);
            break;        
        case "ERRORELIMINACIONCONFIGMAPAEJE":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
        case "ELIMINACIONEXITOSADEMAPAEJE":
            MensajeFormatoVariable("Ha eliminado un mapa/eje para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaEjeNuevo();
            FxOperaciones(17);             
            break;
        case "ACTUALIZACIONEXITOSADEMAPAEJE":
            MensajeFormatoVariable("Ha actualizado un mapa/eje para el mapa de progreso seleccionado.","success","center");
            CancelarConfigMapaEjeNuevo();
            FxOperaciones(17);                         
            break;
            
        /*------------------------------------ INDICADORES DESEMPEÑO */  
        case "LISTADOTIPOSINTELIGENCIAS":
            CargaTiposInteligencias(JSONString);
            break;
        case "CARGARCOMBOTRAMOSNIVELLOGROMAPACONFIG":
            CargaComboTramosNivelLogroMapa(JSONString);
            break;
        
        case "CREACIONINDICADORESXMAPAEXITOSA":
            MensajeFormatoVariable("Ha creado una nueva agrupación de indicadores de desempeño para el mapa de progreso seleccionado.","success","center");
            CancelarGrupoIndicadorNuevo();
            FxOperaciones(18);
            break;
        case "ERRORCREARINDICADORESXMAPASELECCIONADO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
            
        case "ELIMINACIONGRUPOINDICADORESXMAPAEXITOSA":
            MensajeFormatoVariable("Ha eliminado una agrupación de indicadores de desempeño para el mapa de progreso seleccionado.","success","center");
            CancelarGrupoIndicadorNuevo();
            FxOperaciones(18);            
            break;
        case "ERRORELIMINARGRUPONDICADORESXMAPASELECCIONADO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
            
        case "CARGALISTADOINDICADORESXMAPA":
            CargaIndicadoresPorMapaSeleccionado(JSONString);
            break;
            
        case "ACTUALIZACIONINDICADORESXMAPAEXITOSA":
            MensajeFormatoVariable("Ha actualizado una agrupación de indicadores de desempeño para el mapa de progreso seleccionado.","success","center");
            CancelarGrupoIndicadorNuevo();
            FxOperaciones(18);  
            break;
        case "ERRORACTUALIZARINDICADORESXMAPASELECCIONADO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
            
            
        /*------------------------------------*/    
        case "CARGARLISTADONIVELGRUPOS":
            CargaNivelLogroMapas(JSONString);
            break;
        case "NOEXISTELISTADONIVELGRUPOS":
            CargaNivelLogroMapas("");
            break;
        case "REGISTROEXITOSODENIVELDELOGRO":
            MensajeFormatoVariable("Se ha creado una nueva configuración de nivel de logro","success","center");
            CancelarNivelLogroNuevo();
            FxOperaciones(19);
            break;
        case "ERRORCREACIONNIVELLOGRO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;
        case "ACTUALIZACIONEXITOSODENIVELDELOGRO":
            CancelarNivelLogroNuevo();
            FxOperaciones(19);
            MensajeFormatoVariable("Se ha actualizado la configuración de nivel de logro seleccionada.","success","center");           
            break;
        case "ERRORACTUALIZACIONNIVELLOGRO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;            
        case "CARGARLISTADORANGOSXNIVELGRUPOS":
            CargaRangosNivelLogroSeleccionado(JSONString);
            break;
        case "ELIMINACIONEXITOSANIVELLOGRO":
            FxOperaciones(19);
            MensajeFormatoVariable("Se ha eliminado la configuración de nivel de logro seleccionada.","success","center");
            break;
        case "ERRORELIMINACIONNIVELLOGRO":
            MensajeFormatoVariable(jsonObj.mensaje,"error","center");
            break;

        case "CARGADATOSGEOLOCALIZACION":
            if(jsonObj.country!=""){
                document.getElementById('pais_x_ip').value = jsonObj.country;
                document.getElementById('alpha_code2_pais_x_ip').value = jsonObj.country_alpha2;
                document.getElementById('language_identificator').value = jsonObj.lang;
                if(jsonObj.lang!="spa") SeleccionaLengua(jsonObj.lang);
            }
            else{
                toastr.info('<table><tr><td><img src="images/info32x.png" /></td><td style="padding-left:10px;">'+glsNoDatageolocalizacion+'.</td></tr></table>');
            }
            break;
        case "FUNCIONALIDADOUTLINE":
            MensajeFormatoVariable("La funcionalidad asociada no está actualmente operativa. Por favor, contactar al administrador.","info");
            break;
        case "TESTCRYPTO":
            alert(JSONString);
            break;
        case "ERRORPHP":
            MensajeFormatoVariable(jsonObj.message_error,"error")
            break;
    }
}
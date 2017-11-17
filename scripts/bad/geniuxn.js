function FxOperaciones(opc) {
    //1: cerrar sesion
    //2: modifica idioma desde el portal
    //3: 
    
    //5: Modulo CONFIGURACION=> Idioma/Lengua
    //6: Modulo CONFIGURACION=> Perfiles
    //7: Modulo CONFIGURACION=> Instituciones
    //8: Modulo CONFIGURACION=> Usuarios

    //4:  Modulo MAPAS DE PROGRESO=> Editar mapa
    //14: Modulo MAPAS DE PROGRESO=> Buscar mapa
    //15: Modulo MAPAS DE PROGRESO=> Editar mapa => Carga listado de ambitos x configuracion base         
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
        case 11:
            getlocalizacionsvr();
            break;
        case 15:
            var parameters = {
                "operator": "CARGARLISTADOAMBITOSXCONFIGBASE",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById("id_configuracion_mapa_selected").value
            };
			GeniuxConnect(parameters);
            break;
        case 16:
            var parameters = {
                "operator": "CARGARLISTADONUCLEOSXAMBITO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById("id_configuracion_mapa_selected").value,
                "param5": document.getElementById("id_configuracion_ambito_selected").value
            };
			GeniuxConnect(parameters);
            break;   
        case 17:
            var parameters = {
                "operator": "CARGARLISTADOMAPASXNUCLEO",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById("id_configuracion_mapa_selected").value,
                "param5": document.getElementById("id_configuracion_ambito_selected").value,
                "param6": document.getElementById("id_configuracion_nucleo_selected").value
            };
			GeniuxConnect(parameters);
            break;  
        case 18:
            var parameters = {
                "operator": "CARGARLISTADOINDICADORESXMAPA",
                "param1": document.getElementById('id_usuario').value,
                "param2": document.getElementById('id_session').value,
                "param3": document.getElementById('language_identificator').value,
                "param4": document.getElementById("id_configuracion_mapa_selected").value,
                "param5": document.getElementById("id_configuracion_ambito_selected").value,
                "param6": document.getElementById("id_configuracion_nucleo_selected").value,
                "param7": document.getElementById("id_configuracion_mapaeje_selected").value
            };
			GeniuxConnect(parameters);
            break;     
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
                "param8": JSON.stringify(arrRangos)
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
                "param9": JSONObjNivelLogro.id_nivel_logro
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
            MensajeFormatoVariable2("La funcionalidad asociada no está actualmente operativa. Por favor, contactar al administrador.","info","center");
            break;
    }
}
function EjecutaComando(JSONString){
    var jsonObj = null;
    var paramdinamico = "";
    jsonObj = JSON.parse(EliminaEspacios(JSONString));
        
    BusyProcess(0);
    
    switch(jsonObj.fx){
        case "SELECCIONALENGUA":        
            var arrEtiquetas = jsonObj.etiquetas;
            for(var k=0;k<=arrEtiquetas.length-1;k++){
                if(EliminaEspacios(arrEtiquetas[k][1]) != "title"){
                    eval("document.getElementById('"+arrEtiquetas[k][0]+"')."+arrEtiquetas[k][2]+"='"+arrEtiquetas[k][3]+"';");
                }
                else{
                    eval("document."+arrEtiquetas[k][2]+"='"+arrEtiquetas[k][3]+"';");
                }
            }
            var lengua = jsonObj.lengua;
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
            break;
        case "SESIONASIGNADA":
            paramdinamico = ApplyCodeServer(jsonObj.nombre+"_"+jsonObj.saludo+"_"+jsonObj.genero+"_"+jsonObj.foto+"_"+jsonObj.perfil+"_"+jsonObj.actionpage);

            MensajeBienvenida(jsonObj.saludo+jsonObj.nombre);
            setTimeout(
                function () {
                    document.location.href = jsonObj.actionpage+"_"+paramdinamico+"_"+serialsvr+"_"+operatorincsvr;
                },
                2500
            );  
            break;
        case "SESIONACTIVA":
            break;
        case "CREDENCIALESINVALIDAS":
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
            
        /*------------------------------------*/
        case "CARGARLISTADOMAPASCONFIGURADOS":
            CargaModuloMapaProgreso(JSONString);
            break;
        case "NOEXISTENCONFIGURACIONESDEMAPAS":
            CargaModuloMapaProgreso("");
            break;
        case "CARGARLISTADOAMBITOS":
            CargaAmbitosMapaProgreso(JSONString);
            break;
		case "NOEXISTENAMBITOSPARACONFIGURACION":
			CargaAmbitosMapaProgreso("");
			break;
        case "CARGARLISTADONUCLEOS":
            CargaNucleosPorAmbitosMapaProgreso(JSONString);
            break;
        case "NOEXISTENNUCLEOSPARAAMBITO":
            CargaNucleosPorAmbitosMapaProgreso("");
            break;
        case "CARGARLISTADOMAPASXNUCLEO":
            CargaMapasPorNucleoMapaProgreso(JSONString);
            break;
        case "NOEXISTENMAPASPARANUCLEO":
            CargaMapasPorNucleoMapaProgreso("");
            break;
        case "CARGALISTADOINDICADORESXMAPA":
            CargaIndicadoresPorMapaSeleccionado(JSONString);
            break;
        case "GUARDARINDICADORESXMAPAEXITOSO":
            CargaIndicadoresPorMapaSeleccionado(JSONString);
            break;
        case "GUARDARINDICADORESXMAPAERRONEO":
            CargaIndicadoresPorMapaSeleccionado(JSONString);
            break;
        case "CREACIONINDICADORESXMAPAEXITOSA":
            MensajeFormatoVariable2("Ha creado una nueva agrupación de indicadores de desempeño para el mapa de progreso seleccionado.","success","center");
            CancelarGrupoIndicadorNuevo();
            FxOperaciones(18);
            break;
        case "ERRORCREARINDICADORESXMAPASELECCIONADO":
            MensajeFormatoVariable2(jsonObj.mensaje,"error","center");
            break;
        case "GRUPOINDICADORESXMAPASELECCIONADOEXISTENTE":
            MensajeFormatoVariable2(jsonObj.mensaje,"info","center");
            break;
            
        /*------------------------------------*/    
        case "CARGARLISTADONIVELGRUPOS":
            CargaNivelLogroMapas(JSONString);
            break;
        case "NOEXISTELISTADONIVELGRUPOS":
            CargaNivelLogroMapas("");
            break;
        case "REGISTROEXITOSODENIVELDELOGRO":
            MensajeFormatoVariable2("Se ha creado una nueva configuración de nivel de logro","success","center");
            CancelarNivelLogroNuevo();
            FxOperaciones(19);
            break;
        case "ERRORCREACIONNIVELLOGRO":
            MensajeFormatoVariable2(jsonObj.mensaje,"error","center");
            break;
        case "ACTUALIZACIONEXITOSODENIVELDELOGRO":
            CancelarNivelLogroNuevo();
            FxOperaciones(19);
            MensajeFormatoVariable2("Se ha actualizado la configuración de nivel de logro seleccionada.","success","center");           
            break;
        case "ERRORACTUALIZACIONNIVELLOGRO":
            MensajeFormatoVariable2(jsonObj.mensaje,"error","center");
            break;            
        case "CARGARLISTADORANGOSXNIVELGRUPOS":
            CargaRangosNivelLogroSeleccionado(JSONString);
            break;
        case "ELIMINACIONEXITOSANIVELLOGRO":
            FxOperaciones(19);
            MensajeFormatoVariable2("Se ha eliminado la configuración de nivel de logro seleccionada.","success","center");
            break;
        case "ERRORELIMINACIONNIVELLOGRO":
            MensajeFormatoVariable2(jsonObj.mensaje,"error","center");
            break;

        case "CARGADATOSGEOLOCALIZACION":
            if(jsonObj.country!=""){
                document.getElementById('pais_x_ip').value = jsonObj.country;
                document.getElementById('alpha_code2_pais_x_ip').value = jsonObj.country_alpha2;
            }
            else{
                toastr.info('<table><tr><td><img src="images/info32x.png" /></td><td style="padding-left:10px;">'+JSONGlsIdiomaLogin.gls6+'.</td></tr></table>');
            }
            break;
        case "FUNCIONALIDADOUTLINE":
            MensajeFormatoVariable("La funcionalidad asociada no está actualmente operativa. Por favor, contactar al administrador.","info");
            break;
        case "TESTCRYPTO":
            alert(JSONString);
            break;
    }
    
}
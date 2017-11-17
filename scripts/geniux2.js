///VERSION: 1.0 LAST UPDATE: 07.08.2017
///AUTOR: IVAN SALDIVAR RODRIGUEZ - 2017 - ivansaldivar@gmail.com
///FINAL RELEASE PROCESS WITH https://jscompress.com/

var jsonRangeNewAge='{"totalfilas":"0","filas":[]}';
var jsonStringAdd ="";
var JSONObjRangosEtarios = JSON.parse(jsonRangeNewAge);
var JSONObjNivelLogro;
var JSONObjNivelLogroRango;

var glsMensajeBloqueo="La configuración de nivel de logro está bloqueada por estar asignada a mapas de progreso.";
var glsSpan_txt_nombrerango_nivel_logro="Nombre rango";
var glsSpan_txt_descrango_nivel_logro="Descripción rango";
var glsSpan_text_desde_rango="DESDE";
var glsSpan_text_hasta_rango="HASTA";
var glsSpan_txt_desc_year_range_year="Año";
var glsSpan_txt_desc_year_range_month="Meses";
var glsSpan_txt_btn_cancelar_rangoedad_nivel_logro="CERRAR";
var glsSpan_txt_btn_guardar_rangoedad_nivel_logro="AGREGAR";
var glsSpan_txt_btn_editar_rangoedad_nivel_logro="ACTUALIZAR";
var glsplaceholderNombreTramo="Ingrese nombre rango, por ejemplo: Tramo 1";
var glsplaceholderDescripTramo="Ingrese descripción rango, por ejemplo: Hacia los seis meses";
var glsCanTramos=" tramos";

var glsdesdelos="Desde los ";
var glshastaLos=", hasta los ";
var glsyearrango=" años";
var glsmonthrango=" meses";
var glsilativorango=" y ";

var glsNoexistenIndicadores="NO EXISTEN INDICADORES DE DESEMPEÑO PARA EL MAPA DE PROGRESO SELECCIONADO";
var glsSpan_txt_cantidad_indicadores_Xrangos_x_new="0 indicadores";
var glsCanIndicadores=" indicadores de desempeño";
var glsDescTramoAgrupador="Tramo de nivel de logro";
var glsDescogroAprendizaje="Logro de aprendizaje";
var glsDescCabTblIndicadoresTramo="Indicadores del rango";
var glsBtnAgregarIndicadorDesempeno="AGREGAR INDICADOR";
var glsBtnGuardarIndicadorDesempeno="GUARDAR CAMBIO";
var glsBtnEliminarIndicadoresDesempeno="ELIMINAR";
var gls_desc_config_mapa_ambito_nuevo = "REGISTRO DE ÁMBITO NUEVO";
var glscabDesc_config_mapa_ambito="Descripción";
var glscabColor_config_mapa_ambito="Color";
var glsbtn_cancelar_ambito_new="CANCELAR";
var glsbtn_guardar_ambito_new="GUARDAR ÁMBITO NUEVO";
var glsbtn_guardar_ambito="GUARDAR ÁMBITO";
var glsbtn_eliminar_ambito="ELIMINAR";
var glsbtn_editar_ambito ="EDITAR ÁMBITO";
var glscabDesc_config_mapa_nucleo="Descripción núcleo"; 
var glscabColor_config_mapa_color_nucleo="Color núcleo";
var glscabNom_config_mapa_nucleo="Nombre núcleo";
var glsbtn_eliminar_nucleo="ELIMINAR"; 
var glsbtn_guardar_nucleo="GUARDAR CAMBIOS"; 
var glsbtn_editar_nucleo="EDITAR NÚCLEO";
var glsbtn_cancelar_nucleo="CANCELAR";
var glsbtn_eliminar_eje="ELIMINAR";
var glsbtn_guardar_eje="GUARDAR CAMBIOS"; 
var glsbtn_editar_eje="EDITAR MAPA / EJE"; 
var glsbtn_cancelar_eje="CANCELAR";
var glscabNom_config_mapa_eje="Nombre mapa"; 
var glscabColor_config_mapa_color_eje="Color mapa"; 
var glscabDesc_config_mapa_eje="Descripción mapa";

//VARIABLES MENSAJES
var glsCedencialesInvalidas="Las credenciales ingresadas no son v&aacute;lidas.";
var glsNoDatageolocalizacion="No se pudo cargar los datos de conexión mediante geolocalización";
var glsCierreSesionNovalida = "Los datos de conexi&oacute;n NO son v&aacute;lidos, por lo tanto, su sesi&oacute;n ha sido cancelada en forma autom&aacute;tica.";
var glsnoexistenNivelLogros="NO EXISTEN NIVELES DE LOGRO CONFIGURADOS.";
var glsSesionInactiva ="Su se sesión de usuario se ha sido inactivada. Para continuar, por favor, reingrese a Geniux.";
var glsConfirmaEliminaConfigNivelLogro="¿Confirma eliminación de configuración de nivel de logro seleccionada?";
var glsnoexistenConfigBase="AÚN NO EXISTEN CONFIGURACIONES BASE DE MAPAS DE PROGRESO.";
var glsnoexistenConfigBaseAmbitos="AÚN NO EXISTEN ÁMBITOS PARA LA CONFIGURACIÓN DE MAPAS DE PROGRESO SELECCIONADA."
var glsMensajefaltanDatosambitoNew="Para crear un nuevo ámbito debe indicar descripción y color asignado.";
var glsMensajefaltanDatosambitoEdit="Para actualizar un ámbito debe indicar descripción y color asignado.";
var glsnoexistenConfigBaseNucleos="AÚN NO EXISTEN NÚCLEOS PARA EL ÁMBITO SELECCIONAD0 EN ESTA CONFIGURACIÓN DE MAPAS DE PROGRESO.";
var glsnoexistenConfigBaseMapasEjes="AÚN NO EXISTEN MAPAS/EJES PARA EL NÚCLEO SELECCIONAD0 EN ESTA CONFIGURACIÓN DE MAPAS DE PROGRESO.";
var glsnoexistenConfigBaseMapasIndicadores="AÚN NO EXISTEN INDICADORES DE DESEMPEÑO PARA EL MAPA/EJE SELECCIONAD0 EN ESTA CONFIGURACIÓN DE MAPAS DE PROGRESO.";

function RecargaPanelInicio(){
    //CONFIG MAPA PROGRESO
    ConfiguraSeccionMapaPogresos("none");
    //NIVEL LOGRO
    document.getElementById("div_seccion_nivel_logro").style.display="none";
    //PANEL INICIAL
    document.getElementById("div_panel_inicial").style.display="none";
}
function ConfiguraSeccionMapaPogresos(opc){
    //CONFIG MAPA PROGRESO
    document.getElementById("span_txt_path_modulo_2").innerHTML="Crear - editar mapa";
    document.getElementById("div_listado_mapas_configurados").innerHTML="";
    document.getElementById("div_descripcion_config_base").innerHTML="";
    document.getElementById("div_listado_ambitos_configurados").innerHTML="";
    document.getElementById("div_listado_nucleos_configurados").innerHTML="";
    document.getElementById("div_listado_mapa_configurados").innerHTML="";
    document.getElementById("div_listado_indicadores_configurados").innerHTML="";
    
    document.getElementById("div_cabecera_modulo_mapa_progreso").style.display=opc;
    document.getElementById("div_seccion_general_mapa").style.display=opc;
    document.getElementById("div_seccion_ambito_mapa").style.display="none";
    document.getElementById("div_seccion_nucleo_mapa").style.display="none";
    document.getElementById("div_seccion_mapa").style.display="none";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";
}

//CONFIG BASE MAPA
var totalConfigBaseEnpantalla=0;
function CargaModuloMapaProgreso(JSONStringConfigMapas){
    RecargaPanelInicio();
    document.getElementById("div_panel_inicial").style.display="none";
    ConfiguraSeccionMapaPogresos("block");
    
    var id_config="";
    var year_config_mapa="";
    var scope_config_mapa="";
    var alpha_2_code_pais_config_mapa="";
    var desc_config_mapa="";
    var nombrepais_config_mapa="";
    var nombre_institucion_config_mapa="";
    var id_nivel_logro_config_mapa = "";
    
    var bscope_config_mapa;
    var estado_uso_config_mapa="";
    var uso_config_mapa;
    var estado_config_mapa="";
	var salida="";
	
    var glscabDesc_config_mapa="Descripción";
	var glscabYearCountry_config_mapa="Año / País";
    var glscabInstitcion_config_mapa="Institución";
    var glscabNivelLogro_config_mapa="Nivel Logro";
    
    var color_configbase="#68A84B";
    
    var glsbtn_eliminar="ELIMINAR";
    var glsbtn_agregar="AGREGAR CONFIGURACIÓN";
    var glsbtn_guardar="GUARDAR CAMBIOS";
    var glsScopeConfigMapa="USO GLOBAL";
    var gls_EstadoConfigMapaBLK="BLOQUEADO";
    var gls_EstadoConfigMapaEDT="EDITABLE";
    var glsbtn_clonar = 'CLONAR';
    var glsbtn_editar = 'EDITAR MAPA';
      
	if(JSONStringConfigMapas!=""){
    	var jsonObj = JSON.parse(JSONStringConfigMapas);
		var arrConfigBase = jsonObj.listado;    
        var arrTiposNivelLogros = jsonObj.listado_nl;    
		totalConfigBaseEnpantalla=arrConfigBase.length-1;//indices desde 0 a n-1
        
        CargaComboNivelLogro(arrTiposNivelLogros);
        
        if(jsonObj.cantidad=="0"){
            
            totalConfigBaseEnpantalla=0;
            
            document.getElementById("div_listado_mapas_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBase+"</span></div>";
            
        }
        else{
            for(var k=0;k<=arrConfigBase.length-1;k++){

                id_config=arrConfigBase[k][0];
                desc_config_mapa=arrConfigBase[k][1];
                scope_config_mapa=arrConfigBase[k][3];
                uso_config_mapa=arrConfigBase[k][5];
                id_nivel_logro_config_mapa=arrConfigBase[k][6];
                
                nombrepais_config_mapa =arrConfigBase[k][7];
                year_config_mapa =arrConfigBase[k][8];
                nombre_institucion_config_mapa="";
                
                if(uso_config_mapa=="0"){
                    estado_uso_config_mapa='<p class="text-success"><i class="fa fa-unlock"></i>&nbsp;'+gls_EstadoConfigMapaEDT+'</p>';
                }
                else{
                    estado_uso_config_mapa='<p class="text-danger"><i class="fa fa-lock"></i>&nbsp;'+gls_EstadoConfigMapaBLK+'</p>';
                }
                bscope_config_mapa="";
                if(scope_config_mapa=="1"){
                    bscope_config_mapa=" checked";
                }

                strSelect_NL = CargaComboNivelLogro2(arrTiposNivelLogros,id_nivel_logro_config_mapa,k);

                salida=salida+
                '<div style="border:1px solid '+color_configbase+';margin-bottom:5px;">'+

                '<div id="divcab_config_mapa_'+k+'" style="cursor:pointer;background:'+color_configbase+';color:#FFF;width:100%;height:25px;" onclick="ViewHide('+k+',1);"><p class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;"/>'+desc_config_mapa.toUpperCase()+'</p></div>'+    

                '<div id="div_config_config_mapa_'+k+'" style="display:none;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">'+        

                '<div class="checkbox" style="margin-left:-5px;"><label><input id="check_config_mapa_scope_'+k+'" '+bscope_config_mapa+' type="checkbox" class="i-checks" />&nbsp;<span id="span_txt_scope_config_mapa">'+glsScopeConfigMapa+'</span></label></div><br/>'+
                '<span id="span_txt_glosa_estado_config_mapa_'+k+'">'+estado_uso_config_mapa+'</span>'+
                '<input id="estado_config_mapa_'+k+'" type="hidden" value="'+uso_config_mapa+'"/>'+
                '<div>'+
                '<span><small><span id="span_txt_desc_config_mapa_'+k+'">'+glscabDesc_config_mapa+'</span></small></span><br/>'+
                '<input id="descrip_config_mapa_'+k+'" type="text" class="form-control" maxlength="500" value="'+desc_config_mapa+'" placeholder="Ingrese descripción, ejemplo: Configuración Mapa de Progreso Educación Parvularia"/>'+
                '<span><small><span id="span_txt_desc_year_country_ori_config_mapa_'+k+'">'+glscabYearCountry_config_mapa+'</span></small></span><br/>'+
                '<input id="text_year_country_origin_config_mapa_'+k+'" type="text" class="form-control" value="'+year_config_mapa +' / '+ nombrepais_config_mapa+'" readonly />'+
                '<span><small><span id="span_txt_institucion_origen_config_mapa_'+k+'">'+glscabInstitcion_config_mapa+'</span></small></span><br/>'+
                '<input id="text_institucion_origin_config_mapa_'+k+'" type="text" class="form-control" value="'+nombre_institucion_config_mapa+'" readonly data-id="0" />'+
                '<span><small><span id="span_txt_nivel_logro_origen_config_mapa_'+k+'">'+glscabNivelLogro_config_mapa+'</span></small></span><br/>'+
                strSelect_NL+
                '</div>'+
                    
                '<br/>'+ 

                '<div style="padding-top:10px;">'+
                '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="EliminarConfigMapa('+id_config+','+k+');"><i class="fa fa-trash-o"></i> '+glsbtn_eliminar+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="ActualizarConfigMapa('+id_config+','+k+');"><i class="fa fa-save"></i> '+glsbtn_guardar+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="ClonarConfigMapa('+id_config+','+k+');"><i class="fa fa-copy "></i> '+glsbtn_clonar+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="EditarConfigMapa('+id_config+','+k+');"><i class="fa fa-edit"></i> '+glsbtn_editar+'</button>'+

                '</div>'+
                    
                '</div>'+

                '</div>';   
            }

            document.getElementById("div_listado_mapas_configurados").innerHTML = salida;
            $(document).ready(function(){
                $('.i-checks').on('ifChecked ifUnchecked ', function(event){}).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    increaseArea: '20%' // optional
                });
                if(document.getElementById("div_seccion_general_mapa").className.indexOf("panel-collapse")!=-1){
                    $('#opencloseCB').click();
                }            
            });
        }
	}
	else{
        totalmapaejesenpantalla=0;
		document.getElementById("div_listado_mapas_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBase+"</span></div>";
	}    
}
function CargaComboNivelLogro(arrNiveles){
    var salida = "<option value='0'>Seleccione configuración de nivel de logro</option>";
    for(var k=0;k<=arrNiveles.length-1;k++){
        id_nivel_logro=arrNiveles[k][0];
        ds_nivel_logro=arrNiveles[k][4];  
        salida = salida + "<option value='"+id_nivel_logro+"'>"+ds_nivel_logro+"</option>";
    }
    salida = "<select class='form-control m-b' id='selNivelLogro_config_mapa'>"+salida+"</select>"
    document.getElementById("div_cmb_nivel_logro_config_mapa").innerHTML = salida;
}
function CargaComboNivelLogro2(arrNiveles, valor, index){
    var salida = "<option value='0'>Seleccione configuración de nivel de logro</option>";
    var selected = "";
    for(var k=0;k<=arrNiveles.length-1;k++){
        id_nivel_logro=arrNiveles[k][0];
        ds_nivel_logro=arrNiveles[k][4];  
        
        if(id_nivel_logro==valor)
            selected = " selected";
        else
            selected = "";
        
        salida = salida + "<option value='"+id_nivel_logro+"'"+selected+">"+ds_nivel_logro+"</option>";
    }
    salida = "<select class='form-control m-b' id='selNivelLogro_config_mapa_"+index+"'>"+salida+"</select>"
    return salida;
}
function NuevoConfigMapa(){
    var d = new Date();
    document.getElementById("div_nuevo_config_mapa").style.display="";
    document.getElementById("text_year_country_origin_config_mapa").value =d.getFullYear()+" / "+document.getElementById("pais_x_ip").value;
}
function CancelarConfigMapaNuevo(){
    document.getElementById("div_nuevo_config_mapa").style.display="none";    
    document.getElementById("text_year_country_origin_config_mapa").value ="";
    document.getElementById("descrip_cfg_config_mapa_new").value ="";
    document.getElementById("text_institucion_origin_config_mapa").value ="";
    $('#check_config_mapa_scope_new').iCheck('uncheck');
    $("#selNivelLogro_config_mapa")[0].selectedIndex = 0;
}
function GuardarConfigMapaLogro(){
    var text_year_country_origin_config_mapa = document.getElementById("text_year_country_origin_config_mapa").value;
    var descrip_cfg_config_mapa_new =document.getElementById("descrip_cfg_config_mapa_new").value;
    var id_institucion_origin_config_mapa = $("#text_institucion_origin_config_mapa").attr("data-id");
    var check_config_mapa_scope_new = "0";
    var nivel_logro = $("#selNivelLogro_config_mapa").val();
    
    if(EliminaEspacios(descrip_cfg_config_mapa_new)=="" || nivel_logro == "0"){
        MensajeFormatoVariable("Para crear una nueva configuración de mapa de progreso debe indicar descripción y tipo de configuración de nivel de logro.","info","center");
    }
    else{
        if(document.getElementById("check_config_mapa_scope_new").checked) check_config_mapa_scope_new = "1";
            
        document.getElementById("text_year_country_origin_config_mapa_new").value =text_year_country_origin_config_mapa;
        document.getElementById("descrip_cfg_config_mapa_new").value =descrip_cfg_config_mapa_new;
        document.getElementById("text_institucion_origin_config_mapa_new").value =id_institucion_origin_config_mapa;
        document.getElementById("chk_config_mapa_scope_new").value =check_config_mapa_scope_new;
        document.getElementById("selNivelLogro_config_mapa_new").value =nivel_logro;
        FxOperaciones(26);
    }
}

function ActualizarConfigMapa(id_config, index){
    var text_year_country_origin_config_mapa = document.getElementById("text_year_country_origin_config_mapa_"+index).value;
    var descrip_cfg_config_mapa_ =document.getElementById("descrip_config_mapa_"+index).value;
    var id_institucion_origin_config_mapa = $("#text_institucion_origin_config_mapa_"+index).attr("data-id");
    var check_config_mapa_scope_ = "0";
    var nivel_logro = $("#selNivelLogro_config_mapa_"+index).val();
    
    if(EliminaEspacios(descrip_cfg_config_mapa_)=="" || nivel_logro == "0"){
        MensajeFormatoVariable("Para actualizar una configuración de mapa de progreso debe indicar descripción y tipo de configuración de nivel de logro.","info","center");
    }
    else{
        if(document.getElementById("check_config_mapa_scope_"+index).checked) check_config_mapa_scope_ = "1";
        document.getElementById("text_year_country_origin_config_mapa_new").value =text_year_country_origin_config_mapa;
        document.getElementById("descrip_cfg_config_mapa_new").value =descrip_cfg_config_mapa_;
        document.getElementById("text_institucion_origin_config_mapa_new").value =id_institucion_origin_config_mapa;
        document.getElementById("chk_config_mapa_scope_new").value =check_config_mapa_scope_;
        document.getElementById("selNivelLogro_config_mapa_new").value =nivel_logro;
        document.getElementById("id_configuracion_mapa_selected").value =id_config;
        FxOperaciones(27);
    }
}
function EliminarConfigMapa(id_config, index){
    MensajeWARNING("¿Confirma la eliminación de la configuración de mapa de progreso sleleccionada?. Considere que se eliminarán los ámbitos, núcleos, ejes e indicadores de desempeño asociados a este. ","EliminarConfigMapa_("+id_config+");");
}
function EliminarConfigMapa_(id_config){
    document.getElementById("id_configuracion_mapa_selected").value =id_config;
    FxOperaciones(28);
}
function ClonarConfigMapa(id_config, index){}
function EditarConfigMapa(id_config, index){
    document.getElementById("div_seccion_general_mapa").style.display="none";
    document.getElementById("div_seccion_ambito_mapa").style.display="block";
    document.getElementById("div_seccion_nucleo_mapa").style.display="none";
    document.getElementById("div_seccion_mapa").style.display="none";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";
    
    document.getElementById("id_configuracion_mapa_selected").value =id_config;
    document.getElementById("div_descripcion_config_base").innerHTML= "<span style='color:#68A84B;'>ÁMBITOS DE <b>"+$("#descrip_config_mapa_"+index).val().toUpperCase()+"</b></span>";
    FxOperaciones(15);
}
//AMBITO
function CancelarConfigMapa_Ambito(){
    document.getElementById("div_seccion_general_mapa").style.display="block";
    document.getElementById("div_seccion_ambito_mapa").style.display="none";
    document.getElementById("div_seccion_nucleo_mapa").style.display="none";
    document.getElementById("div_seccion_mapa").style.display="none";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";  
    
    document.getElementById("div_listado_ambitos_panel_control").innerHTML="";
    document.getElementById("div_listado_ambitos_configurados").innerHTML ="";
    document.getElementById("div_descripcion_config_base").innerHTML="";
}
function CrearConfigMapa_AmbitoNuevo(){
    var color_configbase = "#68A84B";
    var k = "new";
    var estado_uso_config_mapa_ambito="";
    var uso_config_mapa_ambito="";
    var desc_config_mapa_ambito="";
    var color_cofig_mapa_ambito="";
    
    document.getElementById("div_listado_ambitos_panel_control").innerHTML='<div style="border:1px solid '+color_configbase+';margin-bottom:5px;">'+
    '<div id="divcab_config_mapa_ambito_'+k+'" style="cursor:pointer;background:'+color_configbase+';color:#FFF;width:100%;height:25px;">'+
    '<p class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_ambito_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;"/>'+gls_desc_config_mapa_ambito_nuevo+'</p>'+
    '</div>'+    

    '<div id="div_config_config_mapa_ambito_'+k+'" style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:10px;">'+        

    '<div class="checkbox" style="margin-left:-5px;">'+
    '<span id="span_txt_glosa_estado_config_mapa_ambito_'+k+'">'+estado_uso_config_mapa_ambito+'</span>'+
    '<input id="estado_config_mapa_ambito_'+k+'" type="hidden" value="'+uso_config_mapa_ambito+'"/>'+
    '<div>'+

    '<span><small><span id="span_txt_desc_config_mapa_ambito_'+k+'">'+glscabDesc_config_mapa_ambito+'</span></small></span><br/>'+
    '<input id="descrip_config_mapa_ambito_'+k+'" type="text" class="form-control" maxlength="500" value="'+desc_config_mapa_ambito+'" placeholder="Ingrese descripción, ejemplo: Formación Personal y Social"/>'+
    '<span><small><span id="span_txt_color_config_mapa_ambito'+k+'">'+glscabColor_config_mapa_ambito+'</span></small></span><br/>'+
    '<input id="text_color_cofig_mapa_ambito_'+k+'" type="text" class="form-control color-input" maxlength="20" value="'+color_cofig_mapa_ambito+'"  data-huebee />'+

    '</div>'+

    '<br/>'+ 

    '<div style="padding-top:10px;">'+
    '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="CancelarConfigMapaAmbitoNuevo();"><i class="fa fa-trash-o"></i> '+glsbtn_cancelar_ambito_new+'</button>&nbsp;'+
    '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarConfigMapaAmbitoNuevo();"><i class="fa fa-save"></i> '+glsbtn_guardar_ambito_new+'</button>&nbsp;'+
    '</div>'+

    '</div>';   
    $('.color-input').each( function( i, elem ) {
      var hueb = new Huebee( elem, {
        customColors: [ '#D54B13', '#E2834E', '#F0B995', '#F8DDC9', 
                        '#F19300', '#F8C073', '#FCE0BA', 
                        '#BCBA00', '#D6D377', '#E4E2A8', '#F1F0D3' ]
      });
    });
        
}
function CancelarConfigMapaAmbitoNuevo(){
    document.getElementById("div_listado_ambitos_panel_control").innerHTML="";    
}
function GuardarConfigMapaAmbitoNuevo(){
    var ambito_desc=document.getElementById("descrip_config_mapa_ambito_new").value;
    var ambito_color=document.getElementById("text_color_cofig_mapa_ambito_new").value;
    if(EliminaEspacios(ambito_desc)=="" || EliminaEspacios(ambito_color)==""){
        MensajeFormatoVariable(glsMensajefaltanDatosambitoNew,"info","center");
    }
    else{
        FxOperaciones(29);    
    }
}
var totalConfigBaseAmbitosEnpantalla=0;
function CargaAmbitosMapaProgreso(JSONStringAmbitos){
    var id_ambito="";
    var id_config="";
    var desc_ambito="";
    var desc_code2_country="";
    var color_ambito="";
    var estado_uso_config_mapa_ambito="";
    var uso_config_mapa_ambito="";
    
    var salida="";
        
    if(JSONStringAmbitos!=""){
    	var jsonObj = JSON.parse(JSONStringAmbitos);
		var arrConfigAmbitos = jsonObj.listado;    

        totalConfigBaseAmbitosEnpantalla=arrConfigAmbitos.length-1;//indices desde 0 a n-1
        
        if(jsonObj.cantidad=="0"){         
            totalConfigBaseEnpantalla=0;
            document.getElementById("div_listado_ambitos_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseAmbitos+"</span></div>";            
        }
        else{
            for(var k=0;k<=arrConfigAmbitos.length-1;k++){
                id_ambito=arrConfigAmbitos[k][0];
                id_config=arrConfigAmbitos[k][1];
                desc_ambito=arrConfigAmbitos[k][2];
                desc_code2_country=arrConfigAmbitos[k][3];
                color_ambito=arrConfigAmbitos[k][4];
                
                salida = salida + 
                '<div style="border:1px solid '+color_ambito+';margin-bottom:5px;">'+
                    
                '<div id="divcab_config_mapa_ambito_'+k+'" style="cursor:pointer;background:'+color_ambito+';color:#000;width:100%;height:25px;" onclick="ViewHide('+k+',2);">'+
                '<p id="cab_nom_ambito_'+k+'" class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_ambito_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;font-weight:bold;"/>'+desc_ambito.toUpperCase()+'</p>'+
                '</div>'+    

                '<div id="div_config_config_mapa_ambito_'+k+'" style="display:none;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:10px;">'+        

                '<div class="checkbox" style="margin-left:-5px;">'+
                '<span id="span_txt_glosa_estado_config_mapa_ambito_'+k+'">'+estado_uso_config_mapa_ambito+'</span>'+
                '<input id="estado_config_mapa_ambito_'+k+'" type="hidden" value="'+uso_config_mapa_ambito+'"/>'+
                '</div>'+
                    
                '<div>'+
                '<span><small><span id="span_txt_desc_config_mapa_ambito_'+k+'">'+glscabDesc_config_mapa_ambito+'</span></small></span><br/>'+
                '<input id="descrip_config_mapa_ambito_'+k+'" type="text" class="form-control" maxlength="500" value="'+desc_ambito+'" placeholder="Ingrese descripción, ejemplo: Formación Personal y Social"/>'+
                '<span><small><span id="span_txt_color_config_mapa_ambito'+k+'">'+glscabColor_config_mapa_ambito+'</span></small></span><br/>'+
                '<input id="text_color_cofig_mapa_ambito_'+k+'" type="text" class="form-control color-input" maxlength="20" value="'+color_ambito+'"  data-huebee />'+
                '</div>'+
                    
                '<br/>'+ 
                    
                '<div style="padding-top:10px;">'+
                '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="EliminarConfigMapaAmbito('+id_config+','+id_ambito+','+k+');"><i class="fa fa-trash-o"></i> '+glsbtn_eliminar_ambito+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarConfigMapaAmbito('+id_config+','+id_ambito+','+k+');"><i class="fa fa-save"></i> '+glsbtn_guardar_ambito+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="EditarConfigMapaAmbito('+id_config+','+id_ambito+','+k+');"><i class="fa fa-edit"></i> '+glsbtn_editar_ambito+'</button>&nbsp;'+
                '</div>'+
                    
                '</div>'+
                
                '</div>';
                
            }
            document.getElementById("div_listado_ambitos_configurados").innerHTML = salida;
            $('.color-input').each( function( i, elem ) {
              var hueb = new Huebee( elem, {
                customColors: [ '#D54B13', '#E2834E', '#F0B995', '#F8DDC9', 
                                '#F19300', '#F8C073', '#FCE0BA', 
                                '#BCBA00', '#D6D377', '#E4E2A8', '#F1F0D3' ]
              });
            });            
            for(var k=0;k<=arrConfigAmbitos.length-1;k++){
                document.getElementById("cab_nom_ambito_"+k).style.color = document.getElementById("text_color_cofig_mapa_ambito_"+k).style.color;
            }
        }
    }
    else{
        document.getElementById("div_listado_ambitos_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseAmbitos+"</span></div>";            
    }
}
function EliminarConfigMapaAmbito(id_config,id_ambito,index){
    MensajeWARNING("¿Confirma la eliminación del ámbito seleccionado del mapa de progreso en edición?. Considere que se eliminarán los núcleos, ejes e indicadores de desempeño asociados a este. ","EliminarConfigMapaAmbito_("+id_config+","+id_ambito+","+index+");");
}
function EliminarConfigMapaAmbito_(id_config,id_ambito,index){
    document.getElementById("id_configuracion_mapa_selected").value=id_config;
    document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
    FxOperaciones(30); 
}
function GuardarConfigMapaAmbito(id_config,id_ambito,index){
    var ambito_desc=document.getElementById("descrip_config_mapa_ambito_"+index).value;
    var ambito_color=document.getElementById("text_color_cofig_mapa_ambito_"+index).value;
    if(EliminaEspacios(ambito_desc)=="" || EliminaEspacios(ambito_color)==""){
        MensajeFormatoVariable(glsMensajefaltanDatosambitoEdit,"info","center");
    }
    else{
        document.getElementById("ambito_descr").value=EliminaEspacios(ambito_desc);
        document.getElementById("ambito_color").value=EliminaEspacios(ambito_color);
        document.getElementById("id_configuracion_mapa_selected").value=id_config;
        document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
        FxOperaciones(31);
    }    
}

//NUCLEO
function EditarConfigMapaAmbito(id_config,id_ambito,index){
    document.getElementById("div_seccion_general_mapa").style.display="none";
    document.getElementById("div_seccion_ambito_mapa").style.display="none";
    document.getElementById("div_seccion_nucleo_mapa").style.display="block";
    document.getElementById("div_seccion_mapa").style.display="none";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";
    
    document.getElementById("id_configuracion_mapa_selected").value =id_config;
    document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
    
    document.getElementById("div_descripcion_ambito_padre").innerHTML= "<span style='color:#68A84B;'>NÚCLEOS DE ÁMBITO <b>"+$("#descrip_config_mapa_ambito_"+index).val().toUpperCase()+"</b></span>";
    document.getElementById("div_listado_nucleos_panel_control").innerHTML="";
    FxOperaciones(16);
}
var totalConfigBaseNucleosEnpantalla=0;
function CargaNucleosPorAmbitosMapaProgreso(JSONStringAmbitos){
    var id_nucleo="";
    var id_ambito="";
    var id_config="";
    var nom_nucleo="";
    var desc_nucleo="";
    var desc_code2_country="";
    var color_nucleo="";
    var estado_uso_config_mapa_nucleo="";
    var uso_config_mapa_nucleo="";
    
    var salida="";
        
    if(JSONStringAmbitos!=""){
    	var jsonObj = JSON.parse(JSONStringAmbitos);
		var arrConfigNucleos = jsonObj.listado;    

        totalConfigBaseNucleosEnpantalla=arrConfigNucleos.length-1;//indices desde 0 a n-1
        
        if(jsonObj.cantidad=="0"){         
            totalConfigBaseNucleosEnpantalla=0;
            document.getElementById("div_listado_nucleos_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseNucleos+"</span></div>";            
        }
        else{
            for(var k=0;k<=arrConfigNucleos.length-1;k++){
                id_nucleo=arrConfigNucleos[k][0];
                id_ambito=arrConfigNucleos[k][1];
                id_config=arrConfigNucleos[k][2];
                nom_nucleo=arrConfigNucleos[k][3];
                desc_nucleo=arrConfigNucleos[k][4];
                desc_code2_country=arrConfigNucleos[k][5];
                color_nucleo=arrConfigNucleos[k][6];
                
                salida = salida + 
                '<div style="border:1px solid '+color_nucleo+';margin-bottom:5px;">'+
                    
                '<div id="divcab_config_mapa_nucleo_'+k+'" style="cursor:pointer;background:'+color_nucleo+';color:#000;width:100%;height:25px;" onclick="ViewHide('+k+',3);">'+
                '<p id="cab_nom_nucleo_'+k+'" class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_ambito_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;font-weight:bold;"/>'+nom_nucleo.toUpperCase()+'</p>'+
                '</div>'+    

                '<div id="div_config_config_mapa_nucleo_'+k+'" style="display:none;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:10px;">'+        

                '<div class="checkbox" style="margin-left:-5px;">'+
                '<span id="span_txt_glosa_estado_config_mapa_nom_nucleo_'+k+'">'+estado_uso_config_mapa_nucleo+'</span>'+
                '<input id="estado_config_mapa_nom_nucleo_'+k+'" type="hidden" value="'+uso_config_mapa_nucleo+'"/>'+
                '</div>'+
                    
                '<div>'+ 
                '<span><small><span id="span_txt_desc_config_mapa_nucleo_'+k+'">'+glscabNom_config_mapa_nucleo+'</span></small></span><br/>'+
                '<input id="nombre_config_mapa_nucleo_'+k+'" type="text" class="form-control" maxlength="500" value="'+nom_nucleo+'" placeholder="Ingrese nombre, ejemplo: Autonomía"/>'+
                '<span><small><span id="span_txt_color_config_mapa_nucleo_'+k+'">'+glscabColor_config_mapa_color_nucleo+'</span></small></span><br/>'+
                '<input id="text_color_cofig_mapa_nucleo_'+k+'" type="text" class="form-control color-input" maxlength="20" value="'+color_nucleo+'"  data-huebee />'+

                '<span><small><span id="span_txt_desc_config_mapa_nucleo_'+k+'">'+glscabDesc_config_mapa_nucleo+'</span></small></span><br/>'+
                '<div id="descrip_config_mapa_nucleo_'+k+'" class="summernote">'+desc_nucleo+'</div>'+
                    
                '</div>'+
                    
                '<br/>'+ 
                    
                '<div style="padding-top:10px;">'+
                '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="EliminarConfigMapaNucleo('+id_config+','+id_ambito+','+id_nucleo+','+k+');"><i class="fa fa-trash-o"></i> '+glsbtn_eliminar_nucleo+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarConfigMapaNucleo('+id_config+','+id_ambito+','+id_nucleo+','+k+');"><i class="fa fa-save"></i> '+glsbtn_guardar_nucleo+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="EditarConfigMapaNucleo(' +id_config+','+id_ambito+','+id_nucleo+','+k+');"><i class="fa fa-edit"></i> '+glsbtn_editar_nucleo+'</button>&nbsp;'+
                '</div>'+
                    
                '</div>'+
                
                '</div>';
                
            }
            document.getElementById("div_listado_nucleos_configurados").innerHTML = salida;
            $('.color-input').each( function( i, elem ) {
              var hueb = new Huebee( elem, {
                customColors: [ '#D54B13', '#E2834E', '#F0B995', '#F8DDC9', 
                                '#F19300', '#F8C073', '#FCE0BA', 
                                '#BCBA00', '#D6D377', '#E4E2A8', '#F1F0D3' ]
              });
            });        
            for(var k=0;k<=arrConfigNucleos.length-1;k++){
                document.getElementById("cab_nom_nucleo_"+k).style.color = document.getElementById("text_color_cofig_mapa_nucleo_"+k).style.color;
                $("#descrip_config_mapa_nucleo_"+k).summernote({
                    lang: 'es-ES', // default: 'en-US'
                    height: 110,   //set editable area's height
                    codemirror: { // codemirror options
                        theme: 'monokai',
                    },
                    toolbar: [
                        // [groupName, [list of button]]
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['codeview',['codeview']],
                        ['fontname',['fontname']]
                    ]
                });
            }
        }
    }
    else{
        document.getElementById("div_listado_nucleos_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseNucleos+"</span></div>";            
    }    
}
function CrearConfigMapa_NucleoNuevo(){
    var id_nucleo="";
    var id_ambito="";
    var id_config="";
    var nom_nucleo="REGISTRO DE NÚCLEO NUEVO";
    var desc_nucleo="";
    var desc_code2_country="";
    var color_nucleo="#68A84B";
    var estado_uso_config_mapa_nucleo="";
    var uso_config_mapa_nucleo="";
    var k = "new";
    
    var salida="";    
    salida = '<div style="border:1px solid '+color_nucleo+';margin-bottom:5px;">'+
            '<div id="divcab_config_mapa_nucleo_'+k+'" style="cursor:pointer;background:'+color_nucleo+';color:#FFF;width:100%;height:25px;" onclick="ViewHide('+k+',3);">'+
            '<p id="cab_nom_nucleo_'+k+'" class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_ambito_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;font-weight:bold;"/>'+nom_nucleo.toUpperCase()+'</p>'+
            '</div>'+    

            '<div id="div_config_config_mapa_nucleo_'+k+'" style="display:;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:10px;">'+        

            '<div class="checkbox" style="margin-left:-5px;">'+
            '<span id="span_txt_glosa_estado_config_mapa_nom_nucleo_'+k+'">'+estado_uso_config_mapa_nucleo+'</span>'+
            '<input id="estado_config_mapa_nom_nucleo_'+k+'" type="hidden" value="'+uso_config_mapa_nucleo+'"/>'+
            '</div>'+

            '<div>'+ 
            '<span><small><span id="span_txt_desc_config_mapa_nucleo_'+k+'">'+glscabNom_config_mapa_nucleo+'</span></small></span><br/>'+
            '<input id="nombre_config_mapa_nucleo_'+k+'" type="text" class="form-control" maxlength="500" value="" placeholder="Ingrese nombre, ejemplo: Autonomía"/>'+
            '<span><small><span id="span_txt_color_config_mapa_nucleo_'+k+'">'+glscabColor_config_mapa_color_nucleo+'</span></small></span><br/>'+
            '<input id="text_color_cofig_mapa_nucleo_'+k+'" type="text" class="form-control color-input" maxlength="20" value=""  data-huebee />'+

            '<span><small><span id="span_txt_desc_config_mapa_nucleo_'+k+'">'+glscabDesc_config_mapa_nucleo+'</span></small></span><br/>'+
            '<div id="descrip_config_mapa_nucleo_'+k+'" class="summernote"></div>'+
                        
            '</div>'+

            '<br/>'+ 

            '<div style="padding-top:10px;">'+
            '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="CancelarConfigMapaNucleoNuevo();"><i class="fa fa-trash-o"></i> '+glsbtn_cancelar_nucleo+'</button>&nbsp;'+
            '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarConfigMapaNucleoNuevo();"><i class="fa fa-save"></i> '+glsbtn_guardar_nucleo+'</button>&nbsp;'+
            '</div>'+

            '</div>'+

            '</div>';
    document.getElementById("div_listado_nucleos_panel_control").innerHTML =salida;
    $(document).ready(function() {
        $('.color-input').each( function( i, elem ) {
          var hueb = new Huebee( elem, {
            customColors: [ '#D54B13', '#E2834E', '#F0B995', '#F8DDC9', 
                            '#F19300', '#F8C073', '#FCE0BA', 
                            '#BCBA00', '#D6D377', '#E4E2A8', '#F1F0D3' ]
          });
        });    
    
        $('#descrip_config_mapa_nucleo_new').summernote({
            lang: 'es-ES', // default: 'en-US'
            height: 90,   //set editable area's height
            codemirror: { // codemirror options
                theme: 'monokai'
            },
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['codeview',['codeview']],
                ['fontname',['fontname']]
            ]
        });
    });
}
function GuardarConfigMapaNucleoNuevo(){
    var nombre_nucleo=document.getElementById("nombre_config_mapa_nucleo_new").value;
    var color_nucleo=document.getElementById("text_color_cofig_mapa_nucleo_new").value;
    var desc_nucleo=$('#descrip_config_mapa_nucleo_new').summernote('code');
    
    if(EliminaEspacios(nombre_nucleo)=="" || EliminaEspacios(color_nucleo)=="" || EliminaEspacios(desc_nucleo)==""){
        MensajeFormatoVariable("Para crear un nuevo núcleo debe ingresar nombre, descripción y color.","info","center");
    }
    else{
        //$('#descrip_config_mapa_nucleo_new').summernote('destroy');
        document.getElementById("nucleo_nombre").value=nombre_nucleo;
        document.getElementById("nucleo_descr").value=desc_nucleo;
        document.getElementById("nucleo_color").value=color_nucleo;
        FxOperaciones(32);
    }    
}
function CancelarConfigMapaNucleoNuevo(){
    document.getElementById("div_listado_nucleos_panel_control").innerHTML ="";
}
function CancelarConfigMapa_Nucleo(){
    document.getElementById("div_seccion_general_mapa").style.display="none";
    document.getElementById("div_seccion_ambito_mapa").style.display="block";
    document.getElementById("div_seccion_nucleo_mapa").style.display="none";
    document.getElementById("div_seccion_mapa").style.display="none";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";  
    
    document.getElementById("div_listado_nucleos_configurados").innerHTML="";
    document.getElementById("div_listado_nucleos_panel_control").innerHTML ="";
    document.getElementById("div_descripcion_ambito_padre").innerHTML ="";
}
function EliminarConfigMapaNucleo(id_config,id_ambito,id_nucleo,index){
   MensajeWARNING("¿Confirma la eliminación del núcleo seleccionado del mapa de progreso en edición?. Considere que se eliminarán los ejes e indicadores de desempeño asociados a este. ","EliminarConfigMapaNucleo_("+id_config+","+id_ambito+","+id_nucleo+","+index+");");    
}
function EliminarConfigMapaNucleo_(id_config,id_ambito,id_nucleo,index){
    document.getElementById("id_configuracion_mapa_selected").value=id_config;
    document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
    document.getElementById("id_configuracion_nucleo_selected").value=id_nucleo;
    FxOperaciones(33);
}
function GuardarConfigMapaNucleo(id_config,id_ambito,id_nucleo,index){
    var nombre_nucleo=document.getElementById("nombre_config_mapa_nucleo_"+index).value;
    var color_nucleo=document.getElementById("text_color_cofig_mapa_nucleo_"+index).value;
    var desc_nucleo=$('#descrip_config_mapa_nucleo_'+index).summernote('code');
    
    if(EliminaEspacios(nombre_nucleo)=="" || EliminaEspacios(color_nucleo)=="" || EliminaEspacios(desc_nucleo)==""){
        MensajeFormatoVariable("Para actualizar un núcleo debe ingresar nombre, descripción y color.","info","center");
    }
    else{
        //$('#descrip_config_mapa_nucleo_'+index).summernote('destroy');
        document.getElementById("nucleo_nombre").value=nombre_nucleo;
        document.getElementById("nucleo_descr").value=desc_nucleo;
        document.getElementById("nucleo_color").value=color_nucleo;
        
        document.getElementById("id_configuracion_mapa_selected").value=id_config;
        document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
        document.getElementById("id_configuracion_nucleo_selected").value=id_nucleo;
        FxOperaciones(34);
    }  
}

//MAPAS(EJES)
function EditarConfigMapaNucleo(id_config,id_ambito,id_nucleo,index){
    document.getElementById("div_seccion_general_mapa").style.display="none";
    document.getElementById("div_seccion_ambito_mapa").style.display="none";
    document.getElementById("div_seccion_nucleo_mapa").style.display="none";
    document.getElementById("div_seccion_mapa").style.display="block";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";
    
    document.getElementById("id_configuracion_mapa_selected").value =id_config;
    document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
    document.getElementById("id_configuracion_nucleo_selected").value=id_nucleo;
    
    document.getElementById("div_descripcion_nucleo_padre").innerHTML= "<span style='color:#68A84B;'>MAPAS DE NÚCLEO <b>"+$("#nombre_config_mapa_nucleo_"+index).val().toUpperCase()+"</b></span>";
    document.getElementById("div_listado_mapa_panel_control").innerHTML ="";
    FxOperaciones(17);
}
function CancelarConfigMapa_MapaEje(){
    document.getElementById("div_seccion_general_mapa").style.display="none";
    document.getElementById("div_seccion_ambito_mapa").style.display="none";
    document.getElementById("div_seccion_nucleo_mapa").style.display="block";
    document.getElementById("div_seccion_mapa").style.display="none";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";  
    
    document.getElementById("div_listado_mapa_configurados").innerHTML="";
    document.getElementById("div_listado_mapa_panel_control").innerHTML ="";
    document.getElementById("div_descripcion_nucleo_padre").innerHTML ="";
}
function CrearConfigMapa_MapaEjeNuevo(){
    var id_mapa="";
    var id_nucleo="";
    var id_ambito="";
    var id_config="";
    var nom_mapa="REGISTRO DE MAPA / EJE NUEVO";
    var desc_mapa="";
    var desc_code2_country="";
    var color_mapa="#68A84B";
    var estado_uso_config_mapa_="";
    var uso_config_mapa_="";
    var k="new";
    var salida="";

    salida = salida + 
    '<div style="border:1px solid '+color_mapa+';margin-bottom:5px;">'+

    '<div id="divcab_config_mapa_eje_'+k+'" style="cursor:pointer;background:'+color_mapa+';color:#FFF;width:100%;height:25px;">'+
    '<p id="cab_nom_eje_'+k+'" class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_ambito_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;font-weight:bold;"/>'+nom_mapa.toUpperCase()+'</p>'+
    '</div>'+    

    '<div id="div_config_config_mapa_eje_'+k+'" style="display:;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:10px;">'+        

    '<div class="checkbox" style="margin-left:-5px;">'+
    '<span id="span_txt_glosa_estado_config_mapa_nom_eje_'+k+'">'+estado_uso_config_mapa_+'</span>'+
    '<input id="estado_config_mapa_nom_eje_'+k+'" type="hidden" value="'+uso_config_mapa_+'"/>'+
    '</div>'+

    '<div>'+ 
    '<span><small><span id="span_txt_desc_config_mapa_eje_'+k+'">'+glscabNom_config_mapa_eje+'</span></small></span><br/>'+
    '<input id="nombre_config_mapa_eje_'+k+'" type="text" class="form-control" maxlength="500" value="" placeholder="Ingrese nombre, ejemplo: Motricidad"/>'+
    '<span><small><span id="span_txt_color_config_mapa_eje_'+k+'">'+glscabColor_config_mapa_color_eje+'</span></small></span><br/>'+
    '<input id="text_color_cofig_mapa_eje_'+k+'" type="text" class="form-control color-input" maxlength="20" value=""  data-huebee />'+

    '<span><small><span id="span_txt_desc_config_mapa_eje_'+k+'">'+glscabDesc_config_mapa_eje+'</span></small></span><br/>'+
    '<div id="descrip_config_mapa_eje_'+k+'" class="summernote"></div>'+

    '</div>'+ 

    '<br/>'+ 

    '<div style="padding-top:10px;">'+ 
    '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="CancelarConfigMapaEjeNuevo();"><i class="fa fa-trash-o"></i> '+glsbtn_cancelar_eje+'</button>&nbsp;'+
    '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="CrearConfigMapaEjeNuevo();"><i class="fa fa-save"></i> '+glsbtn_guardar_eje+'</button>&nbsp;'+
    '</div>'+

    '</div>'+

    '</div>';
                
    document.getElementById("div_listado_mapa_panel_control").innerHTML = salida;
    $('.color-input').each( function( i, elem ) {
      var hueb = new Huebee( elem, {
        customColors: [ '#D54B13', '#E2834E', '#F0B995', '#F8DDC9', 
                        '#F19300', '#F8C073', '#FCE0BA', 
                        '#BCBA00', '#D6D377', '#E4E2A8', '#F1F0D3' ]
      });
    });  
    $("#descrip_config_mapa_eje_"+k).summernote({
        lang: 'es-ES', // default: 'en-US'
        height: 110,   //set editable area's height
        codemirror: { // codemirror options
            theme: 'monokai'
        },
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['codeview',['codeview']],
            ['fontname',['fontname']]
        ]
    });
}
function CancelarConfigMapaEjeNuevo(){
    document.getElementById("div_listado_mapa_panel_control").innerHTML = "";
}
function CrearConfigMapaEjeNuevo(){ 
    var nombre_eje=document.getElementById("nombre_config_mapa_eje_new").value;
    var color_eje=document.getElementById("text_color_cofig_mapa_eje_new").value;
    var desc_eje=$('#descrip_config_mapa_eje_new').summernote('code');
    
    if(EliminaEspacios(nombre_eje)=="" || EliminaEspacios(color_eje)=="" || EliminaEspacios(desc_eje)==""){
        MensajeFormatoVariable("Para crear un nuevo mapa/eje debe ingresar nombre, descripción y color.","info","center");
    }
    else{
        //$('#descrip_config_mapa_nucleo_new').summernote('destroy');
        document.getElementById("mapaeje_nombre").value=nombre_eje;  
        document.getElementById("mapaeje_descr").value=desc_eje;
        document.getElementById("mapaeje_color").value=color_eje;
        FxOperaciones(35);
    }       
}
var totalConfigBaseMapasEjesEnpantalla=0;
function CargaMapasPorNucleoMapaProgreso(JSONStringMapasEjes){
    var id_mapa="";
    var id_nucleo="";
    var id_ambito="";
    var id_config="";
    var nom_mapa="";
    var desc_mapa="";
    var desc_code2_country="";
    var color_mapa="";
    var estado_uso_config_mapa_="";
    var uso_config_mapa_="";
    
    var salida="";
        
    if(JSONStringMapasEjes!=""){
    	var jsonObj = JSON.parse(JSONStringMapasEjes);
		var arrConfigMapas = jsonObj.listado;    

        totalConfigBaseMapasEjesEnpantalla=arrConfigMapas.length-1;//indices desde 0 a n-1
        
        if(jsonObj.cantidad=="0"){         
            totalConfigBaseMapasEjesEnpantalla=0;
            document.getElementById("div_listado_mapa_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseMapasEjes+"</span></div>";            
        }
        else{
            for(var k=0;k<=arrConfigMapas.length-1;k++){
                id_mapa=arrConfigMapas[k][0];
                id_nucleo=arrConfigMapas[k][1];
                id_ambito=arrConfigMapas[k][2];
                id_config=arrConfigMapas[k][3];
                nom_mapa=arrConfigMapas[k][4];
                desc_mapa=arrConfigMapas[k][5];
                desc_code2_country=arrConfigMapas[k][6];
                color_mapa=arrConfigMapas[k][7];
                
                salida = salida + 
                '<div style="border:1px solid '+color_mapa+';margin-bottom:5px;">'+
                    
                '<div id="divcab_config_mapa_eje_'+k+'" style="cursor:pointer;background:'+color_mapa+';color:#000;width:100%;height:25px;" onclick="ViewHide('+k+',5);">'+
                '<p id="cab_nom_eje_'+k+'" class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_ambito_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;font-weight:bold;"/>'+nom_mapa.toUpperCase()+'</p>'+
                '</div>'+    

                '<div id="div_config_config_mapa_eje_'+k+'" style="display:none;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:10px;">'+        

                '<div class="checkbox" style="margin-left:-5px;">'+
                '<span id="span_txt_glosa_estado_config_mapa_nom_eje_'+k+'">'+estado_uso_config_mapa_+'</span>'+
                '<input id="estado_config_mapa_nom_eje_'+k+'" type="hidden" value="'+uso_config_mapa_+'"/>'+
                '</div>'+
                    
                '<div>'+ 
                '<span><small><span id="span_txt_desc_config_mapa_eje_'+k+'">'+glscabNom_config_mapa_eje+'</span></small></span><br/>'+
                '<input id="nombre_config_mapa_eje_'+k+'" type="text" class="form-control" maxlength="500" value="'+nom_mapa+'" placeholder="Ingrese nombre, ejemplo: Motricidad"/>'+
                '<span><small><span id="span_txt_color_config_mapa_eje_'+k+'">'+glscabColor_config_mapa_color_eje+'</span></small></span><br/>'+
                '<input id="text_color_cofig_mapa_eje_'+k+'" type="text" class="form-control color-input" maxlength="20" value="'+color_mapa+'"  data-huebee />'+

                '<span><small><span id="span_txt_desc_config_mapa_eje_'+k+'">'+glscabDesc_config_mapa_eje+'</span></small></span><br/>'+
                '<div id="descrip_config_mapa_eje_'+k+'" class="summernote">'+desc_mapa+'</div>'+
                    
                '</div>'+
                    
                '<br/>'+ 
                    
                '<div style="padding-top:10px;">'+ 
                '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="EliminarConfigMapaEje('+id_config+','+id_ambito+','+id_nucleo+','+id_mapa+','+k+');"><i class="fa fa-trash-o"></i> '+glsbtn_eliminar_eje+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarConfigMapaEje('+id_config+','+id_ambito+','+id_nucleo+','+id_mapa+','+k+');"><i class="fa fa-save"></i> '+glsbtn_guardar_eje+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="EditarConfigMapaEje(' +id_config+','+id_ambito+','+id_nucleo+','+id_mapa+','+k+');"><i class="fa fa-edit"></i> '+glsbtn_editar_eje+'</button>&nbsp;'+
                '</div>'+
                    
                '</div>'+
                
                '</div>';
                
            }
            document.getElementById("div_listado_mapa_configurados").innerHTML = salida;
            $('.color-input').each( function( i, elem ) {
              var hueb = new Huebee( elem, {
                customColors: [ '#D54B13', '#E2834E', '#F0B995', '#F8DDC9', 
                                '#F19300', '#F8C073', '#FCE0BA', 
                                '#BCBA00', '#D6D377', '#E4E2A8', '#F1F0D3' ]
              });
            });        
            for(var k=0;k<=arrConfigMapas.length-1;k++){
                document.getElementById("cab_nom_eje_"+k).style.color = document.getElementById("text_color_cofig_mapa_eje_"+k).style.color;
                $("#descrip_config_mapa_eje_"+k).summernote({
                    lang: 'es-ES', // default: 'en-US'
                    height: 110,   //set editable area's height
                    codemirror: { // codemirror options
                        theme: 'monokai'
                    },
                    toolbar: [
                        // [groupName, [list of button]]
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['codeview',['codeview']],
                        ['fontname',['fontname']]
                    ]
                });
            }
        }
    }
    else{
        document.getElementById("div_listado_mapa_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseMapasEjes+"</span></div>";            
    }   
}
function EliminarConfigMapaEje(id_config,id_ambito,id_nucleo,id_mapa,index){
   MensajeWARNING("¿Confirma la eliminación del mapa/eje seleccionado perteneciente al mapa de progreso en edición?. Considere que se eliminarán todos indicadores de desempeño asociados a este. ","EliminarConfigMapaEje_("+id_config+","+id_ambito+","+id_nucleo+","+id_mapa+","+index+");");        
}
function EliminarConfigMapaEje_(id_config,id_ambito,id_nucleo,id_mapa,index){
    document.getElementById("id_configuracion_mapa_selected").value=id_config;
    document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
    document.getElementById("id_configuracion_nucleo_selected").value=id_nucleo;
    document.getElementById("id_configuracion_mapaeje_selected").value=id_mapa;
    FxOperaciones(36);    
}
function GuardarConfigMapaEje(id_config,id_ambito,id_nucleo,id_mapa,index){
    var nombre_eje=document.getElementById("nombre_config_mapa_eje_"+index).value;
    var color_eje=document.getElementById("text_color_cofig_mapa_eje_"+index).value;
    var desc_eje=$("#descrip_config_mapa_eje_"+index).summernote('code');
    
    if(EliminaEspacios(nombre_eje)=="" || EliminaEspacios(color_eje)=="" || EliminaEspacios(desc_eje)==""){
        MensajeFormatoVariable("Para actualizar un mapa/eje debe ingresar nombre, descripción y color.","info","center");
    }
    else{
        //$('#descrip_config_mapa_nucleo_new').summernote('destroy');
        document.getElementById("mapaeje_nombre").value=nombre_eje;  
        document.getElementById("mapaeje_descr").value=desc_eje;
        document.getElementById("mapaeje_color").value=color_eje;

        document.getElementById("id_configuracion_mapa_selected").value=id_config;
        document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
        document.getElementById("id_configuracion_nucleo_selected").value=id_nucleo;
        document.getElementById("id_configuracion_mapaeje_selected").value=id_mapa;
        FxOperaciones(37);
    }     
}

//INDICADOR DESEMPEÑO
function EditarConfigMapaEje(id_config,id_ambito,id_nucleo,id_mapa,index){
    document.getElementById("div_seccion_general_mapa").style.display="none";
    document.getElementById("div_seccion_ambito_mapa").style.display="none";
    document.getElementById("div_seccion_nucleo_mapa").style.display="none";
    document.getElementById("div_seccion_mapa").style.display="none";
    document.getElementById("div_seccion_indicador_mapa").style.display="block";
    
    document.getElementById("id_configuracion_mapa_selected").value =id_config;
    document.getElementById("id_configuracion_ambito_selected").value=id_ambito;
    document.getElementById("id_configuracion_nucleo_selected").value=id_nucleo;
    document.getElementById("id_configuracion_mapaeje_selected").value=id_mapa;
    
    document.getElementById("div_descripcion_mapa_padre").innerHTML= "<span style='color:#68A84B;'>INDICADORES DE DESEMPEÑO DE MAPA <b>"+$("#nombre_config_mapa_eje_"+index).val().toUpperCase()+"</b></span>";
    document.getElementById("div_listado_indicadores_panel_control").innerHTML ="";
    document.getElementById("div_nuevo_grupo_indicadores_xrango_nivel_").style.display="none";
    FxOperaciones(39);
    FxOperaciones(38);
    FxOperaciones(18);
}
function CancelarConfigMapa_indicador(){
    document.getElementById("div_seccion_general_mapa").style.display="none";
    document.getElementById("div_seccion_ambito_mapa").style.display="none";
    document.getElementById("div_seccion_nucleo_mapa").style.display="none";
    document.getElementById("div_seccion_mapa").style.display="block";
    document.getElementById("div_seccion_indicador_mapa").style.display="none";
    
    document.getElementById("div_descripcion_mapa_padre").innerHTML= "";
    document.getElementById("div_listado_indicadores_panel_control").innerHTML ="";
    document.getElementById("div_listado_indicadores_configurados").innerHTML ="";
    document.getElementById("div_nuevo_grupo_indicadores_xrango_nivel_").style.display="none";
} 
function CrearConfigMapa_GrupoIndicadorNuevo(){
    document.getElementById("div_nuevo_grupo_indicadores_xrango_nivel_").style.display="block";
    
    $("#desc_logro_aprendizaje_new").summernote({
        lang: 'es-ES', // default: 'en-US'
        height: 110,   //set editable area's height
        codemirror: { // codemirror options
            theme: 'monokai'
        },
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['codeview',['codeview']],
            ['fontname',['fontname']]
        ]
    });
    document.getElementById("div_tabla_indicadores_xrango_new").innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tabla_indicadores_xrango_new" style="margin-left:-5px;">'+
    '<thead><tr><th>Descripción</th><th style="width:32px;"></th><th style="width:300px;">Tipo inteligencia</th><th style="width:32px;"></th></tr></thead>'+
    '<tbody></tbody>'+
    '</table>';
    document.getElementById("span_txt_cantidad_indicadores_Xrangos_x_new").innerHTML="0 indicadores de desempeño";
    
}
function CargaTiposInteligencias(JSONStringTiposInteligencias){
    var totalTipos=0;
    var salida="<option value='0' data-img='images/selinteligencia2.png'>Seleccione un tipo de inteligencia</option>";
    var desc_tipo;
    var img_tipo;
    var id_tipo;
    
    if(JSONStringTiposInteligencias!=""){
    	var jsonObj = JSON.parse(JSONStringTiposInteligencias);
		var arrConfigTiposInteligencias = jsonObj.listado;    

        totalTipos=arrConfigTiposInteligencias.length-1;//indices desde 0 a n-1
        
        if(jsonObj.cantidad=="0"){         
            MensajeFormatoVariable("No existen tipos de inteligencias cargadas en el sistema.","info","center");
        }
        else{
            for(var k=0;k<=arrConfigTiposInteligencias.length-1;k++){
                id_tipo=arrConfigTiposInteligencias[k][0];
                desc_tipo=arrConfigTiposInteligencias[k][1];
                img_tipo=arrConfigTiposInteligencias[k][2];
                salida = salida + "<option value='"+id_tipo+"' data-img='"+img_tipo+"'>"+desc_tipo+"</option>";
            }
            document.getElementById("selTiposInteligencias").value= "<select class='form-control m-b' id='[selTipoInteligencia]' style='cursor:pointer;' onchange='CambiaImagenInteligencia(this,[K]);'>"+salida+"</select>";
        }
    }
    else{
        MensajeFormatoVariable("No existen tipos de inteligencias cargadas en el sistema.","info","center");
    }    
}
function CancelarGrupoIndicadorNuevo(){
    document.getElementById("div_nuevo_grupo_indicadores_xrango_nivel_").style.display="none";
    $('#desc_logro_aprendizaje_new').summernote('destroy');
    document.getElementById("desc_logro_aprendizaje_new").innerHTML="";
    document.getElementById("span_txt_cantidad_indicadores_Xrangos_x_new").innerHTML="0 indicadores de desempeño";
    document.getElementById("selNivelLogro_GrupoIndicadoresNew").selectedIndex=0;
}
function CargaComboTramosNivelLogroMapa(JSOStringTramosNivelLogro){
    var totalTramos=0;
    var salida="<option value='0'>Seleccione tramo de edad del Nivel de Logro</option>";
    var id_tramo;
    var desc_tramo;
    
    if(JSOStringTramosNivelLogro!=""){
    	var jsonObj = JSON.parse(JSOStringTramosNivelLogro);
		var arrConfigTramos = jsonObj.listado;    

        totalTramos=arrConfigTramos.length-1;//indices desde 0 a n-1
        
        if(jsonObj.cantidad=="0"){         
            MensajeFormatoVariable("No existen tramos de edad para la configuración de nivel de logro asociada.","info","center");
            document.getElementById("div_nuevo_grupo_indicadores_xrango_nivel_").style.display="none";
        }
        else{
            for(var k=0;k<=arrConfigTramos.length-1;k++){
                id_tramo=arrConfigTramos[k][0];
                desc_tramo=arrConfigTramos[k][3];
                salida = salida + "<option value='"+id_tramo+"'>"+desc_tramo+"</option>";
            }
            document.getElementById("div_selector_rangosNL_new").innerHTML= "<select class='form-control m-b' id='selNivelLogro_GrupoIndicadoresNew' onchange='EvaluaTramosExistentes(this);'>"+salida+"</select>";
            document.getElementById("selTramosNivelLogro").value= "<select class='form-control m-b' id='selNivelLogro_GrupoInd_[K]' onchange='EvaluaTramosExistentes2(this,[K]);'>"+salida+"</select>";
        }
    }
    else{
        MensajeFormatoVariable("No existen tramos de edad para la configuración de nivel de logro asociada.","info","center");
        document.getElementById("div_nuevo_grupo_indicadores_xrango_nivel_").style.display="none";
    }
}
function EvaluaTramosExistentes(objCBMTramoNew){
    var valor = "["+objCBMTramoNew.value+"]";
    var text = objCBMTramoNew.options[objCBMTramoNew.selectedIndex].text;
    var tramosExistentes=document.getElementById("listado_id_tramos_mapa_sel").value;
    if(tramosExistentes.indexOf(valor)!=-1){
        MensajeFormatoVariable("No puede seleccionar este tramo de nivel de logro (<b>"+text+"</b>), porque ya se agregó al mapa seleccionado. Si desea incluir más indicadores a este, edite el existente.","info","center");
        objCBMTramoNew.selectedIndex=0;
    }
}
function EvaluaTramosExistentes2(objCBMTramo,index){
    var valor = "["+objCBMTramo.value+"]";
    var valor_actual = "["+document.getElementById("selector_rangosNL_actual_"+index).value+"]";
    
    var text = objCBMTramo.options[objCBMTramo.selectedIndex].text;
    var tramosExistentes=document.getElementById("listado_id_tramos_mapa_sel").value;
    if(tramosExistentes.indexOf(valor)!=-1 && valor!=valor_actual){
        MensajeFormatoVariable("No puede seleccionar este tramo de nivel de logro (<b>"+text+"</b>), porque ya se agregó al mapa seleccionado. Si desea incluir más indicadores a este, edite el existente.","info","center");
        objCBMTramo.value=document.getElementById("selector_rangosNL_actual_"+index).value;
    }
}
function AgregarGrupoIndicadorNuevo(){
    var table = document.getElementById("tabla_indicadores_xrango_new");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    selTiposInteligencias = document.getElementById("selTiposInteligencias").value;
    selTiposInteligencias= selTiposInteligencias.replace("[selTipoInteligencia]","selTipoInteligencia_"+rowCount);
    selTiposInteligencias= selTiposInteligencias.replace("[K]",rowCount);
    
    cell1.innerHTML='<input id="des_indicador_'+rowCount+'" type="text" class="form-control" maxlength="500" value="" placeholder="Ingrese indicador, ejemplo: Se sienta con apoyo."/>';
    cell2.innerHTML='<img id="img_indicador_'+rowCount+'" src="images/selinteligencia2.png" />';
    cell3.innerHTML=selTiposInteligencias;
    cell4.innerHTML='<i class="fa fa-trash-o operRango3" onclick="EliminaIndicador('+rowCount+');" title="Eliminar"></i>';
    document.getElementById("span_txt_cantidad_indicadores_Xrangos_x_new").innerHTML= rowCount+" indicadores de desempeño";
}
function CambiaImagenInteligencia(objCmb,index){
    var cmb=document.getElementById(objCmb.id);
    document.getElementById("img_indicador_"+index).src= cmb.options[cmb.selectedIndex].dataset.img;
}
function CambiaImagenInteligencia2(objCmb,index, index2){
    var cmb=document.getElementById(objCmb.id);
    document.getElementById("img_indicador_"+index+"_"+index2).src= cmb.options[cmb.selectedIndex].dataset.img;
}
function EliminaIndicador(fila){
    var table = document.getElementById("tabla_indicadores_xrango_new");
    var rowCount = table.rows.length;
    var desc_indicador="";
    var imgIntell_indicador="";
    var selIntell_indicador=0;
    var filasremanenetes="";
    var selTiposInteligencias="";
    var strEvalSeltiposIntell="";
    var pos=1;
    for(var k=1;k<=rowCount-1;k++){
        var row = table.rows[k];
        if(k != fila){
            selTiposInteligencias = document.getElementById("selTiposInteligencias").value;
            selTiposInteligencias= selTiposInteligencias.replace("[selTipoInteligencia]","selTipoInteligencia_"+pos.toString());
            selTiposInteligencias= selTiposInteligencias.replace("[K]",pos.toString());
            
            filasremanenetes= filasremanenetes + 
                                '<tr>'+
                                '<td><input id="des_indicador_'+pos.toString()+'" type="text" class="form-control" maxlength="500" value="'+row.cells[0].childNodes[0].value+'" placeholder="Ingrese indicador, ejemplo: Se sienta con apoyo."/></td>'+
                                '<td><img id="img_indicador_'+pos.toString()+'" src="'+row.cells[1].childNodes[0].src+'" /></td>'+
                                '<td>'+selTiposInteligencias+'</td>'+
                                '<td><i class="fa fa-trash-o operRango3" onclick="EliminaIndicador('+pos.toString()+');" title="Eliminar"></i></td>'+
                                '</tr>';
            
            strEvalSeltiposIntell = strEvalSeltiposIntell+ 'document.getElementById("selTipoInteligencia_'+pos.toString()+'").value="'+row.cells[2].childNodes[0].value+'";'
            pos=pos+1;
        }
    }
    document.getElementById("div_tabla_indicadores_xrango_new").innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tabla_indicadores_xrango_new" style="margin-left:-5px;">'+
    '<thead>'+
    '<tr>'+
    '<th>Descripción</th>'+
    '<th style="width:32px;"></th>'+
    '<th style="width:300px;">Tipo inteligencia</th>'+
    '<th style="width:32px;"></th>'+
    '</tr>'+
    '</thead>'+
    '<tbody>'+
    filasremanenetes+
    '</tbody>'+
    '</table>';
    eval(strEvalSeltiposIntell);
    document.getElementById("span_txt_cantidad_indicadores_Xrangos_x_new").innerHTML= (pos-1).toString()+" indicadores de desempeño"; 
}
function GuardarGrupoIndicadorNuevo(){
    var selTramo=$("#selNivelLogro_GrupoIndicadoresNew").val();
    var desLogroAprendizaje=$("#desc_logro_aprendizaje_new").summernote('code');
    var desc_indicador="";
    var src_imgIntell="";
    var sel_valIntell="";
    var jsonListaIndicadores="";
    var bDatosIndicadoresOK=true;
    
    var table = document.getElementById("tabla_indicadores_xrango_new");
    var rowCount = table.rows.length;
    for(var k=1;k<=rowCount-1;k++){
        var row = table.rows[k];
        desc_indicador=row.cells[0].childNodes[0].value;
        src_imgIntell=row.cells[1].childNodes[0].src;
        sel_valIntell=row.cells[2].childNodes[0].value;

        if(EliminaEspacios(desc_indicador)!="" && sel_valIntell!="0"){
            if(k<(rowCount-1)){
                jsonListaIndicadores=jsonListaIndicadores+'['+
                                                          '"'+replaceAll(desc_indicador,'"','“')+'",'+
                                                          '"'+src_imgIntell+'",'+
                                                          '"'+sel_valIntell+'"'+
                                                          '],';                                 
            }
            else{
                jsonListaIndicadores=jsonListaIndicadores+'['+
                                                          '"'+replaceAll(desc_indicador,'"','“')+'",'+
                                                          '"'+src_imgIntell+'",'+
                                                          '"'+sel_valIntell+'"'+
                                                          ']';
            }             
        }
        else{
            bDatosIndicadoresOK=false;
            break;
        }
    }
    if(EliminaEspacios(jsonListaIndicadores)=="") bDatosIndicadoresOK=false;
    
    if(!bDatosIndicadoresOK || selTramo=="0" || EliminaEspacios(desLogroAprendizaje)==""){
       MensajeFormatoVariable("Para crear una nueva agrupación de indicadores de desempeño debe ingresar:<br/>- tramo de nivel de logro asociado, <br/>- descripción de logro de aprendizaje y <br/>- tabla de indicadores de desempeño completa.","info","left");
    }
    else{
        //alert(EliminaEspacios(desLogroAprendizaje));
        document.getElementById("id_tramo_NL_selected").value=selTramo; 
        document.getElementById("desc_tramo_NL_logro_aprendizaje").value=EliminaEspacios(desLogroAprendizaje);
        document.getElementById("jsonListaIndicadoresNew").value='{"listado":['+jsonListaIndicadores+']}';
        FxOperaciones(40);
    }
}
function GuardarGrupoIndicador(id_rango_nivel_logro,index){
    var selTramo=$("#selNivelLogro_GrupoInd_"+index).val();
    var desLogroAprendizaje=$("#desc_logro_aprendizaje_"+index).summernote('code');
    var desc_indicador="";
    var src_imgIntell="";
    var sel_valIntell="";
    var jsonListaIndicadores="";
    var bDatosIndicadoresOK=true;
    
    var table = document.getElementById("tabla_indicadores_xrango_"+index);
    var rowCount = table.rows.length;
    for(var k=1;k<=rowCount-1;k++){
        var row = table.rows[k];
        id_identificador=row.cells[0].childNodes[0].dataset.idind;
        desc_indicador=row.cells[0].childNodes[0].value;
        src_imgIntell=row.cells[1].childNodes[0].src;
        sel_valIntell=row.cells[2].childNodes[0].value;

        //alert(sel_valIntell+" >>> "+index+" >>> "+id_rango_nivel_logro);
        
        if(EliminaEspacios(desc_indicador)!="" && sel_valIntell!="0"){
            if(k<(rowCount-1)){
                jsonListaIndicadores=jsonListaIndicadores+'['+
                                                          '"'+id_identificador+'",'+  
                                                          '"'+replaceAll(desc_indicador,'"','“')+'",'+
                                                          '"'+src_imgIntell+'",'+
                                                          '"'+sel_valIntell+'"'+
                                                          '],';                                 
            }
            else{
                jsonListaIndicadores=jsonListaIndicadores+'['+
                                                          '"'+id_identificador+'",'+  
                                                          '"'+replaceAll(desc_indicador,'"','“')+'",'+
                                                          '"'+src_imgIntell+'",'+
                                                          '"'+sel_valIntell+'"'+
                                                          ']';
            }             
        }
        else{
            bDatosIndicadoresOK=false;
            break;
        }
    }
    if(EliminaEspacios(jsonListaIndicadores)=="") bDatosIndicadoresOK=false;
    
    if(!bDatosIndicadoresOK || selTramo=="0" || EliminaEspacios(desLogroAprendizaje)==""){
       MensajeFormatoVariable("Para actualizar una agrupación de indicadores de desempeño debe ingresar:<br/>- tramo de nivel de logro asociado, <br/>- descripción de logro de aprendizaje y <br/>- tabla de indicadores de desempeño completa.","info","left");
    }
    else{
        document.getElementById("id_tramo_NL_selected").value=selTramo; 
        document.getElementById("desc_tramo_NL_logro_aprendizaje").value=EliminaEspacios(desLogroAprendizaje);
        document.getElementById("jsonListaIndicadoresNew").value='{"listado":['+jsonListaIndicadores+']}';
        document.getElementById("id_configuracion_tramo_indicador_selected").value=id_rango_nivel_logro;
        FxOperaciones(42);
    }
}
function CargaIndicadoresPorMapaSeleccionado(JSONStringIndicadores){
    var salida="";
    var k=0;
    var cant_indicadores_tramo=0;
    var desc_tramo="";
    var id_rango_nivel_logro_tramo=0;
    var desc_logro_aprendizaje="";
    var seltramos="";
    var fila_indicadores="";
    var evalSelectTramos="";
    var selTiposInteligencias="";
    var pos=1;
    var id_rango_nivel_logro_;
    var id_indicador_;
    var id_tipointeligencia_;
    var descripcion_indicador_;
    var img_tipointeligencia_;
    var evalSeltiposIntell="";
    var bExecuteEvalSelect=false;
    var listado_id_tramos="";
    
    if(JSONStringIndicadores==""){
        
        salida = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseMapasIndicadores+"</span></div>";
    }
    else{
    	var jsonObj = JSON.parse(JSONStringIndicadores);
		var arrConfigTramos = jsonObj.listado_tramos;   
        var cantidad_tramos = jsonObj.cantidad_tramos;
        if(cantidad_tramos=="0"){
            salida = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenConfigBaseMapasIndicadores+"</span></div>";            
        }
        else{
            for(k=0;k<=arrConfigTramos.length-1;k++){
                desc_tramo=arrConfigTramos[k][0];
                id_rango_nivel_logro_tramo=arrConfigTramos[k][1];
                desc_logro_aprendizaje=arrConfigTramos[k][2];
                seltramos=document.getElementById("selTramosNivelLogro").value;
                
                listado_id_tramos=listado_id_tramos+"["+id_rango_nivel_logro_tramo+"]";
                    
                evalSelectTramos=evalSelectTramos+'document.getElementById("selNivelLogro_GrupoInd_'+k.toString()+'").value="'+id_rango_nivel_logro_tramo+'";'
                fila_indicadores="";
                pos=1;
                
                var arrConfigIndicadores = jsonObj.listado_indicadores;   
                for(n=0;n<=arrConfigIndicadores.length-1;n++){
   
                    id_rango_nivel_logro_=arrConfigIndicadores[n][0];
                    id_indicador_=arrConfigIndicadores[n][1];
                    id_tipointeligencia_=arrConfigIndicadores[n][2];
                    descripcion_indicador_=arrConfigIndicadores[n][3];
                    img_tipointeligencia_=arrConfigIndicadores[n][4];

                    if(id_rango_nivel_logro_ == id_rango_nivel_logro_tramo){
                        
                        selTiposInteligencias = document.getElementById("selTiposInteligencias").value;
                        selTiposInteligencias= selTiposInteligencias.replace("[selTipoInteligencia]","selTipoInteligencia_"+k.toString()+"_"+pos.toString());
                        selTiposInteligencias= selTiposInteligencias.replace("CambiaImagenInteligencia(","CambiaImagenInteligencia2(");
                        selTiposInteligencias= selTiposInteligencias.replace("[K]",+k.toString()+","+pos.toString());
            
                        
                        fila_indicadores= fila_indicadores + 
                                            '<tr>'+
                                            '<td><input id="des_indicador_'+k.toString()+"_"+pos.toString()+'" type="text" class="form-control" maxlength="500" value="'+descripcion_indicador_+'" placeholder="Ingrese indicador, ejemplo: Se sienta con apoyo." data-idind="'+id_indicador_+'"/></td>'+
                                            '<td><img id="img_indicador_'+k.toString()+"_"+pos.toString()+'" src="'+img_tipointeligencia_+'" /></td>'+
                                            '<td>'+selTiposInteligencias+'</td>'+
                                            '<td><i class="fa fa-trash-o operRango3" onclick="EliminaIndicador2('+k.toString()+','+pos.toString()+');" title="Eliminar"></i></td>'+
                                            '</tr>';

                        evalSeltiposIntell = evalSeltiposIntell+ 'document.getElementById("selTipoInteligencia_'+k.toString()+'_'+pos.toString()+'").value="'+id_tipointeligencia_+'";';
                        pos=pos+1;
                        bExecuteEvalSelect=true;
                    }                    
                }
                
                salida =salida+
                    '<div style="border:1px solid #68A84B;margin-bottom:5px;">'+
                        '<div style="cursor:pointer;background:#68A84B;color:#fff;width:100%;height:25px;" onclick="ViewHide('+k+',6);"><p class="cabtextpanel"><img src="images/lineleft.png" class="middle"/><img id="imgConfig_" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;"/><span id="span_txt_cab_grupo_indicadores_xrango">'+desc_tramo+'</span></p></div>'+
                        '<div id="div_config_config_mapa_IND_'+k+'" style="display:none;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">'+

                            '<div>'+ 
                            '<span><small><span id="span_txt_sel_rango_xnivel_logro_new">Tramo de nivel de logro</span></small></span><br/>'+
                            '<div id="div_selector_rangosNL_'+k+'">'+replaceAll(seltramos,"[K]",k.toString())+'</div>'+
                            '<input type="hidden" id="selector_rangosNL_actual_'+k+'" value="'+id_rango_nivel_logro_tramo+'">'+
                            '</div>'+
                            '<br/>'+

                            '<div>'+ 
                            '<span><small><span id="span_txt_desc_nivel_logro_new">Logro de aprendizaje</span></small></span><br/>'+
                            '<div id="desc_logro_aprendizaje_'+k+'" class="summernote">'+desc_logro_aprendizaje+'</div>'+
                            '</div>'+
                            '<br/>'+

                            '<div class="hpanel">'+
                                '<small><span id="span_txt_desc_tbl_indicadores_xrango">Indicadores del rango</span></small>'+
                                '<div class="panel-body" style="border-top:2px solid #68A84B;">'+
                                    '<div class="table-responsive" id="div_tabla_indicadores_xrango_'+k+'" >'+
                                    '<table cellpadding="1" cellspacing="1" class="table" id="tabla_indicadores_xrango_'+k+'" style="margin-left:-5px;">'+
                                        '<thead>'+
                                        '<tr>'+
                                            '<th>Descripción</th>'+
                                            '<th style="width:32px;"></th>'+
                                            '<th style="width:300px;">Tipo inteligencia</th>'+
                                            '<th style="width:32px;"></th>'+
                                        '</tr>'+    
                                        '</thead>'+
                                        '<tbody>'+
                                        fila_indicadores+
                                        '</tbody>'+
                                    '</table>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="panel-footer">'+
                                    '<span id="span_txt_cantidad_indicadores_Xrangos_'+k+'">'+(pos-1).toString()+' indicadores de desempeño</span>'+
                                '</div>'+
                            '</div>'+

                            '<div style="padding-top:10px;">'+
                            '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="CancelarOperGrupoIndicador();"><i class="fa fa-close"></i>&nbsp;<span id="span_txt_btn_cancelar_grp_indicador_xrango_'+k+'">CANCELAR</span></button>&nbsp;'+
                            '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="EliminarGrupoIndicador('+id_rango_nivel_logro_tramo+');"><i class="fa fa-close"></i>&nbsp;<span id="span_txt_btn_eliminar_grp_indicador_xrango_'+k+'">ELIMINAR</span></button>&nbsp;'+
                            '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="AgregarIndicadorGrupo('+k+');"><i class="fa fa-plus"></i>&nbsp;<span id="span_txt_btn_agregar_indicador_xrango_'+k+'">AGREGAR INDICADOR</span></button>&nbsp;'+
                            '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarGrupoIndicador('+id_rango_nivel_logro_tramo+','+k+');"><i class="fa fa-save"></i>&nbsp;<span id="span_txt_btn_guardar_indicador_xrango_'+k+'">GUARDAR CAMBIOS</span></button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'; 
            }   
            
        }
    }
    document.getElementById("div_listado_indicadores_configurados").innerHTML = salida;
    $(".summernote").summernote({
        lang: 'es-ES', // default: 'en-US'
        height: 110,   //set editable area's height
        codemirror: {  // codemirror options
        theme: 'monokai',
        },        
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['codeview',['codeview']],
            ['fontname',['fontname']]
        ]
    });
    if(bExecuteEvalSelect){
        eval(evalSeltiposIntell);
        eval(evalSelectTramos);        
    }
    document.getElementById("listado_id_tramos_mapa_sel").value = listado_id_tramos;
    //alert(document.getElementById("listado_id_tramos_mapa_sel").value);
}
function CancelarOperGrupoIndicador(){
    var id_config=document.getElementById("id_configuracion_mapa_selected").value;
    var id_ambito=document.getElementById("id_configuracion_ambito_selected").value;
    var id_nucleo=document.getElementById("id_configuracion_nucleo_selected").value;
    var id_mapa=document.getElementById("id_configuracion_mapaeje_selected").value;
    var k=0;
    EditarConfigMapaEje(id_config,id_ambito,id_nucleo,id_mapa,k);
}
function EliminarGrupoIndicador(id_rango_nivel_logro_){
    MensajeWARNING("¿Confirma la eliminación del grupo de indicadores de desempeño del mapa de progreso en edición?.","EliminarGrupoIndicador_("+id_rango_nivel_logro_+");");
}
function EliminarGrupoIndicador_(id_rango_nivel_logro_){
    document.getElementById("id_configuracion_tramo_indicador_selected").value=id_rango_nivel_logro_;
    FxOperaciones(41);
}
function AgregarIndicadorGrupo(index){
    
    var table = document.getElementById("tabla_indicadores_xrango_"+index);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    var selTiposInteligencias = document.getElementById("selTiposInteligencias").value;
    selTiposInteligencias= selTiposInteligencias.replace("[selTipoInteligencia]","selTipoInteligencia_"+index.toString()+"_"+rowCount.toString());
    selTiposInteligencias= selTiposInteligencias.replace("CambiaImagenInteligencia(","CambiaImagenInteligencia2(");
    selTiposInteligencias= selTiposInteligencias.replace("[K]",+index.toString()+","+rowCount.toString());
    
    cell1.innerHTML='<input id="des_indicador_'+index+'_'+rowCount+'" type="text" class="form-control" maxlength="500" value="" placeholder="Ingrese indicador, ejemplo: Se sienta con apoyo." data-idind="0"/>';
    cell2.innerHTML='<img id="img_indicador_'+index+'_'+rowCount+'" src="images/selinteligencia2.png" />';
    cell3.innerHTML=selTiposInteligencias;
    cell4.innerHTML='<i class="fa fa-trash-o operRango3" onclick="EliminaIndicador2('+index.toString()+','+rowCount.toString()+');" title="Eliminar"></i>';
    document.getElementById("span_txt_cantidad_indicadores_Xrangos_"+index).innerHTML= rowCount+" indicadores de desempeño";    
}
function EliminaIndicador2(index,fila){
    var table = document.getElementById("tabla_indicadores_xrango_"+index);
    var rowCount = table.rows.length;
    var desc_indicador="";
    var imgIntell_indicador="";
    var selIntell_indicador=0;
    var filasremanentes="";
    var selTiposInteligencias="";
    var strEvalSeltiposIntell="";
    var pos=1;
    for(var k=1;k<=rowCount-1;k++){
        var row = table.rows[k];
        if(k != fila){
            selTiposInteligencias = document.getElementById("selTiposInteligencias").value;
            selTiposInteligencias= selTiposInteligencias.replace("[selTipoInteligencia]","selTipoInteligencia_"+index.toString()+"_"+pos.toString());
            selTiposInteligencias= selTiposInteligencias.replace("CambiaImagenInteligencia(","CambiaImagenInteligencia2(");
            selTiposInteligencias= selTiposInteligencias.replace("[K]",+index.toString()+","+pos.toString());

            filasremanentes= filasremanentes + 
                                '<tr>'+
                                '<td><input id="des_indicador_'+index.toString()+"_"+pos.toString()+'" type="text" class="form-control" maxlength="500" value="'+row.cells[0].childNodes[0].value+'" placeholder="Ingrese indicador, ejemplo: Se sienta con apoyo." data-idind="'+row.cells[0].childNodes[0].dataset.idind+'"/></td>'+
                                '<td><img id="img_indicador_'+index.toString()+"_"+pos.toString()+'" src="'+row.cells[1].childNodes[0].src+'" /></td>'+
                                '<td>'+selTiposInteligencias+'</td>'+
                                '<td><i class="fa fa-trash-o operRango3" onclick="EliminaIndicador2('+index.toString()+','+pos.toString()+');" title="Eliminar"></i></td>'+
                                '</tr>';
            
            strEvalSeltiposIntell = strEvalSeltiposIntell+ 'document.getElementById("selTipoInteligencia_'+index.toString()+'_'+pos.toString()+'").value="'+row.cells[2].childNodes[0].value+'";'
            pos=pos+1;
        }
    }
    document.getElementById("div_tabla_indicadores_xrango_"+index).innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tabla_indicadores_xrango_'+index+'" style="margin-left:-5px;">'+
    '<thead>'+
    '<tr>'+
    '<th>Descripción</th>'+
    '<th style="width:32px;"></th>'+
    '<th style="width:300px;">Tipo inteligencia</th>'+
    '<th style="width:32px;"></th>'+
    '</tr>'+
    '</thead>'+
    '<tbody>'+
    filasremanentes+
    '</tbody>'+
    '</table>';
    eval(strEvalSeltiposIntell);
    document.getElementById("span_txt_cantidad_indicadores_Xrangos_"+index).innerHTML= (pos-1).toString()+" indicadores de desempeño";     
}

//NIVEL LOGRO
function CargaFormularioNivelLogros(){
    //PANEL INICIAL
    document.getElementById("div_panel_inicial").style.display="none";
    //CONFIG MAPA PROGRESO
    ConfiguraSeccionMapaPogresos("none");
    
    //PANEL CABECERA DE MAPA DE PROGRESO GENERAL
    document.getElementById("span_txt_path_modulo_2").innerHTML="Niveles de logro";
    document.getElementById("div_cabecera_modulo_mapa_progreso").style.display="block";
    CancelarNivelLogroNuevo();
    document.getElementById("div_seccion_nivel_logro").style.display="block";
}

function CancelarNivelLogroNuevo(){
    document.getElementById("div_nuevo_grupo_nivel_logro").style.display="none";
}
function NuevoGrupoNivelLogro(){
    var d = new Date();
    //document.getElementById("check_nivel_logro_scope_new").checked = false;
    $('#check_nivel_logro_scope_new').iCheck('uncheck');
    document.getElementById("descrip_cfg_nivel_logro_new").value=""; 
    document.getElementById("text_year_country_origin_nivel_logro").value=""; 
    document.getElementById("text_institucion_origin_nivel_logro").value="";
    
    document.getElementById("text_year_country_origin_nivel_logro").value =  d.getFullYear()+" / "+document.getElementById("pais_x_ip").value;

    document.getElementById("div_tabla_rangos_etarios").innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tbl_tramos_nivel_logro_new">'+
    '<thead>'+
    '<tr>'+
    '<th>Nombre</th>'+
    '<th>Descripción</th>'+
    '<th colspan="3">Rango</th>'+
    '</tr>'+
    '</thead>'+
    '<tbody>'+
    '</tbody>'+
    '</table>';
    document.getElementById("span_txt_cantidad_rangos_x_grupo").innerHTML = "0 tramos de edad";
    
    document.getElementById("div_nuevo_grupo_nivel_logro").style.display="block";
    
    jsonRangeNewAge='{"totalfilas":"0","filas":[]}';
    jsonStringAdd ="";
    JSONObjRangosEtarios = JSON.parse(jsonRangeNewAge);
}
function AgregarRangoNivelLogroNuevo(){
    document.getElementById("nombre_rango_nivel_logro_").value=""; 
    document.getElementById("descripcion_rango_nivel_logro_").value="";
    
    $("#touchpin001").TouchSpin({verticalbuttons: true});
    $("#touchpin002").TouchSpin({verticalbuttons: true});
    $("#touchpin003").TouchSpin({verticalbuttons: true});
    $("#touchpin004").TouchSpin({verticalbuttons: true});    
    
    document.getElementById("touchpin001").value="0";
    document.getElementById("touchpin002").value="0";
    document.getElementById("touchpin003").value="0";
    document.getElementById("touchpin004").value="0";
    
    
    document.getElementById("div_rango_nuevo").style.display="block";
}
function CancelarRangoNivelLogroNuevo(){
    document.getElementById("div_rango_nuevo").style.display="none";
}
function GuardarRangoNivelLogroNuevo(){
    var nombreRNL=document.getElementById("nombre_rango_nivel_logro_").value;
    var descriRNL=document.getElementById("descripcion_rango_nivel_logro_").value;
    var yearDesde=document.getElementById("touchpin001").value;
    var monthDesde=document.getElementById("touchpin002").value;
    var yearHasta=document.getElementById("touchpin003").value;
    var monthHasta=document.getElementById("touchpin004").value;

    if(EliminaEspacios(yearDesde)=="") yearDesde="0";
    if(EliminaEspacios(yearHasta)=="") yearHasta="0";
    if(EliminaEspacios(monthDesde)=="") monthDesde="0";
    if(EliminaEspacios(monthHasta)=="") monthHasta="0";
    
    document.getElementById("touchpin001").value=yearDesde;
    document.getElementById("touchpin002").value=monthDesde;
    document.getElementById("touchpin003").value=yearHasta;
    document.getElementById("touchpin004").value=monthHasta;
    
    if( EliminaEspacios(nombreRNL)=="" || EliminaEspacios(descriRNL)=="" || (parseInt(yearDesde,10)==0 && parseInt(yearHasta,10)==0 && parseInt(monthDesde,10)==0 && parseInt(monthHasta,10)==0)){
        MensajeFormatoVariable("Para agregar un nuevo rango de edad a la agrupación de nivel de logro, debe ingresar: nombre, descripción y rango válido de edad.","info","center");
        return;
    } 
    //AÑOS DESDE > AÑOS HASTA
    if( parseInt(yearDesde,10)>parseInt(yearHasta,10) ){
        MensajeFormatoVariable("Ingrese un rango válido de edad.","info","center");
        document.getElementById("touchpin001").focus();
        return;    
    }
    //AÑOS DESDE Y AÑOS HASTA IGUAL A CERO, Y MESES DESDE > MESES HASTA
    if(parseInt(yearDesde,10)==0 && parseInt(yearHasta,10)==0 && parseInt(monthDesde,10)>parseInt(monthHasta,10)){
        MensajeFormatoVariable("Ingrese un rango válido de edad.","info","center");
        document.getElementById("touchpin001").focus();
        return;    
    }
    //AÑOS DESDE = AÑOS HASTA , Y MESES DESDE > MESES HASTA
    if(parseInt(yearDesde,10)==parseInt(yearHasta,10) && parseInt(monthDesde,10)>parseInt(monthHasta,10)){
        MensajeFormatoVariable("Ingrese un rango válido de edad.","info","center");
        document.getElementById("touchpin001").focus();
        return;    
    }    
    
    //ALGUNO INDICADOR DE AÑOS != A CERO, Y ALGUN INDICADOR DE MESES >= 12 (en este caso solo puede ser hasta 11 meses) 
    if( (parseInt(yearDesde,10)>0 && parseInt(monthDesde,10)>=12) || (parseInt(yearHasta,10)>0 && parseInt(monthHasta,10)>=12) ){
        MensajeFormatoVariable("Si ingresó una cantidad distinta de cero en los indicadores de año, sólo puede ingresar hasta 11 en los indicadores de meses.","info","center");
        document.getElementById("touchpin001").focus();
        return;    
    }
    
    document.getElementById("touchpin001").value=parseInt(yearDesde,10);
    document.getElementById("touchpin002").value=parseInt(monthDesde,10);
    document.getElementById("touchpin003").value=parseInt(yearHasta,10);
    document.getElementById("touchpin004").value=parseInt(monthHasta,10);
    
    AddRowRango("tbl_tramos_nivel_logro_new", nombreRNL, descriRNL, parseInt(yearDesde,10), parseInt(monthDesde,10), parseInt(yearHasta,10), parseInt(monthHasta,10));
}
function EliminaRangoEdad(index){
    var arrRangos = JSONObjRangosEtarios.filas;
    var indexNew=1;
    var filasTabla="";
    var glsilativoDesde="";
    var glsilativoHasta="";
    var glsrango="";
    var totalrangos=0;
    
    jsonStringAdd = "";
    
    for(var k=0;k<=arrRangos.length-1;k++){
        var rango = JSON.parse(JSON.stringify( arrRangos[k] ));
        //alert(rango.index+" ==> "+index);
        
        if(rango.index != index){
            if(jsonStringAdd=="")
                jsonStringAdd = '{"index":"'+indexNew+'","name":"'+rango.name+'","text":"'+rango.text+'","yearFrom":"'+rango.yearFrom+'","monthFrom":"'+rango.monthFrom+'","yearUntil":"'+rango.yearUntil+'","monthUntil":"'+rango.monthUntil+'","id_nivel_logro_rango":"0"}';
            else
                jsonStringAdd = jsonStringAdd+',{"index":"'+indexNew+'","name":"'+rango.name+'","text":"'+rango.text+'","yearFrom":"'+rango.yearFrom+'","monthFrom":"'+rango.monthFrom+'","yearUntil":"'+rango.yearUntil+'","monthUntil":"'+rango.monthUntil+'","id_nivel_logro_rango":"0"}';
            indexNew=indexNew+1;
        }
    }
    JSONObjRangosEtarios = JSON.parse('{"totalfilas":"'+indexNew+'","filas":['+jsonStringAdd+']}');

    arrRangos = JSONObjRangosEtarios.filas;    
    
    if(jsonStringAdd=="")
        totalrangos="0";
    else
         totalrangos=arrRangos.length;
    
    for(var k=0;k<=arrRangos.length-1;k++){
        //alert(JSON.stringify( arrRangos[k] ));
        var rango = JSON.parse(JSON.stringify( arrRangos[k] ));
        glsrango = glsdesdelos;
        
        if(rango.yearFrom!="0"){
            glsrango= glsrango + rango.yearFrom + glsyearrango;
            glsilativoDesde=glsilativorango;
        }
        if(rango.monthFrom!="0" || rango.yearFrom=="0")
            glsrango= glsrango + glsilativoDesde +rango.monthFrom + glsmonthrango;

        glsrango= glsrango + glshastaLos;

        if(rango.yearUntil!="0"){
            glsrango= glsrango + rango.yearUntil+ glsyearrango;
            glsilativoHasta=glsilativorango;
        }
        if(rango.monthUntil!="0" || rango.yearUntil=="0")
            glsrango= glsrango + glsilativoHasta + rango.monthUntil + glsmonthrango;
         
        filasTabla = filasTabla +
        '<tr>'+
        '<td>'+rango.name+'</td>'+
        '<td>'+rango.text+'</td>'+
        '<td>'+glsrango+'</td>'+
        '<td><i class="fa fa-trash-o operRango1" onclick="EliminaRangoEdad('+rango.index+');"></i></td>'+
        '</tr>';
    }
    //'<td><i class="pe-7s-angle-up-circle operRango1" onclick="SubirPosRango('+rango.index+');" title="subir"></i></td>'+
    //'<td><i class="pe-7s-angle-down-circle operRango1" onclick="bajarPosRango('+rango.index+');" title="bajar"></i></td>'+
   
            
    document.getElementById("div_tabla_rangos_etarios").innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tbl_tramos_nivel_logro_new">'+
    '<thead>'+
    '<tr>'+
    '<th>Nombre</th>'+
    '<th>Descripción</th>'+
    '<th colspan="3">Rango</th>'+
    '</tr>'+
    '</thead>'+
    filasTabla+
    '<tbody>'+
    '</tbody>'+
    '</table>';
    document.getElementById("span_txt_cantidad_rangos_x_grupo").innerHTML = totalrangos+glsCanTramos;
}
function AddRowRango(tableID, nombreRNL, descriRNL, yearDesde, monthDesde, yearHasta, monthHasta) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    //var cell6 = row.insertCell(5);
    //var cell7 = row.insertCell(6);
    var jsonRangeNewLocal="";
    var glsrango=glsdesdelos;
    var glsilativoDesde="";
    var glsilativoHasta="";
    
    if(yearDesde!="0"){
        glsrango= glsrango + yearDesde + glsyearrango;
        glsilativoDesde=glsilativorango;
    }
    if(monthDesde!="0" || yearDesde=="0")
        glsrango= glsrango + glsilativoDesde + monthDesde + glsmonthrango;
        
    glsrango= glsrango + glshastaLos;
    
    if(yearHasta!="0"){
        glsrango= glsrango + yearHasta+ glsyearrango;
        glsilativoHasta=glsilativorango;
    }
    if(monthHasta!="0" || yearHasta=="0")
        glsrango= glsrango + glsilativoHasta + monthHasta + glsmonthrango;
    
    
    
    cell1.innerHTML=nombreRNL;
    cell2.innerHTML=descriRNL;
    cell3.innerHTML=glsrango;
    cell4.innerHTML='<i class="fa fa-trash-o operRango1" onclick="EliminaRangoEdad('+rowCount+');"></i>';
    //cell5.innerHTML='<i class="fa fa-pencil operRango1" onclick="EditaRangoEdad('+rowCount+');"></i>';

    document.getElementById("span_txt_cantidad_rangos_x_grupo").innerHTML = rowCount+glsCanTramos;
    
    if(jsonStringAdd=="")
        jsonStringAdd = '{"index":"'+rowCount+'","name":"'+nombreRNL+'","text":"'+descriRNL+'","yearFrom":"'+yearDesde+'","monthFrom":"'+monthDesde+'","yearUntil":"'+yearHasta+'","monthUntil":"'+monthHasta+'","id_nivel_logro_rango":"0"}';
    else
        jsonStringAdd = jsonStringAdd+',{"index":"'+rowCount+'","name":"'+nombreRNL+'","text":"'+descriRNL+'","yearFrom":"'+yearDesde+'","monthFrom":"'+monthDesde+'","yearUntil":"'+yearHasta+'","monthUntil":"'+monthHasta+'","id_nivel_logro_rango":"0"}';
    
    jsonRangeNewLocal = '{"totalfilas":"'+rowCount+'","filas":['+jsonStringAdd+']}';
    //alert(jsonRangeNewLocal);
    JSONObjRangosEtarios = JSON.parse(jsonRangeNewLocal);
} 
function GuardarConfigNivelLogro(){
    var d = new Date();
    var descrip_cfg_nivel_logro_new = document.getElementById("descrip_cfg_nivel_logro_new").value;
    var b_check_nivel_logro_global=false;
    var strJSONparameter="";
    
    var arrRangos = JSONObjRangosEtarios.filas; 

    if(EliminaEspacios(descrip_cfg_nivel_logro_new)=="" || arrRangos.length == 0){
        MensajeFormatoVariable("Para crear una nueva agrupación de nivel de logro debe indicar una glosa descriptiva y los rangos de edad correspondientes.","info","center");
        return;
    }
    if(document.getElementById("check_nivel_logro_scope_new").checked==true){
        b_check_nivel_logro_global=true;
    }    
    strJSONparameter='{'+
                       '"descrip_cfg_nivel_logro_new":"'+descrip_cfg_nivel_logro_new+'",'+
                       '"b_check_nivel_logro_scope_new":"'+b_check_nivel_logro_global.toString()+'",'+
                       '"alpha_code2_pais_x_ip":"'+document.getElementById("alpha_code2_pais_x_ip").value+'",'+
                       '"year":"'+d.getFullYear().toString()+'",'+
                       '"ranges":['+jsonStringAdd+']'+
                       '}';
    
    JSONObjNivelLogro = JSON.parse(strJSONparameter);
    FxOperaciones(20);
}

var totalNivelLogroenpantalla=0;
function CargaNivelLogroMapas(JSONStringNivelesLogros){

    var id_nivel_logro="";
    var year_nivel_logro="";
    var scope_nivel_logro="";
    var alpha_2_code_pais_nivel_logro="";
    var desc_nivel_logro="";
    var nombrepais_nivel_logro="";
    var bscope_nivel_logro;
    var uso_nivel_logro="";
    var estadoNivelLogro="";
	var salida="";
	
    var glscabDescNivelLogro="Descripción";
	var glscabYearCountryNivelLogro="Año / País";
    var glscabInstitcionNivelLogro="Institución";
        
    var color_nivellogro="#68A84B";
    
    var glsbtn_eliminar="ELIMINAR";
    var glsbtn_agregar="AGREGAR RANGO DE EDAD";
    var glsbtn_guardar="GUARDAR CAMBIOS";
    var glsScopeNivelLogro="USO GLOBAL";
    var glstablarangos="Rangos de edad de nivel de logro";
    var gjsCanTramos=" tramos";
    var gls_EstadoNivelLogroBLK="BLOQUEADO";
    var gls_EstadoNivelLogroEDT="EDITABLE";
    
	if(JSONStringNivelesLogros!=""){
    	var jsonObj = JSON.parse(JSONStringNivelesLogros);
		var arrNivelLogro = jsonObj.listado;    
		totalNivelLogroenpantalla=arrNivelLogro.length-1;//indices desde 0 a n-1
        if(jsonObj.cantidad=="0"){
            
            totalNivelLogroenpantalla=0;
            
            document.getElementById("div_listado_nivel_logros_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenNivelLogros+"</span></div>";
            
        }
        else{
            //div_listado_nivel_logros_configurados
            for(var k=0;k<=arrNivelLogro.length-1;k++){

                id_nivel_logro=arrNivelLogro[k][0];
                year_nivel_logro=arrNivelLogro[k][1];  
                scope_nivel_logro=arrNivelLogro[k][2];
                alpha_2_code_pais_nivel_logro=arrNivelLogro[k][3];
                desc_nivel_logro=arrNivelLogro[k][4];
                nombrepais_nivel_logro=arrNivelLogro[k][5];
                uso_nivel_logro=arrNivelLogro[k][6];

                if(uso_nivel_logro=="0"){
                    estadoNivelLogro='<p class="text-success"><i class="fa fa-unlock"></i>&nbsp;'+gls_EstadoNivelLogroEDT+'</p>';
                }
                else{
                    estadoNivelLogro='<p class="text-danger"><i class="fa fa-lock"></i>&nbsp;'+gls_EstadoNivelLogroBLK+'</p>';
                }
                bscope_nivel_logro="";
                if(scope_nivel_logro=="1"){
                    bscope_nivel_logro=" checked";
                }

                cantidadTramos=0;

                salida=salida+
                '<div style="border:1px solid '+color_nivellogro+';margin-bottom:5px;">'+

                '<div id="divcab_nivellogro_'+k+'" style="cursor:pointer;background:'+color_nivellogro+';color:#FFF;width:100%;height:25px;" onclick="ViewHide('+k+',4);LoadRangos('+id_nivel_logro+','+k+');"><p class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;"/>'+desc_nivel_logro+'</p></div>'+    

                '<div id="div_config_nivellogro_'+k+'" style="display:none;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">'+        

                '<div class="checkbox" style="margin-left:-5px;"><label><input id="check_nivel_logro_scope_'+k+'" '+bscope_nivel_logro+' type="checkbox" class="i-checks" />&nbsp;<span id="span_txt_scope_nivel_logro">'+glsScopeNivelLogro+'</span></label></div><br/>'+
                '<span id="span_txt_glosa_estado_grupo_nivel_de_logro_'+k+'">'+estadoNivelLogro+'</span>'+
                '<input id="estado_nivel_logro_'+k+'" type="hidden" value="'+uso_nivel_logro+'"/>'+
                '<div>'+
                '<span><small><span id="span_txt_desc_nivel_logro_'+k+'">'+glscabDescNivelLogro+'</span></small></span><br/>'+
                '<input id="descrip_cfg_nivel_logro_'+k+'" type="text" class="form-control" value="'+desc_nivel_logro+'" maxlength="500" placeholder="Ingrese descripción, ejemplo: Tramos mapa de progreso Educación Parvularia"/>'+
                '<span><small><span id="span_txt_desc_year_country_origin_'+k+'">'+glscabYearCountryNivelLogro+'</span></small></span><br/>'+
                '<input id="text_year_country_origin_nivel_logro_'+k+'" type="text" class="form-control" value="'+year_nivel_logro +' / '+ nombrepais_nivel_logro+'" readonly />'+
                '<span><small><span id="span_txt_insitucion_origen_nivel_logro_'+k+'">'+glscabInstitcionNivelLogro+'</span></small></span><br/>'+
                '<input id="text_institucion_origin_nivel_logro_'+k+'" type="text" class="form-control" value="" readonly />'+
                '</div>'+
                '<br/>'+ 
                '<div class="hpanel">'+  
                '<small><span id="span_txt_desc_year_country_origin_'+k+'">'+glstablarangos+'</span></small>'+
                '<div class="panel-body">'+
                '<input type="hidden" id="rangos_json_'+k+'" value="" />'+
                '<div class="table-responsive" id="div_tabla_rangos_etarios_'+k+'">'+
                '<table cellpadding="1" cellspacing="1" class="table" id="tbl_tramos_nivel_logro_'+k+'">'+
                '<thead>'+
                '<tr>'+
                '<th>Nombre</th>'+
                '<th>Descripción</th>'+
                '<th colspan="3">Rango</th>'+
                '</tr>'+
                '</thead>'+
                '<tbody></tbody>'+
                '</table>'+
                '</div>'+
                '</div>'+
                '<div class="panel-footer">'+
                '<span id="span_txt_cantidad_rangos_x_grupo_'+k+'">'+cantidadTramos+gjsCanTramos+'</span>'+
                '</div>'+
                '</div>'+

                '<div id="div_panel_rango_'+k+'"></div>'+

                '<div style="padding-top:10px;">'+
                '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="EliminarNivelLogro('+id_nivel_logro+','+k+');"><i class="fa fa-trash-o"></i> '+glsbtn_eliminar+'</button>&nbsp;'+
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="AgregarRangoNivelLogro('+id_nivel_logro+','+k+');"><i class="fa fa-plus"></i> '+glsbtn_agregar+'</button>&nbsp;'+			 
                '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarNivelLogro('+id_nivel_logro+','+k+');"><i class="fa fa-save"></i> '+glsbtn_guardar+'</button>'+
                '</div>'+
                '</div>'+

                '</div>';   
            }
            document.getElementById("div_listado_nivel_logros_configurados").innerHTML = salida;
            $(document).ready(function(){
                $('.i-checks').on('ifChecked ifUnchecked ', function(event){}).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    increaseArea: '20%' // optional
                });
                if(document.getElementById("div_seccion_nivel_logro").className.indexOf("panel-collapse")!=-1){
                    $('#opencloseNL').click();
                }            
            });
        }
	}
	else{
        totalNivelLogroenpantalla=0;
		document.getElementById("div_listado_nivel_logros_configurados").innerHTML = "<div class='text-center'><span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenNivelLogros+"</span></div>";
	}
}

function LoadRangos(id_nivel_logro, indiceGrupo){
    document.getElementById('id_nivel_logro_selected').value=id_nivel_logro;
    document.getElementById('index_nivel_logro_selected').value=indiceGrupo;
    if(document.getElementById("div_config_nivellogro_"+indiceGrupo).style.display!="none"){
        FxOperaciones(21);    
    }    
}
function CargaRangosNivelLogroSeleccionado(JSONStringRangos){
    var indexNew=1;
    var filasTabla="";
    var glsilativoDesde="";
    var glsilativoHasta="";
    var glsrango="";
    var totalrangos=0;
    var strJSON_Rangos="";
    var id_nivel_logro;
    
    var objJSONRangos=JSON.parse(JSONStringRangos);
    var arrRangos=objJSONRangos.listado;
    var id_nivel_logro_indexSel=objJSONRangos.id_nivel_logro_indexSel;
        
    for(var k=0;k<=arrRangos.length-1;k++){
        var rango = arrRangos[k];
        //alert("rango.length="+rango.length);

        if(k==0) id_nivel_logro=rango[7];
        
        if(strJSON_Rangos=="")
            strJSON_Rangos = '{"index":"'+indexNew+'","name":"'+rango[1]+'","text":"'+rango[2]+'","yearFrom":"'+rango[3]+'","monthFrom":"'+rango[4]+'","yearUntil":"'+rango[5]+'","monthUntil":"'+rango[6]+'"," id_nivel_logro_rango":"'+rango[0]+'"}';
        else
            strJSON_Rangos = strJSON_Rangos+',{"index":"'+indexNew+'","name":"'+rango[1]+'","text":"'+rango[2]+'","yearFrom":"'+rango[3]+'","monthFrom":"'+rango[4]+'","yearUntil":"'+rango[5]+'","monthUntil":"'+rango[6]+'","id_nivel_logro_rango":"'+rango[0]+'"}';
        
        if(k!=(arrRangos.length-1)) indexNew=indexNew+1;
    }
    strJSON_Rangos = '{"totalfilas":"'+indexNew+'","filas":['+strJSON_Rangos+']}';

    document.getElementById("rangos_json_"+id_nivel_logro_indexSel).value = strJSON_Rangos;
    
    objJSONRangos=JSON.parse(strJSON_Rangos);
    
    arrRangos = objJSONRangos.filas;    
    
    if(strJSON_Rangos=="")
        totalrangos="0";
    else
         totalrangos=arrRangos.length;
    
    for(var k=0;k<=arrRangos.length-1;k++){
        //alert(JSON.stringify( arrRangos[k] ));
        var rango = JSON.parse(JSON.stringify( arrRangos[k] ));
        glsrango = "Desde los ";
        
        if(rango.yearFrom!="0"){
            glsrango= glsrango + rango.yearFrom + " años";
            glsilativoDesde=" y ";
        }
        if(rango.monthFrom!="0" || rango.yearFrom=="0")
            glsrango= glsrango + glsilativoDesde +rango.monthFrom + " meses";

        glsrango= glsrango + ", hasta los ";

        if(rango.yearUntil!="0"){
            glsrango= glsrango + rango.yearUntil+ " años";
            glsilativoHasta=" y ";
        }
        if(rango.monthUntil!="0" || rango.yearUntil=="0")
            glsrango= glsrango + glsilativoHasta + rango.monthUntil + " meses";
        
        filasTabla = filasTabla +
        '<tr>'+
        '<td>'+rango.name+'</td>'+
        '<td>'+rango.text+'</td>'+
        '<td>'+glsrango+'</td>'+
        '<td><i class="fa fa-trash-o operRango1" onclick="EliminaRangoEdad2('+rango.index+','+id_nivel_logro_indexSel+');" title="Eliminar"></i></td>'+
        '<td><i class="fa fa-pencil operRango2" onclick="EditaRangoEdad2('+rango.index+','+id_nivel_logro_indexSel+','+id_nivel_logro+');" title="Editar"></i></td>'+
        '</tr>';
    }
            
    document.getElementById("div_tabla_rangos_etarios_"+id_nivel_logro_indexSel).innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tbl_tramos_nivel_logro_'+id_nivel_logro_indexSel+'">'+
    '<thead>'+
    '<tr>'+
    '<th>Nombre</th>'+
    '<th>Descripción</th>'+
    '<th colspan="3">Rango</th>'+
    '</tr>'+
    '</thead>'+
    filasTabla+
    '<tbody>'+
    '</tbody>'+
    '</table>';
    document.getElementById("span_txt_cantidad_rangos_x_grupo_"+id_nivel_logro_indexSel).innerHTML = totalrangos+glsCanTramos;    
}

//OPERACIONES DE MANTENCION NIVEL DE LOGRO
function EliminaRangoEdad2(indexFila, indexTablaRangoNL){
    var indexNew=1;
    var filasTabla="";
    var glsilativoDesde="";
    var glsilativoHasta="";
    var glsrango="";
    var totalrangos=0;
    var jsonStringDelete="";
    
    if(document.getElementById("estado_nivel_logro_"+indexTablaRangoNL).value!="0"){
        MensajeFormatoVariable(glsMensajeBloqueo,"info","center");
    }
    else{
        var objJSONDelete = JSON.parse( document.getElementById("rangos_json_"+indexTablaRangoNL).value ); 

        var arrRangos = objJSONDelete.filas;

        for(var k=0;k<=arrRangos.length-1;k++){
            var rango = JSON.parse(JSON.stringify( arrRangos[k] ));        
            if(rango.index != indexFila){
                if(jsonStringDelete=="")
                    jsonStringDelete = '{"index":"'+indexNew+'","name":"'+rango.name+'","text":"'+rango.text+'","yearFrom":"'+rango.yearFrom+'","monthFrom":"'+rango.monthFrom+'","yearUntil":"'+rango.yearUntil+'","monthUntil":"'+rango.monthUntil+'","id_nivel_logro_rango":"'+rango.id_nivel_logro_rango+'"}';
                else
                    jsonStringDelete = jsonStringDelete+',{"index":"'+indexNew+'","name":"'+rango.name+'","text":"'+rango.text+'","yearFrom":"'+rango.yearFrom+'","monthFrom":"'+rango.monthFrom+'","yearUntil":"'+rango.yearUntil+'","monthUntil":"'+rango.monthUntil+'","id_nivel_logro_rango":"'+rango.id_nivel_logro_rango+'"}';
                indexNew=indexNew+1;
            }
        }
        objJSONDelete = JSON.parse('{"totalfilas":"'+indexNew+'","filas":['+jsonStringDelete+']}');

        arrRangos = objJSONDelete.filas;    

        if(jsonStringDelete=="")
            totalrangos="0";
        else
             totalrangos=arrRangos.length;

        for(var k=0;k<=arrRangos.length-1;k++){
            var rango = JSON.parse(JSON.stringify( arrRangos[k] ));
            glsrango = glsdesdelos;

            if(rango.yearFrom!="0"){
                glsrango= glsrango + rango.yearFrom + glsyearrango;
                glsilativoDesde=glsilativorango;
            }
            if(rango.monthFrom!="0" || rango.yearFrom=="0")
                glsrango= glsrango + glsilativoDesde +rango.monthFrom + glsmonthrango;

            glsrango= glsrango + glshastaLos;

            if(rango.yearUntil!="0"){
                glsrango= glsrango + rango.yearUntil+ glsyearrango;
                glsilativoHasta=glsilativorango;
            }
            if(rango.monthUntil!="0" || rango.yearUntil=="0")
                glsrango= glsrango + glsilativoHasta + rango.monthUntil + glsmonthrango;

            
            filasTabla = filasTabla +
            '<tr>'+
            '<td>'+rango.name+'</td>'+
            '<td>'+rango.text+'</td>'+
            '<td>'+glsrango+'</td>'+
            '<td><i class="fa fa-trash-o operRango1" onclick="EliminaRangoEdad2('+rango.index+','+indexTablaRangoNL+');"></i></td>'+
            '<td><i class="fa fa-pencil operRango1" onclick="EditaRangoEdad2('+rango.index+','+indexTablaRangoNL+');"></i></td>'+
            '</tr>';
        }

        document.getElementById("div_tabla_rangos_etarios_"+indexTablaRangoNL).innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tbl_tramos_nivel_logro_'+indexTablaRangoNL+'">'+
        '<thead>'+
        '<tr>'+
        '<th>Nombre</th>'+
        '<th>Descripción</th>'+
        '<th colspan="3">Rango</th>'+
        '</tr>'+
        '</thead>'+
        filasTabla+
        '<tbody>'+
        '</tbody>'+
        '</table>';
        document.getElementById("span_txt_cantidad_rangos_x_grupo_"+indexTablaRangoNL).innerHTML = totalrangos+glsCanTramos;

        document.getElementById("rangos_json_"+indexTablaRangoNL).value = '{"totalfilas":"'+indexNew+'","filas":['+jsonStringDelete+']}';    
    
    }
}
function EditaRangoEdad2(indexFila, indexTablaRangoNL,id_nivel_logro){
    if(document.getElementById("estado_nivel_logro_"+indexTablaRangoNL).value!="0"){
        MensajeFormatoVariable(glsMensajeBloqueo,"info","center");
    }
    else{
        CargaFormRangosxEdicion(indexFila, indexTablaRangoNL, id_nivel_logro);
    }
}
function EliminarNivelLogro(id_nivel_logro, indexNivelLogroPanel){
    if(document.getElementById("estado_nivel_logro_"+indexNivelLogroPanel).value!="0"){
        MensajeFormatoVariable(glsMensajeBloqueo,"info","center");
    }
    else{
        document.getElementById('id_nivel_logro_selected').value=id_nivel_logro;
        MensajeWARNING(glsConfirmaEliminaConfigNivelLogro, "FxOperaciones(22);"); 
    }
}
function AgregarRangoNivelLogro(id_nivel_logro, indexNivelLogroPanel){
    if(document.getElementById("estado_nivel_logro_"+indexNivelLogroPanel).value!="0"){
        MensajeFormatoVariable(glsMensajeBloqueo,"info","center");
    }
    else{
        CargaFormNuevosRangos(id_nivel_logro, indexNivelLogroPanel);
    }
}

var id_nivel_logro_rangoSEL;
function CargaFormRangosxEdicion(indexFila, indexNivelLogroPanel){
    var strJSONrangosSel=document.getElementById("rangos_json_"+indexNivelLogroPanel).value;
    var objJSON_Edicion = JSON.parse(strJSONrangosSel);
    
    document.getElementById("div_panel_rango_"+indexNivelLogroPanel).innerHTML='<div id="div_rango_'+indexNivelLogroPanel+'" class="hpanel hgreen" style="display:;">'+
    '<div class="panel-body" style="background-color:#f8f9f9;">'+
    '<span><small>'+glsSpan_txt_nombrerango_nivel_logro+'</small></span><br/>'+
    '<input id="nombre_rango_nivel_logro_'+indexNivelLogroPanel+'" maxlength="500" type="text" class="form-control" value="" placeholder="'+glsplaceholderNombreTramo+'"/>'+
    '<span><small>'+glsSpan_txt_descrango_nivel_logro+'</small></span><br/>'+
    '<input id="descripcion_rango_nivel_logro_'+indexNivelLogroPanel+'" maxlength="500" type="text" class="form-control" value="" placeholder="'+glsplaceholderDescripTramo+'"/>'+
    '<table>'+ 
    '<tr>'+
    '<td><img src="images/lineleft.png" class="middle"/><H2 class="H1_CSS">'+glsSpan_text_desde_rango+'<H2></td>'+
    '<td>&nbsp;</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_year+'</small>'+
    '<input id="touchpin001_'+indexNivelLogroPanel+'" type="text"  name="touchpin001" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+   
    '</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_month+'</small>'+
    '<input id="touchpin002_'+indexNivelLogroPanel+'" type="text"  name="touchpin002" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+
    '</td>'+
    '</tr>'+
    '<tr><td colspan="2">&nbsp;</td></tr>'+
    '<tr>'+
    '<td><img src="images/lineleft.png" class="middle"/><H2 class="H1_CSS">'+glsSpan_text_hasta_rango+'<H2></td>'+
    '<td>&nbsp;</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_year+'</small>'+
    '<input id="touchpin003_'+indexNivelLogroPanel+'" type="text"  name="touchpin003" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+   
    '</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_month+'</small>'+
    '<input id="touchpin004_'+indexNivelLogroPanel+'" type="text"  name="touchpin004" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+
    '</td>'+
    '</tr>'+
    '</table><br/>'+
    '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="CancelarRangoNivelLogro('+indexNivelLogroPanel+');"><i class="fa fa-close"></i>&nbsp;'+glsSpan_txt_btn_cancelar_rangoedad_nivel_logro+'</button>&nbsp;'+
    '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="ActualizarRangoNivelLogro('+indexFila+','+indexNivelLogroPanel+');"><i class="fa fa-plus"></i>&nbsp;'+glsSpan_txt_btn_editar_rangoedad_nivel_logro+'</button>&nbsp;'+
    '</div>'+
    '</div>';

    $("#touchpin001_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});
    $("#touchpin002_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});
    $("#touchpin003_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});
    $("#touchpin004_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});    
    
    document.getElementById("touchpin001_"+indexNivelLogroPanel).value="0";
    document.getElementById("touchpin002_"+indexNivelLogroPanel).value="0";
    document.getElementById("touchpin003_"+indexNivelLogroPanel).value="0";
    document.getElementById("touchpin004_"+indexNivelLogroPanel).value="0";
    
    var arrFilas = objJSON_Edicion.filas;
    
    for(var k=0;k<=arrFilas.length-1;k++){
        var rango = arrFilas[k];
        if((k+1)==indexFila){
        
            document.getElementById("nombre_rango_nivel_logro_"+indexNivelLogroPanel).value=rango["name"];
            document.getElementById("descripcion_rango_nivel_logro_"+indexNivelLogroPanel).value=rango["text"];
            document.getElementById("touchpin001_"+indexNivelLogroPanel).value=rango["yearFrom"];
            document.getElementById("touchpin002_"+indexNivelLogroPanel).value=rango["monthFrom"];
            document.getElementById("touchpin003_"+indexNivelLogroPanel).value=rango["yearUntil"];
            document.getElementById("touchpin004_"+indexNivelLogroPanel).value=rango["monthUntil"];
            id_nivel_logro_rangoSEL=rango["id_nivel_logro_rango"];
        }
    }
}
function ActualizarRangoNivelLogro(indexfila, indexNivelLogroPanel){
     
    var name_=document.getElementById("nombre_rango_nivel_logro_"+indexNivelLogroPanel).value;
    var text_=document.getElementById("descripcion_rango_nivel_logro_"+indexNivelLogroPanel).value;
    var yearfrom_=document.getElementById("touchpin001_"+indexNivelLogroPanel).value;
    var monthfrom_=document.getElementById("touchpin002_"+indexNivelLogroPanel).value;
    var yearuntil_=document.getElementById("touchpin003_"+indexNivelLogroPanel).value;
    var monthuntil_=document.getElementById("touchpin004_"+indexNivelLogroPanel).value;

    var indexNew=1;
    var filasTabla="";
    var glsilativoDesde="";
    var glsilativoHasta="";
    var glsrango="";
    var totalrangos=0;
    var strJSON_Rangos="";
    var id_nivel_logro;
    
    var JSONStringRangosEdit = document.getElementById("rangos_json_"+indexNivelLogroPanel).value;
    //alert(JSONStringRangosEdit);
    var objJSONRangos=JSON.parse(JSONStringRangosEdit);
    var arrRangos=objJSONRangos.filas;
        
    for(var k=0;k<=arrRangos.length-1;k++){
        var rango = arrRangos[k];
        //alert("rango.length="+rango.length);

        if(k==0) id_nivel_logro=rango[7];
        
        if(strJSON_Rangos==""){
            if(indexfila==indexNew)
                strJSON_Rangos = '{"index":"'+indexNew+'","name":"'+name_+'","text":"'+text_+'","yearFrom":"'+yearfrom_+'","monthFrom":"'+monthfrom_+'","yearUntil":"'+yearuntil_+'","monthUntil":"'+monthuntil_+'","id_nivel_logro_rango":"'+id_nivel_logro_rangoSEL+'"}';
            else
                strJSON_Rangos = '{"index":"'+indexNew+'","name":"'+rango["name"]+'","text":"'+rango["text"]+'","yearFrom":"'+rango["yearFrom"]+'","monthFrom":"'+rango["monthFrom"]+'","yearUntil":"'+rango["yearUntil"]+'","monthUntil":"'+rango["monthUntil"]+'","id_nivel_logro_rango":"'+rango["id_nivel_logro_rango"]+'"}';
        }
        else{
            if(indexfila==indexNew)
                strJSON_Rangos = strJSON_Rangos+',{"index":"'+indexNew+'","name":"'+name_+'","text":"'+text_+'","yearFrom":"'+yearfrom_+'","monthFrom":"'+monthfrom_+'","yearUntil":"'+yearuntil_+'","monthUntil":"'+monthuntil_+'","id_nivel_logro_rango":"'+id_nivel_logro_rangoSEL+'"}';
            else
                strJSON_Rangos = strJSON_Rangos+',{"index":"'+indexNew+'","name":"'+rango["name"]+'","text":"'+rango["text"]+'","yearFrom":"'+rango["yearFrom"]+'","monthFrom":"'+rango["monthFrom"]+'","yearUntil":"'+rango["yearUntil"]+'","monthUntil":"'+rango["monthUntil"]+'","id_nivel_logro_rango":"'+rango["id_nivel_logro_rango"]+'"}';
        }
        
        if(k!=(arrRangos.length-1)) indexNew=indexNew+1;
    }
    strJSON_Rangos = '{"totalfilas":"'+indexNew+'","filas":['+strJSON_Rangos+']}';

    
    
    document.getElementById("rangos_json_"+indexNivelLogroPanel).value = strJSON_Rangos;
    
    objJSONRangos=JSON.parse(strJSON_Rangos);
    
    arrRangos = objJSONRangos.filas;    
    
    if(strJSON_Rangos=="")
        totalrangos="0";
    else
         totalrangos=arrRangos.length;
    
    for(var k=0;k<=arrRangos.length-1;k++){
        //alert(JSON.stringify( arrRangos[k] ));
        var rango = JSON.parse(JSON.stringify( arrRangos[k] ));
        glsrango = "Desde los ";
        
        if(rango.yearFrom!="0"){
            glsrango= glsrango + rango.yearFrom + " años";
            glsilativoDesde=" y ";
        }
        if(rango.monthFrom!="0" || rango.yearFrom=="0")
            glsrango= glsrango + glsilativoDesde +rango.monthFrom + " meses";

        glsrango= glsrango + ", hasta los ";

        if(rango.yearUntil!="0"){
            glsrango= glsrango + rango.yearUntil+ " años";
            glsilativoHasta=" y ";
        }
        if(rango.monthUntil!="0" || rango.yearUntil=="0")
            glsrango= glsrango + glsilativoHasta + rango.monthUntil + " meses";
        
        filasTabla = filasTabla +
        '<tr>'+
        '<td>'+rango.name+'</td>'+
        '<td>'+rango.text+'</td>'+
        '<td>'+glsrango+'</td>'+
        '<td><i class="fa fa-trash-o operRango1" onclick="EliminaRangoEdad2('+rango.index+','+indexNivelLogroPanel+');"></i></td>'+
        '<td><i class="fa fa-pencil operRango1" onclick="EditaRangoEdad2('+rango.index+','+indexNivelLogroPanel+','+id_nivel_logro+');"></i></td>'+
        '</tr>';
    }
            
    document.getElementById("div_tabla_rangos_etarios_"+indexNivelLogroPanel).innerHTML='<table cellpadding="1" cellspacing="1" class="table" id="tbl_tramos_nivel_logro_'+indexNivelLogroPanel+'">'+
    '<thead>'+
    '<tr>'+
    '<th>Nombre</th>'+
    '<th>Descripción</th>'+
    '<th colspan="3">Rango</th>'+
    '</tr>'+
    '</thead>'+
    filasTabla+
    '<tbody>'+
    '</tbody>'+
    '</table>';
    document.getElementById("span_txt_cantidad_rangos_x_grupo_"+indexNivelLogroPanel).innerHTML = totalrangos+glsCanTramos;      
}
function GuardarNivelLogro(id_nivel_logro, indexNivelLogroPanel){
    if(document.getElementById("estado_nivel_logro_"+indexNivelLogroPanel).value!="0"){
        MensajeFormatoVariable(glsMensajeBloqueo,"info","center");
    }
    else{
        var d = new Date();
        var descrip_cfg_nivel_logro_ = document.getElementById("descrip_cfg_nivel_logro_"+indexNivelLogroPanel).value;
        var b_check_nivel_logro_global=false;
        var strJSONparameter="";
         
        var jsonStringEdit=document.getElementById("rangos_json_"+indexNivelLogroPanel).value;
        if(EliminaEspacios(jsonStringEdit)==""){
            MensajeFormatoVariable("Para crear una nueva agrupación de nivel de logro debe indicar una glosa descriptiva y los rangos de edad correspondientes.","info","center");
            return;           
        }
        else{
           
            var objJSONGuardar = JSON.parse(jsonStringEdit);
            var arrRangos = objJSONGuardar.filas;
            
            if(EliminaEspacios(descrip_cfg_nivel_logro_)=="" || arrRangos.length == 0){
                MensajeFormatoVariable("Para crear una nueva agrupación de nivel de logro debe indicar una glosa descriptiva y los rangos de edad correspondientes.","info","center");
                return;
            }
            if(document.getElementById("check_nivel_logro_scope_"+indexNivelLogroPanel).checked==true){
                b_check_nivel_logro_global=true;
            }    
            strJSONparameter='{'+
                               '"descrip_cfg_nivel_logro_":"'+descrip_cfg_nivel_logro_+'",'+
                               '"b_check_nivel_logro_scope_":"'+b_check_nivel_logro_global.toString()+'",'+
                               '"alpha_code2_pais_x_ip":"'+document.getElementById("alpha_code2_pais_x_ip").value+'",'+
                               '"year":"'+d.getFullYear().toString()+'",'+
                               '"ranges":'+JSON.stringify(arrRangos)+','+
                               '"id_nivel_logro":"'+id_nivel_logro.toString()+'"'+
                               '}';

            JSONObjNivelLogro = JSON.parse(strJSONparameter);
            FxOperaciones(23);              
        }     
    }
}
function CargaFormNuevosRangos(id_nivel_logro, indexNivelLogroPanel){
    document.getElementById("div_panel_rango_"+indexNivelLogroPanel).innerHTML='<div id="div_rango_'+indexNivelLogroPanel+'" class="hpanel hgreen" style="display:;">'+
    '<div class="panel-body" style="background-color:#f8f9f9;">'+
    '<span><small>'+glsSpan_txt_nombrerango_nivel_logro+'</small></span><br/>'+
    '<input id="nombre_rango_nivel_logro_'+indexNivelLogroPanel+'" type="text" class="form-control" value="" placeholder="'+glsplaceholderNombreTramo+'"/>'+
    '<span><small>'+glsSpan_txt_descrango_nivel_logro+'</small></span><br/>'+
    '<input id="descripcion_rango_nivel_logro_'+indexNivelLogroPanel+'" type="text" class="form-control" value="" placeholder="'+glsplaceholderDescripTramo+'"/>'+
    '<table>'+ 
    '<tr>'+
    '<td><img src="images/lineleft.png" class="middle"/><H2 class="H1_CSS">'+glsSpan_text_desde_rango+'<H2></td>'+
    '<td>&nbsp;</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_year+'</small>'+
    '<input id="touchpin001_'+indexNivelLogroPanel+'" type="text"  name="touchpin001" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+   
    '</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_month+'</small>'+
    '<input id="touchpin002_'+indexNivelLogroPanel+'" type="text"  name="touchpin002" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+
    '</td>'+
    '</tr>'+
    '<tr><td colspan="2">&nbsp;</td></tr>'+
    '<tr>'+
    '<td><img src="images/lineleft.png" class="middle"/><H2 class="H1_CSS">'+glsSpan_text_hasta_rango+'<H2></td>'+
    '<td>&nbsp;</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_year+'</small>'+
    '<input id="touchpin003_'+indexNivelLogroPanel+'" type="text"  name="touchpin003" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+   
    '</td>'+
    '<td>'+
    '<div class="elementRangoEdad">'+
    '<small>'+glsSpan_txt_desc_year_range_month+'</small>'+
    '<input id="touchpin004_'+indexNivelLogroPanel+'" type="text"  name="touchpin004" value="0" onkeypress="return ValidaIngresoSoloNumeros(this,event);">'+
    '</div>'+
    '</td>'+
    '</tr>'+
    '</table><br/>'+
    '<button class="btn btn-outline btn-danger btn-sm" type="submit" onclick="CancelarRangoNivelLogro('+indexNivelLogroPanel+');"><i class="fa fa-close"></i>&nbsp;'+glsSpan_txt_btn_cancelar_rangoedad_nivel_logro+'</button>&nbsp;'+
    '<button class="btn btn-outline btn-success btn-sm" type="submit" onclick="GuardarRangoNivelLogro('+indexNivelLogroPanel+');"><i class="fa fa-plus"></i>&nbsp;'+glsSpan_txt_btn_guardar_rangoedad_nivel_logro+'</button>&nbsp;'+
    '</div>'+
    '</div>';

    $("#touchpin001_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});
    $("#touchpin002_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});
    $("#touchpin003_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});
    $("#touchpin004_"+indexNivelLogroPanel).TouchSpin({verticalbuttons: true});    
    
    document.getElementById("touchpin001_"+indexNivelLogroPanel).value="0";
    document.getElementById("touchpin002_"+indexNivelLogroPanel).value="0";
    document.getElementById("touchpin003_"+indexNivelLogroPanel).value="0";
    document.getElementById("touchpin004_"+indexNivelLogroPanel).value="0";
}
function CancelarRangoNivelLogro(indexNivelLogroPanel){
    document.getElementById("div_panel_rango_"+indexNivelLogroPanel).innerHTML="";
}
function GuardarRangoNivelLogro(indexNivelLogroPanel){
    var table = document.getElementById("tbl_tramos_nivel_logro_"+indexNivelLogroPanel);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    var jsonRangeNewLocal="";
    var glsilativoDesde="";
    var glsilativoHasta="";
    var jsonStringEdit=document.getElementById("rangos_json_"+indexNivelLogroPanel).value;
    var jsonStringEdit2="";
    var glsrango=glsdesdelos;
        
    var yearDesde=document.getElementById("touchpin001_"+indexNivelLogroPanel).value;
    var monthDesde=document.getElementById("touchpin002_"+indexNivelLogroPanel).value;
    var yearHasta=document.getElementById("touchpin003_"+indexNivelLogroPanel).value;
    var monthHasta=document.getElementById("touchpin004_"+indexNivelLogroPanel).value;
    var nombreRNL=document.getElementById("nombre_rango_nivel_logro_"+indexNivelLogroPanel).value;
    var descriRNL=document.getElementById("descripcion_rango_nivel_logro_"+indexNivelLogroPanel).value;
    
    if(yearDesde!="0"){
        glsrango= glsrango + yearDesde + glsyearrango;
        glsilativoDesde=glsilativorango;
    }
    if(monthDesde!="0" || yearDesde=="0")
        glsrango= glsrango + glsilativoDesde + monthDesde + glsmonthrango;
        
    glsrango= glsrango + glshastaLos;
    
    if(yearHasta!="0"){
        glsrango= glsrango + yearHasta+ glsyearrango;
        glsilativoHasta=glsilativorango;
    }
    if(monthHasta!="0" || yearHasta=="0")
        glsrango= glsrango + glsilativoHasta + monthHasta + glsmonthrango;
    
    cell1.innerHTML=nombreRNL;
    cell2.innerHTML=descriRNL;
    cell3.innerHTML=glsrango;
    cell4.innerHTML='<i class="fa fa-trash-o operRango1" onclick="EliminaRangoEdad2('+rowCount+','+indexNivelLogroPanel+');"></i>';
    cell5.innerHTML='<td><i class="fa fa-pencil operRango1" onclick="EditaRangoEdad2('+rowCount+','+indexNivelLogroPanel+');"></i></td>';
                
    document.getElementById("span_txt_cantidad_rangos_x_grupo_"+indexNivelLogroPanel).innerHTML = rowCount+glsCanTramos;
    
    var arrFilas = [];
    var objJSON;
    if(jsonStringEdit!=""){
        objJSON = JSON.parse(jsonStringEdit);
        arrFilas = objJSON.filas;
    }
    if(arrFilas.length==0){
        jsonStringEdit='{"index":"'+rowCount+'","name":"'+nombreRNL+'","text":"'+descriRNL+'","yearFrom":"'+yearDesde+'","monthFrom":"'+monthDesde+'","yearUntil":"'+yearHasta+'","monthUntil":"'+monthHasta+'","id_nivel_logro_rango":"0"}';
    }
    else{
        for(var k=0;k<=arrFilas.length-1;k++){
            var rango = arrFilas[k];
            if(jsonStringEdit2=="")
               jsonStringEdit2='{"index":"'+(k+1)+'","name":"'+rango["name"]+'","text":"'+rango["text"]+'","yearFrom":"'+rango["yearFrom"]+'","monthFrom":"'+rango["monthFrom"]+'","yearUntil":"'+rango["yearUntil"]+'","monthUntil":"'+rango["monthUntil"]+'","id_nivel_logro_rango":"'+rango["id_nivel_logro_rango"]+'"}';
            else
                jsonStringEdit2=jsonStringEdit2+',{"index":"'+(k+1)+'","name":"'+rango["name"]+'","text":"'+rango["text"]+'","yearFrom":"'+rango["yearFrom"]+'","monthFrom":"'+rango["monthFrom"]+'","yearUntil":"'+rango["yearUntil"]+'","monthUntil":"'+rango["monthUntil"]+'","id_nivel_logro_rango":"'+rango["id_nivel_logro_rango"]+'"}';
        }
        jsonStringEdit=jsonStringEdit2+',{"index":"'+rowCount+'","name":"'+nombreRNL+'","text":"'+descriRNL+'","yearFrom":"'+yearDesde+'","monthFrom":"'+monthDesde+'","yearUntil":"'+yearHasta+'","monthUntil":"'+monthHasta+'","id_nivel_logro_rango":"0"}';
    }
    jsonStringEdit = '{"totalfilas":"'+rowCount+'","filas":['+jsonStringEdit+']}';
    document.getElementById("rangos_json_"+indexNivelLogroPanel).value =jsonStringEdit;
}

function ViewHide(index, opc){ 
    switch(opc){
        case 1://CONFIG BASE MAPA
            if(document.getElementById("div_config_config_mapa_"+index).style.display=="none")
                document.getElementById("div_config_config_mapa_"+index).style.display="block";
            else
                document.getElementById("div_config_config_mapa_"+index).style.display="none";
            break;       
        case 2://AMBITO
            if(document.getElementById("div_config_config_mapa_ambito_"+index).style.display=="none")
                document.getElementById("div_config_config_mapa_ambito_"+index).style.display="block";
            else
                document.getElementById("div_config_config_mapa_ambito_"+index).style.display="none";
            break;
        case 3://NUCLEO
            if(document.getElementById("div_config_config_mapa_nucleo_"+index).style.display=="none")
                document.getElementById("div_config_config_mapa_nucleo_"+index).style.display="block";
            else
                document.getElementById("div_config_config_mapa_nucleo_"+index).style.display="none";
            break;    
        case 5://MAPA-EJE
            if(document.getElementById("div_config_config_mapa_eje_"+index).style.display=="none")
                document.getElementById("div_config_config_mapa_eje_"+index).style.display="block";
            else
                document.getElementById("div_config_config_mapa_eje_"+index).style.display="none";
            break;
        case 6://INDICADOR
            if(document.getElementById("div_config_config_mapa_IND_"+index).style.display=="none")
                document.getElementById("div_config_config_mapa_IND_"+index).style.display="block";
            else
                document.getElementById("div_config_config_mapa_IND_"+index).style.display="none";
            break;              
        case 4://NIVEL LOGRO
            if(document.getElementById("div_config_nivellogro_"+index).style.display=="none")
                document.getElementById("div_config_nivellogro_"+index).style.display="block";
            else
                document.getElementById("div_config_nivellogro_"+index).style.display="none";
            break;
                
    }
}
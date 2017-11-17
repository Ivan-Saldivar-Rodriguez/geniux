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
var glsSpan_txt_btn_cancelar_rangoedad_nivel_logro="Cerrar";
var glsSpan_txt_btn_guardar_rangoedad_nivel_logro="Agregar";
var glsSpan_txt_btn_editar_rangoedad_nivel_logro="Actualizar";
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
var glsBtnAgregarIndicadorDesempeno="Agregar indicador";
var glsBtnGuardarIndicadorDesempeno="Guardar cambios";
var glsBtnEliminarIndicadoresDesempeno="Eliminar";

function RecargaPanelInicio(){
    //CONFIG MAPA PROGRESO
    ConfiguraSeccionMapaPogresos("none");
    //NIVEL LOGRO
    document.getElementById("div_seccion_nivel_logro").style.display="none";
    //PANEL INICIAL
    document.getElementById("div_panel_inicial").style.display="block";
}
function ConfiguraSeccionMapaPogresos(opc){
    //CONFIG MAPA PROGRESO
    document.getElementById("span_txt_path_modulo_2").innerHTML="Editar mapa";
    document.getElementById("div_listado_mapas_configurados").innerHTML="";
    document.getElementById("div_descripcion_config_base").innerHTML="";
    document.getElementById("div_listado_ambitos_configurados").innerHTML="";
    document.getElementById("div_listado_nucleos_configurados").innerHTML="";
    document.getElementById("div_listado_mapa_configurados").innerHTML="";
    document.getElementById("div_listado_indicadores_configurados").innerHTML="";
    
    document.getElementById("div_cabecera_modulo_mapa_progreso").style.display=opc;
    document.getElementById("div_seccion_general_mapa").style.display=opc;
    document.getElementById("div_seccion_ambito_mapa").style.display=opc;
    document.getElementById("div_seccion_nucleo_mapa").style.display=opc;
    document.getElementById("div_seccion_mapa").style.display=opc;
    document.getElementById("div_seccion_indicador_mapa").style.display=opc;
}
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
        MensajeFormatoVariable2("Para agregar un nuevo rango de edad a la agrupación de nivel de logro, debe ingresar: nombre, descripción y rango válido de edad.","info","center");
        return;
    } 
    //AÑOS DESDE > AÑOS HASTA
    if( parseInt(yearDesde,10)>parseInt(yearHasta,10) ){
        MensajeFormatoVariable2("Ingrese un rango válido de edad.","info","center");
        document.getElementById("touchpin001").focus();
        return;    
    }
    //AÑOS DESDE Y AÑOS HASTA IGUAL A CERO, Y MESES DESDE > MESES HASTA
    if(parseInt(yearDesde,10)==0 && parseInt(yearHasta,10)==0 && parseInt(monthDesde,10)>parseInt(monthHasta,10)){
        MensajeFormatoVariable2("Ingrese un rango válido de edad.","info","center");
        document.getElementById("touchpin001").focus();
        return;    
    }
    //AÑOS DESDE = AÑOS HASTA , Y MESES DESDE > MESES HASTA
    if(parseInt(yearDesde,10)==parseInt(yearHasta,10) && parseInt(monthDesde,10)>parseInt(monthHasta,10)){
        MensajeFormatoVariable2("Ingrese un rango válido de edad.","info","center");
        document.getElementById("touchpin001").focus();
        return;    
    }    
    
    //ALGUNO INDICADOR DE AÑOS != A CERO, Y ALGUN INDICADOR DE MESES >= 12 (en este caso solo puede ser hasta 11 meses) 
    if( (parseInt(yearDesde,10)>0 && parseInt(monthDesde,10)>=12) || (parseInt(yearHasta,10)>0 && parseInt(monthHasta,10)>=12) ){
        MensajeFormatoVariable2("Si ingresó una cantidad distinta de cero en los indicadores de año, sólo puede ingresar hasta 11 en los indicadores de meses.","info","center");
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
        MensajeFormatoVariable2("Para crear una nueva agrupación de nivel de logro debe indicar una glosa descriptiva y los rangos de edad correspondientes.","info","center");
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
    
    var glsbtn_eliminar="Eliminar";
    var glsbtn_agregar="Agregar rango de edad";
    var glsbtn_guardar="Guardar cambios";
    var glsScopeNivelLogro="USO GLOBAL";
    var glstablarangos="Rangos de edad de nivel de logro";
    var gjsCanTramos=" tramos";
    var gls_EstadoNivelLogroBLK="BLOQUEADO";
    var gls_EstadoNivelLogroEDT="EDITABLE";
    
	if(JSONStringNivelesLogros!=""){
    	var jsonObj = JSON.parse(JSONStringNivelesLogros);
		var arrNivelLogro = jsonObj.listado;    
		totalNivelLogroenpantalla=arrNivelLogro.length-1;//indices desde 0 a n-1

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

			'<div id="divcab_nivellogro_'+k+'" style="cursor:pointer;background:'+color_nivellogro+';color:#000;width:100%;height:25px;" onclick="ViewHide('+k+',4);LoadRangos('+id_nivel_logro+','+k+');"><p class="cabtextpanel"><img src="images/lineleft.png" class="middle"><img id="imgMapa_'+k+'" src="images/uncheckSel3.png" style="width:25px;height:25px;margin-left:-4px;margin-right:2px;"/>'+desc_nivel_logro+'</p></div>'+    

			'<div id="div_config_nivellogro_'+k+'" style="display:none;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">'+        

            '<div class="checkbox" style="margin-left:-5px;"><label><input id="check_nivel_logro_scope_'+k+'" '+bscope_nivel_logro+' type="checkbox" class="i-checks" />&nbsp;<span id="span_txt_scope_nivel_logro">'+glsScopeNivelLogro+'</span></label></div><br/>'+
            '<span id="span_txt_glosa_estado_grupo_nivel_de_logro_'+k+'">'+estadoNivelLogro+'</span>'+
            '<input id="estado_nivel_logro_'+k+'" type="hidden" value="'+uso_nivel_logro+'"/>'+
			'<div>'+
            '<span><small><span id="span_txt_desc_nivel_logro_'+k+'">'+glscabDescNivelLogro+'</span></small></span><br/>'+
            '<input id="descrip_cfg_nivel_logro_'+k+'" type="text" class="form-control" value="'+desc_nivel_logro+'" placeholder="Ingrese descripción, ejemplo: Tramos mapa de progreso Educación Parvularia"/>'+
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
	else{
        totalmapaejesenpantalla=0;
        var glsnoexistenNivelLogros="AÚN NO EXISTEN NIVELES DE LOGRO CONFIGURADOS.";
		document.getElementById("div_listado_nivel_logros_configurados").innerHTML = "<span style='font-size:14;color:red;text-transform: uppercase;'>"+glsnoexistenNivelLogros+"</span>";
	}
}


function LoadRangos(id_nivel_logro, indiceGrupo){
    document.getElementById('id_nivel_logro_selected').value=id_nivel_logro;
    document.getElementById('index_nivel_logro_selected').value=indiceGrupo;
    FxOperaciones(21);
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
            strJSON_Rangos = '{"index":"'+indexNew+'","name":"'+rango[1]+'","text":"'+rango[2]+'","yearFrom":"'+rango[3]+'","monthFrom":"'+rango[4]+'","yearUntil":"'+rango[5]+'","monthUntil":"'+rango[6]+'","id_nivel_logro_rango":"'+rango[0]+'"}';
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
        '<td><i class="fa fa-trash-o operRango1" onclick="EliminaRangoEdad2('+rango.index+','+id_nivel_logro_indexSel+');"></i></td>'+
        '<td><i class="fa fa-pencil operRango1" onclick="EditaRangoEdad2('+rango.index+','+id_nivel_logro_indexSel+','+id_nivel_logro+');"></i></td>'+
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
        MensajeFormatoVariable2(glsMensajeBloqueo,"info","center");
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
        MensajeFormatoVariable2(glsMensajeBloqueo,"info","center");
    }
    else{
        CargaFormRangosxEdicion(indexFila, indexTablaRangoNL, id_nivel_logro);
    }
}
function EliminarNivelLogro(id_nivel_logro, indexNivelLogroPanel){
    if(document.getElementById("estado_nivel_logro_"+indexNivelLogroPanel).value!="0"){
        MensajeFormatoVariable2(glsMensajeBloqueo,"info","center");
    }
    else{
        document.getElementById('id_nivel_logro_selected').value=id_nivel_logro;
        FxOperaciones(22);
    }
}
function AgregarRangoNivelLogro(id_nivel_logro, indexNivelLogroPanel){
    if(document.getElementById("estado_nivel_logro_"+indexNivelLogroPanel).value!="0"){
        MensajeFormatoVariable2(glsMensajeBloqueo,"info","center");
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
        MensajeFormatoVariable2(glsMensajeBloqueo,"info","center");
    }
    else{
        var d = new Date();
        var descrip_cfg_nivel_logro_ = document.getElementById("descrip_cfg_nivel_logro_"+indexNivelLogroPanel).value;
        var b_check_nivel_logro_global=false;
        var strJSONparameter="";
         
        var jsonStringEdit=document.getElementById("rangos_json_"+indexNivelLogroPanel).value;
        if(EliminaEspacios(jsonStringEdit)==""){
            MensajeFormatoVariable2("Para crear una nueva agrupación de nivel de logro debe indicar una glosa descriptiva y los rangos de edad correspondientes.","info","center");
            return;           
        }
        else{
           
            var objJSONGuardar = JSON.parse(jsonStringEdit);
            var arrRangos = objJSONGuardar.filas;
            
            if(EliminaEspacios(descrip_cfg_nivel_logro_)=="" || arrRangos.length == 0){
                MensajeFormatoVariable2("Para crear una nueva agrupación de nivel de logro debe indicar una glosa descriptiva y los rangos de edad correspondientes.","info","center");
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
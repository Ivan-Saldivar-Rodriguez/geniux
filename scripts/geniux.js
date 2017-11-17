///VERSION: 1.0 LAST UPDATE: 07.08.2017
///AUTOR: IVAN SALDIVAR RODRIGUEZ - 2017 - ivansaldivar@gmail.com
///FINAL RELEASE PROCESS WITH https://jscompress.com/
/// ---
var url_ = '';
var action_ = '/geniux/srvpages/geniuxajaxdb.php';
var sound_ = 1;
var msg = 0;
var operatorincsvr="";
var serialsvr="";

//Esta variable se utiliza para bloquear sucesivos clic del usuario mientras el server no resuelve la respuesta
//variableDeControl_ = 0 => FORMULARIO LIBRE
//variableDeControl_ = 1 => FORMULARIO BLOQUEADO

var variableDeControl_ = 0;

//PARA EVITAR NAVEGAR CON LA TECLA BORRAR HACIA ATRÁS (COD 8)
$(document).keydown(function (e) {
    var preventKeyPress;
    if (e.keyCode == 8) {
        var d = e.srcElement || e.target;
        switch (d.tagName.toUpperCase()) {
            case 'TEXTAREA':
                preventKeyPress = d.readOnly || d.disabled;
                break;
            case 'INPUT':
                preventKeyPress = d.readOnly || d.disabled ||
                    (d.attributes["type"] && $.inArray(d.attributes["type"].value.toLowerCase(), ["radio", "checkbox", "submit", "button"]) >= 0);
                break;
            case 'DIV':
                preventKeyPress = d.readOnly || d.disabled || !(d.attributes["contentEditable"] && d.attributes["contentEditable"].value == "true");
                break;
            default:
                preventKeyPress = true;
                break;
        }
    }
    else
        preventKeyPress = false;

    if (preventKeyPress)
        e.preventDefault();
});

//////////////////////////////////////////////////////
// MENSAJES
function DatosBienvenida(typSex, nombre) {
    document.getElementById('typesex').value = typSex;
    document.getElementById('nombre').value = nombre;
}
function MensajeBienvenida(mensaje) {
    var d = new Date();
    swal({
        title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>",  
        html: "<span style='color:#088A08;font-size:24px;'>" + mensaje + "<span>",
        type: "success",
        timer: 3000,
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false
    }).then(
      function () {},
      // handling the promise rejection
      function (dismiss) {
        if (dismiss === 'timer') {
          console.log('I was closed by the timer')
        }
      }
    );
}
function MensajeSalida() {
    var d = new Date();
    EliminarDatosSesion();
    var nombre = document.getElementById('nombrepila').value ;
    swal({
        title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>",
        html: "<span style='color:#088A08;font-size:24px;'>HASTA PRONTO " + nombre.toUpperCase() + "<span>",
        type: "success",
        timer: 3000,
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false
    });
}

function MensajeFormatoVariable(mensaje_, tipoLogo, textalign) {
    var d = new Date();
    var imgsrc;
    var colotext;
    var colorbutton;
    switch (tipoLogo) {
        case "info":
            imgsrc = "images/info32x.png";
            colortext = "#0404B4";
            colorbutton = "#0404B4";
            break;
        case "error":
            imgsrc = "images/error32x.png";
            colortext = "#B40404";
            colorbutton = "#DF0101";
            break;
        case "warning":
            imgsrc = "images/warning32x.png";
            colortext = "#FF8000";
            colorbutton = "#FF8000";
            break;
        case "success":
            imgsrc = "images/success32x.png";
            colortext = "#088A08";
            colorbutton = "#088A08";
            break;
    }
    if (mensaje_.indexOf("|") != -1) {
        mensaje_ = replaceAll(mensaje_, "|", "<br/>");
    }
    // <div class='divpadre'></div>
    swal({
        title:"<table style='margin:auto;font-size:18px;color:"+colortext+";'>"+
                "<tr>"+
                "<td><img class='imgHija' src='" + imgsrc + "' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td style='color:"+colortext+";'>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2' style='color:"+colortext+";'>c</span>&nbsp;</td>"+
                "<td style='color:"+colortext+";'>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>", 
        html: "<p style='text-align:"+textalign+";'><span style='color:" + colortext + ";font-size:14px;'>" + mensaje_ + "<span></p>",
        allowOutsideClick: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "cerrar",
        confirmButtonColor: colorbutton
    });
}
function MessageSucess(mensaje_) {
    var d = new Date();
    swal({
        title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/success32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>",
        html: "<span style='color:#088A08;font-size:18px;'>" + mensaje_ + "<span>",
        type: "success",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: true
    });
}
function MensajeINFO(mensaje_) {
    var d = new Date();
    swal({
        title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/info32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>", 
        html: "<span style='color:#0404B4;text-align:justify;'>" + mensaje_ + "<span>",
        type: "info",
        allowOutsideClick: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "cerrar",
        confirmButtonColor: "#0404B4"
    });
}
function MensajeINFO2(mensaje_, fx) {
    var d = new Date();
    swal(
        {
            title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/info32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>", 
            html: "<div style='color:#0404B4;'><span>" + mensaje_ + "<span></div>",
            //type: "info",
            allowOutsideClick: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "aceptar",
            cancelButtonText: "cancelar",
            confirmButtonColor: "#0404B4",
            cancelButtonColor: "#0404B4"
        }).then(
            function () {
                if (fx != "") eval(fx);
            }, 
            function (dismiss) {
              // dismiss can be 'cancel', 'overlay',
              // 'close', and 'timer'
              if (dismiss === 'cancel') {}
            }
        );
}
function MensajeINFO2_V2(mensaje_, fx) {
    var d = new Date();
    swal(
        {
            title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/info32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>", 
            html: "<div style='color:#0404B4;'><p style='text-align:left;'>" + mensaje_ + "<p></div>",
            allowOutsideClick: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "aceptar",
            cancelButtonText: "cancelar",
            confirmButtonColor: "#0404B4",
            cancelButtonColor: "#0404B4"
        }).then(
            function () {
                if (fx != "") eval(fx);
            }, 
            function (dismiss) {
              // dismiss can be 'cancel', 'overlay',
              // 'close', and 'timer'
              if (dismiss === 'cancel') {}
            }
        );
}
function MensajeINFO3(mensaje_) {
    var d = new Date();
    swal({
        title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/info32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>",
        html: "<span style='color:#0404B4;text-align:left;'>" + mensaje_ + "<span>",
        allowOutsideClick: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "cerrar",
        confirmButtonColor: "#0404B4"
    });
}
function MensajeERROR(mensaje_) {
    var d = new Date();
    swal({
        title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/error32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>",
        html: "<span style='color:#B40404;text-align:left;'>" + mensaje_ + "<span>",
        type: "error",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "cerrar",
        confirmButtonColor: "#DF0101"
    });
}
function MensajeERROR2(mensaje_, fx) {
    var d = new Date();
    swal({
            title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/error32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2'>c</span>&nbsp;</td>"+
                "<td>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>",
            html: "<span style='color:#B40404;text-align:left;'>" + mensaje_ + "<span>",
            //type: "error",
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: "cerrar",
            confirmButtonColor: "#DF0101"
        }).then(
            function () {
                if (fx != "") eval(fx);
            }, 
            function (dismiss) {
              // dismiss can be 'cancel', 'overlay',
              // 'close', and 'timer'
              if (dismiss === 'cancel') {}
            }
        );
}
function MensajeWARNING(mensaje_, fx) {
    var d = new Date();
    swal({
            title:"<table style='margin:auto;font-size:18px;'>"+
                "<tr>"+
                "<td><img class='imgHija' src='images/warning32x.png' />&nbsp;<span style='font-size:16px;'></td>"+
                "<td style='color:#FF8000;'>GENIUX</td>"+
                "<td>&nbsp;<span class='cc2' style='color:#FF8000;'>c</span>&nbsp;</td>"+
                "<td style='color:#FF8000;'>" + d.getFullYear() + "</td>"+
                "</tr>"+
                "</table>",
            html: "<span style='color:#FF8000;text-align:left;'>" + mensaje_ + "<span>",
            // type: "warning",
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "cancelar",
            confirmButtonText: "eliminar",
            confirmButtonColor: "#FF8000",
            cancelButtonColor: "#FF8000"
        }).then(
            function () {
                if (fx != "") eval(fx);
            }, 
            function (dismiss) {
              // dismiss can be 'cancel', 'overlay',
              // 'close', and 'timer'
              if (dismiss === 'cancel') {}
            }
        );
}
function MensajeSQL(mensaje_, tipo, fx) {
    var d = new Date();

    if (tipo == "info2") {
        MensajeINFO2(mensaje_, fx);
    }
    else {
        if (tipo == "info") {
            MensajeINFO(mensaje_);
        }
        else {
            if (tipo == "error") {
                MensajeERROR2(mensaje_, fx);
            }
            else {
                if (tipo == "warning") {
                    MensajeWARNING(mensaje_, fx);
                }
                else {
                    if (tipo == "info2_v2") {
                        MensajeINFO2_V2(mensaje_, fx);
                    }
                }
            }
        }
    }
}

function CierraSesionInvalida() {
    EliminarDatosSesion();
    MensajeFormatoVariable(glsCierreSesionNovalida,"error","center");
    setTimeout(
        function () {
            document.location.href = "geniux.html?lang="+document.getElementById('language_identificator').value;
        },
        3000
    );
}
function EliminarDatosSesion() {
    document.getElementById('datosusuario').value = "";
    document.getElementById('urlbalanceo').value = "";
    document.getElementById('header').style.display = "none";
    document.getElementById('menu').style.display = "none";
    document.getElementById('wrapper').style.display = "none";
}
function replaceAll(text, busca, reemplaza) {
    while (text.toString().indexOf(busca) != -1) {
        text = text.toString().replace(busca, reemplaza);
    }
    return text;
}
function EliminaEspacios(valor) {
    return valor.replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
}

//VALIDACIONES DE INGRESO VARIAS
function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)) { return (true); } else { return (false); }

}
function validaIngresoSoloAlfabetico(valor, e) {
    //valida que cadena de texto sólo permita ingresar sólo caracteres alfabéticos (abcd..., ABCD...):
    var tecla = (document.all) ? e.keyCode : e.which;
    if ((tecla >= 97 && tecla <= 122) || (tecla >= 65 && tecla <= 90) || tecla == 32
         || tecla == 225 || tecla == 193 || tecla == 201 || tecla == 233 || tecla == 205 || tecla == 237 || tecla == 211 || tecla == 243 || tecla == 218 || tecla == 250
         || tecla == 8 || tecla == 0 || tecla == 241 || tecla == 209) { // a-->z;A-->Z;espacio;con acentos;borrar;tab
        return;
    } else { return false; }
}
function validaIngresoSoloAlfabeticoYNumericos(valor, e) {
    //valida que cadena de texto sólo permita ingresar los siguientes tipos de caracteres  (abcd..., ABCD..., 123.., -, _ , espacio):
    var tecla = (document.all) ? e.keyCode : e.which;
    if ((tecla >= 97 && tecla <= 122) || (tecla >= 65 && tecla <= 90) || (tecla >= 48 && tecla <= 57) || tecla == 45 || tecla == 95 || tecla == 32
         || tecla == 225 || tecla == 193 || tecla == 201 || tecla == 233 || tecla == 205 || tecla == 237 || tecla == 211 || tecla == 243 || tecla == 218 || tecla == 250
         || tecla == 8 || tecla == 0 || tecla == 241 || tecla == 209) {
        // a-->z ; A-->Z ; 0--> ; "-" y "_" y espacio 193 225=Áá, 201 233=Éé, 205 237=Íí, 211 243=Óó, 218 250=Úú,  241 209=Ññ; borrar; tab
        return;
    } else { return false; }
}
function validaIngresoSoloAlfabeticoYNumericosPwd(valor, e) {
    //valida que cadena de texto sólo permita ingresar los siguientes tipos de caracteres  (abcd..., ABCD..., 123.., -, _ ):
    var tecla = (document.all) ? e.keyCode : e.which;
    //alert(tecla);
    if ((tecla >= 97 && tecla <= 122) ||
        (tecla >= 65 && tecla <= 90) ||
        (tecla >= 48 && tecla <= 57) ||
        tecla == 42 ||
        tecla == 43 ||
        tecla == 45 ||
        tecla == 46 ||
        tecla == 95 ||
        tecla == 225 ||
        tecla == 193 ||
        tecla == 201 ||
        tecla == 233 ||
        tecla == 205 ||
        tecla == 237 ||
        tecla == 211 ||
        tecla == 243 ||
        tecla == 218 ||
        tecla == 250 ||
        tecla == 8 ||
        tecla == 0 ||
        tecla == 241 ||
        tecla == 209) {

        // a-->z ; A-->Z ; 0-->9 ; 
        //(45) "-" y (95) "_" y (32) espacio 
        //193 225=Áá, 201 233=Éé, 205 237=Íí, 211 243=Óó, 218 250=Úú,  241 209=Ññ; borrar; tab
        //(42) *  (43) +
        return;
    } else { return false; }
}
function validaIngresoCaracterNoPermitido(valor, e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    //alert(tecla);
    if (tecla != 124 && tecla != 39) { // "|"=124 "'"= 39
        return;
    } else { return false; }
}
function validaIngresoCaracterNoPermitido_Mod(valor, e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla != 124 && tecla != 174) { // "|"=124 ; "«"=174
        if (tecla == 13) {

        }
        return;
    } else { return false; }
}
function validaIngresoCaracterNoPermitido_Names(valor, e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    
    if (tecla != 124) { // "|"=124
        if (tecla == 13) {

        }
        return;
    }
    else {
        //alert(tecla);
        return false;
    }
}
function validaIngresoCaracterNoPermitido_Mod2(valor, e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla != 124 && tecla != 174 && tecla != 39) { // "|"=124 ; "«"=174; "'"=39
        if (tecla == 13) {

        }
        return;
    } else { return false; }
}
function validaIngresoRUT(valorRut, e) {
    //valida que cadena de texto sólo permita ingresar números y letra K:
    var tecla = (document.all) ? e.keyCode : e.which;
    if ((tecla >= 48 && tecla <= 57) || tecla == 75 || tecla == 107 || tecla == 0 || tecla == 8) { return; } else { return false; }
}

function ValidaIngresoSoloNumeros(valor, e) {
//valida que cadena de texto sólo permita ingresar números:
var tecla = (document.all) ? e.keyCode : e.which;
if ((tecla >= 48 && tecla <= 57) || tecla == 0 || tecla == 8) { return; } else { return false; }
}
function ValidaIngresoSoloNumerosDecimal(valor, e) {
    //valida que cadena de texto sólo permita ingresar números:
    var tecla = (document.all) ? e.keyCode : e.which;
    //alert(tecla);
    if ((tecla >= 48 && tecla <= 57) || tecla == 0 || tecla == 8 || tecla == 44) { return; } else { return false; }
}
function ValidaIngresoSoloNumeros_y_guion(valor, e) {
    //valida que cadena de texto sólo permita ingresar números, guión y espacio:
    var tecla = (document.all) ? e.keyCode : e.which;
    //45 = guión
    //32 = espacio
    if ((tecla >= 48 && tecla <= 57) || tecla == 0 || tecla == 8 || tecla == 45 || tecla == 32) { return; } else { return false; }
}

//////////////////////////////////////////////////////
// OPERACIONES
function MsjWait() {

    swal({
        html: '<span style="font-size:18px;padding-bottom:16px;">esperando respuesta del sistema...</span>',
        width: 300,
        animation: false,
        customClass: 'animated tada',
        timer: 2500,
        allowOutsideClick: true,
        showCancelButton: false,
        showConfirmButton: false
    }).then(
      // handling the promise rejection
      function (dismiss) {
        if (dismiss === 'timer') {
          console.log('I was closed by the timer')
        }
      }
    )    
}
function BusyProcess(opc) {
    variableDeControl_ = opc;
}
function HabilitarIngreso() {
    document.getElementById('username').disabled = false;
    document.getElementById('password').disabled = false;
}
function VerificarIngreso() {

    if (EliminaEspacios(document.getElementById('username').value) == "" || EliminaEspacios(document.getElementById('password').value) == "") {
        MensajeFormatoVariable("Debe ingresar nombre de usuario y contrase&ntilde;a para acceder al sistema.","info","center");
        return;
    }
    //alert(ApplyCodeServer(document.getElementById('username').value));
    //alert(ApplyCodeServer(document.getElementById('password').value));
    //return;
  
    document.getElementById('username').disabled = true;
    document.getElementById('password').disabled = true;
    
    if (variableDeControl_ == 0) {
        variableDeControl_ = 1;
    }
    else {
        MsjWait();
        return;
    }
    var parameters = {
        "operator": "CONNECT",
        "param1": ApplyCodeServer(document.getElementById('username').value),
        "param2": ApplyCodeServer(document.getElementById('password').value),
        "param3": serialsvr,
        "param4": document.getElementById("language_identificator").value 
    };
    GeniuxConnect(parameters);
    
}
function SalirSistema(opc){
    EliminarDatosSesion();
    MensajeSalida();
    setTimeout(
        function () {
            document.location.href = "geniux.html"; //?lang="+document.getElementById('language_identificator').value+"&ac2="+document.getElementById("alpha_code2_pais_x_ip").value+"&ac1="+document.getElementById("pais_x_ip").value;
        },
        3000
    );
}
function ConexionInvalida(msg) {
    alert(msg);
}
function RunCargarZonaPrivada() {
    document.getElementById('div_login_ini').style.display = "none";
    document.getElementById('div_volver_ini').style.display = "none";
    MensajeBienvenida();
    setTimeout(
        function(){
            document.getElementById('frmrun').action = document.getElementById('urlbalanceo').value;  
            document.getElementById('frmrun').submit()
        },
        3000
    );
}
function ActivaLogin() {
    document.getElementById('div_login_ini').style.display = "";
    document.getElementById('div_volver_ini').style.display = "";
    document.getElementById("username").focus();
    CargaSerialConennect();
}
function ReversedChain(cadena){
	var x = cadena.length;
	var cadenaInvertida = "";
	while (x>=0) {
		cadenaInvertida = cadenaInvertida + cadena.charAt(x);
		x--;
	}
	return cadenaInvertida;  
}
function ApplyCodeServer(cadena){
    var numval;
    var numval2;
    var strOut="";
    var strCal;
    var strCalOut;
    var k=0;
    for(var i=0;i<=cadena.length-1;i++){
        numval = cadena.charCodeAt(i);    
        if(k<=operatorincsvr.length-1){
            numval2 = operatorincsvr.charCodeAt(k);
            k++;
        }
        else{
            k=0;
            numval2 = operatorincsvr.charCodeAt(k);
            k++;
        }
        strCal=numval+numval2;
        strCalOut=strCal.toString();
        if(strCalOut.length < 3) strCalOut="0"+strCalOut;
        strOut = strOut+strCalOut;
    }
    return strOut;
}
function ConfiguraDatos(params) {
    var arrdatosusuarios = params.split('_');
    document.getElementById('datosusuario').value = params;
    serialsvr=arrdatosusuarios[1];
    operatorincsvr=arrdatosusuarios[2];
    document.getElementById('language_identificator').value=arrdatosusuarios[3];
    document.getElementById('alpha_code2_pais_x_ip').value=arrdatosusuarios[4];
    document.getElementById('pais_x_ip').value=arrdatosusuarios[5];
    
    var datosencrypt=ApplyDecodeServer(arrdatosusuarios[0]);
    var arrdatosusuarios2 = datosencrypt.split('~');
    //alert(datosencrypt + " ==> "+document.getElementById('alpha_code2_pais_x_ip').value);
    
    document.getElementById('spanNombreUsuario').innerHTML = arrdatosusuarios2[0];
    document.getElementById('spanPerfilUsuario').innerHTML = arrdatosusuarios2[4];
    document.getElementById('imgProfileUsuario').src = "/geniux/images/"+arrdatosusuarios2[3];
    document.getElementById('nombrepila').value = arrdatosusuarios2[0];
    document.getElementById('id_session').value = arrdatosusuarios2[6];
    document.getElementById('id_usuario').value = arrdatosusuarios2[7];
    document.getElementById('datosmensaje').value = arrdatosusuarios2[2];

    variableDeControl_=0;
}
function EvaluaLogin(obj, e) {
    var tecla = (document.all) ? e.keyCode : e.which;

    if ((tecla >= 97 && tecla <= 122) || (tecla >= 65 && tecla <= 90) || (tecla >= 48 && tecla <= 57)
        || tecla == 42 || tecla == 43
        || tecla == 45 || tecla == 95
        || tecla == 225 || tecla == 193 || tecla == 201 || tecla == 233 || tecla == 205 || tecla == 237 || tecla == 211 || tecla == 243 || tecla == 218 || tecla == 250
        || tecla == 8 || tecla == 0 || tecla == 241 || tecla == 209
        || tecla == 13
    ) {
        var opcion1 = EliminaEspacios(document.getElementById('username').value);
        var opcion2 = EliminaEspacios(document.getElementById('password').value);



        if (tecla == 13) {
            if (opcion1 != '' && opcion2 != '') {
                VerificarIngreso();
            }
            else {
                switch (obj.id) {

                    case 'username':
                        if (obj.value != '') {
                            document.getElementById('password').focus();
                        }
                        else {
                            document.getElementById('username').focus();
                        }
                        break;

                    case 'password':
                        if (obj.value != '') {
                            document.getElementById('username').focus();
                        }
                        else {
                            document.getElementById('password').focus();
                        }
                        break;
                }

            }
        }
        return;

    } else { return false; }
}
function RecargaLocalizacion(){
    FxOperaciones(11);
}
function SeleccionaLengua(lenguaISO_639_3){
    document.getElementById("language_identificator").value = lenguaISO_639_3;
    FxOperaciones(2); 
}
function VolverPortal(){
    document.location.href="geniux.html?lang="+document.getElementById('language_identificator').value;
}
function Login(){
    document.location.href = "geniuxlogin.html?lang="+document.getElementById('language_identificator').value+"&ac2="+document.getElementById('alpha_code2_pais_x_ip').value+"&ac1="+document.getElementById('pais_x_ip').value;
}
function licenseCC(opc){
    var url = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es_ES";
    if(opc==2) url = "https://creativecommons.org/licenses/by-nc-sa/4.0/";
    document.location.href=url;   
}
function ApplyDecodeServer(cadena){
    var numval;
    var numvalStr;
    var numval2;
    var strOut="";
    var strCal;
    var strCalOut;
    var k=0;
    var largocadena = cadena.length/3;
    var pos_param_;
    
    for(var i=1;i<=largocadena;i++){
        pos_param_ = (i - 1) * 3;
        numvalStr=cadena.substr(pos_param_,3);
        numval = parseInt(numvalStr,10);    
        
        if(k<=operatorincsvr.length-1){
            numval2 = operatorincsvr.charCodeAt(k);
            k++;
        }
        else{
            k=0;
            numval2 = operatorincsvr.charCodeAt(k);
            k++;
        }
        
        strCal=numval-numval2;
        
        strCalOut=String.fromCharCode(strCal)

        strOut = strOut+strCalOut;
    }
    return strOut;
}
function GeniuxConnect(parameters) {
    try{
        $.ajax({
            data: parameters,
            url: (url_ + action_),
            type: 'post',
            success: function (response, status) {
                EjecutaComando(response);
            },
            error: function(xhr,status,errorResponse){
                MensajeFormatoVariable(xhr.responseText,"error","center"); 
                BusyProcess(0);
            }
        });
    }
    catch(err){
        MensajeFormatoVariable(err.message,"error","center");                                
        BusyProcess(0);
    }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(function(){
	$('.cajaFecha').datePicker();
	$('.cajaFecha').datePicker({clickInput:true});
	$('.cajaFecha').datePicker({startDate:'01/01/2008'});
	$('.numeric').keypress( function(e){return isNumber(e)} );
	
});
$(document).ready(function(){
	$.ajaxSetup({ cache: false });
	$(".linkMenu").live('click', processMenu );
});

function processMenu(){
	var id = this.getAttribute("id");
	if(id!=null){
		$("#optLink").val(id);
		$("#frmLinkMenu").submit();
	}	
}

var nav4=window.Event?true:false;
function isNumber(evt){
	var key=nav4?evt.which:evt.key.code;
	return ( key<=13 || ( key>=48 && key<=57) || key == 46 );
}
//Validar si es numerico un dato
function IsNumeric(sText){
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;
 
   for (i = 0; i < sText.length && IsNumber == true; i++) { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1){
         IsNumber = false;
      }
   }
   return IsNumber;
}
function utf8_encode (argString) {
    if (argString === null || typeof argString === "undefined") {
        return "";
    }
    var cadena = (argString + '');
    var retorno = "";
    var longitud;
    longitud = cadena.length;      
    for (var n = 0; n < longitud ; n++){
        var c1 = cadena.charCodeAt(n);
        if ( (c1 > 96 && c1 < 123) || (c1 > 64 && c1 < 91) || (c1 >= 48 && c1 <= 57) || (c1 === 45)  || (c1 === 46) ) {
            retorno = retorno + cadena.substring(n,n+1);            
        }else{
            switch(c1){
                case 32: // caracter ' '
                    retorno = retorno + "+"; break;
                case 225://caracter '�'
                    retorno = retorno + "%C3%A1"; break;
                case 233://caracter '�'
                    retorno = retorno + "%C3%A9"; break;
                case 237: // caracter '�'
                    retorno = retorno + "%C3%AD"; break;
                case 243: //caracter '�'
                    retorno = retorno + "%C3%B3"; break;
                case 250://caracter '�'
                    retorno = retorno + "%C3%BA"; break;
                case 193://caracter '�'
                    retorno = retorno + "%C3%81"; break;
                case 201://caracter '�'
                    retorno = retorno + "%C3%89"; break;
                case 205://caracter '�'
                    retorno = retorno + "%C3%8D"; break;
                case 211://caracter '�'
                    retorno = retorno + "%C3%93"; break;
                case 218://caracter '�'
                    retorno = retorno + "%C3%9A"; break;
                case 216://caracter '�'
                    retorno = retorno + "%C3%98"; break;
                case 61://caracter '='
                    retorno = retorno + "%3D"; break;
                case 34://caracter '"'
                    retorno = retorno + "%22"; break;
                case 40://caracter '('
                    retorno = retorno + "%28"; break;
                case 41://caracter '('
                    retorno = retorno + "%29"; break;
                case 241://caracter '�'
                    retorno = retorno + "%C3%B1"; break;
                case 209://caracter '�'
                    retorno = retorno + "%C3%91"; break;
                case 47://caracter '/'
                    retorno = retorno + "%2F"; break;
            }
        }
    }    
    return retorno;
}
function datePart(fecha, pos){
    var substr = fecha.split('/');
    return substr[pos];
}

function obtiene_fecha() {    
    var fecha_actual = new Date();  
    var dia = fecha_actual.getDate();
    var mes = fecha_actual.getMonth() + 1; 
    var anio = fecha_actual.getFullYear();  
    if (mes < 10){
    	mes = '0' + mes;
    }
    if (dia < 10){
    	dia = '0' + dia;
    }
    return (dia + "/" + mes + "/" + anio);  
}
function closeSession(){
	$("#frmCloseSession").submit();
}
function printReportView(){
	$("#frmReport").submit();
}
function generaNum(val,siz){
	var num = val;
	var _tam = siz-(""+val).length;
	var _th = "";
	for(var j=0; j<_tam; j++){
		_th+="0";
	}
	var _rt = _th+""+num;	
	return _rt;
}
function calcularCostoTotal(tot){
	var utilid = parseFloat(tot)*(parseFloat($("#txtUtilidad").val())/100);
	var gg = parseFloat(tot)*(parseFloat($("#txtGastG").val())/100);
	var s_t = (parseFloat(tot.toFixed(2))+parseFloat(utilid.toFixed(2))+parseFloat(gg.toFixed(2)));
	return (s_t).toFixed(2);
}
function redondear(numero)
{
	var original=parseFloat(numero);
	var result=Math.round(original*100)/100 ;
	return result;
}
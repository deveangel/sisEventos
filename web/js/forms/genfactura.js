var cod_accion = [];
var nom_accion = [];
var monto_fact = 0;
$(document).ready(function(){
	$("#lnkDialog").click(loadDialog);
	$("#buscarAccion").click( loadDialog );
	$("#txtNombreAccion").keyup(loadDataDialog);
	$("#txtCodigAccion").keyup(loadDataDialog);	
	$(".proyCheck").live('click', selItem );
	$("#aceptaDialog").click(aceptaDialog);
    $(".modAccionDetal").live('click', verAccionDetal );
    $("#genOrden").click(genFact);
    $("#dvPrint").hide();
});
function validar(){
	var f_i = $("#txt_serie").val();
	var f_f = $("#txt_num").val();
		if(f_i.length==0){
			$("#txt_serie").effect("pulsate", {times:3}, 200).focus();
			jAlert(mensaje_sistema[2]);
			return false;
		}else{
			if(f_f.length==0){
				$("#txt_num").effect("pulsate", {times:3}, 200).focus();
				jAlert(mensaje_sistema[2]);
				return false;
			}else{
				if(cod_accion.length==0){
					jAlert(mensaje_sistema[12]);
					$("#lnkDialog").effect("pulsate", {times:3}, 200).focus();						
					return false;
				}	
			}
		}
	return true;
}
function loadDialog(){
	$("#dlgAcciones").dialog({
        width: 730,
        high: 700,
        modal: true,
        resizable: false,
        show: "fold",
        position: 'top', 
        buttons: {
            Guardar: aceptaDialog,
            Salir: salirDialog
        }
    });
    loadDataDialog();    
}
function salirDialog(){
	$("#dlgAcciones").dialog('close');
}
function loadDataDialog(){
	var acc = utf8_encode($("#txtNombreAccion").val());
	var cod = utf8_encode($("#txtCodigAccion").val());
	var _ht = "";
	$.getJSON(url_sistema[0], {
        opt: 14,
        localize: url_sistema[22]
    },
    function(data){
    	if(data!=null){
    		$("#tblDialogAcciones tbody>tr").remove();
    		var datos = data.datos;
    		for(i=0; i<datos.length; i++){
    			var codigo = datos[i].cod;
    			var nombre = datos[i].direccion;
    			var totalvalor = datos[i].monto;
    			var posi = jQuery.inArray(codigo, cod_accion);
    			var check = ((posi!=-1)?"checked='true'":"");
    			$("#tblDialogAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+codigo+"</center></td>"+
                        "<td>"+nombre+"</td>"+
                        "<td><center>"+totalvalor+"</center></td>"+
                        "<td align='center'><input type='checkbox' "+check+
                        " class='proyCheck' cod_dialog='"+codigo+"', "+
                        "nom_dialog='"+nombre+"', mnt_ord='"+totalvalor+"'></td></tr>");
    		}
    	}
    });	
}
function aceptaDialog(){
	jConfirm(mensaje_sistema[154],"confirmacion",function(r){
		if(r==true){
			$("#tblAcciones").hide();
			if(cod_accion.length!=0){
				$("#tblAcciones").show();
				$("#tblAcciones tbody>tr").remove();
				for(i=0; i<cod_accion.length; i++){
					$("#tblAcciones tbody").append("<tr class='tResultado'>"+
	                        "<td><center>"+cod_accion[i]+"</center></td>"+
	                        "<td>"+nom_accion[i]+"</td>"+
	                        "<td><center><a href='#tblUsuarios' class='modAccionDetal' "+
	                        "cod_acci='"+cod_accion[i]+"' >DETALLE</a></center></td></tr>");	                        
				}
				$("#txt_mnt").val(monto_fact);
				var igv = monto_fact*(parseFloat($("#txtIgv").val())/100);
				$("#txt_igv").val(igv.toFixed(2));				
				$("#txt_tot").val((igv+monto_fact).toFixed(2));				
			}
			$("#dlgAcciones").dialog('close');
		}
	});    
}
function selItem(){
	var cod = this.getAttribute("cod_dialog");
    var nom = this.getAttribute("nom_dialog");
    var mnt = parseFloat(this.getAttribute("mnt_ord")); 
    if ($(this).is(':checked')){
    	cod_accion.push(cod);
    	nom_accion.push(nom);
    	monto_fact = parseFloat(monto_fact) + mnt; 
    }else{
    	var posi = jQuery.inArray(cod, cod_accion);
        nom_accion.splice(posi,1);
        cod_accion.splice(posi,1); 
    	monto_fact = parseFloat(monto_fact) - mnt;
    }
}
function verAccionDetal(){
	$("#dlgDetAcciones").dialog({
        width: 650,
        high: 800,
        modal: true,
        resizable: false,
        position: 'top', 
        buttons: {
            Salir: salirDialogMin
        }
    });
	var cod = this.getAttribute("cod_acci");
	loadDataDetDialog(cod);
}
function salirDialogMin(){
	$("#dlgDetAcciones").dialog('close');
}
function loadDataDetDialog(cod){
	var __igv = parseFloat($("#txtIgv").val())/100;
	$.getJSON(url_sistema[0], {
		opt: 6,
        localize: url_sistema[22],
        cod:cod
    },
    function(data){
    	if(data!=null){
    		$("#tblDialogDetAcciones tbody>tr").remove();
    		var datos = data.datos;
    		for(i=0; i<datos.length; i++){
    			var descripcion = datos[i].descripcion;
    			var cod = datos[i].codigo;
    			var t_v = datos[i].totalvalor;
    			var igv = t_v*parseFloat(__igv);
    			$("#tblDialogDetAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+cod+"</center></td>"+
                        "<td>"+descripcion+"</td>"+
                        "<td><center>"+t_v+"</center></td>"+
                        "<td><center>"+igv.toFixed(2)+"</center></td>"+
                        "<td><center>"+(t_v+igv).toFixed(2)+"</center></td></tr>");
    		}
    	}
    });	
}
function genFact(){
	if(validar()){
		var cmbTip = $("#cmbTipo").val();
		var serie = generaNum($("#txt_serie").val(),4);
		var num = generaNum($("#txt_num").val(),10);
		var obs = $("#txtObservaciones").val();
		var accion = getAcciones();
		jConfirm(mensaje_sistema[160],"confirmacion",function(r){
			if(r==true){
				$.getJSON(url_sistema[0], {
			        opt: 11,
			        localize:url_sistema[20],
			        tipo:cmbTip,
			        serie:serie,
			        numero:num,			        
			        codigos:accion,
			        observ:obs
			    },
			    function(data){
			    	if(data.success){
			    		jAlert(mensaje_sistema[67]+data.datos);
			    		$("#lblCodOrd").val(data.datos);
			    		$("#dvPrint").show();
			    		$("#dvGen").hide();
			    		lookText(true);
			    		$("#lnkFinfA").html("");
			    	}else{
			    		jAlert(mensaje_sistema[100]);
			    	}
			    });
			}
		});
	}		
}
function getAcciones(){
	var ht = "";
	for(i=0; i<cod_accion.length; i++){
		ht+=generaNum(cod_accion[i],10)+",";
	}
	return ht;
}
function lookText(op){
	$('#cmbTipo').attr("disabled", op);
	$('#txt_serie').attr("disabled", op);
	$('#txt_num').attr("disabled", op);
	$('#txtObservaciones').attr("disabled", op);
}
function datePart(fecha, pos){
    var substr = fecha.split('/');
    return substr[pos];
}
function printReport(){
	$("#frmReport").submit();
}
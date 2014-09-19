var cod_accion = [];
var nom_accion = [];
$(document).ready(function(){
	$("#savProyecto").click(guardarOrden);
	$("#cmbZonal").change(generaDistrito);
	$("#lnkDialog").click(loadDialog);
	$("#buscarAccion").click( loadDialog );
	$("#txtNombreAccion").keyup(loadDataDialog);
	$("#txtCodigAccion").keyup(loadDataDialog);	
	$(".proyCheck").live('click', selItem );
	$("#aceptaDialog").click(aceptaDialog);
    $(".modAccionDetal").live('click', verAccionDetal );
    $("#genOrden").click(genOrden);
    $("#fecha_ini_ord").change(validaFecha);
    $("#fecha_fin_ord").change(validaFecha);
    $("#dvPrint").hide();
});
function validaFecha(){
	var f_i = $("#fecha_ini_ord").val();
	var f_f = $("#fecha_fin_ord").val();
	if(f_i.length==0){
		jAlert(mensaje_sistema[107]);
		$("#fecha_fin_ord").val("");
		return;
	}
	var d_fi = new Date(datePart(f_i, 2), datePart(f_i, 1), datePart(f_i, 0));
    var d_ff = new Date(datePart(f_f, 2), datePart(f_f, 1), datePart(f_f, 0));
    if(d_fi>d_ff){
    	jAlert(mensaje_sistema[104]);
    	$("#fecha_fin_ord").val("");
    	return;
    }
}
function validar(){
	var f_i = $("#fecha_ini_ord").val();
	var f_f = $("#fecha_fin_ord").val();
	var dir = $("#txtDirecccion").val();
	if($("#cmbZonal").val()==-1){
		$("#cmbZonal ").effect("pulsate", {times:3}, 200).focus();
		jAlert(mensaje_sistema[4]);
		return false;
	}else {
		if(f_i.length==0){
			$("#fecha_ini_ord").effect("pulsate", {times:3}, 200).focus();
			jAlert(mensaje_sistema[3]);
			return false;
		}else{
			if(f_f.length==0){
				$("#fecha_fin_ord").effect("pulsate", {times:3}, 200).focus();
				jAlert(mensaje_sistema[3]);
				return false;
			}else{
				if(dir.length==0){
					$("#txtDirecccion").effect("pulsate", {times:3}, 200).focus();
					jAlert(mensaje_sistema[2]);
					return false;
				}else{
					if(cod_accion.length==0){
						jAlert(mensaje_sistema[5]);
						$("#lnkDialog").effect("pulsate", {times:3}, 200).focus();						
						return false;
					}
				}
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
        opt: 1,
        localize: url_sistema[22],
        filtro:acc+"-"+cod
    },
    function(data){
    	if(data!=null){
    		$("#tblDialogAcciones tbody>tr").remove();
    		var datos = data.datos;
    		for(i=0; i<datos.length; i++){
    			var codigo = datos[i].codigo;
    			var nombre = encode1(datos[i].descripcion);
    			var costodirecto = datos[i].costodirecto;
    			var gastosgenerales = datos[i].gastosgenerales;
    			var utilidad = datos[i].utilidad;
    			var t_v = calcularCostoTotal(datos[i].costodirecto);
    			var igv = datos[i].igv;
    			var totalvalor = datos[i].totalvalor;
    			var posi = jQuery.inArray(codigo, cod_accion);
    			var check = ((posi!=-1)?"checked='true'":"");
    			$("#tblDialogAcciones tbody").append("<tr class='tResultado'>"+
//    					"<td><center>"+(i+1)+"</center></td>"+
    					"<td><center>"+codigo+"</center></td>"+
                        "<td>"+nombre+"</td>"+
//                        "<td><center>"+gastosgenerales+"</center></td>"+
//                        "<td><center>"+costodirecto+"</center></td>"+
//                        "<td><center>"+utilidad+"</center></td>"+
//                        "<td><center>"+igv+"</center></td>"+
                        "<td><center>"+t_v+"</center></td>"+
                        "<td align='center'><input type='checkbox' "+check+
                        " class='proyCheck' cod_dialog='"+codigo+"', "+
                        "nom_dialog='"+nombre+"'></td></tr>");
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
			}
			$("#dlgAcciones").dialog('close');
		}
	});    
}
function guardarOrden(){
	if(confirm(mensaje_sistema[154],"confirmacion")){
		alert(mensaje_sistema[51]);
	}
}
function generaDistrito(){
	var cod = $("#cmbZonal").val();
	var html = "";
	if(cod!=-1){
		$.getJSON(url_sistema[0], {
	        opt: 4,
	        localize: url_sistema[21],
	        cod:cod
	    },
	    function(data){
	    	if(data.success){
	    		var datos = data.datos;
	    		for(i=0; i<datos.length; i++){
	    			html+="<option value='"+datos[i].cod+"'>"+datos[i].nombre+"</option>";
	    		}
	    		$("#cmbDistrito").html(html);
	    	}
	    });
	}
}
function selItem(){
	var cod = this.getAttribute("cod_dialog");
    var nom = this.getAttribute("nom_dialog");
    if ($(this).is(':checked')){
    	cod_accion.push(cod);
    	nom_accion.push(nom);
    }else{
    	var posi = jQuery.inArray(cod, cod_accion);
        nom_accion.splice(posi,1);
        cod_accion.splice(posi,1);
    }
    write();
}
function write(){
	var htm = "\n";
	if(cod_accion.length==0){
		$("#proyectoSeleccionadoFaild").show();
		$("#proyectoSeleccionadoCheck").html("");
	}else{
		$("#proyectoSeleccionadoFaild").hide();
		for(i=0; i<cod_accion.length; i++){
			htm+="\t\t\t<li>"+nom_accion[i]+"</li>\n";
		}
		$("#proyectoSeleccionadoCheck").html(htm);	
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
	$.getJSON(url_sistema[0], {
        opt: 2,
        localize: url_sistema[22],
        cod:cod
    },
    function(data){
    	if(data!=null){
    		$("#tblDialogDetAcciones tbody>tr").remove();
    		var datos = data.datos;
    		for(i=0; i<datos.length; i++){
    			var item = datos[i].item;
    			var nombre = datos[i].descripcion;
    			var unidad = datos[i].unidad;
    			var metrado = datos[i].metrado;
    			var precio_unitario = datos[i].precio_unitario;
    			var costo_parcial = datos[i].costo_parcial;
    			$("#tblDialogDetAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+item+"</center></td>"+
                        "<td>"+nombre+"</td>"+
                        "<td><center>"+unidad+"</center></td>"+
                        "<td><center>"+metrado+"</center></td>"+
                        "<td><center>"+precio_unitario+"</center></td>"+
                        "<td><center>"+costo_parcial+"</center></td></tr>");
    		}
    	}
    });	
}
function genOrden(){
	if(validar()){
		var cmbZon = $("#cmbZonal").val();
		var cmbDist = $("#cmbDistrito").val();
		var fec_ini = $("#fecha_ini_ord").val();
		var fec_fin = $("#fecha_fin_ord").val();
		var direc = $("#txtDirecccion").val();	
		fec_ini = datePart(fec_ini, 2)+"-"+datePart(fec_ini, 1)+"-"+datePart(fec_ini, 0);
		fec_fin = datePart(fec_fin, 2)+"-"+datePart(fec_fin, 1)+"-"+datePart(fec_fin, 0);
		var observ = $("#txtObservaciones").val();
		var accion = getAcciones();
		jConfirm(mensaje_sistema[170],"confirmacion",function(r){
			if(r==true){
				$.getJSON(url_sistema[0], {
			        opt: 3,
			        localize: url_sistema[22],
			        cod_dist:cmbDist,
			        cod_zon:cmbZon,
			        fec_proy_i:fec_ini,
			        fec_proy_f:fec_fin,
			        direc:direc,
			        obs:observ,
			        accions:accion
			    },
			    function(data){
			    	if(data.success){
			    		if( data.datos.substring(0,1)=='o'){
			    			var cdd = data.datos.substring(1,data.datos.length+1);
			    			jAlert(mensaje_sistema[53]+""+data.datos.substring(1,data.datos.length+1));
				    		$("#lblCodOrd").val(data.datos.substring(1,data.datos.length+1));
				    		$("#dvPrint").show();
				    		$("#dvGen").hide();
				    		lookText(true);
				    		$("#lnkFinfA").html("");
				    		$.getJSON(url_sistema[0], {
				    	        opt: 16,
				    	        localize: url_sistema[22],
				    	        cod:cdd
				    	    },function(data){});
			    		}else{
			    			jAlert(mensaje_sistema[109]+""+data.datos.substring(1,data.datos.length+1));
			    		}			    		
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
		ht+=cod_accion[i]+",";
	}
	return ht;
}
function lookText(op){
	$('#cmbZonal').attr("disabled", op);
	$('#cmbDistrito').attr("disabled", op);
	$('#fecha_ini_ord').attr("disabled", op);
	$('#fecha_fin_ord').attr("disabled", op);
	$('#txtDirecccion').attr("disabled", op);
	$('#txtObservaciones').attr("disabled", op);
}
function datePart(fecha, pos){
    var substr = fecha.split('/');
    return substr[pos];
}
function printReport(){
	$("#frmReport").submit();
}
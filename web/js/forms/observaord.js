$(document).ready(function(){
	$('.ejecutar').live('click',ejecutar);
	$('.linkBuscar').live('click',buscarOrdenes);		
	$("#linkBack").click(atras);
	$("#ejecutarOrd").click(ejecutOrd);
	cargarHora();
});
function cargarHora(){
	$("#fecha_ini_ord").val(obtiene_fecha());
	$("#fecha_fin_ord").val(obtiene_fecha());
} 
function validar(){
	var sup = $("#txtObservaciones").val();
	if(sup.length==0){
		jAlert(mensaje_sistema[2]);
		$("#txtObservaciones").effect("pulsate", {times:3}, 200).focus();
		return false;
	}
	return true;
}
function ejecutOrd(){
	var cod = $("#txtCodigo").val();
	var obs = $("#txtObservaciones").val();
	if(validar()){
		jConfirm(mensaje_sistema[171],"confirmacion",function(r){
			if(r==true){
				$.getJSON(url_sistema[0], {
			        opt: 22,
			        localize: url_sistema[22],
			        observ:obs,
			        cod_o:cod
			    },
			    function(data){
			    	if(data.success){
			    		jAlert(mensaje_sistema[70]);
			    		atras();
			    	}else{
			    		jAlert(mensaje_sistema[100]);
			    	}
			    });
			}
		});
	}	
}
function atras(){
	$("#tbl_detail").fadeOut(1,callback);
	$("#tbl_main").fadeIn(2000,callback);
	$("#txtCodigo").val("");
	$("#linkBuscar0").click();
}
function ejecutar(){
	$("#tblAcciones").hide();
	var cod = this.getAttribute("cod");
	$("#tblAcciones tbody>tr").remove();
	$("#tbl_main").hide();
	$("#txtCodigo").val(cod);
	$("#lblCodOrd").val(cod);
	
	$.getJSON(url_sistema[0], {
        opt: 5,
        localize: url_sistema[22],
        cod:cod
    },
    function(data){
    	if(data.success){
    		var datos = data.datos;
    		var f_i = datos.fec_ini_proyectado;
    		var f_f = datos.fec_fin_proyectado;
    		$("#lblZonal").text(datos.cod_zon);
    		$("#lblDistrito").text(datos.cod_dist);
    		$("#lblDireccion").text(datos.direccion);
    		$("#lblObservacion").text(datos.observacion);
    		$("#lblFechaCreac").text(datos.fecha_creacion);
    		$("#lblFechaEjec").text(f_i+" hasta: "+f_f);
    		$("#lblPlazo").text(""+calculaDias(f_i,f_f)+" dias");
    		$("#lblUsuario").text(datos.usuario);
    	}
    });
	$("#tbl_detail").fadeIn(2000,callback);
}
function callback(){
	myvar = this;
}
function buscarOrdenes(){
	var f_i = $("#fecha_ini_ord").val();
	var f_f = $("#fecha_fin_ord").val();
	var txt = $("#txtBusqueda").val();
	var cod = $("#txtCodOrd").val();
	f_i = datePart(f_i, 2)+"-"+datePart(f_i, 1)+"-"+datePart(f_i, 0);
	f_f = datePart(f_f, 2)+"-"+datePart(f_f, 1)+"-"+datePart(f_f, 0);
	$.getJSON(url_sistema[0], {
        opt: 21,
        localize: url_sistema[22],
        fec_i:f_i,
        fec_f:f_f,
        direc:txt+"-"+cod
    },
    function(data){
    	if(data!=null){
    		$("#tblProyectos tbody>tr").remove();
    		var datos = data.datos;
    		for(i=0; i<datos.length; i++){
    			var direc = datos[i].direccion;
    			var cod = datos[i].cod;
    			var f_i = datos[i].fecha_creacion;
    			var f_f = datos[i].fec_ini_proyectado;
    			$("#tblProyectos tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+cod+"</center></td>"+
    					"<td>"+direc+"</td>"+
    					"<td><center>"+f_i+"</center></td>"+
    					"<td><center>"+f_f+"</center></td>"+
    					"<td><center><a href='#epsgrau' class='ejecutar' cod='"+cod+"'>DETALLE</a></center></td></tr>");
    		}
    	}
    });	
}
function buscarObservaciones(){
	var cod_o = $("#txtCodigo").val();
	$("#dlgDetAcciones").dialog({
        width: 650,
        high: 800,
        modal: true,
        resizable: false,
        show: "fold",
        position: 'top', 
        buttons: {
            Salir: salirDialog
        }
    });
	loadDataDetDialog(cod_o);
}
function salirDialog(){
	$("#dlgDetAcciones").dialog('close');
}
function loadDataDetDialog(cod_o){
	$.getJSON(url_sistema[0], {
        opt: 23,
        localize: url_sistema[22],
        cod:cod_o
    },
    function(data){
    	if(data!=null){
    		datos = data.datos;
    		$("#tblDialogDetAcciones tbody>tr").remove();
    		for(i=0; i<datos.length; i++){
    			var us_g = datos[i].usr_obs;
    			var de_g = datos[i].des_obs;
    			var f_g = datos[i].fec_obs;
    			var us_r = datos[i].usr_rsp;
    			var de_r = datos[i].des_rsp;
    			var f_r = datos[i].fec_rsp;
    			$("#tblDialogDetAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+f_g+"</center></td>"+
                        "<td>"+us_g+"</td>"+
                        "<td><center>"+de_g+"</center></td>"+
                        "<td><center>"+f_r+"</center></td>"+
                        "<td><center>"+us_r+"</center></td>"+
                        "<td><center>"+de_r+"</center></td></tr>");
    		}
    	}
    });	
}
$(document).ready(function(){
	$('.ejecutar').live('click',ejecutar);
	$('.linkBuscar').live('click',buscarOrdenes );	
	$('.linkBuscarAccion').live('click',buscarAcciones );
	$('.loadItemAcc').live('click',buscarItem );	
	$("#linkBack").click(atras);
	$("#ejecutarOrd").click(ejecutOrd);
	cargarHora();
});
function cargarHora(){
	$("#fecha_ini_ord").val(obtiene_fecha());
	$("#fecha_fin_ord").val(obtiene_fecha());
}
function ejecutOrd(){
	// http://localhost:7070/controlserviceController/Prueba?localize=AccionesController&opt=8&cod=1
	var cod = $("#txtCodigo").val();
	jConfirm(mensaje_sistema[160],"confirmacion",function(r){
		if(r==true){
			$.getJSON(url_sistema[0], {
		        opt: 8,
		        localize: url_sistema[22],
		        cod:cod
		    },
		    function(data){
		    	if(data.success){
		    		jAlert(mensaje_sistema[54]);
		    		atras();
		    	}else{
		    		jAlert(mensaje_sistema[100]);
		    	}
		    });
		}
	});
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
function buscarAcciones(){
	$("#tblAcciones").fadeIn(2000,callback);
	var cod = $("#txtCodigo").val();
	$.getJSON(url_sistema[0], {
        opt: 6,
        localize: url_sistema[22],
        cod:cod
    },
    function(data){
    	if(data!=null){
    		$("#tblAcciones tbody>tr").remove();
    		var datos = data.datos;
    		for(i=0; i<datos.length; i++){
    			var descripcion = datos[i].descripcion;
    			var cod = datos[i].codigo;
    			var c_d = datos[i].costodirecto;
    			var g_g = datos[i].gastosgenerales;
    			var util = datos[i].utilidad;
    			var s_t = datos[i].subtotal;
    			var igv = datos[i].igv;
    			var t_v = datos[i].totalvalor;
    			$("#tblAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+cod+"</center></td>"+
    					"<td>"+descripcion+"</td>"+
    					"<td><center>"+t_v+"</center></td>"+
    					"<td><center><a href='#epsgrau' class='loadItemAcc' "+
    					"cod='"+cod+"', t_v='"+t_v+"', igv='"+igv+"', s_t='"+s_t+"', "+
    					"util='"+util+"', g_g='"+g_g+"', c_d='"+c_d+"', desc='"+descripcion+"'>"+
    					"DETALLE</a></center></td></tr>");
    		}
    	}
    });
}
function buscarOrdenes(){
	var f_i = $("#fecha_ini_ord").val();
	var f_f = $("#fecha_fin_ord").val();
	var txt = $("#txtBusqueda").val();
	var cod = $("#txtCodOrd").val();
	f_i = datePart(f_i, 2)+"-"+datePart(f_i, 1)+"-"+datePart(f_i, 0);
	f_f = datePart(f_f, 2)+"-"+datePart(f_f, 1)+"-"+datePart(f_f, 0);
	$.getJSON(url_sistema[0], {
        opt: 13,
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
function buscarItem(){
	var cod_a = this.getAttribute("cod");
	var cod_o = $("#txtCodigo").val();
	var t_v = this.getAttribute("t_v");
	var igv = this.getAttribute("igv");
	var s_t = this.getAttribute("s_t");
	var util = this.getAttribute("util");
	var g_g = this.getAttribute("g_g");
	var c_d = this.getAttribute("c_d");
	var desc = this.getAttribute("desc");
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
	$("#lblNombAccion").text(desc);
	loadDataDetDialog(cod_a,cod_o);
}
function salirDialog(){
	$("#dlgDetAcciones").dialog('close');
}
function loadDataResDialog(tot){
	var utilid = parseFloat(tot)*(parseFloat($("#txtUtilidad").val())/100);
	var gg = parseFloat(tot)*(parseFloat($("#txtGastG").val())/100);
	var s_t = parseFloat(tot)+parseFloat(utilid)+parseFloat(gg);
	var igv = parseFloat(s_t)*(parseFloat($("#txtIgv").val())/100);
	$("#tblDialogDetAccionesItems tbody>tr").remove();
	$("#tblDialogDetAccionesItems tbody").append("<tr class='tResultado'>"+
			"<td><center>("+redondear(tot)+" +</center></td>"+
			"<td><center>"+redondear(gg)+" +</center></td>"+
			"<td><center>"+redondear(utilid)+")</center></td>"+
			"<td><center>="+redondear(s_t)+"+</center></td>"+
			"<td><center>"+redondear(igv)+"</center></td>"+
			"<td><center>="+redondear(s_t+igv)+"</center></td></tr>");
}

function loadDataDetDialog(cod_a,cod_o){
	$.getJSON(url_sistema[0], {
        opt: 7,
        localize: url_sistema[22],
        cod_acc:cod_a,
        cod_ord:cod_o
    },
    function(data){
    	if(data!=null){
    		$("#tblDialogDetAcciones tbody>tr").remove();
    		var datos = data.datos;
    		var cost_directo = 0;
    		for(i=0; i<datos.length; i++){
    			var item = datos[i].item;
    			var nombre = datos[i].descripcion;
    			var unidad = datos[i].unidad;
    			var metrado_r = datos[i].metrado_real;
    			var precio_unitario = datos[i].precio_unitario;
    			var costo_parcial = 0;
    			if(metrado_r>0){
    				costo_parcial = parseFloat(metrado_r)*parseFloat(precio_unitario);
    				cost_directo += costo_parcial;
    			}
    			$("#tblDialogDetAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+item+"</center></td>"+
                        "<td>"+nombre+"</td>"+
                        "<td><center>"+unidad+"</center></td>"+
                        "<td><center>"+precio_unitario+"</center></td>"+
                        "<td><center>"+metrado_r+"</center></td>"+
                        "<td><center>"+redondear(costo_parcial)+"</center></td></tr>");
    		}
    		loadDataResDialog(cost_directo);
    	}
    });	
}
function datePart(fecha, pos){
    var substr = fecha.split('/');
    return substr[pos];
}
function calculaDias(fecha_e, fecha_r){
    fecha1=new Date(fecha_e.substring(0,4),fecha_e.substring(5,7),fecha_e.substring(8,10));
    fecha2=new Date(fecha_r.substring(0,4),fecha_r.substring(5,7),fecha_r.substring(8,10));
    var resta=(fecha2-fecha1)/1000/3600/24;
    return resta;
}
function printReport(){
	$("#frmReport").submit();
}
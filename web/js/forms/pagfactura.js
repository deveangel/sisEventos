$(document).ready(function(){
	$('.ejecutar').live('click',ejecutar);
	$('.linkBuscar').live('click',buscarFacturas );	
	$("#linkBack").click(atras);
	$("#ejecutarOrd").click(ejecutOrd);
	buscarFacturas();
});
function validar(){
	var sup = $("#txtSuperv").val();
	if(sup.length==0){
		jAlert(mensaje_sistema[6]);
		$("#txtSuperv").effect("pulsate", {times:3}, 200).focus();
		return false;
	}
	return true;
}
function ejecutOrd(){
	// http://localhost:7070/controlserviceController/Prueba?localize=AccionesController&opt=8&cod=1
	var cod = $("#txtCodigo").val();
	if(validar()){
		jConfirm(mensaje_sistema[160],"confirmacion",function(r){
			if(r==true){
				$.getJSON(url_sistema[0], {
			        opt: 8,
			        localize: url_sistema[22],
			        superv:$("#txtSuperv").val()+"-"+$("#txtObservaciones").val(),
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
}
function atras(){
	$("#tbl_detail").fadeOut(1,callback);
	$("#tbl_main").fadeIn(2000,callback);
	$("#txtCodigo").val("");
	$("#linkBuscar0").click();
}
function ejecutar(){
	var cmbTip = this.getAttribute("ttipo");
	var serie = this.getAttribute("sserie");
	var num = this.getAttribute("nnumero");
	jConfirm(mensaje_sistema[161],"confirmacion",function(r){
		if(r==true){
			$.getJSON(url_sistema[0], {
		        opt: 12,
		        localize:url_sistema[20],
		        tipo:cmbTip,
		        serie:serie,
		        numero:num
		    },
		    function(data){
		    	if(data.success && data.datos=='ok'){
		    		jAlert(mensaje_sistema[65]);
		    		buscarFacturas();
		    	}else{
		    		jAlert(mensaje_sistema[100]);
		    	}
		    });
		}
	});
}
function callback(){
	myvar = this;
}
function buscarFacturas(){
	$.getJSON(url_sistema[0], {
        opt: 15,
        localize: url_sistema[22]
    },
    function(data){
    	if(data!=null){
    		$("#tblProyectos tbody>tr").remove();
    		var datos = data.datos;
    		for(i=0; i<datos.length; i++){
    			var nro_f = datos[i].nro_fact;
    			var serie = datos[i].serie;
    			var num = datos[i].numero;
    			var tip = datos[i].tipo;
    			var f_g = datos[i].fecha_generac;
    			var mnt_t = datos[i].monto_total;
    			$("#tblProyectos tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+nro_f+"</center></td>"+
    					"<td><center>"+serie+"</center></td>"+
    					"<td><center>"+num+"</center></td>"+
    					"<td><center>"+f_g+"</center></td>"+
    					"<td><center>"+mnt_t+"</center></td>"+
    					"<td><center><a href='#epsgrau' class='ejecutar' sserie='"+serie+"' nnumero='"+num+"' ttipo='"+tip+"'>PAGAR</a></center></td></tr>");
    		}
    	}
    });	
}
function salirDialog(){
	$("#dlgDetAcciones").dialog('close');
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
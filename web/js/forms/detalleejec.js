$(document).ready(function(){
	$('.ejecutar').live('click',ejecutar);
	$('.linkBuscar').live('click',buscarOrdenes );
	buscarOrdenes();
});
function ejecutar(){
	var opt = $("#opcionRep").val();
	if(opt==13){//solo para ver las ordenes ejecutadas ya que este mi pide un codigo 
		var cod = this.getAttribute("cod");
		$("#lblCodOrd").val(cod);
		$("#frmReport").submit();
	}	
}
function callback(){
	myvar = this;
}
function buscarOrdenes(){
	$.getJSON(url_sistema[0], {
        opt: 27,
        localize: url_sistema[22]
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
    					"<td><center><a href='#epsgrau' class='ejecutar' cod='"+cod+"'>VISUALIZAR</a></center></td></tr>");
    		}
    	}
    });	
}
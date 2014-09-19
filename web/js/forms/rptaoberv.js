$(document).ready(function(){
	$('.ejecutar').live('click',buscarObservaciones);
	$(".ejecutarOrd").live('click',ejecutOrd);
	buscarOrdenes();
});
function ejecutOrd(){
	var codi = this.getAttribute("cod");
		jConfirm(mensaje_sistema[157],"confirmacion",function(r){
			if(r==true){
				$.getJSON(url_sistema[0], {
			        opt: 26,
			        localize: url_sistema[22],
			        cod:codi
			    },
			    function(data){
			    	if(data.success){
			    		jAlert(mensaje_sistema[63]);
			    		buscarOrdenes();
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
function buscarOrdenes(){
	$.getJSON(url_sistema[0], {
        opt: 21,
        localize: url_sistema[22],
        fec_i:'0',
        fec_f:'9999-99-99',
        direc:"-"
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
    					"<td><center><a href='#epsgrau' class='ejecutar' cod='"+cod+"'>VER RESPUESTA</a></center></td>"+
    					"<td><center><a href='#epsgrau' class='ejecutarOrd' cod='"+cod+"'>EJECUTAR</a></center></td>"+
    					"</tr>");
    		}
    	}
    });	
}
function buscarObservaciones(){
	var cod_o = this.getAttribute("cod");
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
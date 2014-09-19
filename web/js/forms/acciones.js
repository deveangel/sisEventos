$(document).ready(function(){
	$('.linkBuscarAccion').live('click',buscarAcciones );
	$("#txtNombreAccion").keyup(buscarAcciones);
	$("#txtCodigAccion").keyup(buscarAcciones);	
	$('.loadItemAcc').live('click',buscarItem );
});
function buscarAcciones(){
	var acc = utf8_encode($("#txtNombreAccion").val());
	var cod = utf8_encode($("#txtCodigAccion").val());
	$.getJSON(url_sistema[0], {
        opt: 1,
        localize: url_sistema[22],
        filtro:acc+"-"+cod
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
    			var t_v = calcularCostoTotal(datos[i].costodirecto);
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
        show: "fold",
        position: 'top',
        resizable: false,
        buttons: {
            Salir: salirDialog
        }
    });
	$("#lblNombAccion").text(desc);
	loadDataDetDialog(cod_a,cod_o);
}
function loadDataResDialog(tot){
	var utilid = parseFloat(tot)*(parseFloat($("#txtUtilidad").val())/100);
	var gg = parseFloat(tot)*(parseFloat($("#txtGastG").val())/100);
	var s_t = (parseFloat(tot.toFixed(2))+parseFloat(utilid.toFixed(2))+parseFloat(gg.toFixed(2)));
	var igv = parseFloat(s_t)*(parseFloat($("#txtIgv").val())/100);
	$("#tblDialogDetAccionesItems tbody>tr").remove();
	$("#tblDialogDetAccionesItems tbody").append("<tr class='tResultado'>"+
			"<td><center>("+tot.toFixed(2)+" +</center></td>"+
			"<td><center>"+(gg).toFixed(2)+" +</center></td>"+
			"<td><center>"+utilid.toFixed(2)+")</center></td>"+
			"<td><center>="+s_t.toFixed(2)+"+</center></td>"+
			"<td><center>"+igv.toFixed(2)+"</center></td>"+
			"<td><center>="+(s_t+igv).toFixed(2)+"</center></td></tr>");
}
function salirDialog(){
	$("#dlgDetAcciones").dialog('close');
}
function loadDataDetDialog(cod_a,cod_o){
	$.getJSON(url_sistema[0], {
        opt: 2,
        localize: url_sistema[22],
        cod:cod_a
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
    			var metrado = datos[i].metrado;
    			var precio_unitario = datos[i].precio_unitario;
    			var costo_parcial = datos[i].costo_parcial;
    			var valr = "";
    			if(metrado>0){
    				valr = metrado;
    				cost_directo += parseFloat(valr)*parseFloat(precio_unitario);
    			}
    			$("#tblDialogDetAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+item+"</center></td>"+
                        "<td>"+nombre+"</td>"+
                        "<td><center>"+unidad+"</center></td>"+
                        "<td><center>"+metrado+"</center></td>"+
                        "<td><center>"+precio_unitario+"</center></td>"+
                        "<td><center>"+costo_parcial+"</center></td></tr>");
    		}
    		loadDataResDialog(cost_directo);
    	}
    });	
}
var tam ;
var cod_array = [];
var met_array = [];
var desc_array = [];
var cod_acci;
var cod_insum = [];
$(document).ready(function(){
	$('.ejecutar').live('click',ejecutar);
	$('.linkBuscar').live('click',buscarOrdenes);		
	$("#linkBack").click(atras);
	$(".proyCheck").live('click', selItem );
	$('.loadItemAcc').live('click',buscarItem);
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
			        opt: 25,
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
	buscarAcciones();
	$("#tbl_detail").fadeIn(2000,callback);
}
function callback(){
	myvar = this;
}
function buscarAcciones(){
	var cod = $("#txtCodigo").val();
	$("#tblAccionesDetalle").fadeIn(2000,callback);
	$.getJSON(url_sistema[0], {
        opt: 6,
        localize: url_sistema[22],
        cod:cod
    },
    function(data){
    	if(data!=null){
    		$("#tblAccionesDetalle tbody>tr").remove();
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
    			$("#tblAccionesDetalle tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+cod+"</center></td>"+
    					"<td>"+descripcion+"</td>"+
    					"<td><center>"+t_v+"</center></td>"+
    					"<td><center><a href='#epsgrau' class='loadItemAcc' "+
    					"cod='"+cod+"', t_v='"+t_v+"', igv='"+igv+"', s_t='"+s_t+"', "+
    					"util='"+util+"', g_g='"+g_g+"', c_d='"+c_d+"', desc='"+descripcion+"'>"+
    					"ADMINISTRAR</a></center></td></tr>");
    		}
    	}
    });
}
function buscarItem(){
	var cod_a = this.getAttribute("cod");
	cod_acci = cod_a;
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
        	"Insumos Adicionales": dialogIns,
            Guardar: guardarMetad,
            Salir: salirDialog
        }
    });
	$("#lblNombAccion").text(desc);
	loadDataDetDialog();
}
function loadDataDetDialog(){
	var cod_o = $("#txtCodigo").val();
	$.getJSON(url_sistema[0], {
        opt: 7,
        localize: url_sistema[22],
        cod_acc:cod_acci,
        cod_ord:cod_o
    },
    function(data){
    	cod_insum.splice(0);
    	cod_array.splice(0);
		met_array.splice(0);
		desc_array.splice(0);
    	if(data!=null){
    		$("#tblDialogDetAcciones tbody>tr").remove();
    		var datos = data.datos;
    		tam = datos.length;
    		var cost_directo = 0;
    		for(i=0; i<tam; i++){
    			var item = datos[i].item;
    			var nombre = datos[i].descripcion;
    			var unidad = datos[i].unidad;
    			var metrado = datos[i].metrado;
    			var metrado_r = datos[i].metrado_real;
    			var valr = "";
    			var precio_unitario = datos[i].precio_unitario;
    			var costo_parcial = 0;
    			if(metrado_r>0){
    				valr = metrado_r;
        			var costo_parcial = parseFloat(valr)*parseFloat(precio_unitario);
    				cost_directo += costo_parcial;
    			}
    			cod_array[i] = item;
    			met_array[i] = metrado;
    			desc_array[i] = nombre;
    			$("#tblDialogDetAcciones tbody").append("<tr class='tResultado'>"+
    					"<td><center>"+item+"</center></td>"+
                        "<td>"+nombre+"</td>"+
                        "<td><center>"+unidad+"</center></td>"+
                        "<td><center>"+precio_unitario+"</center></td>"+
                        "<td><center><input type='text' name='txtMet_"+(i)+"' id='txtMet_"+(i)+"' "+
                        "size='2' value='"+valr+"'/></center></td>"+
                        "<td><center>"+redondear(costo_parcial)+"</center></td></tr>");
    		}
    		loadDataResDialog(cost_directo);
    	}
    });	
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
function guardarMetad(){
	var cod = $("#txtCodigo").val();
	var htm = "";
	for(var i=0; i<tam; i++){
		var val = $("#txtMet_"+i+"").val();
		if((""+val).length!=0){
			if(met_array[i]>=0){
				htm+=cod_array[i]+"-"+generaNum(val,8)+",";
			}else{
				$("#txtMet_"+i+"").effect("pulsate", {times:5}, 200).focus();
				jAlert(mensaje_sistema[7]+"\n"+desc_array[i]);
				return;
			}			
		}
	}
	jConfirm(mensaje_sistema[155],"confirmacion",function(r){
		if(r==true){
			$.getJSON(url_sistema[0], {
		        opt: 11,
		        localize: url_sistema[22],
		        cod_o:cod,
		        cod_a:cod_acci,
		        itms:htm
		    },
		    function(data){
		    	if(data!=null){
		    		jAlert(mensaje_sistema[58]);
		    		buscarAcciones();
		    		$("#dlgDetAcciones").dialog('close');
		    	}else{
		    		jAlert(mensaje_sistema[100]);
		    	}
		    });
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
        opt: 24,
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
	$("#dlgDetObservacciones").dialog({
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
	loadDataDetObservacions(cod_o);
}
function salirDialog(){
	$("#dlgDetAcciones").dialog('close');
	$("#dlgDetObservacciones").dialog('close');
}
function loadDataDetObservacions(cod_o){
	$.getJSON(url_sistema[0], {
        opt: 23,
        localize: url_sistema[22],
        cod:cod_o
    },
    function(data){
    	if(data!=null){
    		datos = data.datos;
    		$("#tblDialogDetObservaciones tbody>tr").remove();
    		for(i=0; i<datos.length; i++){
    			var us_g = datos[i].usr_obs;
    			var de_g = datos[i].des_obs;
    			var f_g = datos[i].fec_obs;
    			var us_r = datos[i].usr_rsp;
    			var de_r = datos[i].des_rsp;
    			var f_r = datos[i].fec_rsp;
    			$("#tblDialogDetObservaciones tbody").append("<tr class='tResultado'>"+
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
function dialogIns(){
	$("#dlgInsumoAdic").dialog({
        width: 400,
        high: 800,
        modal: true,
        resizable: false,
        show: "fold",
        position: 'top',
        buttons: {
            Guardar: guardarInsumos
        }
    });
	loadDataInsumos();
}
function loadDataInsumos(){
	$.getJSON(url_sistema[0], {
        opt: 19,
        localize: url_sistema[22]
    },
    function(data){
        $("#tblInsumos tbody>tr").remove();
        if(data!=null){				
            $('#headTblInsumos').html(data.head);
            datos = data.datos;
            for (var x = 0; x < datos.length; x += 1){
                var id = datos[x].cod;
                var desc = datos[x].desc;
                var prec = datos[x].precio;
                var unid = datos[x].unidad;
                var posi = jQuery.inArray(id, cod_array);
                //disabled='true' 
    			var check = ((posi!=-1)?"checked='true' ":"");//para saber si ya esta seleccionado
                $("#tblInsumos tbody").append("<tr class='tResultado'>"+
                		"<td><center>"+id+"</center></td>"+
                		"<td>"+desc+"</td>"+
                		"<td><center>"+prec+"</center></td>"+
                		"<td><center>"+unid+"</center></td>"+
                		"<td align='center'>"+
                		 	"<input type='checkbox' "+check+" class='proyCheck' "+
                		 	"cod_ins='"+id+"', desc='"+desc+"', prec='"+prec+"', unid='"+unid+"'>"+
                         "</td></tr>");
            }
        }else{
            jAlert("Error al recuperar los datos");
        }
    }
    );
}
function selItem(){
	var cod = this.getAttribute("cod_ins");
	var existCod = jQuery.inArray(cod, cod_array);	
	var posi = jQuery.inArray(cod, cod_insum);
    if ($(this).is(':checked')){
    	if(existCod==-1){
    		cod_insum.push(cod);
    	}else{
    		cod_insum.splice(posi,1);
    	}    	
    }else{
    	if(existCod!=-1){
    		cod_insum.push(cod);
    	}else{
    		cod_insum.splice(posi,1);
    	}        
    }
}
function guardarInsumos(){
	var cod = $("#txtCodigo").val();
	var htm = "";
	for(var i=0; i<cod_insum.length; i++){
		var val = cod_insum[i];
		var op = jQuery.inArray(val, cod_array);
		htm+=generaNum(val,3)+((op==-1)?"I":"D")+",";
	}	
	jConfirm(mensaje_sistema[162],"confirmacion",function(r){
		if(r==true){
			$.getJSON(url_sistema[0], {
		        opt: 20,
		        localize: url_sistema[22],
		        cod_o:cod,		        
				cod_a:cod_acci,
				itms:htm
		    },function(data){
		    	if(data.success==true){
		    		jAlert(mensaje_sistema[68]);
		    		$("#dlgInsumoAdic").dialog('close');
		    		loadDataDetDialog();
		    		cod_insum.splice(0);
		    	}else{
		    		jAlert(mensaje_sistema[100]);
		    	}		    	
		    });
		}
	});
}
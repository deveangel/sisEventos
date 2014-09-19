$(document).ready(function(){
    $.ajaxSetup({
        cache: false
    });	
    $(".linkBuscar").live('click', buscar );	
    $("#savUsuario").click( guardarInsumo );	
    $(".modInsumo").live('click', seleccionarInsumo );
    $("#txtBusqueda").keyup(buscar);
    load();
    buscar();
});
//---------------------------------- usuarios    ------------------
function load(){
	$("#savUsuario").text("NUEVO INSUMO");
}
function buscar(){
    var txt = ($("#txtBusqueda").val()).toUpperCase();
    $.getJSON(url_sistema[0], {
        opt: 19,
        localize: url_sistema[22]
    },
    function(data){
        $("#tblInsumos tbody>tr").remove();
        if(data!=null){				
            $('#headtblInsumos').html(data.head);
            $('#footertblInsumos').html(data.footer);
            datos = data.datos;
            for (var x = 0; x < datos.length; x += 1){
                var id = datos[x].cod;
                var desc = datos[x].desc;
                var prec = datos[x].precio;
                var unid = datos[x].unidad;
                $("#tblInsumos tbody").append("<tr class='tResultado'>"+
                		"<td><center>"+id+"</center></td>"+
                		"<td>"+desc+"</td>"+
                		"<td><center>"+prec+"</center></td>"+
                		"<td><center>"+unid+"</center></td>"+
                		"<td><center><a href='#!' class='modInsumo' id='"+id+"', desc='"+desc+"', prec='"+prec+"', unid='"+unid+"'>MODIFICAR</a></center></td></tr>")
            }
        }else{
            jAlert("Error al recuperar los datos");
        }
    }
    );
}
function lookText(op){
	$('#txtNombres').attr("disabled", op);
	$('#txtPrecio').attr("disabled", op);
	$('#txtUnidades').attr("disabled", op);
}
function guardarInsumo(){
	var idd = $("#txtCodigo").val();
	var nomb = $("#txtNombres").val();
	var preci = $("#txtPrecio").val();
	var unida = $("#txtUnidades").val();
    var modo = $("#savUsuario").text();
    var ruta;
    if (modo=='MODIFICAR'){
        op = 18;
    }else{
    	if(modo=='NUEVO INSUMO'){
    		op = 1;
    		lookText(false);
    	}else{
    		op = 17;
    		idd = 0;
    	}    	    	
    }
    if(op==1){
    	$("#savUsuario").text("GUARDAR");
    }else{
    		if(validarNew()){
    			jConfirm(mensaje_sistema[163], 'Confirmacion', function(r) {    		
                    if(r==true){
                    	$.getJSON(url_sistema[0], {
                        	localize: url_sistema[22],
                        	opt: op,
                        	desc: nomb,
                        	prec: preci,
                        	unid: unida,
                        	cod: idd
                        },function(data){
                            if (data.success==true){
                                $('#frmUsuario').clearForm();
                                $("#linkBuscar0").click();
                                $("#savUsuario").text("NUEVO INSUMO");
                                jAlert(mensaje_sistema[op==17?68:69]);//para mostrar mensaje si es que fue agregado o modificado
                                lookText(true);
                            }else{					
                                jAlert(mensaje_sistema[100]);
                            }
                        }
                        );			
                    }
    			});
    	}
    }    
}
function validarNew(){
	var _nm = $("#txtNombres").val();
	var _ap = $("#txtPrecio").val();
	var _dn = $("#txtUnidades").val();
	if(_nm.length==0){
		$("#txtNombres").effect("pulsate", {times:5}, 200).focus();
		jAlert(mensaje_sistema[2]);
		return false;		
	}else{
		if(_ap.length==0){
			$("#txtPrecio").effect("pulsate", {times:5}, 200).focus();
			jAlert(mensaje_sistema[2]);
			return false;
		}else{
			if(_dn.length==0){
				$("#txtUnidades").effect("pulsate", {times:5}, 200).focus();
				jAlert(mensaje_sistema[2]);
				return false;
			}
		}
	}
	return true;
}
function seleccionarInsumo(){
	lookText(false);
	$('#txtCodigo').val(this.getAttribute("id"));
    $('#txtNombres').val(this.getAttribute("desc"));
    $('#txtPrecio').val(this.getAttribute("prec"));
    $('#txtUnidades').val(this.getAttribute("unid"));
    $("#savUsuario").text("MODIFICAR");
}
$.fn.clearForm = function() {
    return this.each(function() {
        $(':input', this).each(function() {
            var type = this.type, tag = this.tagName.toLowerCase();
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = '';
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex = -1;
        });
    });
};

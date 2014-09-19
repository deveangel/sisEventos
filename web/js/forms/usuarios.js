var frmModal;
$(document).ready(function(){
    $.ajaxSetup({
        cache: false
    });	
    $(".linkBuscar").live('click', buscar );	
    $("#savUsuario").click( guardarUsuario );	
    $(".modUsuario").live('click', seleccionarUsuario );
    $(".delUsuario").live('click', eliminarUsuario );
    $("#txtBusqueda").keyup(buscar);
    $("#txtDni").keyup(writeDni);
    load();
	
});
//---------------------------------- usuarios    ------------------
function load(){
	$("#savUsuario").text("NUEVO USUARIO");
}
function writeDni(){
	var dn = $("#txtDni").val();
	$("#txtNick").val(dn);
	$("#txtClave").val(dn);	
}
function buscar(){
//    var page = this.getAttribute("page");	
    var txt = ($("#txtBusqueda").val()).toUpperCase();
    $.getJSON(url_sistema[0], {
        opt: 6,
        localize: url_sistema[20],
        filtro:txt
    },
    function(data){
        $("#tblUsuarios tbody>tr").remove();
        if(data!=null){				
            $('#headTblUsuarios').html(data.head);
            $('#footerTblUsuarios').html(data.footer);
            datos = data.datos;
            for (var x = 0; x < datos.length; x += 1){
                var id = datos[x].dni;
                var nombre = datos[x].nombres;
                $("#tblUsuarios tbody").append("<tr class='tResultado'><td><center>"+(x+1)+"</center></td><td>"+
                    nombre+"</td><td>"+id+"</td><td><center>"+
                    "<a href='#tblUsuarios' class='modUsuario' id='"+id+"', nomb='"+nombre+"'>ADMINISTRAR</a></center></td></tr>")
            }
        }else{
            jAlert("Error al recuperar los datos");
        }
    }
    );
}
function lookText(op){
	$('#txtNombres').attr("disabled", op);
	$('#txtApellidos').attr("disabled", op);
	$('#txtDni').attr("disabled", op);
}
function guardarUsuario(){
	var id = $("#txtCodigo").val()+"-"+$("#txtClave").val();
	var tipo_usuario = $("#comboTipoUsuario").val();
    var modo = $("#savUsuario").text();
    var ruta;
    if (modo=='MODIFICAR'){
        op = 0;
    }else{
    	if(modo=='NUEVO USUARIO'){
    		op = 1;
    		lookText(false);
    	}else{
    		op = 2;
    	}    	    	
    }
    if(op==1){
    	$("#savUsuario").text("GUARDAR");
    }else{
    	if(op==0){
    		if(validarCmb()){
    			jConfirm(mensaje_sistema[154], 'Confirmacion', function(r) {    		
                    if(r==true){
                    	$.getJSON(url_sistema[0], {
                        	opt: 8,
                            localize: url_sistema[20],
                            dni:id,
                            tipo:tipo_usuario
                        },
                        function(data){
                            if (data.success){
                                $('#frmUsuario').clearForm();
                                $("#linkBuscar0").click();
                                $("#savUsuario").text("NUEVO USUARIO");
                                if (modo=='MODIFICAR'){
                                    jAlert('Registro Modificado');
                                }
                            }else{					
                                jAlert("Error al Grabar el Registro");
                            }
                        }
                        );			
                    }else{
                        $('#frmUsuario').clearForm();
                        $("#linkBuscar0").click();
                        $("#savUsuario").text("");
                        $("#savUsuario").text("NUEVO USUARIO");
                    }
                });
    		}    		
    	}else{
    		if(validarNew()){
    			jConfirm(mensaje_sistema[154], 'Confirmacion', function(r) {    		
                    if(r==true){
                    	$.getJSON(url_sistema[0], {
                        	opt: 9,
                            localize: url_sistema[20],
                            dni:$("#txtDni").val()+"-"+$("#txtClave").val(),
                            tipo:tipo_usuario,
                            nomb:$("#txtApellidos").val()+", "+$("#txtNombres").val()
                        },
                        function(data){
                            if (data.success==true){
                                $('#frmUsuario').clearForm();
                                $("#linkBuscar0").click();
                                $("#savUsuario").text("NUEVO USUARIO");
                                jAlert(mensaje_sistema[62]);
                            }else{					
                                jAlert(mensaje_sistema[108]);
                            }
                        }
                        );			
                    }
                });
    		}
    		
    	}
    }    
}
function validarNew(){
	var _nm = $("#txtNombres").val();
	var _ap = $("#txtApellidos").val();
	var _dn = $("#txtDni").val();
	var _pwd = $("#txtClave").val();
	if(_nm.length==0){
		$("#txtNombres").effect("pulsate", {times:5}, 200).focus();
		jAlert(mensaje_sistema[2]);
		return false;		
	}else{
		if(_ap.length==0){
			$("#txtApellidos").effect("pulsate", {times:5}, 200).focus();
			jAlert(mensaje_sistema[2]);
			return false;
		}else{
			if(_dn.length!=8){
				$("#txtDni").effect("pulsate", {times:5}, 200).focus();
				jAlert(mensaje_sistema[2]);
				return false;
			}else{
				if(_pwd.length==0){
					$("#txtClave").effect("pulsate", {times:5}, 200).focus();
					jAlert(mensaje_sistema[2]);
					return false;
				}else{
					if(!validarCmb()){						
						return false;
					}
				}				
			}
		}
	}
	return true;
}
function validarCmb(){
	if($("#comboTipoUsuario").val()<1){
		$("#comboTipoUsuario").effect("pulsate", {times:5}, 200).focus();
		jAlert(mensaje_sistema[8]);
		return false;
	}else{
		var _pwd = $("#txtClave").val();
		if(_pwd.length==0){
			$("#txtClave").effect("pulsate", {times:5}, 200).focus();
			jAlert(mensaje_sistema[2]);
			return false;
		}
	}
	return true;
}
function seleccionarUsuario(){
	lookText(true);
    var id = this.getAttribute("id");
    var _nomb = this.getAttribute("nomb");    
    var nombres = _nomb.split(",");    
    $.getJSON(url_sistema[0], {
        opt: 7,
        localize: url_sistema[20],
        dni:id
    },
    function(data){
        if (data.success==true){
            $('#txtCodigo').val(id);
            $('#txtNombres').val(nombres[1]);
            $('#txtApellidos').val(nombres[0]);
            $('#txtDni').val(id);
            $('#txtNick').val(id);
            $('#txtClave').val(id);            
            if ( data.datos == "" ){					
            	$('#comboTipoUsuario').val(" ");
            }else{
                $('#comboTipoUsuario').val(data.datos);
            }
            $("#savUsuario").text("MODIFICAR");
        }
    }
    );
}
function eliminarUsuario(){
    var id = this.getAttribute("id");
    jConfirm('Esta seguro que desea eliminar el registro?', 'Confirmacion', function(r) {
        if(r==true){
            $.getJSON('datajson.php', {
                opt: 'delUsuario',
                id: id
            },
            function(data){
                if (data.success==true){
                    $('#frmUsuario').clearForm();
                    $("#linkBuscar0").click();
                    jAlert('Registro Eliminado');
                }else{
                    jAlert("Error al eliminar el Registro");
                }
            }
            );			
        }
    });
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
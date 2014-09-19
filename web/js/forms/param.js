var frmModal;

$(document).ready(function(){
    $.ajaxSetup({
        cache: false
    });
    $(".linkBuscar").live('click', buscar );
    $("#savTipoUsuario").click( guardarTipoUsuario );
    $(".modTipoUsuario").live('click', seleccionarTipoParametro );
    $(".delTipoUsuario").live('click', eliminarTipoUsuario );
    buscar();
});
//---------------------------------- Tipo de Usuario --------------
function buscar(){
    $.getJSON(url_sistema[0], {
        opt: 10,
        localize: url_sistema[20]
    },
    function(data){
        $("#tblCategorias tbody>tr").remove();
        if(data!=null){
            $('#headTblCategorias').html(data.head);
            $('#footerTblCategorias').html(data.footer);
            datos = data.datos;
            if ( datos.length >0 ){
                for (var x = 0; x < datos.length; x += 1){
                    var nombre = datos[x].cod;
                    var valor = datos[x].valor;
                    var usuario = datos[x].usuario_gener;
                    if(usuario.length==1){
                    	usuario = " - ";
                    }
                    var id = nombre.substring(0,1);
                    nombre = nombre.substring(2,nombre.length);
                    $("#tblCategorias tbody").append("<tr class='tResultado'>"+
                    		"<td><center>"+(x+1)+"</center></td>"+
                    		"<td>"+nombre+"</td>"+
                    		"<td><center>"+valor+"</center></td>"+
                    		"<td><center>"+usuario+"</center></td>"+
                    		"<td><center>"+
                    		"<a href='#' class='modTipoUsuario' cod='"+id+"' descrip='"+nombre+"' val='"+valor+"'>"+
                    		"MODIFICAR</a></center></td></tr>")
                }
            }else{
                jAlert('No Hay Registros');
            }
        }else{
            jAlert('No Hay Registros');
        }
    }
    );
}
function guardarTipoUsuario(){
    var modo = $("#savTipoUsuario").text();
    var valr = $('#txtValor').val()+"-"+$("#txtNombresSes").val();
    var ruta;
    jConfirm(mensaje_sistema[154], 'Confirmacion', function(r) {
        if(r==true){
            $.getJSON(url_sistema[0], {
                opt: 13,
                localize: url_sistema[20],
                cod: $("#txtCodigo").val(),
                val: valr
            },
            function(data){
                if (data.success==true){
                	$("#frmTipoUsuario").fadeOut(1500,callback);
                	jAlert(mensaje_sistema[66]);
                	buscar();
                }else{
                    jAlert(mensaje_sistema[100]);
                }
            }
            );
        }
    });
}
function callback(){
	this;
}
function seleccionarTipoParametro(){
    var cod = this.getAttribute("cod");
    var descrip = this.getAttribute("descrip");
    var val = this.getAttribute("val");
    $("#frmTipoUsuario").fadeIn(2000,callback);
    $('#txtCodigo').val(cod);
    $('#txtValor').val(val);
    $('#txtNombre').val(descrip);    
}
function eliminarTipoUsuario(){
    var id = this.getAttribute("id");
    jConfirm(mensaje_sistema[159], 'Confirmacion', function(r) {
        if(r==true){
            $.getJSON(url_sistema[0], {
                opt: 5,
                localize: url_sistema[20],
                cod: id
            },
            function(data){
                if (data.success==true){
                    $('#frmTipoUsuario').clearForm();
                    $("#linkBuscar0").click();
                    jAlert(mensaje_sistema[56]);
                }else{
                    jAlert(mensaje_sistema[100]);
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
var url_sistema = "./controladorweb";
$("#linkModificar").hide();
$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $(".modif").live("click",obtenerAlumno);
    $(".elimiar").live("click",eliminarAlumno);
    $("#linkModificar").hide();
    $("#linkGuardar").show();
});
function eliminarAlumno(){
    codigo = this.getAttribute("cd");
    jConfirm('Desea Eliminar el Alumno ?', 'Mensaje del Sistema', function(r) {
        if (r) {
            $.getJSON(url_sistema, {
                opt: 4 ,
                codigo: codigo
            }, function(data){
                $("#linkModificar").hide();
                $("#linkGuardar").show();
                if(data.success){
                    limpiar();
                    cargarAlumnos();
                    jAlert('Se Elimino el Alumno', 'Aviso del Sistema');
                }else{
                    alert("ERROR");
                }
            });
       }else{
           limpiar();
           $("#linkModificar").hide();
           $("#linkGuardar").show();
       }
    });
}
function modificarAlumno(){
    jConfirm('Desea actualizo el Alumno ?', 'Mensaje del Sistema', function(r) {
        if (r) {
            $.getJSON(url_sistema, {
                opt: 2,
                codigo: $("#txtCodigo").val() ,
                nombres : $("#txtNombres").val() ,
                apellidos : $("#txtApellidos").val()
            }, function(data){
                $("#linkModificar").hide();
                $("#linkGuardar").show();
                if(data.success){
                    limpiar();
                    cargarAlumnos();
                    jAlert('Se Actualizo el Alumno', 'Aviso del Sistema');
                }else{
                    alert("ERROR");
                }
            });
       }
    });
}
function guardarAlumno(){
    jConfirm('Desea guardar el Alumno ?', 'Mensaje del Sistema', function(r) {
        if (r) {
            $.getJSON(url_sistema, {
                opt: 3,
                codigo: $("#txtCodigo").val() ,
                nombres : $("#txtNombres").val() ,
                apellidos : $("#txtApellidos").val()
            },function(data){
                if(data.success){
                    limpiar();
                    cargarAlumnos();
                    jAlert("Se agrego alumno","Mensaje del Sistema");
                }else{
                    alert("ERROR");
                }
            });
        }else{
           limpiar();
           $("#linkModificar").hide();
           $("#linkGuardar").show();
       }
    });     
}
function obtenerAlumno(){
    $("#linkGuardar").hide();
    $("#linkModificar").show();
    $("#txtCodigo").val(this.getAttribute("cd"));
    $("#txtNombres").val(this.getAttribute("nomb"));
    $("#txtApellidos").val(this.getAttribute("ape"));
}
function limpiar(){
    $("#txtCodigo").val("");
    $("#txtNombres").val("");
    $("#txtApellidos").val("");
}
function cargarAlumnos(){
    $("#tbalumno tbody>tr").remove();
    $.getJSON(url_sistema, {
        opt: 1
    },
    function(data){
        if(data.success){
            var datos = data.datos;
            for(var i=0; i<datos.length; i++){
                var wcodigo = datos[i].codigo;
                var wnombres = datos[i].nombres;
                var wapellidos = datos[i].apellidos;
                $("#tbalumno tbody").append("<tr class='tResultado'>"+
                    "<td><center>"+wcodigo+"</center></td>"+
                    "<td align='left'>"+wnombres+"</td>"+
                    "<td align='left'>"+wapellidos+"</td>"+
                    "<td><center><a href='#unp' class='modif' cd='"+wcodigo+"' nomb='"+wnombres+"' ape='"+wapellidos+"'>Modificar - "+
                    "</a><a href='#unp' class='elimiar' cd='"+wcodigo+"'>Eliminar</a> </center></td>"
                    );
            }
        }else{
            alert("ERROR");
        }
    });
}
function closeSession(){
	$("#frmCloseSession").submit();
}
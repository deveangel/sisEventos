$(document).ready(function(){
    $.ajaxSetup({cache: false});
    cargardata();
});

function cargardata(){
            $.getJSON("./servlet_gestion_usuario", {
                opt: 1 
            }, function(data){
                if(data.success){
                var datos = data.datos;
                $("#txtlogin").val(datos.login);
                $("#txtnombre").val(datos.nombres);
                $("#txtapellidos").val(datos.apellidos);

                }else{
                    alert("ERROR");
                }
            } );
}

function guardarcambio(){
    $.getJSON("./servlet_gestion_usuario", {
                opt: 2,
                login: $("#txtlogin").val() ,
                nombres : $("#txtnombre").val() ,
                apellidos : $("#txtapellidos").val(),
                contrasena : $("#txtcontrasena").val()
            }, function(data){
                if(data.success){
                    limpiar();
                    alert('Se Actualizo el Usuario');
                }else{
                    alert("ERROR");
                }
            });
}
function  limpiar(){
     $("#txtcontrasena").val("");
 }



$(document).ready(function(){
    $("#comboTipoUsuario").change( cambioTipoUsuario );
    $("#updPermisos").live('click', guardarPermisos );
    $("#tblArbol").hide();
});
function cambioTipoUsuario(){
	var selected = $("#comboTipoUsuario option:selected");
	if (selected.val() != 0){
			$.getJSON(url_sistema[0], {
		        opt: 5,
		        localize: url_sistema[21],
		        cod:selected.val()
		    },
			function(data){
				if (data.success){
					$("#tblArbol").show();		
					$("#arbolP").html("");
					$("#arbolP").html(data.datos);
					$("#arbolP").Tree();
					$("#updPermisos").show();
				}else{
					jAlert("Error al recuperar los permisos");
				}
			}
		);
	}else{
		$("#permisosCheck").html("");
	}
}
function guardarPermisos(){
	jConfirm(mensaje_sistema[154],"confirmacion",function(r){
		if(r==true){
			var elementos = Array();
			var opciones = $(".submenus");
			var selected = $("#comboTipoUsuario option:selected");
			$.each(opciones, function() { 
				if ($(this).is(':checked'))
					elementos.push(this.getAttribute("id"));
			});
			if (elementos.length > 0){
				$.getJSON(url_sistema[0], {
						opt: 6,
				        localize: url_sistema[21],
				        cod:selected.val(),
				        opc:elementos.join('-')
					},
					function(data){
						if (data != null && data.success==true){
							jAlert("Los datos han sido guardados");
							$("#comboTipoUsuario option:eq(0)").attr("selected", "selected");
							$("#permisosCheck").html("");
							$("#tblArbol").hide();					
						}else{
							jAlert("Error al actualizar los datos");
						}
					}
				);
			}
		}
	});
	
}
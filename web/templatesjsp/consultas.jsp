<table border = "0" align="center" width="250" >
            <tr>
                <td>Codigo</td>
                <td><input name="txtCodigo" id="txtCodigo" type="text"></td>
            </tr>
            <tr>
                <td>Nombres</td>
                <td><input name="txtNombres" id="txtNombres" type="text"></td>
            </tr>
            <tr>
                <td>Apellidos</td>
                <td><input name="txtApellidos" id="txtApellidos" type="text"></td>
            </tr>
            <tr>
                <td colspan="2" >
                    <table align="center">
                        <tr>
                            <td>
                                <div id="linkGuardar" align="center" >
                                    <a class="button" href="#unp" onclick="guardarAlumno()">
                                        <span>Guardar</span>
                                    </a>
                                </div>
                                <div id="linkModificar" align="center">
                                    <a class="button" href="#unp" onclick="modificarAlumno()">
                                        <span>Modificar</span>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table align="center">
            <tr>
                <td>
                    <a class="button" href="#unp" onclick="cargarAlumnos()" ><span>Listar Alumnos</span></a>
                    <a class="button" href="./jsp/reportes.jsp" TARGET="_new"><span>Visualizar Reporte</span></a>
                </td>
            </tr>
        </table>        
        <table id="tbalumno" border = "0" align="center" width="600">
            <thead>
                <tr class="tTitulo">
                    <td align="center" width="25px">Codigo</td>
                    <td align="center" width="70px">Nombres</td>
                    <td align="center" width="70px">Apellidos</td>
                    <td align="center" width="70px">Opciones</td>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
<%-- 
    Document   : Cambio_contraseña
    Created on : 13-may-2014, 19:38:13
    Author     : AngelAndres
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>

        <table>
            <tr>
                <td id="login" align="center">
                    <div>Login:</div>
                </td>
                <td align="center">
                    <input id="txtlogin" type="text" value="" disabled="false" size="20">
                </td>
            </tr>
            <tr>
                <td id="nombre" align="center">
                    <div>Nombres:</div>
                </td>
                <td align="center">
                    <input id="txtnombre" type="text" value="" disabled="false" size="20">
                </td>
            </tr>
            <tr>
                <td id="Apellidos" align="center">
                    <div>Apellidos:</div>
                </td>
                <td align="center">
                    <input id="txtapellidos" type="text" value="" disabled="false" size="20">
                </td>
            </tr>
            <tr>
                <td id="newcontra" align="center">
                    <div>Nueva contraseña:</div>
                </td>
                <td align="center">
                    <input id="txtcontrasena" type="password" value="" size="20">
                </td>

            </tr>
            <tr>

                     <td align="center" colspan="2">
			         <a class="button"  onclick="guardarcambio()">
                                        <span>Cambiar Contraseña</span>
                        </a>
		     </td>
            </tr>
        </table>
    </body>
</html>

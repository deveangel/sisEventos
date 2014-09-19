<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" session="true"%>
<%
            HttpSession sen = request.getSession();
            String nomusu = (String) sen.getAttribute("usuario");
            if (nomusu == null) {%>
<div><script type="text/javascript">location.href="./login.aspx";</script></div>
<%}

%>

<table align="center" cellpadding="0px" cellspacing="0px" width="100%" border="0">

    <tr align="center">
        <td align="center">
            <table align="center" valign="center" cellpadding="0px" cellspacing="0px">
                <tr><td><div id='cssmenu'>
                            <ul>
                                <li class='active '><a href=''><span>Inicio</span></a></li>
                                <li class='has-sub '><a href='#'><span>Procesos</span></a>
                                    <ul>
                                            <li class='has-sub ' ><a href="cambiarcontra.aspx"><span>cambiar contraseña</span></a>
                                            <ul>
                                                <!--<li><a href='#'><span>Sub Item</span></a></li>
                                                <li><a href='#'><span>Sub Item</span></a></li>-->
                                            </ul>

                                        </li>
                                        <li class='has-sub '><a href='#'><span>Tablas</span></a>
                                            <ul>
                                                <li><a href='#'><span>Usuarios</span></a></li>
                                                <li><a href='#'><span>Libros</span></a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href='#'><span>Ayuda</span></a></li>
                                <li><a href='#'><span>Acerca de</span></a></li>
                            </ul>
                        </div></td></tr>
            </table>
        </td>
    <tr>
</table>
<table align="center"  cellpadding="0px" cellspacing="0px" width="100%" border="0">
    <tr heigth="1px" ><td class="" colspan="2" align="center" >nombre de usuario:<%=nomusu%></td></tr>
</table>
<%
%>
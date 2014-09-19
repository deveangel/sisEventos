<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" session="true"%>
<table width="100%" cellpadding="0px" cellspacing="0px" >
    <tr>
<%
    HttpSession ess = request.getSession();
    String nomusu = (String)ess.getAttribute("usuario");
    if(nomusu!=null){%>
    <form id="frmCloseSession" action="cerrarsesion.jsp" method="post">
	<td align="left"><b></b><div class="parrafo"><%=nomusu%></div></td>
        <td align="right"><a href="#!" onclick="closeSession()">Cerrar Sessión</a> &nbsp;</td>
    </form>
    <%}else{
	ess.setAttribute("cod","");
    	ess.setAttribute("msg","Vuelve a Iniciar Session");
    %>
	<div><script type="text/javascript">location.href="./login.aspx";</script></div>
    <%}%>
    </tr>
</table>
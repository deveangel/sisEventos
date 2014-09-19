<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" session="true"%>
<%
    HttpSession sen = request.getSession();
    String menufinal = (String)sen.getAttribute("menu");
    String nomusu =(String)sen.getAttribute("usuario");    
    if(nomusu == null){%>
        <div><script type="text/javascript">location.href="./login.aspx";</script></div>
    <%}
%>
    <table align="center" cellpadding="0px" cellspacing="0px" width="100%" border="0">
        
        <tr align="center">
            <td align="center">
                <table align="center" valign="center" cellpadding="0px" cellspacing="0px">
                    <tr><td><ul class="sf-menu"><%=menufinal%></ul></td></tr>
                </table>
            </td>
        <tr>
        <tr heigth="1px"><td class="line_hgreen_up">&nbsp;</td></tr>
    </table>
    <%
%>

<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--Este sera mi plantilla principal de todo mi sistema web -->
<html>
    <head>
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="text/css" rel="stylesheet" href="css/estilos.css"/>
        <link type="text/css" rel="stylesheet" href="css/jquery.menu.css"/>
        <link type="text/css" rel="stylesheet" href="css/datePicker.css"/>
        <link type="text/css" rel="stylesheet" href="css/jquery.alerts.css"/>
        <link type="text/css" rel="stylesheet" href="css/custom-theme/jquery-ui-1.8.4.custom.css"/>
        <link type="text/css" rel="stylesheet" href="css/jquery.tree.css"/>
        <link type="text/css" rel="stylesheet" href="css/pagination.css"/>
        <!-- por el menu -->
        <link type="text/css" rel="stylesheet" href="css/superfish-navbar.css"/>
        <link type="text/css" rel="stylesheet" href="css/superfish-vertical.css"/>
        <link type="text/css" rel="stylesheet" href="css/superfish.css"/>
        <link type="text/css" rel="stylesheet" href="css/styles.css"/>

         <!-- <link type="image/x-icon" rel="shortcut icon" href="images/logo.ico"/>-->

	<script type="text/javascript" src="js/jquery-1.4.4.js"></script>
	<script src="js/jquery-ui-1.8.4.custom.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jquery.getUrlParam.pack.js"></script>
	<script type="text/javascript" src="js/jquery.menu.pack.js"></script>
	<script type="text/javascript" src="js/jquery.tree.js" ></script>
	<script type="text/javascript" src="js/jquery.alerts.js"></script>
	<script type="text/javascript" src="js/date.js"></script>
	<script type="text/javascript" src="js/jquery.datePicker.js"></script>
        <script type="text/javascript" src="js/funciones.js"></script>

	<script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery.pagination.js"></script>
        <!-- para mi menu -->
        <script type="text/javascript" src="js/supersubs.js"></script>
        <script type="text/javascript" src="js/superfish.js"></script>
        <script type="text/javascript" src="js/jquery.bgiframe.min.js"></script>
        <script type="text/javascript" src="js/hoverIntent.js"></script>
        <script type="text/javascript">
		// initialise plugins
		//jQuery(function(){
		///	jQuery('ul.sf-menu').superfish();
		///});

	</script>

        <script type="text/javascript" src=<tiles:insertAttribute name="script" ignore="true"/> ></script>
        <title><tiles:insertAttribute name="title" ignore="true"/></title>
    </head>
    <body>
        <table border="0" align="center" width="900px" bgcolor="#FFFFFF" cellpadding="1px" cellspacing="0px">
            <tr>
                <td height="150px" colspan="2"><img src="images/banner.jpg" width="100%"></td>
            </tr>
            <tr>
        	<td align="center">
        		<tiles:insertAttribute name="menu" />
        	</td>
            </tr>
            <tr>
                <td colspan="2"><tiles:insertAttribute name="datosusuario" ignore="true"/></td>
            </tr>
            <tr>
        	<td align="center">
        		<tiles:insertAttribute name="opcion"  ignore="true"/>
        	</td>
            </tr>
            <tr align="center">
                <td align="center" valign="top">
                    <tiles:insertAttribute name="contenido" />
                </td>
            </tr>
            <tr>
                <td background="images/foot.jpg" colspan="2">
                    <center><br>
                        <div class="copyrigth">Todos los Derechos Reservados</div><br>
                    </center>
                </td>
            </tr>
        </table>
    </body>
</html>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" session="true"%>
<%@page import="com.swgoodidea.almacen.pojos.Usuario"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.swgoodidea.almacen.facade.FacadeServicio"%>
<%@page import="com.swgoodidea.almacen.web.servlet_facade_web"%>
<%
   String codigo,contrasena;
   codigo = request.getParameter("usuario");
   contrasena = request.getParameter("contrasena");
   FacadeServicio  facadeServicio =servlet_facade_web.getFacade();
   Usuario usuario = facadeServicio.validarUsuario(codigo, contrasena);
    if ( usuario != null  ){
        HttpSession sen = request.getSession();
        sen.setAttribute("objusuario",usuario);
        sen.setAttribute("usuario",usuario.getNombres()+" "+usuario.getApellidos());
        sen.setAttribute("login",usuario.getLogin());
        response.sendRedirect("bienvenido.aspx");
  }else{
        response.sendRedirect("login.aspx");
    }
%>
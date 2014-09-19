/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package unp.sisEventos.web;

import unp.sisEventos.pojos.Usuario;
import unp.sisEventos.util.Utilitarios;
import unp.sisEventos.util.cls_json_data;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author AngelAndres
 */
public class servlet_gestion_usuario extends HttpServlet {
   
    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
         try {
            /*  33 */ int opt = 0;
            try {
                /*  35 */ opt = Integer.parseInt(request.getParameter("opt"));
            } catch (Exception ex) {
            }
            /*  39 */ String data_json = "";
            /*  40 */ switch (opt) {
                case 1:
                    /*  42 */ data_json = ObtenerUsuarioLogeado(request);
                    /*  43 */ break;
                  case 2:
                      data_json = actualizarcontra(request);
                    /*  43 */ break;
             }


            out.print(data_json);
        }finally{
            out.close();
         }
    }
         private String ObtenerUsuarioLogeado(HttpServletRequest request){
          /* 137 */ Usuario user = (Usuario) request.getSession().getAttribute("objusuario");
             return Utilitarios.generarContextoJsonDesdeObject(new cls_json_data(user));
         }
         private String actualizarcontra(HttpServletRequest request){
                Usuario user = new Usuario();
                user.setNombres(request.getParameter("nombres"));
                user.setClave(request.getParameter("contrasena"));
                user.setLogin(request.getParameter("login"));
                user.setApellidos(request.getParameter("apellidos"));
                servlet_facade_web.getFacade().updUsuario(user);
               return Utilitarios.generarContextoJsonDesdeObject(new cls_json_data(""));
         }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    } 

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

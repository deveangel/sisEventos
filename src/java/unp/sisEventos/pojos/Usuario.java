/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package unp.sisEventos.pojos;

/**
 *
 * @author AngelAndres
 */
public class Usuario implements java.io.Serializable{
     private String login;
    private String clave;
    private String apellidos;
    private String nombres;

    public Usuario() {
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    @Override
    public String toString() {
        return "Usuario{" + "login=" + login + "clave=" + clave + "apellidos=" + apellidos + "nombres=" + nombres + '}';
    }


}

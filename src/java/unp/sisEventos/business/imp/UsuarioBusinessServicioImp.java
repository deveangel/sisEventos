/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package unp.sisEventos.business.imp;

import unp.sisEventos.business.itf.UsuarioBusinessServicio;
import unp.sisEventos.dao.itf.UsuarioDaoServicio;
import unp.sisEventos.pojos.Usuario;
import java.util.ArrayList;

/**
 *
 * @author AngelAndres
 */
public class UsuarioBusinessServicioImp implements UsuarioBusinessServicio{
     private UsuarioDaoServicio usuarioDaoServicio;

    public boolean addUsuario(Usuario usuario) {
        return usuarioDaoServicio.addUsuario(usuario);
    }

    public boolean updUsuario(Usuario usuario) {
        return usuarioDaoServicio.updUsuario(usuario);
    }

    public boolean delUsuario(String login) {
        return usuarioDaoServicio.delUsuario(login);
    }

    public Usuario getUsuario(String login) {
        return usuarioDaoServicio.getUsuario(login);
    }

    public ArrayList<Usuario> getAllUsuario(Usuario usuario) {
          return usuarioDaoServicio.getAllUsuario(usuario);
    }

    public void setUsuarioDaoServicio(UsuarioDaoServicio usuarioDaoServicio) {
        this.usuarioDaoServicio = usuarioDaoServicio;
    }

    public Usuario ValidarUsuario(String login,String contraseña) {
        Usuario usuario;
        usuario=this.usuarioDaoServicio.getUsuario(login);
       if(usuario!=null && usuario.getClave().equals(contraseña)){
            return usuario;
        }
        return null;
    }

}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package unp.sisEventos.business.itf;

import unp.sisEventos.pojos.Usuario;
import java.util.ArrayList;

/**
 *
 * @author AngelAndres
 */
public interface UsuarioBusinessServicio {
     public boolean addUsuario(Usuario usuario);

    public boolean updUsuario(Usuario usuario);

    public boolean delUsuario(String login);

    public Usuario getUsuario(String login);

    public ArrayList<Usuario> getAllUsuario(Usuario usuario);

    public Usuario ValidarUsuario(String login ,String Contraseña);
}

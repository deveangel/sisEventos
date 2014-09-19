/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package unp.sisEventos.dao.imp;

import com.ibatis.sqlmap.client.SqlMapClient;
import unp.sisEventos.dao.itf.UsuarioDaoServicio;
import unp.sisEventos.pojos.Usuario;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

/**
 *
 * @author AngelAndres
 */
public class UsuarioDaoServicioImp extends SqlMapClientDaoSupport implements UsuarioDaoServicio {

    public UsuarioDaoServicioImp() {
    }

    public boolean addUsuario(Usuario usuario) {
        boolean respuesta =false;
        try {
            SqlMapClient SqlMapClient = getSqlMapClient();
            SqlMapClient.insert("UsuarioNS.addUsuarioIbt", usuario);
            respuesta= true;
        } catch (SQLException ex) {
            Logger.getLogger(UsuarioDaoServicioImp.class.getName()).log(Level.SEVERE, null, ex);
        }
       return respuesta;
    }

    public boolean updUsuario(Usuario usuario) {
        boolean respuesta=false;
        try {
            SqlMapClient SqlMapClient = getSqlMapClient();
            SqlMapClient.update("UsuarioNS.updUsuarioIbt", usuario);
            respuesta= true;
        } catch (SQLException ex) {
            Logger.getLogger(UsuarioDaoServicioImp.class.getName()).log(Level.SEVERE, null, ex);
        }
       return respuesta;
    }

    public boolean delUsuario(String login) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public Usuario getUsuario(String login) {
        Usuario respuesta =null;
        Map<String,String> map = new HashMap<String,String>();
        map.put("login",login);
        try {
            SqlMapClient SqlMapClient = getSqlMapClient();
            respuesta = (Usuario)SqlMapClient.queryForObject("UsuarioNS.getUsuarioIbt", map);
        } catch (SQLException ex) {
            Logger.getLogger(UsuarioDaoServicioImp.class.getName()).log(Level.SEVERE, null, ex);
       
        }
       return respuesta;
    }

    public ArrayList<Usuario> getAllUsuario(Usuario usuario) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}

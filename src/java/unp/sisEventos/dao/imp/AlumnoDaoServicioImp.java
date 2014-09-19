package unp.sisEventos.dao.imp;

import com.ibatis.sqlmap.client.SqlMapClient;
import unp.sisEventos.dao.itf.AlumnoDaoServicio;
import unp.sisEventos.pojos.Alumno;
import java.util.ArrayList;
import javax.sql.DataSource;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class AlumnoDaoServicioImp extends SqlMapClientDaoSupport implements AlumnoDaoServicio {
     private DataSource dataSource;

//    public void setDataSource(DataSource dataSource) {
//        this.dataSource = dataSource;
//    }
    public AlumnoDaoServicioImp() {
    }

    public boolean addAlumno(Alumno alumno) {
//        try {
//            SqlMapClient SqlMapClient = getSqlMapClient();
//            SqlMapClient.insert("alumnoNS.addAlumnoIbt", alumno);
//            return true;
//        } catch (SQLException ex) {
//            Logger.getLogger(AlumnoDaoServicioImp.class.getName()).log(Level.SEVERE, null, ex);
//        }
       // dataSource.get
        return true;
    }

    public boolean updAlumno(Alumno alumno) {

        try {
             SqlMapClient SqlMapClient =getSqlMapClient();
           SqlMapClient.update("alumnoNS.updAlumnoIbt",alumno);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    return true;
    }

    public boolean delAlumno(String alumnoId) {
   
        try {

        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return true;
    }

    public Alumno getAlumno(String alumnoId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public ArrayList<Alumno> getAllAlumno(Alumno alumno) {
        ArrayList<Alumno> respuesta = new ArrayList<Alumno>();
//        try {
      SqlMapClientTemplate SqlMapClient =getSqlMapClientTemplate();
          respuesta=(ArrayList) SqlMapClient.queryForList("alumnoNS.getAlumnoAllIbt");
//        } catch (Exception exception) {
//            exception.printStackTrace();
//        }
        return respuesta;
    }

}

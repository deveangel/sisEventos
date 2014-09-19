package unp.sisEventos.dao.itf;

import unp.sisEventos.pojos.Alumno;
import java.util.ArrayList;

public interface AlumnoDaoServicio {

    public boolean addAlumno(Alumno alumno);

    public boolean updAlumno(Alumno alumno);

    public boolean delAlumno(String alumnoId);

    public Alumno getAlumno(String alumnoId);

    public ArrayList<Alumno> getAllAlumno(Alumno alumno);
}

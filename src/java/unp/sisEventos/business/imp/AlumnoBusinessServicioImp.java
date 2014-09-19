package unp.sisEventos.business.imp;

import unp.sisEventos.business.itf.AlumnoBusinessServicio;
import unp.sisEventos.dao.itf.AlumnoDaoServicio;
import unp.sisEventos.pojos.Alumno;
import java.util.ArrayList;

public class AlumnoBusinessServicioImp implements AlumnoBusinessServicio {

    private AlumnoDaoServicio alumnoDaoServicio;

    public AlumnoBusinessServicioImp() {
        System.out.println("ss");
    }

    public boolean addAlumno(Alumno alumno) {
        return alumnoDaoServicio.addAlumno(alumno);
    }

    public boolean updAlumno(Alumno alumno) {
        return alumnoDaoServicio.updAlumno(alumno);
    }

    public boolean delAlumno(String alumnoId) {
        return alumnoDaoServicio.delAlumno(alumnoId);
    }

    public Alumno getAlumno(String alumnoId) {
        return alumnoDaoServicio.getAlumno(alumnoId);
    }

    public ArrayList<Alumno> getAllAlumno(Alumno alumno) {
        return alumnoDaoServicio.getAllAlumno(alumno);
    }

    public void setAlumnoDaoServicio(AlumnoDaoServicio alumnoDaoServicio) {
        this.alumnoDaoServicio = alumnoDaoServicio;
    }
    
}

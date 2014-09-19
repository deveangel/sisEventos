package unp.sisEventos.facade.imp;

import unp.sisEventos.business.itf.AlumnoBusinessServicio;
import unp.sisEventos.business.itf.UsuarioBusinessServicio;
import unp.sisEventos.facade.itf.FacadeServicio;
import unp.sisEventos.pojos.Alumno;
import unp.sisEventos.pojos.Usuario;
import java.util.ArrayList;

public class FacadeServicioImp implements FacadeServicio {

    private AlumnoBusinessServicio alumnoBusinessServicio;
    private  UsuarioBusinessServicio usuarioBusinessServicio;

    public FacadeServicioImp() {
    }

    public boolean addAlumno(Alumno alumno) {
        return alumnoBusinessServicio.addAlumno(alumno);
    }

    public boolean updAlumno(Alumno alumno) {
        return alumnoBusinessServicio.updAlumno(alumno);
    }

    public boolean delAlumno(String alumnoId) {
        return alumnoBusinessServicio.delAlumno(alumnoId);
    }

    public Alumno getAlumno(String alumnoId) {
        return alumnoBusinessServicio.getAlumno(alumnoId);
    }

    public ArrayList<Alumno> getAllAlumno(Alumno alumno) {
        return alumnoBusinessServicio.getAllAlumno(alumno);
    }
public boolean addUsuario(Usuario usuario) {
        return usuarioBusinessServicio.addUsuario(usuario);
    }

    public boolean updUsuario(Usuario usuario) {
        return usuarioBusinessServicio.updUsuario(usuario);
    }

    public boolean delUsuario(String login) {
        return usuarioBusinessServicio.delUsuario(login);
    }

    public Usuario getUsuario(String login) {
       return usuarioBusinessServicio.getUsuario(login) ;
    }

    public ArrayList<Usuario> getAllUsuario(Usuario usuario) {
        return usuarioBusinessServicio.getAllUsuario(usuario);
    }

    public void setAlumnoBusinessServicio(AlumnoBusinessServicio alumnoBusinessServicio) {
        this.alumnoBusinessServicio = alumnoBusinessServicio;
    }
     public void setUsuarioBusinessServicio(UsuarioBusinessServicio usuarioBusinessServicio) {
        this.usuarioBusinessServicio = usuarioBusinessServicio;
    }

    public Usuario validarUsuario(String login, String contraseña) {
        return this.usuarioBusinessServicio.ValidarUsuario(login, contraseña);
    }
}

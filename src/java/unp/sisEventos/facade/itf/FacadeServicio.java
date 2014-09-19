package unp.sisEventos.facade.itf;

import unp.sisEventos.pojos.Alumno;
import unp.sisEventos.pojos.Usuario;
import java.util.ArrayList;

public interface FacadeServicio {

    public boolean addAlumno(Alumno alumno);

    public boolean updAlumno(Alumno alumno);

    public boolean delAlumno(String alumnoId);

    public Alumno getAlumno(String alumnoId);

    public ArrayList<Alumno> getAllAlumno(Alumno alumno);

    public boolean addUsuario(Usuario usuario);

    public boolean updUsuario(Usuario usuario);

    public boolean delUsuario(String login);

    public Usuario getUsuario(String login);

    public ArrayList<Usuario> getAllUsuario(Usuario usuario);

    public Usuario validarUsuario(String login,String contraseña);
}

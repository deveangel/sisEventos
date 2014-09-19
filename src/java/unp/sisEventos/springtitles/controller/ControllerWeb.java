package unp.sisEventos.springtitles.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerWeb {

   @RequestMapping("/login.aspx")
   public String redirect1() {
       return "login";
   }
   @RequestMapping("/inicio.aspx")
   public String redirect2() {
       return "inicio";
   }
   @RequestMapping("/tablaalumno.aspx")
   public String redirect3() {
       return "tablaalumno";
   }
   @RequestMapping("/acercade.aspx")
   public String redirect4() {
       return "acercade";
   }
   @RequestMapping("/bienvenido.aspx")
   public String redirect5() {
       return "bienvenido";
   }
   @RequestMapping("/cambiarcontra.aspx")
   public String redirect6() {
       return "cambiocontraseña";
   }
}
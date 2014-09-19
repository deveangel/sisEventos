/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package unp.sisEventos.util;

import com.google.gson.Gson;

/**
 *
 * @author AngelAndres
 */
public class Utilitarios {

     public static String generarContextoJsonDesdeObject(Object _object) {
        return new Gson().toJson(_object);
    }
}

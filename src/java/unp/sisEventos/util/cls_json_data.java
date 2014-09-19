package unp.sisEventos.util;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.Iterator;
//import pck_tramitedocu.pck_src.pck_pojos.Cls_manageFlexGrid;

public class cls_json_data {

    private Boolean success;
    private Object datos;
    @SerializedName("page")
    private Integer pagina;
    private Integer total;
    /*
     * 16
     */ //private ArrayList<Cls_manageFlexGrid> rows = new ArrayList();

    public cls_json_data() {
    }

    public cls_json_data(Object datos) {
        /*
         * 22
         */ armarJsonParaProcedimiento(datos);
    }

    public cls_json_data(Object datos, int _t, int[] parametros) {
        /*
         * 26
         */ switch (_t) {
            case 1:
                /*
                 * 28
                 */ armarJsonParaFlexGrid(datos);
                break;
            case 3:
                /*
                 * 30
                 */ armarJsonParaProcedimiento(datos);
        }

        /*
         * 34
         */ if (parametros.length != 0) {
            /*
             * 35
             */ setPagina(Integer.valueOf(parametros[0]));
            /*
             * 36
             */ setTotal(Integer.valueOf(parametros[1]));
        }
    }

    private void armarJsonParaProcedimiento(Object datos) {
        /*
         * 41
         */ this.datos = datos;
        /*
         * 42
         */ this.success = Boolean.valueOf(datos != null);
    }

    private void armarJsonParaFlexGrid(Object datos) {
        /*
         * 46
         */ int i = 1;
        /*
         * 47
         */ for (Iterator i$ = ((ArrayList) datos).iterator(); i$.hasNext();) {
            Object _manage = i$.next();
            /*
             * 48
             */ ///this.rows.add(new Cls_manageFlexGrid("" + i, _manage));
            /*
             * 49
             */ i++;
        }
    }

    public boolean isSuccess() {
        /*
         * 54
         */ return this.success.booleanValue();
    }

    public Object getDatos() {
        /*
         * 58
         */ return this.datos;
    }

    public void setDatos(Object datos) {
        /*
         * 62
         */ this.datos = datos;
        /*
         * 63
         */ this.success = Boolean.valueOf(datos != null);
    }

    public Integer getPagina() {
        /*
         * 67
         */ return this.pagina;
    }

    public void setPagina(Integer page) {
        /*
         * 71
         */ this.pagina = page;
    }

    public Integer getTotal() {
        /*
         * 75
         */ return this.total;
    }

    public void setTotal(Integer total) {
        /*
         * 79
         */ this.total = total;
    }
}

/* Location:           /media/Datos/tramitedocuweb_bkD/WEB-INF/classes/
 * Qualified Name:     pck_tramitedocu.pck_src.pck_utiles.cls_json_data
 * JD-Core Version:    0.6.0
 */
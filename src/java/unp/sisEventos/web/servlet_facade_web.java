package unp.sisEventos.web;

import unp.sisEventos.facade.itf.FacadeServicio;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;


public class servlet_facade_web extends HttpServlet {

    public static FacadeServicio facadeInterface;

    public void init(ServletConfig config)
            throws ServletException {
        super.init(config);
//         String propsFilePath = "/WEB-INF/app.properties";
//        try {
//            Properties properties = new Properties();
//            InputStream inputStream = config.getServletContext().getResourceAsStream(propsFilePath);
//            properties.load(inputStream);
//            inputStream.close();
//            getServletContext().setAttribute("properties", properties);
//        } catch (Exception e) {
//            throw new ServletException("Error loading properties file from path " + propsFilePath, e);
//        }
        requestContext();
//        loadParametrosGlobales();
    }

   

    private void requestContext() {
        System.out.println("Cargando Context");
        ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
        facadeInterface = (FacadeServicio) context.getBean("facadeBean");
        System.out.println("Context");
    }

    public static FacadeServicio getFacade() {
        return facadeInterface;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    public String getServletInfo() {
        return "Short description";
    }
}
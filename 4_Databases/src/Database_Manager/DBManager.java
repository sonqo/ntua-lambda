package Database_Manager;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.DriverManager;

public class DBManager {

    public Connection getConnection() throws ClassNotFoundException, SQLException {

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Class.forName(driver);
        Connection conn = DriverManager.getConnection(url, username, password);

        return conn;
    }
}

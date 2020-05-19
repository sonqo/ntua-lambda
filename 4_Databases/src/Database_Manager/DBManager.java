package Database_Manager;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.DriverManager;

public class DBManager {

    public Connection getConnection() throws ClassNotFoundException, SQLException {

        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/testdb?serverTimezone=UTC", "root", "root");

        return conn;
    }
}

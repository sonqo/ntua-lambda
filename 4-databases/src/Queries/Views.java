package Queries;

import java.sql.*;

public class Views {

    public ResultSet customerView() throws SQLException {

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT * FROM Customer_Info";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet salesView() throws SQLException {

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT * FROM Sales_Per_Product_Category";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

}

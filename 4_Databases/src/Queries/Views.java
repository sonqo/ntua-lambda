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

        query = "DROP VIEW IF EXISTS customer_info";
        con.prepareStatement(query).executeUpdate();

        query = "CREATE VIEW customer_info AS SELECT * FROM customer";
        con.prepareStatement(query).executeUpdate();

        query = "SELECT * FROM customer_info";

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

        query = "DROP VIEW IF EXISTS sales_per_product_category";
        con.prepareStatement(query).executeUpdate();

        query = "Create view sales_per_product_category AS SELECT T.DateTime, T.Card_number, T.Store_id, P.Barcode, Ctg.Name " +
                "FROM Transaction AS T, Contains AS Cn, Category AS Ctg, Product AS P WHERE T.Card_number = Cn.Card_number AND T.DateTime = Cn.DateTime AND T.Store_id = Cn.Store_id " +
                "AND Cn.Product_barcode = P.Barcode ORDER BY T.DateTime, T.Card_number, T.Store_id, Ctg.Name";
        con.prepareStatement(query).executeUpdate();

        query = "SELECT * FROM sales_per_product_category";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

}

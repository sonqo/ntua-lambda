package CUD;

import java.sql.*;

public class Product {

    public ResultSet insertProduct(String barcode, String name, String bname, String cat, Float price) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "INSERT INTO Product " +
                "(Category_id, Barcode, Price, Name, Brand_name) " +
                "VALUES " +
                "(" + cat + ",\"" + barcode  + "\"," + price + ",\"" + name  + "\"," + bname + ")";

        con.prepareStatement(query).executeUpdate();

        query = "SELECT * FROM Product WHERE Barcode = " + barcode;

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet updateProduct(String barcode, String name, String bname, String cat, Float price) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "UPDATE Product SET " +
                "Name = \"" + name + "\", " +
                "Brand_name = " + bname + ", " +
                "Category_id = " + cat + ", " +
                "Price = " + price + " " +
                "WHERE Barcode = " + barcode;

        con.prepareStatement(query).executeUpdate();

        query = "SELECT * FROM Product WHERE Barcode = " + barcode;

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public void deleteProduct(String barcode) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "DELETE FROM Product WHERE Barcode = " + barcode;

        con.prepareStatement(query).executeUpdate();
    }

}

package CUD;

import java.sql.*;

public class Price {

    public ResultSet priceHistory(String barcode, Float price) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "UPDATE Product SET Price = " + price + " WHERE Barcode = " + barcode;

        con.prepareStatement(query).executeUpdate();

        query = "SELECT * FROM Older_prices WHERE Product_barcode = " + barcode;

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

}

package Queries;

import javax.xml.transform.Result;
import java.sql.*;
import java.util.ArrayList;

public class Store {

    public ResultSet selectQuery() throws SQLException {

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        PreparedStatement statement = con.prepareStatement(
            "SELECT Store.Street, Store.Number, NewTable.Datetime, NewTable.Card_number, NewTable.Name, NewTable.Cat, NewTable.Pieces, NewTable.Total_amount, NewTable.Payment_method " +
                "FROM " +
                "(SELECT DISTINCT Transaction.Store_id, Transaction.DateTime, Transaction.Card_number, Product.Name, Category.Name as Cat, Contains.Pieces, Transaction.Total_amount, Transaction.Payment_method " +
                "FROM Transaction INNER JOIN Contains ON Transaction.Card_number = Contains.Card_Number AND Transaction.Datetime = Contains.Datetime " +
                "INNER JOIN Product ON Contains.Product_Barcode = Product.Barcode " +
                "INNER JOIN Provides ON Product.Category_id = Provides.Category_id " +
                "INNER JOIN Category ON Provides.Category_id = Category.Category_id) NewTable " +
                "INNER JOIN Store ON NewTable.Store_id = Store.Store_id " +
                "WHERE NewTable.Store_id = 1 " +
                "AND DATE(NewTable.Datetime) = '2020-05-13' " +
                "AND NewTable.Payment_method = 'Card' " +
                "AND NewTable.Total_amount > 20 " +
                "AND NewTable.Pieces > 2 " +
                "ORDER BY NewTable.DateTime");

        ResultSet rs = statement.executeQuery();

        return rs;
    }

}

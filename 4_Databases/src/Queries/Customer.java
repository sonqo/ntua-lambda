package Queries;

import java.sql.*;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Customer {

    public ResultSet selectGlobalQuery(String cardnum) throws SQLException {

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT NewTable.CName, Store.Street, Store.Number, NewTable.Datetime, NewTable.Barcode, NewTable.Name, NewTable.Cat, NewTable.Pieces, NewTable.Total_amount, NewTable.Payment_method " +
                "FROM " +
                "(SELECT DISTINCT Customer.Name as CName, Transaction.Store_id, Transaction.DateTime, Transaction.Card_number, Product.Barcode, Product.Name, Category.Name as Cat, Contains.Pieces, Transaction.Total_amount, Transaction.Payment_method " +
                "FROM Transaction INNER JOIN Customer ON Transaction.Card_number = Customer.Card_number " +
                "INNER JOIN Contains ON Transaction.Card_number = Contains.Card_Number AND Transaction.Datetime = Contains.Datetime " +
                "INNER JOIN Product ON Contains.Product_Barcode = Product.Barcode " +
                "INNER JOIN Provides ON Product.Category_id = Provides.Category_id " +
                "INNER JOIN Category ON Provides.Category_id = Category.Category_id) NewTable " +
                "INNER JOIN Store ON NewTable.Store_id = Store.Store_id " +
                "WHERE Card_number = " + cardnum;

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet selectPopularProductsQuery(String cardnum) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT DISTINCT ST.CName, ST.Barcode, ST.Name, COUNT(*) AS NumberOfTimesBought " +
                "FROM STRATOS AS ST " +
                "WHERE ST.Card_number = " + cardnum + " GROUP BY ST.Barcode ORDER BY NumberOfTimesBought DESC " +
                "LIMIT 0, 10";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }
}
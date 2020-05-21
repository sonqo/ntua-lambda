package Queries;

import java.sql.*;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Store {

    public ResultSet selectQuery(String address, String date, String money_amount, String product_amount, int method, String category) throws SQLException {

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT Store.Street, Store.Number, NewTable.Datetime, NewTable.Card_number, NewTable.Name, NewTable.Cat, NewTable.Pieces, NewTable.Total_amount, NewTable.Payment_method " +
                "FROM " +
                "(SELECT DISTINCT Transaction.Store_id, Transaction.DateTime, Transaction.Card_number, Product.Name, Category.Name as Cat, Contains.Pieces, Transaction.Total_amount, Transaction.Payment_method " +
                "FROM Transaction INNER JOIN Contains ON Transaction.Card_number = Contains.Card_Number AND Transaction.Datetime = Contains.Datetime " +
                "INNER JOIN Product ON Contains.Product_Barcode = Product.Barcode " +
                "INNER JOIN Provides ON Product.Category_id = Provides.Category_id " +
                "INNER JOIN Category ON Provides.Category_id = Category.Category_id) NewTable " +
                "INNER JOIN Store ON NewTable.Store_id = Store.Store_id " +
                "WHERE NewTable.Store_id = " + address;

        if (date != ""){
            query += String.format(" AND DATE(NewTable.Datetime) = '%s'", date);
        }
        if (money_amount != ""){
            query += String.format(" AND NewTable.Total_amount > %s", money_amount);
        }
        if (product_amount != ""){
            query += String.format(" AND NewTable.Pieces > %s", product_amount);
        }
        if (category != null){
            query += String.format(" AND NewTable.Cat = '%s'", category);
        }
        if (method != 0){
            if (method == 1){
                query += " AND NewTable.Payment_method = 'Cash' ";
            }
            else{
                query += " AND NewTable.Payment_method = 'Card' ";
            }
        }
        query += " ORDER BY NewTable.DateTime";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }
}
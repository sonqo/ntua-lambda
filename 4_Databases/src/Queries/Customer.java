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

        query = "SELECT DISTINCT ST.Barcode, ST.Name, COUNT(*) AS NumberOfTimesBought " +
                "FROM (SELECT NewTable.CName, NewTable.CN, NewTable.Datetime, NewTable.Barcode, NewTable.Name " +
                "FROM " +
                "( " +
                "SELECT DISTINCT Customer.Name AS CName, Customer.Card_number AS CN, Transaction.Store_id, Transaction.DateTime, Transaction.Card_number, Product.Barcode, Product.Name " +
                "FROM Transaction " +
                "INNER JOIN Customer ON Transaction.Card_number = Customer.Card_number " +
                "INNER JOIN Contains ON Transaction.Card_number = Contains.Card_Number AND Transaction.Datetime = Contains.Datetime " +
                "INNER JOIN Product ON Contains.Product_Barcode = Product.Barcode " +
                "INNER JOIN Provides ON Product.Category_id = Provides.Category_id " +
                "INNER JOIN Category ON Provides.Category_id = Category.Category_id " +
                ") NewTable " +
                "INNER JOIN Store ON NewTable.Store_id = Store.Store_id) AS ST " +
                "WHERE ST.CN = 2 GROUP BY ST.Barcode ORDER BY NumberOfTimesBought DESC " +
                "LIMIT 0, 10;";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet selectPopularStoresQuery(String cardnum) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT S.Street, S.Number, COUNT(*) AS TimesVisited " +
                "FROM Transaction as T, Store as S " +
                "WHERE T.Card_number = " + cardnum + " " +
                "AND T.Store_id = S.Store_id " +
                "GROUP BY T.Store_id " +
                "ORDER BY COUNT(*) DESC";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet selectVisitingHoursQuery(String cardnum, String storeid) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT DISTINCT ST.Store_id, ST.DateTime\n" +
                "FROM (SELECT NewTable.Store_id, NewTable.CN, NewTable.Datetime, NewTable.Barcode, NewTable.Card_number\n" +
                "FROM \n" +
                "(\n" +
                "\tSELECT DISTINCT Customer.Name AS CName, Customer.Card_number AS CN, Transaction.Store_id, Transaction.DateTime, Transaction.Card_number, Product.Barcode, Product.Name, Contains.Pieces\n" +
                "\tFROM Transaction\n" +
                "INNER JOIN Customer ON Transaction.Card_number = Customer.Card_number\n" +
                "\tINNER JOIN Contains ON Transaction.Card_number = Contains.Card_Number AND Transaction.Datetime = Contains.Datetime\n" +
                "INNER JOIN Product ON Contains.Product_Barcode = Product.Barcode\n" +
                "\tINNER JOIN Provides ON Product.Category_id = Provides.Category_id\n" +
                "\tINNER JOIN Category ON Provides.Category_id = Category.Category_id\n" +
                ") NewTable\n" +
                "INNER JOIN Store ON NewTable.Store_id = Store.Store_id) AS ST\n" +
                "WHERE ST.Card_number = " + cardnum + " AND ST.Store_id = " + storeid + " " +
                "GROUP BY ST.DateTime\n" +
                "ORDER BY ST.DateTime";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet selectAverageExpensesQuery(String cardnum) throws SQLException{

        String query, min, max, months, weeks, total_spent, monthly, weekly;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        min = "SET @min = (SELECT DateTime FROM Transaction WHERE Card_number = " + cardnum + " ORDER BY DateTime ASC LIMIT 0, 1)";
        con.prepareStatement(min).executeQuery();
        max = "SET @max = (SELECT DateTime FROM Transaction WHERE Card_number = " + cardnum + " ORDER BY DateTime DESC LIMIT 0, 1)";
        con.prepareStatement(max).executeQuery();
        months = "SET @months = abs(period_diff(EXTRACT(year_month from @min), EXTRACT(year_month FROM @max))) + 1";
        con.prepareStatement(months).executeQuery();
        weeks = "SET @weeks = WEEK(@max) - WEEK(@min) + 1";
        con.prepareStatement(weeks).executeQuery();
        total_spent = "SET @total_spent = (SELECT SUM(Total_amount) FROM Transaction WHERE Card_number = " + cardnum + ")";
        con.prepareStatement(total_spent).executeQuery();
        monthly = "SET @monthly = @total_spent / @months";
        con.prepareStatement(monthly).executeQuery();
        weekly = "SET @weekly = @total_spent / @weeks";
        con.prepareStatement(weekly).executeQuery();

        query = "SELECT @min AS FirstTransaction, @max AS LastTransaction, @weeks AS NumberOfWeeks, @months AS NumberOfMonths, @weekly AS WeeklyAverage, @monthly AS MonthlyAverage";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }
}
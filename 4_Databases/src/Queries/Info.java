package Queries;

import java.sql.*;

public class Info {

    public ResultSet favoriteProductPairQuery() throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT P1.Barcode AS B1, P1.Name AS P1, P2.Barcode AS B2, P2.Name AS P2, COUNT(*) AS Count " +
                "FROM Product AS P1, Product AS P2, Transaction AS T, Contains AS C1, Contains AS C2 " +
                "WHERE T.Card_number = C1.Card_number " +
                "AND T.DateTime = C1.DateTime " +
                "AND T.Store_id = C1.Store_id " +
                "AND T.Card_number = C2.Card_number " +
                "AND T.DateTime = C2.DateTime " +
                "AND T.Store_id = C2.Store_id " +
                "AND P1.Barcode < P2.Barcode " +
                "AND P1.Barcode = C1.Product_barcode " +
                "AND P2.Barcode = C2.Product_barcode " +
                "GROUP BY P1.Barcode, P2.Barcode " +
                "ORDER BY COUNT(*) DESC LIMIT 15";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet favoriteAlleysQuery(String info) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT O.Alley_number,O.Shelf_number, COUNT(*) AS Count " +
                "FROM Transaction as T, Contains as C, Product as P, Offers as O " +
                "WHERE " +
                "T.DateTime = C.DateTime " +
                "AND T.Card_number = C.Card_number " +
                "AND T.Store_id = C.Store_id " +
                "AND C.Product_barcode = P.Barcode " +
                "AND O.Product_barcode = P.Barcode " +
                "AND T.Store_id = O.Store_id " +
                "AND T.Store_id = " + info + " GROUP BY O.Alley_number, O.Shelf_number " +
                "ORDER BY COUNT(*) DESC LIMIT 15";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet hoursMoneySpentQuery() throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT HOUR(T.DateTime) AS Hour, SUM(T.Total_amount) AS Amount_spent , COUNT(*) AS Count " +
                "FROM Transaction as T " +
                "GROUP BY HOUR(DateTime) " +
                "ORDER BY SUM(T.Total_amount) DESC";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet ageGroupsQuery(String info) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT hour(DateTime) AS Hour, Age_group, count(*) AS Count " +
                "FROM  ( " +
                "SELECT * " +
                "FROM Transaction as T " +
                "natural join Customer as C " +
                "NATURAL JOIN " +
                "( " +
                "SELECT Card_number, " +
                "( " +
                "CASE " +
                "WHEN Age < 30 THEN \"18 - 30\" " +
                "        WHEN Age BETWEEN 30 AND 50 THEN \"30 - 50\" " +
                "        WHEN Age > 50 THEN \"50+\" " +
                "    END) as Age_group " +
                "FROM  " +
                "(SELECT Card_number, TIMESTAMPDIFF(YEAR, Date_of_birth, CURDATE()) AS Age FROM Customer) AS sk " +
                ") AS sk " +
                ") AS sk " +
                "WHERE Store_id = " + info + " GROUP BY HOUR(DateTime), Age_group " +
                "ORDER BY HOUR(DateTime)";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

}

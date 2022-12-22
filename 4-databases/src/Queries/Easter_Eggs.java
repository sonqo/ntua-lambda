package Queries;

import java.sql.*;

public class Easter_Eggs {

    public ResultSet storeMovement() throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT T.Store_id, Month(T.DateTime) AS M, COUNT(*) AS C " +
                "FROM Transaction as T " +
                "GROUP BY T.Store_id, Month(T.DateTime) " +
                "ORDER BY Store_id";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

    public ResultSet historyPercentage(String barcode) throws SQLException{

        String query;

        String driver = "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://localhost/testdb?serverTimezone=UTC";
        String username = "root";
        String password = "root";

        Connection con = DriverManager.getConnection(url, username, password);

        query = "SELECT Start_date, End_date INTO @sdate, @edate FROM " +
                "Older_prices " +
                "WHERE Product_barcode = " + barcode + " " +
                "ORDER BY Start_date DESC " +
                "limit 1, 1";

        con.prepareStatement(query).executeQuery();

        query = "SELECT before_ratio, after_ratio " +
                "FROM " +
                "( " +
                "SELECT ntrans_before, npieces_before, npieces_before/ntrans_before AS before_ratio " +
                "FROM " +
                "(SELECT COUNT(*) AS ntrans_before " +
                "FROM Transaction AS T " +
                "WHERE " +
                "T.DateTime <= @edate AND T.DateTime > @sdate) AS q1 " +
                "JOIN " +
                "( " +
                "SELECT sum(Cn.Pieces) AS npieces_before " +
                "FROM Transaction AS T, Contains AS Cn, Product AS P " +
                "WHERE " +
                "T.Card_number = Cn.Card_number  " +
                "AND T.DateTime = Cn.DateTime " +
                "AND T.Store_id = Cn.Store_id  " +
                "AND Cn.Product_barcode = P.Barcode " +
                "AND P.Barcode = " + barcode + " " +
                "AND T.DateTime <= @edate AND T.DateTime > @sdate) " +
                "AS q2) " +
                "AS q1 " +
                "JOIN " +
                "( " +
                "SELECT ntrans_after, npieces_after, npieces_after/ntrans_after AS after_ratio " +
                "FROM " +
                "(SELECT COUNT(*) AS ntrans_after " +
                "FROM Transaction AS T " +
                "WHERE " +
                "T.DateTime > @edate) AS q1 " +
                "JOIN  " +
                "( " +
                "SELECT sum(Cn.Pieces) AS npieces_after " +
                "FROM Transaction AS T, Contains AS Cn, Product AS P " +
                "WHERE " +
                "T.Card_number = Cn.Card_number  " +
                "AND T.DateTime = Cn.DateTime " +
                "AND T.Store_id = Cn.Store_id  " +
                "AND Cn.Product_barcode = P.Barcode " +
                "AND P.Barcode = " + barcode + " " +
                "AND T.DateTime > @edate) AS q2 " +
                ") AS q2";

        PreparedStatement statement = con.prepareStatement(query);

        ResultSet rs = statement.executeQuery();

        return rs;
    }

}

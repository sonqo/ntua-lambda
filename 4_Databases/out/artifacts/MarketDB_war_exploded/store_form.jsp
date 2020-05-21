<%@page import="java.sql.Connection" %>
<%@page import="java.sql.DriverManager" %>
<%@ page import="Database_Manager.DBManager" %>
<%@ page import="Queries.Store" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.sql.ResultSet" %>

<%@page language="java" contentType="text/html; ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="store_form.css">
</head>
<body>

<%
    Store store = new Store();
    ResultSet rs = store.selectQuery();

//    while (rs.next()) {
//        out.print(rs.getString("Name"));
//    }
%>



    <form action="display_store.jsp" method="post">

        <h2>Store Sales</h2>

        <label for="store">Store</label>
        <input type="text" id="store" name="store_name">

        <label for="date">Date</label>
        <input type="text" id="date" name="date_given">

        <label for="money">Minimum Money Spent</label>
        <input type="text" id="money" name="money_spent">

        <label for="amount">Minimum Amount of Products</label>
        <input type="text" id="amount" name="product_amount">

        <label>Payment Method</label>
            <div class="wrap">
                <input type="radio" id="cash" value="cash" name="payment_method"><label for="cash" class="light">Cash</label>
                <input type="radio" id="credit" value="credit" name="payment_method"><label for="credit" class="light">Credit Card</label>
            </div>
        <br>

        <label for="category">Select Product Category</label>
        <select id="category" name="product_categories">
            <option value="fresh_products">Fresh Products</option>
            <option value="refrigerator_products">Refrigerator Products</option>
            <option value="personal_care">Personal Care</option>
            <option value="house_products">Household Products</option>
            <option value="pet_products">Pet Products</option>
        </select>

        <button type="submit">Submit</button>

    </form>

<br><br><br>

    <table>
        <tr>
            <th>Street Name</th>
            <th>Street Number</th>
            <th>DateTime</th>
            <th>Card #</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Pieces</th>
            <th>Amount</th>
            <th>Payment</th>
        </tr>
    <% while(rs.next()){%>
        <tr>
            <td><%=rs.getString("Street")%></td>
            <td><%=rs.getInt("Number")%></td>
            <td><%=rs.getString("Datetime")%></td>
            <td><%=rs.getInt("Card_number")%></td>
            <td><%=rs.getString("Name")%></td>
            <td><%=rs.getString("Cat")%></td>
            <td><%=rs.getInt("Pieces")%></td>
            <td><%=rs.getInt("Total_amount")%></td>
            <td><%=rs.getString("Payment_method")%></td>
        </tr>
    <%}%>
    </table>

<br><br><br>

</body>
</html>

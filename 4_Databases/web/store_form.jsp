<%@ page import="Queries.Store" %>
<%@page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.ArrayList" %>
<%@page import="java.sql.DriverManager" %>
<%@ page import="Database_Manager.DBManager" %>

<%@page language="java" contentType="text/html; ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="store_form.css">
</head>
<body>

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
                <input type="radio" id="cash" value="1" name=payment_method><label for="Cash" class="light">Cash</label>
                <input type="radio" id="credit" value="2" name=payment_method><label for="Card" class="light">Credit Card</label>
            </div>
        <br>

        <label for="category">Select Product Category</label>
        <select id="category" name="product_categories">
            <option disabled selected value> -- Select category -- </option>
            <option value="Fresh">Fresh Products</option>
            <option value="Fridge">Refrigerator Products</option>
            <option value="personal_care">Personal Care</option>
            <option value="house_products">Household Products</option>
            <option value="pet_products">Pet Products</option>
        </select>

        <button type="submit">Submit</button>

    </form>

</body>
</html>

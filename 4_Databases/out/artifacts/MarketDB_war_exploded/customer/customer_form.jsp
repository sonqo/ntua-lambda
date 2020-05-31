<%@page language="java" contentType="text/html; ISO-8859-1" pageEncoding="ISO-8859-1" %>

<%@ page import="Queries.Store" %>
<%@page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.ArrayList" %>
<%@page import="java.sql.DriverManager" %>

<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="customer_form.css">
</head>
<body>

<form action="display_customer.jsp" method="post">

    <h2>Customer Profile</h2>

    <label for="cardnum">Customer Card Number</label>
    <input type="text" id="store" name="cardnum">

    <label for="feature_names">Select Feature Category</label>
    <select id="feature_names" name="feature_names">
        <option disabled selected value> -- Select Feature -- </option>
        <option value="products">Favorite Products</option>
        <option value="stores">Visited Stores</option>
        <option value="hours">Favorite Hours</option>
        <option value="expenses">Monthly Expenses</option>
    </select>

    <button type="submit">Submit</button>

</form>

</body>
</html>

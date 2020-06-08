<%@page language="java" contentType="text/html; ISO-8859-1" pageEncoding="ISO-8859-1" %>

<%@page import="java.sql.Connection" %>
<%@page import="java.sql.ResultSet" %>
<%@page import="java.util.ArrayList" %>
<%@page import="java.sql.DriverManager" %>

<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="view_form.css">
</head>
<body>

<form action="display_view.jsp" method="post">

    <h2>Database Views</h2>

    <label for="view">Select Feature Category</label>
    <select id="view" name="view">
        <option disabled selected value> -- Select View -- </option>
        <option value="customers">Customers</option>
        <option value="sales">Sales</option>
    </select>

    <button type="submit">Submit</button>

</form>

</body>
</html>

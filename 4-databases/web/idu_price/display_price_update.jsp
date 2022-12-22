<%@page contentType="text/html; charset=UTF-8" language="java" %>

<%@ page import="CUD.Price" %>

<%@page import="java.util.*" %>
<%@page import="java.sql.ResultSet" %>

<%
    String barcode = request.getParameter("barcode");
    String price = request.getParameter("price");

    ResultSet rs = null;

    Price update = new Price();

    rs = update.priceHistory(barcode, Float.parseFloat(price));
%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="../css/form.css">
</head>
<body>

<br><br><br>

<table>
    <tr>
        <th>Barcode</th>
        <th>Start Date</th>
        <th>Price</th>
        <th>End Date</th>
    </tr>
    <% while(rs.next()){%>
        <tr>
            <td><%=rs.getString("Product_barcode")%></td>
            <td><%=rs.getString("Start_date")%></td>
            <td><%=rs.getString("Price")%></td>
            <td><%=rs.getString("End_Date")%></td>
        </tr>
    <%}%>
</table>

</body>
</html>

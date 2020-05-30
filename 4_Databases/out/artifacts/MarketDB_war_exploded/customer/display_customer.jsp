<%@ page import="Queries.Customer" %>
<%@ page import="java.sql.ResultSet" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="customer_form.css">
</head>
<body>
<%
    String cardnum= request.getParameter("cardnum");
    String feature = request.getParameter("feature_names");

    ResultSet rs = null;

    Customer customer = new Customer();
    if (feature == null) {
        rs = customer.selectGlobalQuery(cardnum);
    }
    else if (feature.equals("products")){
        rs = customer.selectPopularProductsQuery(cardnum);
    }
%>

<br><br><br>

<table>
    <% if (feature == null){ %>
    <tr>
        <th>Street Name</th>
        <th>Street Number</th>
        <th>DateTime</th>
        <th>Barcode</th>
        <th>Product Name</th>
        <th>Category</th>
        <th>Pieces</th>
        <th>Amount</th>
        <th>Payment</th>
    </tr>
        <% while(rs.next()){%>
        <tr>
            <td><%=rs.getString("Street")%></td>
            <td><%=rs.getString("Number")%></td>
            <td><%=rs.getString("Datetime")%></td>
            <td><%=rs.getInt("Barcode")%></td>
            <td><%=rs.getString("Name")%></td>
            <td><%=rs.getString("Cat")%></td>
            <td><%=rs.getInt("Pieces")%></td>
            <td><%=rs.getInt("Total_amount")%></td>
            <td><%=rs.getString("Payment_method")%></td>
        </tr>
        <%}
    } else if (feature.equals("products")){ %>
    <tr>
        <th>Barcode</th>
        <th>Name</th>
        <th>Number of Times Bought</th>
    </tr>
        <% while(rs.next()){%>
        <tr>
            <td><%=rs.getString("Barcode")%></td>
            <td><%=rs.getString("Name")%></td>
            <td><%=rs.getString("NumberOfTimesBought")%></td>
        </tr>
        <%}
    }%>
</table>

<br><br><br>

</body>
</html>

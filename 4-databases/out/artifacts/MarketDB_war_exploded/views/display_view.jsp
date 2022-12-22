<%@page contentType="text/html; charset=UTF-8" language="java" %>

<%@page import="Queries.Views" %>

<%@page import="java.util.*" %>
<%@page import="java.sql.ResultSet" %>

<%
    String select = request.getParameter("view");

    ResultSet rs = null;

    Views view = new Views();

    if (select.equals("customers")){
        rs = view.customerView();
    }
    else if (select.equals("sales")){
        rs = view.salesView();
    }
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
    <% if (select.equals("customers")){ %>
        <tr>
            <th>Card Number</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Points</th>
            <th>Phone Number</th>
            <th>Pet</th>
            <th>Family Members</th>
            <th>Street Name</th>
            <th>Street Number</th>
            <th>Postal Code</th>
            <th>City</th>
        </tr>
        <% while(rs.next()){%>
            <tr>
                <td><%=rs.getString("Card_number")%></td>
                <td><%=rs.getString("Name")%></td>
                <td><%=rs.getString("Date_of_birth")%></td>
                <td><%=rs.getInt("Points")%></td>
                <td><%=rs.getString("Phone_number")%></td>
                <td><%=rs.getString("Pet")%></td>
                <td><%=rs.getInt("Family_members")%></td>
                <td><%=rs.getString("Street")%></td>
                <td><%=rs.getString("Number")%></td>
                <td><%=rs.getString("Postal_code")%></td>
                <td><%=rs.getString("City")%></td>
            </tr>
        <%}
    } else if (select.equals("sales")){ %>
        <tr>
            <th>DateTime</th>
            <th>Card Number</th>
            <th>Store ID</th>
            <th>Barcode</th>
            <th>Category</th>
        </tr>
        <% while(rs.next()){%>
        <tr>
            <td><%=rs.getString("DateTime")%></td>
            <td><%=rs.getString("Card_number")%></td>
            <td><%=rs.getString("Store_id")%></td>
            <td><%=rs.getString("Barcode")%></td>
            <td><%=rs.getString("Name")%></td>
        </tr>
        <%}
    }%>
</table>

</body>
</html>

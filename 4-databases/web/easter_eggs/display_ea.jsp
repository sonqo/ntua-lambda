<%@page contentType="text/html; charset=UTF-8" language="java" %>

<%@ page import="Queries.Easter_Eggs"%>

<%@page import="java.util.*" %>
<%@page import="java.sql.ResultSet" %>

<%
    String barcode = request.getParameter("barcode");
    String action = request.getParameter("action");

    ResultSet rs = null;

    Easter_Eggs egg = new Easter_Eggs();

    if (action.equals("mvmnt")){
        rs = egg.storeMovement();
    }
    else if (action.equals("historypercent")){
        rs = egg.historyPercentage(barcode);
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
    <% if (action.equals("mvmnt")){ %>
        <tr>
            <th>Store ID</th>
            <th>Month</th>
            <th>Number of Visits</th>
        </tr>
        <% while(rs.next()){%>
            <tr>
                <td><%=rs.getString("Store_id")%></td>
                <td><%=rs.getString("M")%></td>
                <td><%=rs.getString("C")%></td>
            </tr>
    <%}
    } else if (action.equals("historypercent")){ %>
        <tr>
            <th>Product ID</th>
            <th>Before Ratio (%)</th>
            <th>After Ratio (%)</th>
        </tr>
        <% while(rs.next()){%>
            <tr>
                <td><%=barcode%></td>
                <td><%=rs.getString("before_ratio")%></td>
                <td><%=rs.getString("after_ratio")%></td>
            </tr>
    <%}
    } %>
</table>

</body>
</html>

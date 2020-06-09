<%@page contentType="text/html; charset=UTF-8" language="java" %>

<%@ page import="Queries.Info" %>

<%@page import="java.util.*" %>
<%@page import="java.sql.ResultSet" %>

<%
    String info = request.getParameter("info");
    String feature = request.getParameter("feature_names");

    ResultSet rs = null;

    Info infos = new Info();

    if (feature.equals("products")){
        rs = infos.favoriteProductPairQuery();
    }
    else if (feature.equals("alleys")){
        rs = infos.favoriteAlleysQuery(info);
    }
    else if (feature.equals("brand")){

    }
    else if (feature.equals("hours")){
        rs = infos.hoursMoneySpentQuery();
    }
    else if (feature.equals("age")){
        rs = infos.ageGroupsQuery(info);
    }
%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="info_form.css">
</head>
<body>

<br><br><br>

<table>
    <% if (feature.equals("products")){ %>
        <tr>
            <th>Barcode</th>
            <th>Name</th>
            <th>Barcode</th>
            <th>Name</th>
            <th>Pairs Bought</th>
        </tr>
        <% while(rs.next()){%>
            <tr>
                <td><%=rs.getString("B1")%></td>
                <td><%=rs.getString("P1")%></td>
                <td><%=rs.getString("B2")%></td>
                <td><%=rs.getString("P2")%></td>
                <td><%=rs.getInt("Count")%></td>
            </tr>
        <%}
    } else if (feature.equals("alleys")){ %>
        <tr>
            <th>Alley Number</th>
            <th>Shelf Number</th>
            <th>Count</th>
        </tr>
        <% while(rs.next()){%>
            <tr>
                <td><%=rs.getString("Alley_number")%></td>
                <td><%=rs.getString("Shelf_number")%></td>
                <td><%=rs.getString("Count")%></td>
            </tr>
        <%}
    } else if (feature.equals("brand")){ %>
        <tr>
            <th>Street</th>
            <th>Street Number</th>
            <th>Times Visited</th>
        </tr>
        <% while(rs.next()){%>
        <tr>
            <td><%=rs.getString("Street")%></td>
            <td><%=rs.getString("Number")%></td>
            <td><%=rs.getString("TimesVisited")%></td>
        </tr>

        <%}
    } else if (feature.equals("hours")){%>
        <tr>
            <th>Hours</th>
            <th>Money Spent</th>
            <th>Number of Transactions</th>
        </tr>
            <% while(rs.next()){%>
                <tr>
                    <td><%=rs.getInt("Hour")%></td>
                    <td><%=rs.getFloat("Amount_spent")%></td>
                    <td><%=rs.getInt("Count")%></td>
                </tr>
            <%}
    } else if (feature.equals("age")){%>
        <tr>
            <th>Hour</th>
            <th>Age Group</th>
            <th>Number of Transactions</th>
        </tr>
            <% while(rs.next()){%>
                <tr>
                    <td><%=rs.getInt("Hour")%></td>
                    <td><%=rs.getString("Age_group")%></td>
                    <td><%=rs.getInt("Count")%></td>
                </tr>
            <%}
    }%>
</table>

</body>
</html>

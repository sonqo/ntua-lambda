<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="Queries.Customer" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="com.google.gson.JsonObject"%>
<%@ page import="java.util.HashMap" %>

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
    else if (feature.equals("stores")){
        rs = customer.selectPopularStoresQuery(cardnum);
    }
    else if (feature.equals("hours")){
        rs = customer.selectVisitingHoursQuery(cardnum);
    }
    else if (feature.equals("expenses")){
        rs = customer.selectAverageExpensesQuery(cardnum);
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
    } else if (feature.equals("stores")){ %>
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
    } else if (feature.equals("hours")) {

        String xVal, yVal;

        Gson gsonObj = new Gson();
        Map<Object, Object> map = null;
        List<Map<Object, Object>> list = new ArrayList<Map<Object,Object>>();
        String dataPoints = null;

        while(rs.next()){
            xVal = rs.getString("x");
            yVal = rs.getString("y");
            map = new HashMap<Object,Object>(); map.put("x", Double.parseDouble(xVal)); map.put("y", Double.parseDouble(yVal)); list.add(map);
            dataPoints = gsonObj.toJson(list);
        }

    } else if (feature.equals("expenses")){%>
        <tr>
            <th>First Transaction</th>
            <th>Last Transaction</th>
            <th>Number of Weeks</th>
            <th>Number of Months</th>
            <th>Weekly Average</th>
            <th>Monthly Average</th>
        </tr>
            <% while(rs.next()){%>
        <tr>
            <td><%=rs.getString("FirstTransaction")%></td>
            <td><%=rs.getString("LastTransaction")%></td>
            <td><%=rs.getString("NumberOfWeeks")%></td>
            <td><%=rs.getString("NumberOfMonths")%></td>
            <td><%=rs.getString("WeeklyAverage")%></td>
            <td><%=rs.getString("MonthlyAverage")%></td>
        </tr>
            <%}
    }%>
</table>

<br><br><br>

</body>
</html>

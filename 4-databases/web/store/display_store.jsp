<%@page contentType="text/html;charset=UTF-8" language="java" %>

<%@page import="Queries.Store" %>

<%@page import="java.sql.ResultSet" %>

<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="../css/form.css">
</head>
<body>
    <%
        int method;

        String address= request.getParameter("store_name");
        String date= request.getParameter("date_given");
        String money_amount = request.getParameter("money_spent");
        String product_amount = request.getParameter("product_amount");
        try {
            method = Integer.parseInt(request.getParameter("payment_method"));
        }catch (Exception e){
            method = 0;
        };
        String category = request.getParameter("product_categories");

        Store store = new Store();
        ResultSet rs = store.selectQuery(address, date, money_amount, product_amount, method, category);
        if (rs.next()){
            String str = rs.getString("Street");
            String n = rs.getString("Number");
            out.print("<br><h2>Store: " + str + " " + n + "</h2>");
        }
    %>

<br><br><br>

<table>
    <tr>
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
            <td><%=rs.getString("Datetime")%></td>
            <td><%=rs.getInt("Card_number")%></td>
            <td><%=rs.getString("Name")%></td>
            <td><%=rs.getString("Cat")%></td>
            <td><%=rs.getInt("Total_Pieces")%></td>
            <td><%=rs.getInt("Total_amount")%></td>
            <td><%=rs.getString("Payment_method")%></td>
        </tr>
    <%}%>
</table>

<br><br><br>

</body>
</html>

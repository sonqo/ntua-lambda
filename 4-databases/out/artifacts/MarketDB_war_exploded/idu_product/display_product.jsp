<%@page contentType="text/html; charset=UTF-8" language="java" %>

<%@ page import="CUD.Product" %>

<%@page import="java.util.*" %>
<%@page import="java.sql.ResultSet" %>

<%
    String barcode = request.getParameter("barcode");
    String name = request.getParameter("name");
    String bname = request.getParameter("bname");
    String cat = request.getParameter("cat");
    String price = request.getParameter("price");
    String action = request.getParameter("action");

    ResultSet rs = null;

    Product product = new Product();

    if (action.equals("insert")){
        rs = product.insertProduct(barcode, name, bname, cat, Float.parseFloat(price));
    }
    else if (action.equals("update")){
        rs = product.updateProduct(barcode, name, bname, cat, Float.parseFloat(price));
    }
    else if (action.equals("delete")){
        product.deleteProduct(barcode);
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
    <% if (action.equals("insert") || action.equals("update")){ %>
        <tr>
            <th>Barcode</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand Name</th>
            <th>Category ID</th>
        </tr>
        <% while(rs.next()){%>
            <tr>
                <td><%=rs.getString("Barcode")%></td>
                <td><%=rs.getString("Name")%></td>
                <td><%=rs.getString("Price")%></td>
                <td><%=rs.getString("Brand_name")%></td>
                <td><%=rs.getInt("Category_id")%></td>
            </tr>
        <%}
    } else if (action.equals("delete")){%>
    <script>
        window.onload = function () {
            alert("Product deleted.")
        }
    </script>
    <%}%>
</table>

</body>
</html>

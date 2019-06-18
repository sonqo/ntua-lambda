<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="java.sql.*"%>

<%
	String connectionURL = "jdbc:mysql://localhost:3306/labtesting?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";

	Connection connection = null;
	Statement statement = null;
	ResultSet rs = null;
%>

<html>
<body>

	<%
	Class.forName("com.mysql.jdbc.Driver").newInstance();
	connection = DriverManager.getConnection(connectionURL, "root", "");
	statement = connection.createStatement();
	rs = statement.executeQuery("SELECT * FROM selection");
	%>
	
	<center>
		<h1> Hello hacker! You have access to our user database!</h1>
		
		<br/><br/>
				
		<table border="5">
			<tr>
				<td>Username</td>
				<td>Password</td>
			</tr>
			<%
			while (rs.next()) {
			%>
			<tr>
				<td><%=rs.getString("username")%></td>
				<td><%=rs.getString("password")%></td>
			</tr>
			<%
			}
	
			rs.close();
			%>
		</table>
	</center>

</body>
</html>
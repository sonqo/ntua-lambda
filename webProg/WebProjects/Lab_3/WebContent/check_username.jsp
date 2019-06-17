<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ page import="java.sql.*"%>

<%
	String connectionURL = "jdbc:mysql://localhost:3306/mydatabase";
	Connection connection = null;
	Statement statement = null;	
	ResultSet rs = null;
%>

<%
	if (request.getParameter("username") != null) {
		
		String username = request.getParameter("username");
		
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		connection = DriverManager.getConnection(connectionURL, "test", "test");
		statement = connection.createStatement();
		String sqlSelect = "SELECT * FROM mytable WHERE username =\"" + username  + "\" ;";	
		rs = statement.executeQuery(sqlSelect);
	
		if(rs == null || !rs.next()){			
			out.println("Username is available");
		}
		else{
			out.println("Username is taken");
		}
		rs.close();
			
	}
%>
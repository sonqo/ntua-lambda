<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="java.sql.*"%>

<%
	String connectionURL = "jdbc:mysql://localhost:3306/labtesting?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";

	Connection connection = null;
	Statement statement = null;	
	ResultSet rs = null;
%>

<%
	if (request.getParameter("username") != null) {
		
		String username = request.getParameter("username");
		
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		connection = DriverManager.getConnection(connectionURL, "root", "");
		statement = connection.createStatement();
		String sqlSelect = "SELECT * FROM selection WHERE username =\"" + username  + "\" ;";	
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
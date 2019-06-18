<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Welcome!</title>
</head>
<body>

	<h1> Welcome <%=request.getParameter("username") %></h1>
	<h3> Thanks for joining!</h3>
	<h3> Date : <%=new java.util.Date() %></h3>
	
	<br/><br/><br/>
	
	<h5> The request was made with the <%=request.getMethod()%> HTTP method</h5>	
	
</body>
</html>
<%
response.reset();
response.setHeader("Content-type","application/xls");
response.setHeader("Content-disposition","inline; filename=export.csv");
String nomvar=(String)request.getParameter("data");
%><%=nomvar%>
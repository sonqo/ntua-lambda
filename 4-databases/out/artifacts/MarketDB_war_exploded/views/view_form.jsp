<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="../css/form.css">
</head>
<body>

<form action="display_view.jsp" method="post">

    <h2>Database Views</h2>

    <label for="view">Select Feature Category</label>
    <select id="view" name="view">
        <option disabled selected value> -- Select View -- </option>
        <option value="customers">Customers</option>
        <option value="sales">Sales</option>
    </select>

    <button type="submit">Submit</button>

</form>

</body>
</html>

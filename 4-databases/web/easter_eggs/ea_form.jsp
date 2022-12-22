<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="../css/form.css">
</head>
<body>
<form action="display_ea.jsp" method="post">

    <h2>Easter Eggs</h2>

    <label for="barcode">Barcode</label>
    <input type="text" id="barcode" name="barcode">

    <label for="action">Select Action</label>
    <select id="action" name="action">
        <option disabled selected value> -- Select Action -- </option>
        <option value="mvmnt">Store Movement</option>
        <option value="historypercent">Price History Percentages</option>
    </select>

    <button type="submit">Submit</button>

</form>

</body>
</html>

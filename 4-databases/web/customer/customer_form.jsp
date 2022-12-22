<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="../css/form.css">
</head>
<body>

<form action="display_customer.jsp" method="post">

    <h2>Customer Profile</h2>

    <label for="cardnum">Customer Card Number</label>
    <input type="text" id="store" name="cardnum">

    <label for="storeid">Store ID</label>
    <input type="text" id="storeid" name="storeid">

    <label for="feature_names">Select Feature Category</label>
    <select id="feature_names" name="feature_names">
        <option disabled selected value> -- Select Feature -- </option>
        <option value="products">Favorite Products</option>
        <option value="stores">Visited Stores</option>
        <option value="hours">Favorite Hours</option>
        <option value="expenses">Monthly Expenses</option>
    </select>

    <button type="submit">Submit</button>

</form>

</body>
</html>

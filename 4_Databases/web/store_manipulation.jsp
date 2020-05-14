<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="store_form.css">
</head>
<body>
<form action="index.html" method="post">

    <h2>Store Data Manipulation</h2>

    <label>Method</label>
    <div class="wrap">
        <input type="radio" id="insert" value="insert" name="method"><label for="insert" class="light">Insert</label>
        <input type="radio" id="update" value="update" name="method"><label for="update" class="light">Update</label>
        <input type="radio" id="delete" value="delete" name="method"><label for="delete" class="light">Delete</label>
    </div>
    <br>

    <label for="hours">Operating Hours</label>
    <input type="text" id="hours" name="store_name">

    <label for="size">Size</label>
    <input type="text" id="size" name="date_given">

    <label for="street">Street</label>
    <input type="text" id="street" name="money_spent">

    <label for="number">Number</label>
    <input type="text" id="number" name="product_amount">

    <label for="pcode">Postal Code</label>
    <input type="text" id="pcode" name="product_amount">

    <label for="city">City</label>
    <input type="text" id="city" name="product_amount">

    <button type="submit">Submit</button>

</form>

</body>
</html>

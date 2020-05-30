<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="store/store_form.css">
</head>
<body>
<form action="index.html" method="post">

    <h2>Product Data Manipulation</h2>

    <label>Method</label>
    <div class="wrap">
        <input type="radio" id="insert" value="insert" name="method"><label for="insert" class="light">Insert</label>
        <input type="radio" id="update" value="update" name="method"><label for="update" class="light">Update</label>
        <input type="radio" id="delete" value="delete" name="method"><label for="delete" class="light">Delete</label>
    </div>
    <br>

    <label for="name">Name</label>
    <input type="text" id="name" name="store_name">

    <label for="bname">Brand Name</label>
    <input type="text" id="bname" name="date_given">

    <label for="cat">Category ID</label>
    <input type="text" id="cat" name="money_spent">

    <button type="submit">Submit</button>

</form>

</body>
</html>

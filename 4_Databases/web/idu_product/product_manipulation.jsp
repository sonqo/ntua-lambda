<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="../css/form.css">
</head>
<body>
<form action="display_product.jsp" method="post">

    <h2>Product Data Manipulation</h2>

    <label for="barcode">Barcode</label>
    <input type="text" id="barcode" name="barcode">

    <label for="name">Name</label>
    <input type="text" id="name" name="name">

    <label for="bname">Brand Name</label>
    <input type="text" id="bname" name="bname">

    <label for="cat">Category ID</label>
    <input type="text" id="cat" name="cat">

    <label for="price">Price</label>
    <input type="text" id="price" name="price">

    <label for="action">Select Action</label>
    <select id="action" name="action">
        <option disabled selected value> -- Select Action -- </option>
        <option value="insert">Insert</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
    </select>

    <button type="submit">Submit</button>

</form>

</body>
</html>

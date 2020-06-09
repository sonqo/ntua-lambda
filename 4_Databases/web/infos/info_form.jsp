<!DOCTYPE html>
<html>
<head>
    <title>Market Database</title>
    <link rel="stylesheet" type="text/css" href="../css/form.css">
</head>
<body>

<form action="display_info.jsp" method="post">

    <h2>Additional Information</h2>

    <label for="info">Feature Info:</label>
    <input type="text" id="info" name="info">

    <label for="feature_names">Select Feature Category</label>
    <select id="feature_names" name="feature_names">
        <option disabled selected value> -- Select Feature -- </option>
        <option value="products">Favorite Product Pair</option>
        <option value="alleys">Favorite Alley-Shelf Pair</option>
        <option value="brand">Brand Percentage</option>
        <option value="hours">Hours Vs Money Spent</option>
        <option value="age">Age Groups</option>
    </select>

    <button type="submit">Submit</button>

</form>

</body>
</html>

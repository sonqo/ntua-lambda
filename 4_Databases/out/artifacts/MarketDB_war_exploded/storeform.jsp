<!DOCTYPE html>
<html>
<head>
<%--    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">--%>
<%--    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">--%>
    <link rel="stylesheet" type="text/css" href="storeform.css">
</head>
<body>
<form action="index.html" method="post">

    <h2>Store Sales</h2>

    <label for="store">Store</label>
    <input type="text" id="store" name="store_name">

    <label for="date">Date</label>
    <input type="text" id="date" name="date_given">

    <label for="money">Minimum Money Spent</label>
    <input type="text" id="money" name="money_spent">

    <label for="amount">Minimum Amount of Products</label>
    <input type="text" id="amount" name="product_amount">

    <label>Payment Method</label>
        <div class="wrap">
            <input type="radio" id="cash" value="cash" name="payment_method"><label for="cash" class="light">Cash</label>
            <input type="radio" id="credit" value="credit" name="payment_method"><label for="credit" class="light">Credit Card</label>
        </div>
    <br>

    <label for="category">Select Product Category</label>
    <select id="category" name="product_categories">
        <option value="fresh_products">Fresh Products</option>
        <option value="refrigerator_products">Refrigerator Products</option>
        <option value="personal_care">Personal Care</option>
        <option value="house_products">Household Products</option>
        <option value="pet_products">Pet Products</option>
    </select>

    <button type="submit">Submit</button>

</form>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


</body>
</html>
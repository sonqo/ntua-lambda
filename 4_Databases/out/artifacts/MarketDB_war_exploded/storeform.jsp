<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="form.css">
</head>
<body>
<form action="index.html" method="post">

    <h2>Store Sales</h2>

    <label for="name">Store</label>
    <input type="text" id="name" name="student_name">

    <label for="mail">Date</label>
    <input type="email" id="mail" name="student_email">

    <label for="password">Minimum Money Spent</label>
    <input type="password" id="password" name="student_password">

    <label for="password">Minimum Amount of Products</label>
    <input type="password" id="password1" name="student_password">

    <label>Payment Method</label>
        <div class="wrap">
            <input type="radio" id="under_16" value="under_16" name="user_age"><label for="under_16" class="light">Cash</label>
            <input type="radio" id="over_16" value="over_16" name="user_age"><label for="over_16" class="light">Credit Card</label>
        </div>
    <br>

    <label for="courses">Select Courses</label>
    <select id="courses" name="student_courses">
        <option value="fresh_products">Fresh Products</option>
        <option value="refrigerator_products">Refrigerator Products</option>
        <option value="personal_care">Personal Care</option>
        <option value="house_products">Household Products</option>
        <option value="pet_products">Pet Products</option>
    </select>

    <button type="submit">Submit</button>
</form>
</body>
</html>
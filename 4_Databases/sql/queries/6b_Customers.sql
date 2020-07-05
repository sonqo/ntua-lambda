SELECT NewTable.CName, Store.Street, Store.Number, NewTable.Datetime, NewTable.Barcode, NewTable.Name, NewTable.Cat, NewTable.Pieces, NewTable.Total_amount, NewTable.Payment_method
FROM 
(
	SELECT DISTINCT Customer.Name as CName, Transaction.Store_id, Transaction.DateTime, Transaction.Card_number, Product.Barcode, Product.Name, Category.Name as Cat, Contains.Pieces, Transaction.Total_amount, Transaction.Payment_method
	FROM Transaction
    INNER JOIN Customer ON Transaction.Card_number = Customer.Card_number
	INNER JOIN Contains ON Transaction.Card_number = Contains.Card_Number AND Transaction.Datetime = Contains.Datetime
    INNER JOIN Product ON Contains.Product_Barcode = Product.Barcode
	INNER JOIN Provides ON Product.Category_id = Provides.Category_id
	INNER JOIN Category ON Provides.Category_id = Category.Category_id
) NewTable
INNER JOIN Store ON NewTable.Store_id = Store.Store_id
WHERE Card_number = 3;

SELECT DISTINCT ST.Barcode, ST.Name, COUNT(*) AS NumberOfTimesBought
FROM (SELECT NewTable.CName, NewTable.CN, NewTable.Datetime, NewTable.Barcode, NewTable.Name
FROM 
(
	SELECT DISTINCT Customer.Name AS CName, Customer.Card_number AS CN, Transaction.Store_id, Transaction.DateTime, Transaction.Card_number, Product.Barcode, Product.Name, Contains.Pieces
	FROM Transaction
    INNER JOIN Customer ON Transaction.Card_number = Customer.Card_number
	INNER JOIN Contains ON Transaction.Card_number = Contains.Card_Number AND Transaction.Datetime = Contains.Datetime
    INNER JOIN Product ON Contains.Product_Barcode = Product.Barcode
	INNER JOIN Provides ON Product.Category_id = Provides.Category_id
	INNER JOIN Category ON Provides.Category_id = Category.Category_id
) NewTable
INNER JOIN Store ON NewTable.Store_id = Store.Store_id) AS ST
WHERE ST.CN = 2 GROUP BY ST.Barcode ORDER BY NumberOfTimesBought DESC
LIMIT 0, 10;

SELECT S.Street, S.Number, COUNT(*) AS TimesVisited
FROM Transaction as T, Store as S
WHERE T.Card_number = 1
AND T.Store_id = S.Store_id
GROUP BY T.Store_id
ORDER BY COUNT(*) DESC;

SELECT ST.Store_id, S.Street, ST.DateTime
FROM STRATOS AS ST , Store as S
WHERE ST.Store_id = S.Store_id
AND ST.Card_number = 1
GROUP BY ST.Store_id, ST.DateTime 
ORDER BY ST.DateTime;

SELECT MONTH(T.DateTime), SUM(T.Total_amount), COUNT(*), SUM(T.Total_amount)/COUNT(*)
FROM Transaction as T
WHERE T.Card_number = 1
GROUP BY MONTH(T.DateTime) ;

SET @min = 
(SELECT DateTime
FROM 
Transaction 
WHERE Card_number = 1
ORDER BY DateTime ASC
LIMIT 0,1); 

SET @max = 
(SELECT DateTime
FROM 
Transaction 
WHERE Card_number = 1
ORDER BY DateTime DESC
LIMIT 0,1); 

SET @months = abs(period_diff(extract(year_month from @min), extract(year_month from @max))) + 1;
SET @weeks = WEEK(@max) - WEEK(@min) + 1;

SET @total_spent = (
SELECT SUM(Total_amount)
FROM Transaction
WHERE Card_number = 1);

# monthly average = total_spent/number of months
SET @monthly = @total_spent / @months;
SET @weekly = @total_spent / @weeks;
SELECT @min AS FirstTransaction, @max AS LastTransaction, @weeks AS NumberOfWeeks, @months AS NumberOfMonths, @weekly AS WeeklyAverage, @monthly AS MonthlyAverage;
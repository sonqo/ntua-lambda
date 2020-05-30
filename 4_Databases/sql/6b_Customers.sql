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
FROM STRATOS AS ST
WHERE ST.Card_number = 2 GROUP BY ST.Barcode ORDER BY COUNT(*) DESC
LIMIT 0, 10;

SELECT T.Store_id, S.Street, COUNT(*)
FROM Transaction as T, Store as S
WHERE T.Card_number = 1
AND T.Store_id = S.Store_id
GROUP BY T.Store_id
ORDER BY COUNT(*);

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
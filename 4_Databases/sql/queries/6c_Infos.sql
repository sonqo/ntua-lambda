SELECT P1.Barcode, P1.Name, P2.Barcode, P2.Name, COUNT(*) AS Count
FROM Product AS P1, Product AS P2, Transaction as T, Contains as C1, Contains as C2
WHERE T.Card_number = C1.Card_number 
AND T.DateTime = C1.DateTime
AND T.Store_id = C1.Store_id 
AND T.Card_number = C2.Card_number 
AND T.DateTime = C2.DateTime
AND T.Store_id = C2.Store_id 
AND P1.Barcode < P2.Barcode 
AND P1.Barcode = C1.Product_barcode 
AND P2.Barcode = C2.Product_barcode
GROUP BY P1.Barcode, P2.Barcode
ORDER BY COUNT(*) DESC;

SELECT O.Alley_number,O.Shelf_number, COUNT(*) AS Count 
FROM Transaction as T, Contains as C, Product as P, Offers as O
WHERE 
T.DateTime = C.DateTime
AND T.Card_number = C.Card_number 
AND T.Store_id = C.Store_id 
AND C.Product_barcode = P.Barcode
AND O.Product_barcode = P.Barcode
AND T.Store_id = O.Store_id
AND T.Store_id = 2
GROUP BY O.Alley_number, O.Shelf_number
ORDER BY COUNT(*) DESC;

SELECT HOUR(T.DateTime) AS Hour, SUM(T.Total_amount) AS Amount_spent, COUNT(*) AS Count
FROM Transaction AS T
GROUP BY HOUR(DateTime)
ORDER BY SUM(T.Total_amount) DESC;

SELECT hour(DateTime) AS Hour, Age_group, COUNT(*) AS Count
FROM  (
SELECT *
FROM Transaction AS T
natural join Customer AS C
NATURAL JOIN
(
SELECT Card_number,
(
	CASE
		WHEN Age < 30 THEN "18 - 30"
        WHEN Age BETWEEN 30 AND 50 THEN "30 - 50"
        WHEN Age > 50 THEN "50+"
    END) AS Age_group
FROM 
(SELECT Card_number, TIMESTAMPDIFF(YEAR, Date_of_birth, CURDATE()) AS Age FROM Customer) AS sk
) AS sk
) AS sk
WHERE Store_id = 1
GROUP BY hour(DateTime), Age_group
ORDER BY hour(DateTime);

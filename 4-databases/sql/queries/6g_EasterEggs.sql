SELECT Start_date,End_date INTO @sdate, @edate FROM 
Older_prices
WHERE Product_barcode = '1234567895'
ORDER BY Start_date DESC
LIMIT 1, 1;
SELECT Start_date,End_date INTO @sdate, @edate FROM 
Older_prices
WHERE Product_barcode = '1234567895'
ORDER BY Start_date DESC
LIMIT 1, 1;
SELECT before_ratio, after_ratio 
FROM
(
SELECT ntrans_before, npieces_before, npieces_before/ntrans_before AS before_ratio
FROM
(SELECT COUNT(*) AS ntrans_before
FROM Transaction AS T
WHERE
T.DateTime <= @edate AND T.DateTime > @sdate) AS q1
JOIN
(
SELECT sum(Cn.Pieces) AS npieces_before
FROM Transaction AS T, Contains AS Cn, Product AS P
WHERE
T.Card_number = Cn.Card_number 
AND T.DateTime = Cn.DateTime
AND T.Store_id = Cn.Store_id 
AND Cn.Product_barcode = P.Barcode
AND P.Barcode = '1234567895'
AND T.DateTime <= @edate AND T.DateTime > @sdate)
AS q2)
AS q1
JOIN
(
SELECT ntrans_after, npieces_after, npieces_after/ntrans_after AS after_ratio
FROM
(SELECT COUNT(*) AS ntrans_after
FROM Transaction AS T
WHERE
T.DateTime > @edate) AS q1
JOIN 
(
SELECT sum(Cn.Pieces) AS npieces_after
FROM Transaction AS T, Contains AS Cn, Product AS P
WHERE
T.Card_number = Cn.Card_number 
AND T.DateTime = Cn.DateTime
AND T.Store_id = Cn.Store_id 
AND Cn.Product_barcode = P.Barcode
AND P.Barcode = '1234567891'
AND T.DateTime > @edate) AS q2
) AS q2;

SELECT T.Store_id, COUNT(*)
FROM Transaction as T
GROUP BY T.Store_id
ORDER BY COUNT(*) DESC;
SELECT Start_date,End_date into @sdate, @edate from 
Older_prices
where Product_barcode = '1234567895'
order by Start_date desc
limit 1,1;
select before_ratio, after_ratio 
from
(
select ntrans_before, npieces_before, npieces_before/ntrans_before as before_ratio
from
(SELECT COUNT(*) as ntrans_before
FROM Transaction as T
WHERE
T.DateTime <= @edate and T.DateTime > @sdate) as q1
join
(
SELECT sum(Cn.Pieces) as npieces_before
FROM Transaction as T, Contains as Cn, Product as P
WHERE
T.Card_number = Cn.Card_number 
AND T.DateTime = Cn.DateTime
AND T.Store_id = Cn.Store_id 
AND Cn.Product_barcode = P.Barcode
AND P.Barcode = '1234567895'
AND T.DateTime <= @edate and T.DateTime > @sdate)
as q2)
as q1
join
(
select ntrans_after, npieces_after, npieces_after/ntrans_after as after_ratio
from
(SELECT COUNT(*) as ntrans_after
FROM Transaction as T
WHERE
T.DateTime > @edate) as q1
join 
(
SELECT sum(Cn.Pieces) as npieces_after
FROM Transaction as T, Contains as Cn, Product as P
WHERE
T.Card_number = Cn.Card_number 
AND T.DateTime = Cn.DateTime
AND T.Store_id = Cn.Store_id 
AND Cn.Product_barcode = P.Barcode
AND P.Barcode = '1234567891'
AND T.DateTime > @edate) as q2
) as q2;

SELECT COUNT(*) 
FROM Transaction as T
GROUP BY T.Store_id
ORDER BY COUNT(*) DESC;
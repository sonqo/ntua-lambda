DROP VIEW IF EXISTS customer_info;
Create view customer_info AS
	SELECT * FROM customer;
 
DROP VIEW IF EXISTS sales_per_product_category; 
Create view sales_per_product_category AS 
	SELECT T.DateTime, T.Card_number, T.Store_id, P.Barcode, Ctg.Name
    FROM Transaction AS T, Contains AS Cn, Category AS Ctg, Product AS P
    WHERE 
    T.Card_number = Cn.Card_number
    AND T.DateTime = Cn.DateTime
	AND T.Store_id = Cn.Store_id
    AND Cn.Product_barcode = P.Barcode
    ORDER BY T.DateTime, T.Card_number, T.Store_id, Ctg.Name
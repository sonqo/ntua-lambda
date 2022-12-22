DELIMITER //
DROP TRIGGER IF EXISTS after_product_price_update;
CREATE TRIGGER after_product_price_update AFTER UPDATE ON Product 
for each row 
BEGIN
IF NEW.Price <> OLD.Price THEN
	SET @SD = (SELECT MAX(Older_prices.Start_date)
    FROM Older_prices
    WHERE Older_prices.Product_barcode = NEW.Barcode);
	SET @ED = (select now());
	UPDATE Older_prices
    SET End_date = @ED
    WHERE Older_prices.Product_barcode = NEW.Barcode 
    AND Older_prices.Start_Date = @SD;
    INSERT INTO Older_prices (Product_barcode, Start_date, Price, End_date)
    VALUES (NEW.Barcode, @ED, NEW.Price, NULL);    
END IF;
END;
//    

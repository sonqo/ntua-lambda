DELIMITER $$

DROP PROCEDURE IF EXISTS insert_older_prices $$  
CREATE PROCEDURE insert_older_prices() 

BEGIN
	INSERT INTO Older_prices (Product_barcode, Start_date, Price, End_date) 
	SELECT Barcode, '2020-04-25 09:45:38', truncate(Price + Price*0.04, 2), '2020-05-10 20:45:56' FROM Product;
    INSERT INTO Older_prices (Product_barcode, Start_date, Price, End_date) 
	SELECT Barcode, '2020-05-10 20:45:56', Price, NULL FROM Product;
END $$

DELIMITER ;

CALL insert_older_prices();  
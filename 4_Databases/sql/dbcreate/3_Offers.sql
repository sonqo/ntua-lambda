DELIMITER $$

DROP PROCEDURE IF EXISTS insert_offers_data $$  
CREATE PROCEDURE insert_offers_data()

BEGIN
	DECLARE i INT DEFAULT 1;
    DECLARE n_stores INT DEFAULT 0;
	SELECT COUNT(*) FROM Store INTO n_stores;  
    WHILE i < n_stores + 1 DO
		INSERT INTO Offers (Store_id, Product_barcode, Alley_number, Shelf_number) 
		SELECT i, Barcode, floor(rand()*4 + i), floor(rand()*9 + i) FROM Product;
	 	SET i = i + 1;
    END WHILE;    
END $$

DELIMITER ;

CALL insert_offers_data();  
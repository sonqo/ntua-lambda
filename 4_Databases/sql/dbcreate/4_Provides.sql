DELIMITER $$

DROP PROCEDURE IF EXISTS insert_provides $$  
CREATE PROCEDURE insert_provides()

BEGIN
DECLARE i INT DEFAULT 1;
DECLARE n_stores INT DEFAULT 0;
SELECT COUNT(*) FROM Store INTO n_stores;  
    WHILE i < n_stores + 1 DO
		INSERT INTO Provides (Category_id, Store_id) 
		SELECT Category_id, i FROM Category;
        SET i = i + 1;
    END WHILE;
END $$

DELIMITER ;

CALL insert_provides();  
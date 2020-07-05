DELIMITER $$

DROP PROCEDURE IF EXISTS insert_contains $$  
CREATE PROCEDURE insert_contains() 

BEGIN
	DECLARE n_customers INT DEFAULT 0;
	DECLARE n INT DEFAULT 0;
	DECLARE i INT DEFAULT 0;
    DECLARE j INT DEFAULT 0;
    DECLARE k INT DEFAULT 0;
    DECLARE brc varchar(13);
    DECLARE prc numeric(10,2);
    DECLARE C INT;
    DECLARE DT timestamp;
    DECLARE ST INT;
    SET @AMOUNT = 0;
    SET @TOTAL_PIECES = 0;
    
    SELECT COUNT(*) FROM Transaction INTO n;
    SELECT COUNT(*) FROM Customer INTO n_customers;
    
    WHILE k < n_customers DO 
		WHILE i < n DO 
		
			SELECT T.Card_number, T.DateTime, T.Store_id INTO C, DT, ST
			FROM Transaction AS T        
			LIMIT i, 1;
            DROP TEMPORARY TABLE IF EXISTS TMP;
			CREATE TEMPORARY TABLE TMP 
            SELECT * FROM Product ORDER BY RAND();
			
			SET @ITEMS = FLOOR(RAND()*7 + 1);
			WHILE j < @ITEMS DO
				SET @PCS = FLOOR(RAND()*3 + 1);
                SELECT P.Barcode, P.Price INTO brc, prc 
                FROM TMP AS P 
                LIMIT j, 1;
				
				INSERT INTO Contains (Card_number, DateTime, Store_id, Product_barcode, Pieces) VALUES (C, DT, ST, brc, @PCS);
				
				SET @AMOUNT = @AMOUNT + @PCS * prc;
                SET @TOTAL_PIECES = @TOTAL_PIECES + @PCS;
				SET j = j + 1;
			END WHILE;
			SET j = 0;
            DROP TEMPORARY TABLE IF EXISTS TMP;
			UPDATE Transaction SET Total_amount = @AMOUNT, Total_pieces = @TOTAL_PIECES 
			WHERE Card_number = C AND DateTime = DT AND Store_id = ST;
			SET @AMOUNT = 0;
            SET @TOTAL_PIECES = 0;
			SET i = i + 1;
		END WHILE; 
        SET k = k + 1;
	END WHILE;	
    
END $$

DELIMITER ;

CALL insert_contains();  
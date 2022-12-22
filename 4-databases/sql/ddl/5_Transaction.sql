DELIMITER $$

DROP PROCEDURE IF EXISTS insert_transactions $$  
CREATE PROCEDURE insert_transactions()

BEGIN
	DECLARE i INT DEFAULT 1;
    DECLARE j INT DEFAULT 1;
    DECLARE n_customers INT DEFAULT 0;
	SET @MIN = '2020-03-01 09:00:00';
    SET @MAX = '2020-05-31 21:00:00';
    
    SELECT COUNT(*) FROM Customer INTO n_customers;
    
    WHILE i < n_customers + 1 DO 
		WHILE j < 70 DO
			SET @TS = (SELECT TIMESTAMPADD(SECOND, FLOOR(RAND() 
			* TIMESTAMPDIFF(SECOND, @MIN, @MAX)), @MIN));
            SET @R = RAND();
            IF (@R < 0.5) THEN SET @METHOD = 'Cash';
            ELSE SET @METHOD = 'Card';
            END IF;
            
            SET @STORE = FLOOR(RAND()*3 + 1);            
			INSERT INTO Transaction (Card_number, DateTime, Store_id, Total_amount, Payment_method) 
            VALUES(i, @TS, @STORE, NULL, @METHOD);
            
			SET j = j + 1;
        END WHILE;   
        SET j = 1;
        SET i = i + 1;
    END WHILE;    
END $$

DELIMITER ;

CALL insert_transactions();  
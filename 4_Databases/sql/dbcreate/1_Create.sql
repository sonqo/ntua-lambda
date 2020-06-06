DROP DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;
USE testdb;

CREATE TABLE Store (
	Store_id INT NOT NULL AUTO_INCREMENT,
    Operating_hours VARCHAR(255),
    Size INT NOT NULL,
    Street VARCHAR(255) NOT NULL CHECK (Street <> ''),
    Number VARCHAR(20) NOT NULL,
    Postal_code NUMERIC(5,0) NOT NULL,
    City VARCHAR(255) NOT NULL CHECK (City <> ''),
    PRIMARY KEY (Store_id)
);

CREATE TABLE Customer (
	Card_number INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(255) NOT NULL CHECK (Name <> ''),
    Date_of_birth date,
    Points INT DEFAULT 0 NOT NULL,
    Phone_number VARCHAR(14),
    Pet VARCHAR(255),
    Family_members INT DEFAULT 0,
    Street VARCHAR(255) NOT NULL CHECK (Street <> ''),
    Number INT NOT NULL,
    Postal_code NUMERIC(5,0) NOT NULL, 
    City VARCHAR(255) NOT NULL CHECK (City <> ''),
    PRIMARY KEY (Card_number)
);

CREATE TABLE Category (
	Category_id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) UNIQUE, CHECK (Name in ('Fresh', 'Fridge', 'Spirits', 'Personal Care', 'Home', 'Pets')),
    PRIMARY KEY (Category_id)
);

CREATE TABLE Product (
    Category_id INT,
	Barcode VARCHAR(13) NOT NULL CHECK (Barcode <> ''),
    Price NUMERIC(10,2) NOT NULL, 
	Name VARCHAR(255) NOT NULL CHECK (Name <> ''),
    Brand_name bool,
    PRIMARY KEY (Barcode),
    FOREIGN KEY (Category_id) REFERENCES Category(Category_id) ON DELETE CASCADE
);

CREATE TABLE Phone_number (
	Store_id INT,
    Phone VARCHAR(14),
    PRIMARY KEY (Store_id, Phone),
    FOREIGN KEY (Store_id) REFERENCES Store(Store_id) ON DELETE CASCADE
);   

CREATE TABLE Transaction (
	Store_id INT,
	Card_number INT,
    DateTime TIMESTAMP,
    Total_amount NUMERIC(15,2),
    Payment_method VARCHAR(10), CHECK (Payment_method in ('Cash', 'Card', 'Points')),
    PRIMARY KEY (Card_number, DateTime, Store_id),
    FOREIGN KEY (Card_number) REFERENCES Customer(Card_number) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Store_id) REFERENCES Store(Store_id) ON DELETE CASCADE ON UPDATE CASCADE
); 

CREATE TABLE Contains (
	Card_number INT, 
    DateTime TIMESTAMP,
    Product_barcode VARCHAR(13) DEFAULT '',
    Store_id INT,
    Pieces INT,
    PRIMARY KEY (Card_number, DateTime, Store_id, Product_barcode),
    FOREIGN KEY (Card_number, DateTime, Store_id) REFERENCES Transaction(Card_number, DateTime, Store_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Product_barcode) REFERENCES Product(Barcode) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Provides (
	Category_id INT, 
    Store_id INT,
    PRIMARY KEY (Category_id, Store_id),
    FOREIGN KEY (Category_id) REFERENCES Category(Category_id) ON DELETE CASCADE,
    FOREIGN KEY (Store_id) REFERENCES Store(Store_id) ON DELETE CASCADE
);

CREATE TABLE Offers (
	Store_id INT,
	Product_barcode VARCHAR(13),
    Alley_number INT,
    Shelf_number INT,
	PRIMARY KEY (Product_barcode, Store_id),
    FOREIGN KEY (Product_barcode) REFERENCES Product(Barcode) ON DELETE CASCADE,
    FOREIGN KEY (Store_id) REFERENCES Store(Store_id) ON DELETE CASCADE
);

CREATE TABLE Older_prices (
	Product_barcode VARCHAR(13),
    Start_date TIMESTAMP,
    Price REAL,
    End_date TIMESTAMP,
    PRIMARY KEY (Product_barcode, Start_date),
    FOREIGN KEY (Product_barcode) REFERENCES Product(Barcode) ON DELETE CASCADE,
    CONSTRAINT check_date CHECK ((Start_date <= End_date) OR End_date = NULL) 
);
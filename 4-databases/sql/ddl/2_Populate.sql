USE testdb;

INSERT INTO Store
(Operating_hours, Size, Street, Number, Postal_code, City)
VALUES
('24/7', 400, 'Papadiamantopoulou', 7, 17345, 'Zografou'),
('24/7', 520, 'Mpiskini', 3, 17545, 'Attiki'),
('24/7', 1000, 'Katsoni', '15B', 18020, 'Ilisia');

INSERT INTO Category
(Name)
VALUES
('Fresh'),
('Fridge'),
('Spirits'),
('Personal Care'),
('Home'),
('Pets'); 

INSERT INTO Customer 
(Name, Date_of_birth, Points, Phone_number, Pet, Family_members, Street, Number, Postal_code, City)
VALUES
('Marios Mariou', '1993-01-02', 0, '6978453410', '', 1, 'Mpiskini', 90, 17675, 'Athens'), -- 1 (18-30)
('Kon Skov', '1995-05-08', 10, '6975463423', 'Dog', 5, 'Papagou', 45, 15236, 'Vyronas'), -- 2 (18-30)
('Gill Grant', '1908-02-04', 0, '2107721085', '', NULL, 'Xlois', 5, 17675, 'Athens'), -- 3 (50+)
('Katerina Mai', '1998-06-11', 560, '6974816551', 'Cat', 5, 'Papagou', 45, 15236, 'Vyronas'), -- 4 (18-30)
('Katerina Kapa', '1978-06-11', 60, '6974814552', 'Cat', 5, 'Papagou', 45, 15236, 'Vyronas'), -- 5 (age group 30-50)
('Kyros Ji', '1981-04-18', 0, '6974816080', 'Cat', NULL, 'Papagou', 4, 15232, 'Vyronas'), -- 6 (30-50)
('Kyra Koula', '1948-06-11', 30, '6974817553', 'Cat', 5, 'Papagou', 45, 15236, 'Vyronas'), -- 7 (50+)
('Voula Vita', '1988-06-11', 30, '6974889554', 'Cat', 5, 'Papagou', 45, 15236, 'Vyronas'), -- 8 (30-50)
('Maria Delta', '1957-09-20', 0, '6974815962', 'Dog', 2, 'Ilia Iliou', 58, 16985, 'Athens'); -- 9 (50+)

INSERT INTO Product
(Category_id, Barcode, Price, Name, Brand_name)
VALUES
-- Fridge
(2,'1234567890', 5.72, 'Milk 4%', False),
(2,'1234567891', 5.2, 'Yogurt Own Brand 2%', True),
(2,'1234567892', 6.92, 'Milk 2%', False),
(2,'1234567893', 5.72, 'Yogurt Own Brand 10%', True),
(2,'1234567894', 4.63, 'Cheese 1', False),
(2,'1234567895', 3.63, 'Cheese 2', False),
(2,'1234567896', 9.09, 'Cheese 3', False),
(2,'1234567897', 2.13, 'Vitaline', False),
(2,'1234567898', 0.34, 'Cheese Own Brand', True),
(2,'1234567899', 2.6, 'Activia', False),
-- Spirits
(3,'1234567900', 4.33, 'Beer Own Brand', True),
(3,'1234567901', 9.33, 'Corona', False),
(3,'1234567902', 6.73, 'Wine Rose', False),
(3,'1234567903', 4.33, 'Wine Red Own', True),
(3,'1234567904', 9.37, 'Wine White Own', True),
(3,'1234567905', 6.52, 'Wine Blue', False),
(3,'1234567906', 4.33, 'Cognac Own', True),
(3,'1234567907', 40, 'Champagne', False),
(3,'1234567908', 45.33, 'Vodka', False),
(3,'1234567909', 4.33, 'Cider Own', True),
(3,'1234567910', 4.33, 'Somersby', False),
(3,'1234567911', 8.9, 'Alcohol Own Brand', True),
-- Home
(5,'1234567912', 6.73, 'Pillow', False),
(5,'1234567913', 3.40, 'Chlorine', False),
(5,'1234567914', 7.33, 'Sheet Cotton Own', True),
(5,'1234567915', 8.50, 'Blanket Wool', False),
(5,'1234567916', 16.90, 'Sheet Cotton', False),
(5,'1234567917', 28.90, 'Coffee Machine', False),
(5,'1234567918', 4.50, 'Plate Blue', False),
(5,'1234567919', 4.50, 'Plate Pink', False),
(5,'1234567920', 4.50, 'Plate Silver', False),
(5,'1234567921', 5.33, 'Pillow Own', True),
-- Personal care
(4,'1234567922', 4.1, 'Razors', False),
(4,'1234567923', 4.33, 'Personal Care 1', False),
(4,'1234567924', 7.33, 'Personal Care 2', False),
(4,'1234567925', 8.33, 'PerCareProd 3', False),
(4,'1234567926', 9.33, 'PerCareProd 4', False),
(4,'1234567927', 4.53, 'Conditioner Own Brand', True),
(4,'1234567928', 2.58, 'Body Wash', False),
(4,'1234567929', 6.5, 'Hair Spray', False),
(4,'1234567930', 4.33, 'Sanitiser Own Brand', True),
(4,'1234567931', 9.34, 'Shampoo 1', True),
-- Fresh
(1,'1234567932', 4.69, 'Potatoes 4kg', False),
(1,'1234567933', 9.62, 'Chicken', False),
(1,'1234567934', 7.85, 'Fish', False),
(1,'1234567935', 8.3, 'Meat Pork 1kg', False),
(1,'1234567936', 4.28, 'Tomatoes 3kg', False),
(1,'1234567937', 2.28, 'Lemons 1kg', False),
(1,'1234567938', 2.45, 'Apples 1kg', False),
(1,'1234567939', 14.65, 'Meat Beef 1kg', False),
(1,'1234567940', 0.70, 'Lettuce 1pc', False),
(1,'1234567941', 1.70, 'Eggs 6pc Own', True),
(1,'1234567942', 4.28, 'Oranges 3kg', False),
-- Pets
(6,'1234567943', 5.68, 'Dog Food Own', True),
(6,'1234567944', 5.90, 'Dog Food 1', False),
(6,'1234567945', 6.68, 'Dog Food 2', False),
(6,'1234567946', 4.52, 'Toy Mouse', False),
(6,'1234567947', 3.20, 'Fish Food 1', False),
(6,'1234567948', 4.36, 'Fish Food 2', False),
(6,'1234567949', 25.00, 'Dog Crate', False),
(6,'1234567950', 15.68, 'Cat Crate', False),
(6,'1234567951', 5, 'Cat Food 1', False),
(6,'1234567952', 4.28, 'Cat Food Own', True),
(6,'1234567953', 4.36, 'Fish Food Own', True),
(6,'1234567954', 5.68, 'Whiskers 1pc', False),
(6,'1234567955', 3.45, 'Pet Product Own', True),
(5,'1234567956', 3.95, 'Home Prodcuct Own', True),
(3,'1234567957', 4.35, 'Some ale Own', True),
(1,'1234567958', 4.69, 'Pineapple Own', True),
(2,'1234567859', 5.72, 'Cream 12%', False),
(4,'1234567960', 7.33, 'Personal Care 6', False);

INSERT INTO Phone_number
(Store_id, Phone)
VALUES
(1, 210772411),
(2, 210772412),
(3, 210772413),
(1, 210772101),
(2, 210772102),
(3, 210772103);
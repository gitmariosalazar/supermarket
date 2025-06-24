create database supermarket;
use supermarket;

-- Tabla Person (base de Customer y Seller)
CREATE TABLE Person (
    card_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    phone VARCHAR(20)
);

-- Tabla Customer
CREATE TABLE Customer (
    id_customer VARCHAR(20) PRIMARY KEY,
    card_id VARCHAR(20),
    birth_date DATE,
    FOREIGN KEY (card_id) REFERENCES Person(card_id)
);

-- Tabla Seller
CREATE TABLE Seller (
    id_seller VARCHAR(20) PRIMARY KEY,
    card_id VARCHAR(20),
    hire_date DATE,
    salary DECIMAL(10,2),
    FOREIGN KEY (card_id) REFERENCES Person(card_id)
);

-- Tabla ProductCategory
CREATE TABLE ProductCategory (
    name VARCHAR(100) NOT NULL PRIMARY KEY,
    description TEXT
);

-- Tabla Product
CREATE TABLE Product (
    code VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    iva DECIMAL(5,2) NOT NULL,
    id_category VARCHAR(100),
    stock INT DEFAULT 0,
    public_price DECIMAL(10,2) NOT NULL,
    supplier_price DECIMAL(10,2),
    FOREIGN KEY (id_category) REFERENCES ProductCategory(name)
);

-- Tabla Cart
CREATE TABLE Cart (
    id_cart INT IDENTITY PRIMARY KEY,
    id_customer VARCHAR(20),
    subtotal DECIMAL(10,2) DEFAULT 0,
    iva DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (id_customer) REFERENCES Customer(id_customer)
);

-- Tabla CartItem
CREATE TABLE CartItem (
    id_cart_item INT IDENTITY PRIMARY KEY,
    id_cart INT,
    code_product VARCHAR(20),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    iva DECIMAL(10,2),
    total_price DECIMAL(10,2),
    FOREIGN KEY (id_cart) REFERENCES Cart(id_cart),
    FOREIGN KEY (code_product) REFERENCES Product(code)
);

-- Tabla Invoice
CREATE TABLE Invoice (
    id_invoice INT IDENTITY PRIMARY KEY,
    id_seller VARCHAR(20),
    id_cart INT,
    subtotal DECIMAL(10,2),
    iva DECIMAL(10,2),
    total DECIMAL(10,2),
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_seller) REFERENCES Seller(id_seller),
    FOREIGN KEY (id_cart) REFERENCES Cart(id_cart)
);

INSERT INTO ProductCategory (name, description) VALUES
('Electronics', 'Devices and gadgets like smartphones, laptops, and accessories'),
('Books', 'Printed and digital books across various genres'),
('Clothing', 'Men''s and women''s apparel, including casual and formal wear'),
('Home Appliances', 'Household appliances like refrigerators and washing machines'),
('Toys', 'Children''s toys and games for all ages');

-- Electronics
INSERT INTO Product (code, name, description, iva, id_category, stock, public_price, supplier_price) VALUES
('E001', 'Smartphone', 'Android 128GB', 15, 'Electronics', 50, 415.21, 298.70),
('E002', 'Laptop', '15-inch, 8GB RAM', 15, 'Electronics', 30, 693.81, 499.86),
('E003', 'Bluetooth Headphones', 'Wireless over-ear', 15, 'Electronics', 70, 83.26, 59.90),
('E004', 'USB-C Charger', 'Fast charging 45W',15, 'Electronics', 20, 27.75, 19.96),
('E005', 'Smartwatch', 'Fitness tracking', 15, 'Electronics', 40, 111.01, 79.87);

-- Books
INSERT INTO Product (code, name, description, iva, id_category, stock, public_price, supplier_price) VALUES
('B001', 'Mystery Novel', 'Thriller by J. Doe', 0.00, 'Books', 100, 11.10, 7.99),
('B002', 'Science Textbook', 'Biology edition 2023', 0.00, 'Books', 60, 27.75, 19.96),
('B003', 'Cookbook', 'Vegan recipes', 0.00, 'Books', 40, 16.65, 11.98),
('B004', 'Children''s Book', 'Illustrated stories', 0.00, 'Books', 80, 13.05, 9.39),
('B005', 'Self-help Guide', 'Time management tips', 0.00, 'Books', 50, 19.43, 13.98);

-- Clothing
INSERT INTO Product (code, name, description, iva, id_category, stock, public_price, supplier_price) VALUES
('C001', 'T-Shirt', '100% cotton, unisex', 15, 'Clothing', 100, 13.89, 9.99),
('C002', 'Jeans', 'Blue denim, slim fit', 15, 'Clothing', 60, 41.65, 29.95),
('C003', 'Jacket', 'Waterproof', 15, 'Clothing', 30, 69.38, 49.90),
('C004', 'Formal Shirt', 'White, men''s', 15, 'Clothing', 40, 24.99, 17.99),
('C005', 'Dress', 'Evening wear', 15, 'Clothing', 20, 55.43, 39.89);

-- Home Appliances
INSERT INTO Product (code, name, description, iva, id_category, stock, public_price, supplier_price) VALUES
('H001', 'Microwave Oven', '700W compact', 15, 'Home Appliances', 25, 166.51, 119.80),
('H002', 'Refrigerator', '300L double door', 15, 'Home Appliances', 15, 554.23, 398.74),
('H003', 'Vacuum Cleaner', 'Bagless', 15, 'Home Appliances', 20, 221.21, 159.15),
('H004', 'Toaster', '2-slice', 15, 'Home Appliances', 30, 41.65, 29.95),
('H005', 'Washing Machine', '7kg capacity', 15, 'Home Appliances', 10, 485.31, 349.10);

-- Toys
INSERT INTO Product (code, name, description, iva, id_category, stock, public_price, supplier_price) VALUES
('T001', 'Puzzle Set', '500 pieces', 15, 'Toys', 80, 11.10, 7.99),
('T002', 'Remote Car', 'RC 4WD vehicle', 15, 'Toys', 40, 69.38, 49.90),
('T003', 'Dollhouse', 'Miniature playset', 15, 'Toys', 25, 124.41, 89.53),
('T004', 'Action Figure', 'Superhero toy', 15, 'Toys', 60, 27.75, 19.96),
('T005', 'Board Game', 'Strategy family game', 15, 'Toys', 50, 41.65, 29.95);

INSERT INTO Person (card_id, first_name, last_name, email, address, phone) VALUES
('P001', 'Alice', 'Smith', 'alice@example.com', '123 Maple Street', '555-1001'),
('P002', 'Bob', 'Johnson', 'bob@example.com', '456 Oak Avenue', '555-1002'),
('P003', 'Carol', 'Davis', 'carol@example.com', '789 Pine Blvd', '555-1003'),
('P004', 'David', 'Garcia', 'david@example.com', '321 Birch Road', '555-1004'),
('P005', 'Eva', 'Martinez', 'eva@example.com', '654 Cedar Lane', '555-1005'),
('P006', 'Frank', 'Lopez', 'frank@example.com', '987 Spruce Dr', '555-1006'),
('P007', 'Grace', 'Lee', 'grace@example.com', '135 Cherry Way', '555-1007'),
('P008', 'Henry', 'Clark', 'henry@example.com', '246 Walnut St', '555-1008'),
('P009', 'Ivy', 'Walker', 'ivy@example.com', '369 Redwood Pl', '555-1009'),
('P010', 'Jack', 'Hall', 'jack@example.com', '159 Aspen Ct', '555-1010');

INSERT INTO Customer (id_customer, card_id, birth_date) VALUES
('C001', 'P001', '1990-04-15'),
('C002', 'P002', '1988-09-23'),
('C003', 'P003', '1992-01-10'),
('C004', 'P004', '1985-07-30'),
('C005', 'P005', '1991-12-01'),
('C006', 'P006', '1983-03-05'),
('C007', 'P007', '1994-08-18'),
('C008', 'P008', '1989-06-07'),
('C009', 'P009', '1995-11-22'),
('C010', 'P010', '1987-02-14');

INSERT INTO Seller (id_seller, card_id, hire_date, salary) VALUES
('S001', 'P001', '2021-03-15', 1200.00),
('S002', 'P002', '2022-07-01', 1350.00);


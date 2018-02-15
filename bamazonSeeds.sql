DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INTEGER (11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(200) NOT NULL,
department_name VARCHAR(200) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER (11) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronics", 300, 60), ("laptop", "electronics", 700, 50), ("tablet", "electronics", 350, 70), ("microwave", "appliances", 60, 100), ("toaster", "appliances", 30, 45), ("shoes", "clothing", 35, 60), ("hat", "clothing", 60, 80), ("coat", "clothing", 75, 100), ("drill", "tools", 70, 80), ("hammer", "tools", 10, 100);

SELECT * FROM products;
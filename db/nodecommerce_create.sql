-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-07-19 01:46:07.255

CREATE DATABASE nodecommerce;

USE nodecommerce;

-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-07-19 02:11:22.981

-- tables
-- Table: order_details
CREATE TABLE order_details (
    id INT NOT NULL AUTO_INCREMENT,
    orders_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT order_details_pk PRIMARY KEY (id)
);

-- Table: orders
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    date TIMESTAMP NOT NULL,
    users_id INT NOT NULL,
    CONSTRAINT orders_pk PRIMARY KEY (id)
);

-- Table: products
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price DECIMAL(13,2) NOT NULL,
    thumbnail TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    technology VARCHAR(500) NOT NULL,
    filename TEXT NOT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    CONSTRAINT products_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    admin TINYINT NOT NULL DEFAULT 1,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: order_details_orders (table: order_details)
ALTER TABLE order_details ADD CONSTRAINT order_details_orders FOREIGN KEY order_details_orders (orders_id)
    REFERENCES orders (id);

-- Reference: order_details_product (table: order_details)
ALTER TABLE order_details ADD CONSTRAINT order_details_product FOREIGN KEY order_details_product (product_id)
    REFERENCES products (id);

-- Reference: orders_users (table: orders)
ALTER TABLE orders ADD CONSTRAINT orders_users FOREIGN KEY orders_users (users_id)
    REFERENCES users (id);

-- End of file.

CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR (500) NOT NULL,
    users_id INT NOT NULL,
    products_id INT NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (products_id) REFERENCES products(id)
);




-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-07-19 01:46:07.255

-- tables
-- Table: order_details
CREATE TABLE order_details (
    id int NOT NULL AUTO_INCREMENT,
    orders_id int NOT NULL,
    product_id int NOT NULL,
    CONSTRAINT order_details_pk PRIMARY KEY (id)
);

-- Table: orders
CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    date timestamp NOT NULL,
    users_id int NOT NULL,
    CONSTRAINT orders_pk PRIMARY KEY (id)
);

-- Table: products
CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    description varchar(1000) NOT NULL,
    price decimal(13,2) NOT NULL,
    stock int NOT NULL DEFAULT 1,
    thumbnail text NOT NULL,
    author varchar(100) NOT NULL,
    technology varchar(500) NOT NULL,
    filename text NOT NULL,
    active tinyint NOT NULL DEFAULT 1,
    CONSTRAINT products_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    email varchar(150) NOT NULL,
    password varchar(150) NOT NULL,
    active tinyint NOT NULL DEFAULT 1 AUTO_INCREMENT,
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


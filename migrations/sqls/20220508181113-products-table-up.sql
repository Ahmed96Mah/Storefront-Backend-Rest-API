CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(150) NOT NULL,
    sold INTEGER NOT NULL
);

INSERT INTO products (name, price, category, sold) VALUES ('book1', 50, 'categ1', 0);
INSERT INTO products (name, price, category, sold) VALUES ('book2', 25, 'categ2', 0);
INSERT INTO products (name, price, category, sold) VALUES ('book3', 15, 'categ3', 0);
INSERT INTO products (name, price, category, sold) VALUES ('book4', 60, 'categ4', 0);
INSERT INTO products (name, price, category, sold) VALUES ('book5', 80, 'categ5', 0);
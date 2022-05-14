CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 1, 5);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 2, 2);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 3, 10);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 4, 3);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (2, 3, 2);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (2, 1, 6);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (2, 4, 7);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (3, 1, 20);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (3, 3, 5);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (3, 5, 1);
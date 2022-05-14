CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    status VARCHAR(80) NOT NULL
);

INSERT INTO orders (user_id, status) VALUES (1, 'active');
INSERT INTO orders (user_id, status) VALUES (1, 'active');
INSERT INTO orders (user_id, status) VALUES (2, 'active');
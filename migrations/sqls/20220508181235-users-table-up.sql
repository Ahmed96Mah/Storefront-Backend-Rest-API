CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL
);

INSERT INTO users (firstName, lastName, password) VALUES ('Ahmed', 'Mahmoud', '$2b$10$Tv5u.Cyd9nQ1mneWvucKXOTf/b6hElHguOnCjuuQ3nv0V12O6VJjy');
INSERT INTO users (firstName, lastName, password) VALUES ('firstname', 'lastname', '$2b$10$dkmYw6vyBXzBIE9twwS4WuoylF/x/KMJt1EO4YEXLBJzVMVZNji86');
INSERT INTO users (firstName, lastName, password) VALUES ('firstname1', 'lastname1', '$2b$10$dkmYw6vyBXzBIE9twwS4WuoylF/x/KMJt1EO4YEXLBJzVMVZNji86');
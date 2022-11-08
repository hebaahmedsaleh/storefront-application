CREATE TABLE products (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30) not null,
  price integer not null, 
  category VARCHAR(30)
);
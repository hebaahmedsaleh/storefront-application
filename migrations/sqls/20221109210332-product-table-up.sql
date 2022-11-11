CREATE TABLE products (
  PID SERIAL PRIMARY KEY,
  p_name VARCHAR(30) not null,
  price integer not null, 
  category VARCHAR(30)
);
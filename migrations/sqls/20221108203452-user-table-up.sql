CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  firstName VARCHAR(50) not null,
  lastName VARCHAR(50) not null, 
  password VARCHAR(255) not null
);
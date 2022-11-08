CREATE TABLE orders(
    id serial primary key, 
    order_status varchar(50) not null, 
    quantity integer not null,
     product_id integer references products(id), 
     user_id integer references users(id));

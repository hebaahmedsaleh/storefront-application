CREATE TABLE orders(
    id serial primary key, 
    order_status varchar(50) not null, 
    quantity integer not null,
    user_id integer references users(ID),
    product_id integer references products(ID));

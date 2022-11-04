CREATE TABLE order-products(
    id serial primary key, 
    product_id integer references products(id), 
    order_id integer references order(id));
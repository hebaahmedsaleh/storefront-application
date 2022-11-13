CREATE TABLE order_products (   
    id serial primary key, 
    quantity integer not null, 
    "order_id" integer DEFAULT NULL,   
    "product_id" integer DEFAULT NULL,   
    FOREIGN KEY ("order_id") REFERENCES orders("id") on delete cascade on update cascade,   
    FOREIGN KEY ("product_id") REFERENCES products("pid") on delete cascade on update cascade
);

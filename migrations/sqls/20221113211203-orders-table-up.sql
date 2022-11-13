CREATE TABLE orders (
    id serial primary key,
    order_status varchar(50) not null,
    quantity integer not null,
    "user_id" integer DEFAULT NULL,
    "product_id" integer DEFAULT NULL,
    FOREIGN KEY ("user_id") REFERENCES users("id") on delete cascade on update cascade,
    FOREIGN KEY ("product_id") REFERENCES products("pid") on delete cascade on update cascade
);
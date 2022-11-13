# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index (GET `/api/products` )
- Show (GET `/api/products/:id`)
- Create [token required] (POST `/api/products`)
- Update [token required] (PUT `/api/products/:id`)
- Delete [token required] (DELETE `/api/products/:id`)

#### Users

- Index [token required] (GET `/api/users`)
- Show [token required] (GET `/api/users/:id`)
- Create (POST `/api/users`)
- Update [token required] (PUT `/api/users/:id`)
- Delete [token required] (DELETE `/api/users/:id`)

#### Order

- Index [token required] (GET `/api/orders`)
- Show [token required] (GET `/api/orders/:id`)
- Create [token required] (POST `/api/orders`)
- Update [token required] (PUT `/api/orders/:id`)
- Delete [token required] (DELETE `/api/orders/:id`)

## DataBASE SCHEMA

#### Product

The table includes the following fields:

- pid
- p_name
- price
- [OPTIONAL] category
  The SQL schema for this table is as follows:

```sql
CREATE TABLE products (
  PID SERIAL PRIMARY KEY,
  p_name VARCHAR(30) not null,
  price integer not null,
  category VARCHAR(30)
);
```

#### Order

- id
- order_status
- quantity
- product_id
- user_id

```sql
CREATE TABLE orders (
    id serial primary key,
    order_status varchar(50) not null,
    quantity integer not null,
    "user_id" integer DEFAULT NULL,
    "product_id" integer DEFAULT NULL,
    FOREIGN KEY ("user_id") REFERENCES users("id") on delete cascade on update cascade,
    FOREIGN KEY ("product_id") REFERENCES products("pid") on delete cascade on update cascade
);
```

#### User

- id
- email
- firstName
- lastName
- password

```sqlCREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

#### order_products

The table includes the following fields:

- id
- product_id
- order_id
- quantity
  The SQL schema for this table is as follows:

```sql
CREATE TABLE order_products (
    id serial primary key,
    quantity integer not null,
    "order_id" integer DEFAULT NULL,
    "product_id" integer DEFAULT NULL,
    FOREIGN KEY ("order_id") REFERENCES orders("id") on delete cascade on update cascade,
    FOREIGN KEY ("product_id") REFERENCES products("pid") on delete cascade on update cascade
);

```

CREATE TABLE orders (
    id serial PRIMARY KEY,
    food_id integer REFERENCES foods(id) ON DELETE CASCADE,
    customer_id integer REFERENCES users(id),
    quantity integer,
    total_price integer,
    status text[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
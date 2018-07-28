create table "rooms" (
    id uuid PRIMARY KEY,
    name varchar(100) NOT NULL,
    create_user_id varchar(25) NOT NULL REFERENCES users(id),
    create_date TIMESTAMP NOT NULL
);
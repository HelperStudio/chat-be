create table "users" (
    id VARCHAR(25) PRIMARY KEY,
    name varchar(100) NULL,
    picture VARCHAR(500) null,
    gender VARCHAR(100) null
);

create table "user2sockets" (
    user_id VARCHAR(25) NOT NULL REFERENCES users(id),
    socket_id VARCHAR(100) NOT NULL
);

CREATE table "user2tokens"(
    user_id VARCHAR(25) NOT NULL REFERENCES users(id),
    access_token VARCHAR(500) NOT NULL,
    refresh_token VARCHAR(500) NOT NULL,
    expire timestamp NOT NULL
);
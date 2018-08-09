--database name:
--local_crate

DROP TABLE post_tags;
DROP TABLE tag;
DROP TABLE post;
DROP TABLE person;
DROP TABLE partner;

CREATE TABLE partner (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100),
    city VARCHAR (100),
    state VARCHAR (50),
    website VARCHAR (120), 
    bio VARCHAR (500),
    date_created VARCHAR (100) NOT NULL,
    type VARCHAR (100),
    media_key VARCHAR (2000),
    is_default_image BOOLEAN NOT NULL
);

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    first_name VARCHAR (40) NOT NULL,
    last_name VARCHAR (40) NOT NULL,
    email VARCHAR (40), 
    phone VARCHAR (40), 
    date_created VARCHAR (100) NOT NULL,
    date_updated VARCHAR (100) NOT NULL,
    partner_id INTEGER REFERENCES partner,
    is_verified BOOLEAN,
    user_type VARCHAR (100),
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    partner_id INT REFERENCES person,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (100) NOT NULL,
    media_key VARCHAR (2000) NOT NULL,
    date_created VARCHAR (100) NOT NULL,
    date_updated VARCHAR (100) NOT NULL,
    is_marked_as_hidden BOOLEAN NOT NULL
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL
);

CREATE TABLE post_tags (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES post,
    tag_id INT REFERENCES tag
);


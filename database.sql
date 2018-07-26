database name:
local_crate

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    organization_name VARCHAR (100),
    supplier_location VARCHAR (120),
    date_created VARCHAR (100) NOT NULL,
    date_updated VARCHAR (100) NOT NULL,
    supplier_type VARCHAR (100),
    isVerified BOOLEAN,
    isAdmin BOOLEAN,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    supplier_id INT REFERENCES person,
    title VARCHAR (100) NOT NULL,
    text VARCHAR (100) NOT NULL,
    media_url VARCHAR (200) NOT NULL,
    date_created VARCHAR (100) NOT NULL,
    date_updated VARCHAR (100) NOT NULL,
    isFlagged BOOLEAN NOT NULL
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

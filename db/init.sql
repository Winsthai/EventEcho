CREATE TABLE IF not EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- Added UNIQUE so we can't have duplicate usernames.
    email VARCHAR(255),
    phonenum VARCHAR(255) NOT NULL UNIQUE,
    salt VARCHAR(255) NOT NULL, -- salt by definition gets stored with the user info.
    password VARCHAR(255) NOT NULL,
    friendslist INTEGER[], 
    admin BOOLEAN DEFAULT FALSE
);

CREATE TYPE categories as ENUM ('Sports', 'Music', 'Food', 'Art', 'Hangout', 'Gaming', 'Convention');

CREATE TABLE IF not EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    eventtype categories NOT NULL,
    description text NOT NULL,
    address VARCHAR(255) NOT NULL,
    coordinates point NOT NULL,
    startdate date NOT NULL,
    starttime time WITH TIME ZONE NOT NULL,
    enddate date,
    endtime time WITH TIME ZONE,
    visibility BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS event_participants (
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, user_id)
);

CREATE TABLE IF NOT EXISTS event_creator (
    event_id INT REFERENCES  events(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, user_id)
);





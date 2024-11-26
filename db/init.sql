CREATE TABLE IF not EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- Added UNIQUE so we can't have duplicate usernames.
    email VARCHAR(255),
    phonenum VARCHAR(255) NOT NULL UNIQUE,
    salt VARCHAR(255) NOT NULL, -- salt by definition gets stored with the user info.
    password VARCHAR(255) NOT NULL,
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
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, user_id)
);

CREATE TABLE IF NOT EXISTS friends_list (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    friend_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, friend_id)
);

CREATE TABLE IF NOT EXISTS guest_users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255),
    phonenum VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS guest_user_connections (
    guest_id INT REFERENCES guest_users(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) on DELETE CASCADE,
    PRIMARY KEY (guest_id, user_id)
);






CREATE TABLE IF not EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- Added UNIQUE so we can't have duplicate usernames.
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phonenum VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status INT DEFAULT 1
);

CREATE TYPE categories as ENUM ('Sports', 'Music', 'Food', 'Art', 'Hangout', 'Gaming', 'Convention');

CREATE TABLE IF not EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    eventtype categories NOT NULL,
    description text NOT NULL,
    address VARCHAR(255) NOT NULL,
    startdate date NOT NULL,
    starttime time WITH TIME ZONE NOT NULL,
    enddate date,
    endtime time WITH TIME ZONE,
    visibility BOOLEAN DEFAULT TRUE,
    startdateraw text NOT NULL,
    starttimeraw text NOT NULL,
    enddateraw text,
    endtimeraw text,
    eventimage text
);

CREATE TABLE IF NOT EXISTS event_participants (
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, user_id)
);

CREATE TABLE IF NOT EXISTS private_event_invites (
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

CREATE TABLE IF NOT EXISTS friend_requests (
    outgoing_request INT REFERENCES users(id) ON DELETE CASCADE,
    incoming_request INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (outgoing_request, incoming_request)
);

CREATE TABLE IF NOT EXISTS guest_users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phonenum VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS guest_user_connections (
    guest_id INT REFERENCES guest_users(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) on DELETE CASCADE,
    PRIMARY KEY (guest_id, user_id)
);






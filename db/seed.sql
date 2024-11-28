INSERT INTO users (username, email, phonenum, password, status) VALUES
('john_doe', 'john.doe@example.com', '123-456-7890', '$2a$10$J02x6x6/XejiQlLFSgbmmOkX3y/OeNacb4F6whorzmCk/RxpmsrLG', 1),
('jane_smith', 'jane.smith@example.com', '123-555-6789', '$2a$10$wRaaYN0FCbshCatdJcCVQeje5sClGtAz.ZfOecVW/clY0NfvdPp0S', 1),
('mark_brown', 'mark.brown@example.com', '123-789-0123', '$2a$10$rFXtHa5StF2tbVEbKikOfu15R/dtnco4Lk4ZzqbSx7ajlT/hriaa6', 2),
('lucy_liu', 'lucy.liu@example.com', '123-123-1234', '$2a$10$G8wp/upkZfhdPstSgHH/resG5ves0zbdfKZ0oBTNGqAja2dFdyGYG', 1),
('mike_tyson', 'mike.tyson@example.com', '123-234-3456', '$2a$10$BwLogBGlE1rvPP1dROJiMe7nXWszk.iSJBx2NoW61aE24HOeNkZ1W', 1);

INSERT INTO events (title, eventtype, description, address, startdate, starttime, enddate, endtime, visibility) VALUES
('Football Game', 'Sports', 'A friendly neighborhood football game.', '123 Stadium Rd, City', '2024-11-15', '15:00:00+00', '2024-11-15', '17:00:00+00', TRUE),
('Jazz Concert', 'Music', 'Live jazz performance.', '456 Music Hall Ave, City', '2024-12-01', '19:00:00+00', '2024-12-01', '21:00:00+00', TRUE),
('Food Festival', 'Food', 'A festival with foods from around the world.', '789 Gourmet St, City', '2024-11-20', '11:00:00+00', '2024-11-20', '16:00:00+00', FALSE),
('Art Exhibit', 'Art', 'Exhibition of modern art pieces.', '101 Art Museum Blvd, City', '2024-12-05', '09:00:00+00', NULL, NULL, TRUE),
('Gaming Convention', 'Gaming', 'A gaming event for all ages.', '202 Gaming Arena, City', '2024-12-10', '10:00:00+00', '2024-12-12', '20:00:00+00', FALSE);

INSERT INTO event_participants (event_id, user_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 2),
(3, 4),
(4, 1),
(4, 5),
(5, 3),
(5, 4);

INSERT INTO event_creator (event_id, user_id) VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 5);

INSERT INTO friends_list (user_id, friend_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2),
(4, 5);

INSERT INTO guest_users (email, phonenum) VALUES
('pablo_escobar@example.com', '789-123-4567'),
('charlie_brown@example.com', '789-123-1234'),
('peter_parker@example.com', '789-234-5678'),
('david_davidson@example.com', '789-345-6789');

INSERT INTO guest_user_connections (guest_id, user_id) VALUES
(1, 1),
(2, 1),
(2, 2),
(2, 3),
(3, 2),
(3, 4),
(4, 1),
(4, 5);
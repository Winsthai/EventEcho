INSERT INTO users (username, email, phonenum, salt, password, friendslist, admin) VALUES
('john_doe', 'john.doe@example.com', '123-456-7890', 'salty123', 'password_hash_1', '{2,3}', FALSE),
('jane_smith', 'jane.smith@example.com', '123-555-6789', 'salty456', 'password_hash_2', '{1,3}', FALSE),
('mark_brown', 'mark.brown@example.com', '123-789-0123', 'salty789', 'password_hash_3', '{1,2}', TRUE),
('lucy_liu', 'lucy.liu@example.com', '123-123-1234', 'salty321', 'password_hash_4', '{5}', FALSE),
('mike_tyson', 'mike.tyson@example.com', '123-234-3456', 'salty654', 'password_hash_5', '{}', FALSE);

INSERT INTO events (title, eventtype, description, address, coordinates, startdate, starttime, enddate, endtime, visibility) VALUES
('Football Game', 'Sports', 'A friendly neighborhood football game.', '123 Stadium Rd, City', '(40.7128, -74.0060)', '2024-11-15', '15:00:00+00', '2024-11-15', '17:00:00+00', TRUE),
('Jazz Concert', 'Music', 'Live jazz performance.', '456 Music Hall Ave, City', '(40.7306, -73.9352)', '2024-12-01', '19:00:00+00', '2024-12-01', '21:00:00+00', TRUE),
('Food Festival', 'Food', 'A festival with foods from around the world.', '789 Gourmet St, City', '(40.7612, -73.9822)', '2024-11-20', '11:00:00+00', '2024-11-20', '16:00:00+00', FALSE),
('Art Exhibit', 'Art', 'Exhibition of modern art pieces.', '101 Art Museum Blvd, City', '(40.7488, -73.9854)', '2024-12-05', '09:00:00+00', NULL, NULL, TRUE),
('Gaming Convention', 'Gaming', 'A gaming event for all ages.', '202 Gaming Arena, City', '(40.7549, -73.9840)', '2024-12-10', '10:00:00+00', '2024-12-12', '20:00:00+00', FALSE);

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
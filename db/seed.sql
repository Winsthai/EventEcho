INSERT INTO users (username, firstname, lastname, email, phonenum, password, status) VALUES
('john_doe', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', '$2a$10$J02x6x6/XejiQlLFSgbmmOkX3y/OeNacb4F6whorzmCk/RxpmsrLG', 1),
('jane_smith', 'Jane', 'Smith', 'jane.smith@example.com', '123-555-6789', '$2a$10$wRaaYN0FCbshCatdJcCVQeje5sClGtAz.ZfOecVW/clY0NfvdPp0S', 1),
('mark_brown', 'Mark', 'Brown', 'mark.brown@example.com', '123-789-0123', '$2a$10$rFXtHa5StF2tbVEbKikOfu15R/dtnco4Lk4ZzqbSx7ajlT/hriaa6', 2),
('lucy_liu', 'Lucy', 'Liu', 'lucy.liu@example.com', '123-123-1234', '$2a$10$G8wp/upkZfhdPstSgHH/resG5ves0zbdfKZ0oBTNGqAja2dFdyGYG', 1),
('mike_tyson', 'Mike', 'Tyson', 'mike.tyson@example.com', '123-234-3456', '$2a$10$BwLogBGlE1rvPP1dROJiMe7nXWszk.iSJBx2NoW61aE24HOeNkZ1W', 3);

INSERT INTO events (
    title, 
    eventtype, 
    description, 
    address, 
    startdate, 
    starttime, 
    enddate, 
    endtime, 
    visibility,
    startdateraw,
    starttimeraw,
    enddateraw,
    endtimeraw,
    eventimage
) VALUES
-- id 1
('Football Game', 'Sports', 'A friendly neighborhood football game.', '123 Stadium Rd, City', 
'2025-03-02', '15:00:00+00', '2025-03-02',  '17:00:00+00',  TRUE, 
'"2025-03-02T07:00:00.000Z"', '"2024-11-28T22:00:00.000Z"', '"2025-03-02T07:00:00.000Z"', '"2024-11-29T00:00:00.000Z"',
'http://res.cloudinary.com/dk7v80lgt/image/upload/v1732950087/mvwkzcb9xumzedksazie.jpg'),
-- id 2
('Jazz Concert', 'Music', 'Live jazz performance.', '456 Music Hall Ave, City', 
'2024-12-20',  '19:00:00+00',  '2024-12-20',  '21:00:00+00',  TRUE, 
'"2024-12-20T07:00:00.000Z"', '"2024-11-29T02:00:00.000Z"', '"2024-12-20T07:00:00.000Z"', '"2024-11-29T04:00:00.000Z"', 
'http://res.cloudinary.com/dk7v80lgt/image/upload/v1732949965/ghdv8uo0xgs8zgg5xdqj.webp'),
-- id 3 (PRIVATE)
('Food Festival', 'Food', 'A festival with foods from around the world.', '789 Gourmet St, City', 
'2024-12-30', '09:00:00+00', '2024-12-31', '18:30:00+00', FALSE, 
'"2024-12-30T07:00:00.000Z"', '"2024-12-02T16:00:00.000Z"', '"2024-12-31T07:00:00.000Z"', '"2024-12-03T01:30:00.000Z"',
'http://res.cloudinary.com/dk7v80lgt/image/upload/v1732950154/vfebcn4vcnwppbzl3qrw.jpg'),
-- id 4
('Art Exhibit', 'Art', 'Exhibition of modern art pieces.', '101 Art Museum Blvd, City', 
'2024-12-16', '09:00:00+00', NULL, NULL, TRUE,
'"2024-12-16T07:00:00.000Z"', '"2024-12-02T16:00:00.000Z"', NULL, NULL,
'http://res.cloudinary.com/dk7v80lgt/image/upload/v1732950359/f4wltb9ehy06278w3fpb.jpg'),
-- id 5 (PRIVATE)
('Gaming Convention', 'Gaming', 'A gaming event for all ages.', '202 Gaming Arena, City', 
'2024-12-10', '10:00:00+00', '2024-12-12', '20:00:00+00', FALSE,
'"2024-12-10T07:00:00.000Z"', '"2024-11-28T17:00:00.000Z"', '"2024-12-12T07:00:00.000Z"', '"2024-11-29T03:00:00.000Z"',
'http://res.cloudinary.com/dk7v80lgt/image/upload/v1732950329/mn6dxy4xifgr0xewt4oh.webp'),
-- id 6 
('Symphonic Tour', 'Music', 'An enchanting evening with the city symphony orchestra.', '456 Music Ave, Town', 
'2025-05-10', '19:00:00+00', '2025-05-10', '22:00:00+00', TRUE, 
'"2025-05-10T07:00:00.000Z"', '"2024-12-05T02:00:00.000Z"', '"2025-05-10T07:00:00.000Z"', '"2025-05-11T04:00:00.000Z"', 
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366594/symphony_yfnuvg.jpg'), 
-- id 7 
('Tech Conference', 'Convention', 'Annual tech conference with industry leaders.', '789 Tech Blvd, City', 
'2025-06-20', '09:00:00+00', '2025-06-20', '17:00:00+00', TRUE, 
'"2025-06-20T16:00:00.000Z"', '"2025-06-19T15:00:00.000Z"', '"2025-06-20T16:00:00.000Z"', '"2025-06-19T23:00:00.000Z"', 
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366587/techconference_vmpxlf.jpg'), 
-- id 8 
('Marathon Race', 'Sports', 'City marathon race through scenic routes.', '654 Marathon Ln, Village', 
'2025-08-05', '07:00:00+00', '2025-08-05', '12:00:00+00', TRUE, 
'"2025-08-05T14:00:00.000Z"', '"2025-08-05T13:00:00.000Z"', '"2025-08-05T14:00:00.000Z"', '"2025-08-05T18:00:00.000Z"', 
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366581/marathon_ke2zix.png'), 
-- id 9 (PRIVATE) 
('Charity Gala', 'Convention', 'An elegant evening to raise funds for a local charity.', '101 Gala Blvd, City', 
'2025-10-15', '18:00:00+00', '2025-10-15', '23:00:00+00', FALSE, 
'"2025-10-16T01:00:00.000Z"', '"2025-10-17T00:00:00.000Z"', '"2025-10-16T01:00:00.000Z"', '"2025-10-17T05:00:00.000Z"', 
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366574/charitygala_gwdfpm.jpg'), 
-- id 10 
('Science Fair', 'Convention', 'Exhibition of scientific projects and experiments by students.', '123 Science St, District', 
'2025-11-05', '10:00:00+00', '2025-11-05', '15:00:00+00', TRUE, 
'"2025-11-05T17:00:00.000Z"', '"2025-11-05T17:00:00.000Z"', '"2025-11-05T17:00:00.000Z"', '"2024-12-04T22:00:00.000Z"', 
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366568/sciencefair_oejqia.jpg'), 
-- id 11 
('Theater Play', 'Art', 'A local theater production of a classic play.', '456 Theater Rd, City', 
'2025-12-20', '19:00:00+00', '2025-12-20', '21:30:00+00', TRUE, 
'"2025-12-21T02:00:00.000Z"', '"2025-12-21T02:00:00.000Z"', '"2025-12-21T02:00:00.000Z"', '"2025-12-21T04:30:00.000Z"', 
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366561/theatreplay_if1qmv.webp'), 
-- id 12 
('New Year Bash', 'Hangout', 'A grand party to welcome the New Year.', '789 Party Ave, Metropolis', 
'2024-12-31', '22:00:00+00', '2025-01-01', '01:00:00+00', TRUE, 
'"2025-01-01T05:00:00.000Z"', '"2026-01-02T05:00:00.000Z"', '"2025-01-02T05:00:00.000Z"', '"2026-01-01T08:00:00.000Z"',
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366554/newyearbash_subfzf.jpg'),
-- id 13
('Job Fair', 'Convention', 'An event for job seekers to connect with potential employers.', '654 Career Ln, Town', 
'2025-02-10', '09:00:00+00', '2025-02-10', '15:00:00+00', TRUE, 
'"2025-02-10T09:00:00.000Z"', '"2026-02-10T16:00:00.000Z"', '"2025-02-10T09:00:00.000Z"', '"2026-02-10T22:00:00.000Z"',
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366548/jobfair_nqpehf.webp'),
-- id 14
('Book Signing', 'Convention', 'Meet the author and get your book signed.', '321 Book St, District', 
'2025-03-15', '14:00:00+00', '2025-03-15', '16:00:00+00', TRUE, 
'"2025-03-15T14:00:00.000Z"', '"2025-03-15T20:00:00.000Z"', '"2025-03-15T14:00:00.000Z"', '"2025-03-15T22:00:00.000Z"',
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366541/booksigning_ihxcev.jpg'),
-- id 15
('Basketball Match', 'Sports', 'A competitive basketball game between local teams.', '123 Stadium Rd, City', 
'2025-04-20', '17:00:00+00', '2025-04-20', '19:00:00+00', TRUE, 
'"2025-04-20T17:00:00.000Z"', '"2025-04-20T23:00:00.000Z"', '"2025-04-20T17:00:00.000Z"', '"2025-04-21T01:00:00.000Z"',
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366625/lebron_ylb5eb.webp'),
-- id 16
('Rock Concert', 'Music', 'A thrilling rock concert featuring famous bands.', '456 Music Ave, Town', 
'2025-06-12', '20:00:00+00', '2025-06-12', '23:00:00+00', TRUE, 
'"2025-06-12T20:00:00.000Z"', '"2025-06-13T02:00:00.000Z"', '"2025-06-12T20:00:00.000Z"', '"2025-06-13T05:00:00.000Z"',
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366535/rockconcert_edcuim.jpg'),
-- id 17
('Art Gallery Opening', 'Art', 'An opening event for a new contemporary art gallery.', '321 Art St, Metropolis', 
'2025-08-22', '18:00:00+00', '2025-08-22', '21:00:00+00', TRUE, 
'"2025-08-22T18:00:00.000Z"', '"2025-08-23T00:00:00.000Z"', '"2025-08-22T18:00:00.000Z"', '"2025-08-23T03:00:00.000Z"',
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366528/artgallery_xmd2lx.jpg'),

-- id 18
('Beach Hangout', 'Hangout', 'A fun day at the beach with friends and family.', '654 Beach Blvd, Shoreline', 
'2025-09-05', '11:00:00+00', '2025-09-05', '17:00:00+00', TRUE, 
'"2025-09-05T11:00:00.000Z"', '"2025-09-05T17:00:00.000Z"', '"2025-09-05T11:00:00.000Z"', '"2025-09-05T23:00:00.000Z"',
'https://res.cloudinary.com/dk7v80lgt/image/upload/v1733366522/beachparty_xxidsk.webp')
;


INSERT INTO event_participants (event_id, user_id) VALUES
(1, 2),
(2, 1), (2, 4),
(3, 1), --private
(4, 1), (4, 5),
(5, 3), --private
(6, 5),
(7, 4),
(8, 4), (8, 5),
(9, 2), --private
(10, 5),
(11, 1), (11, 4),
(12, 3), (12, 4), (12, 5),
(13, 1),
(14, 4), (14, 5),
(15, 5), (15, 2),
(16, 1), 
(17, 2), (17, 3),
(18, 3), (18, 4)    
;

INSERT INTO event_invites (event_id, user_id) VALUES
(1, 3),
(3, 3), --private
(5, 4), --private
(6, 2), (6, 3),
(7, 2),
(8, 3),
(9, 3), --private
(12, 1),
(13, 2),
(17, 4)
;

INSERT INTO event_creator (event_id, user_id) VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 5),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 2),
(11, 2),
(12, 2),
(13, 3),
(14, 3),
(15, 4),
(16, 4),
(17, 5),
(18, 5);

INSERT INTO friends_list (user_id, friend_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2),
(4, 5),
(5, 4);

INSERT INTO friend_requests (outgoing_request, incoming_request) VALUES
(1, 5),
(2, 4);
import express from "express";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import client from "../index.js";
import {
  specificUserConfirmation,
  userConfirmation,
} from "../utils/middleware.js";

const userRouter = express.Router();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{1,3}\d{10}$/;

// Create a new user
userRouter.post("/", async (request, response, next) => {
  const { username, firstname, lastname, email, phonenum, password, status } =
    request.body;

  // Validate required fields
  if (!username || !phonenum || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  // Validate username
  if (!username || /\s/.test(username) || username.length > 16) {
    return response.status(400).json({
      error:
        "Username must not contain spaces and must be 16 characters or less.",
    });
  }
  // Validate password
  if (!passwordRegex.test(password)) {
    return response.status(400).json({
      error:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character.",
    });
  }

  // Validate email only if provided
  if (email && !emailRegex.test(email)) {
    return response.status(400).json({ error: "Invalid email format." });
  }

  // Validate phone number
  if (!phonenum) {
    return response.status(400).json({ error: "Phone number is required." });
  }
  if (!phoneRegex.test(phonenum)) {
    return response.status(400).json({
      error: "Phone number must be in the format +<country code><10 digits>.",
    });
  }

  // Validate first name
  if (firstname.length > 16) {
    return response
      .status(400)
      .json({ error: "First name must be 16 characters or less." });
  }

  // Validate last name
  if (lastname.length > 16) {
    return response
      .status(400)
      .json({ error: "Last name must be 16 characters or less." });
  }

  try {
    // Hash the password
    const saltRounds = 10; // Cost factor for bcrypt (can be adjusted for desired security level)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const result = await client.query(
      `INSERT INTO users (username, firstname, lastname, email, phonenum, password, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, username, firstname, lastname, email, phonenum, status`,
      [
        username,
        firstname,
        lastname,
        email,
        phonenum,
        hashedPassword,
        status || 1,
      ] // Default status to 1 if not provided
    );

    // Return the created user (excluding sensitive fields like password)
    response.status(201).json({ user: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      // Handle unique constraint violations (e.g., duplicate username or phone number)
      response
        .status(409)
        .json({ error: "Username or phone number already exists" });
    } else {
      next(error); // Pass other errors to the error handler
    }
  }
});

// Get a user's currently created events
// Requires a token to be provided representing the user which has created these events
userRouter.get(
  "/createdEvents",
  userConfirmation,
  async (request, response, next) => {
    try {
      const userId = request.userId;

      // Select parameters needed for event cards
      const result = await client.query(
        `SELECT e.title, e.id, e.address, e.starttime, e.startdate, e.eventimage FROM events e JOIN event_creator ec ON e.id = ec.event_id WHERE ec.user_id = $1`,
        [userId]
      );

      // Return the events
      response.status(200).json({
        events: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get a user's currently registered events
// Requires a token to be provided representing the user which has registered for these events
userRouter.get(
  "/registeredEvents",
  userConfirmation,
  async (request, response, next) => {
    try {
      const userId = request.userId;

      // Select parameters needed for event cards
      const result = await client.query(
        `SELECT e.title, e.id, e.address, e.starttime, e.startdate, e.eventimage FROM events e JOIN event_participants ec ON e.id = ec.event_id WHERE ec.user_id = $1`,
        [userId]
      );

      // Return the events
      response.status(200).json({
        events: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get users, has optional search query to filter by search
// search = <search Term>,
userRouter.get("/allUsers", async (request, response, next) => {
  try {
    // Search query (optional)
    const searchTerm = request.query.search || ""; // Default to empty string if no search term

    let queryText = `SELECT u.id, u.username, u.firstname, u.lastname FROM users u WHERE u.status != 3`;
    const queryParams = [];

    // Apply search filter if search term is provided
    if (searchTerm) {
      queryText += ` AND (username ILIKE $1 OR firstname ILIKE $1 OR lastname ILIKE $1)`;
      queryParams.push(`%${searchTerm}%`); // Ensure the search term is a string
    }

    // Select parameters needed for event cards
    const result = await client.query(queryText, queryParams);

    // Return the users
    response.status(200).json({
      users: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

// Get a user's current friends
// Requires a token to be provided representing the user who's friends will be retrieved
userRouter.get(
  "/friends",
  userConfirmation,
  async (request, response, next) => {
    try {
      const userId = request.userId;

      // Select parameters needed for event cards
      const result = await client.query(
        `SELECT u.id, u.username, u.firstname, u.lastname, u.email, u.phonenum FROM users u JOIN friends_list fl ON u.id = fl.friend_id WHERE fl.user_id = $1`,
        [userId]
      );

      // Return the users
      response.status(200).json({
        users: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get a user's incoming friend requests
// Requires a token to be provided representing the user who's friend requests will be retrieved
userRouter.get(
  "/incomingFriendRequests",
  userConfirmation,
  async (request, response, next) => {
    try {
      const userId = request.userId;

      // Select parameters needed for event cards
      const result = await client.query(
        `SELECT u.id, u.username, u.firstname, u.lastname, u.email, u.phonenum FROM users u JOIN friend_requests fr ON u.id = fr.outgoing_request WHERE fr.incoming_request = $1`,
        [userId]
      );

      // Return the users
      response.status(200).json({
        users: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get a user's outgoing friend requests
// Requires a token to be provided representing the user who's outgoing requests will be retrieved
userRouter.get(
  "/outgoingFriendRequests",
  userConfirmation,
  async (request, response, next) => {
    try {
      const userId = request.userId;

      // Select parameters needed for event cards
      const result = await client.query(
        `SELECT u.id, u.username, u.firstname, u.lastname, u.email, u.phonenum FROM users u JOIN friend_requests fr ON u.id = fr.incoming_request WHERE fr.outgoing_request = $1`,
        [userId]
      );

      // Return the users
      response.status(200).json({
        users: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Accept a friend request
// Url: (id in url should be the id of the user who is accepting the request)
// Body contains the id of the user who sent them the request (outgoingRequestId: <person who sent id>)
// Requires a token to be provided representing the user who is accepting the friend request
userRouter.post(
  "/incomingFriendRequests/:id",
  specificUserConfirmation,
  async (request, response, next) => {
    const incomingRequestId = request.params.id;
    const { outgoingRequestId } = request.body;

    try {
      // Start a transaction
      await client.query("BEGIN");

      // Check if the friend request exists before trying to delete
      const checkRequestResult = await client.query(
        `SELECT * FROM friend_requests WHERE outgoing_request = $1 AND incoming_request = $2`,
        [outgoingRequestId, incomingRequestId]
      );

      // If no friend request exists
      if (checkRequestResult.rowCount === 0) {
        await client.query("ROLLBACK"); // Discard the transaction
        return response.status(404).json({
          error: "Friend request not found",
        });
      }

      // Delete the friend request
      await client.query(
        `DELETE FROM friend_requests WHERE outgoing_request = $1 AND incoming_request = $2`,
        [outgoingRequestId, incomingRequestId]
      );

      // Add both users to the friends list (mutual friendship)
      await client.query(
        `INSERT INTO friends_list (user_id, friend_id) VALUES ($1, $2), ($2, $1)`,
        [outgoingRequestId, incomingRequestId]
      );

      // Commit the transaction
      await client.query("COMMIT");

      // Return the users
      response.status(200).json({
        message: `UserId ${incomingRequestId} accepted friend request from UserId ${outgoingRequestId}`,
      });
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback in case of an error
      next(error);
    }
  }
);

// Send a friend request
// Url: (id in url should be the id of the user who is sending the request)
// Body contains the id of the user who sent them the request (incomingRequestId: <if of person who friend request is being sent to>)
// Requires a token to be provided representing the user who is sending the friend request
userRouter.post(
  "/outgoingFriendRequests/:id",
  specificUserConfirmation,
  async (request, response, next) => {
    const outgoingRequestId = request.params.id;
    const { incomingRequestId } = request.body;

    try {
      // Start a transaction
      await client.query("BEGIN");

      // Check if the users are not the same (i.e., a user can't send a request to themselves)
      if (outgoingRequestId === incomingRequestId) {
        await client.query("ROLLBACK");
        return response.status(400).json({
          error: "You cannot send a friend request to yourself",
        });
      }

      // Check if the friend request already exists
      const checkRequestResult = await client.query(
        `SELECT * FROM friend_requests WHERE outgoing_request = $1 AND incoming_request = $2`,
        [outgoingRequestId, incomingRequestId]
      );

      if (checkRequestResult.rowCount > 0) {
        await client.query("ROLLBACK");
        return response.status(400).json({
          error: "Friend request already exists",
        });
      }

      // Insert the new friend request into the database
      await client.query(
        `INSERT INTO friend_requests (outgoing_request, incoming_request) VALUES ($1, $2)`,
        [outgoingRequestId, incomingRequestId]
      );

      // Commit the transaction
      await client.query("COMMIT");

      // Return a success message
      response.status(200).json({
        message: `UserId ${outgoingRequestId} sent a friend request to UserId ${incomingRequestId}`,
      });
    } catch (error) {
      await client.query("ROLLBACK"); // Ensure rollback in case of an error
      next(error);
    }
  }
);

// ADD THIS: for private event: only participants can view details/register

export default userRouter;

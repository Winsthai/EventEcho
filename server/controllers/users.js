import express from "express";
import client from "../index.js";

const userRouter = express.Router();

// Create a new user
userRouter.post("/", async (request, response, next) => {
  const { username, email, phonenum, salt, password, admin } = request.body;

  // Validate required fields
  if (!username || !phonenum || !salt || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Insert the user into the database
    const result = await client.query(
      `INSERT INTO users (username, email, phonenum, salt, password, admin) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, username, email, phonenum, admin`,
      [username, email, phonenum, salt, password, admin || false] // Default admin to false if not provided
    );

    // Return the created user (excluding sensitive fields like salt and password)
    response.status(201).json({ user: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      // Handle unique constraint violations (e.g., duplicate username or phone number)
      response.status(409).json({ error: "Username or phone number already exists" });
    } else {
      next(error); // Pass other errors to the error handler
    }
  }
});

export default userRouter;

import express from "express";
import client from "../index.js";

const userRouter = express.Router();

// Create a new user
userRouter.post("/", async (request, response, next) => {
  const { username, email, phonenum, password, status } = request.body;

  // Validate required fields
  if (!username || !phonenum || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Insert the user into the database
    const result = await client.query(
      `INSERT INTO users (username, email, phonenum, password, status) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, username, email, phonenum, password, status`,
      [username, email, phonenum, password, status || 1] // Default admin to false if not provided
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

import express from "express";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import client from "../index.js";

const userRouter = express.Router();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{1,3}\d{10}$/;

// Create a new user
userRouter.post("/", async (request, response, next) => {
  const { username, firstname, lastname, email, phonenum, password, status } = request.body;

  // Validate required fields
  if (!username || !phonenum || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  // Validate username
  if (!username || /\s/.test(username) || username.length > 16) {
    return response.status(400).json({ error: "Username must not contain spaces and must be 16 characters or less." });
    }
  // Validate password
  if (!passwordRegex.test(password)) {
    return response.status(400).json({ error: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character." });
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
    return response.status(400).json({ error: "Phone number must be in the format +<country code><10 digits>." });
    }

  // Validate first name
  if (firstname.length > 16) {
    return response.status(400).json({ error: "First name must be 16 characters or less." });
    }

  // Validate last name
  if (lastname.length > 16) {
    return response.status(400).json({ error: "Last name must be 16 characters or less." });
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
      [username, firstname, lastname, email, phonenum, hashedPassword, status || 1] // Default status to 1 if not provided
    );

    // Return the created user (excluding sensitive fields like password)
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

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import { SECRET } from "../utils/config.js";
import client from "../index.js";

const loginRouter = express.Router();

// Login with username and password
loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;

    // Query user
    let result = await client.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);

    const user = result.rows[0]; // Access the user object (first row from query result)

    if (!user) {
      // User not found
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    // Check if password matches
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      // Invalid password
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    if (user.status == 3) {
      // Banned
      return response.status(403).json({
        error: "This account has been banned",
      });
    }

    // Determine user role based on 'status' column
    const role = user.status == 1 ? "user" : "admin";

    // Create a token, contains username, user id, and digital signature
    const userForToken = {
      username: user.username,
      id: user.id,
      role: role,
    };

    let token;
    if (role === "admin") {
      token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 }); // Token expires after one hour for admin
    } else {
      token = jwt.sign(userForToken, SECRET, { expiresIn: 604800 }); // Token expires in one week for normal user
    }

    response.status(200).send({
      token,
      username: user.username,
      id: user.id,
    });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;

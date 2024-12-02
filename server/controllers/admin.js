import express from "express";
import client from "../index.js";
import { adminConfirmation } from "../utils/middleware.js";

const adminRouter = express.Router();

// Use admin token check middleware
adminRouter.use(adminConfirmation);

/////////////////////////////////////////////////////////
/* All API calls in this file require an admin's token */
/////////////////////////////////////////////////////////

// Simply checks if a user is an admin or not
adminRouter.get("/", async (request, response, next) => {
  try {
    response.status(200).json({
      message: "Admin authenticated",
    });
  } catch (error) {
    next(error);
  }
});

// Ban a user
// Accepts user ID as a URL parameter
adminRouter.patch("/banUser/:id", async (request, result, next) => {
  const userId = request.params.id; // Get user ID from URL parameters

  try {
    // Start a transaction
    await client.query("BEGIN");

    // Check if the user exists
    const userResult = await client.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (userResult.rowCount === 0) {
      // If user not found
      await client.query("ROLLBACK");
      return result.status(404).json({ error: "User not found" });
    }

    if (userResult.rows[0].status == 3) {
      // If user is already banned
      await client.query("ROLLBACK");
      return result.status(400).json({ error: "User is already banned" });
    }

    // Update the user's status to 3 (banned)
    await client.query("UPDATE users SET status = 3 WHERE id = $1", [userId]);

    // Commit the transaction
    await client.query("COMMIT");

    return result.status(200).json({
      message: `User with ID ${userId} has been banned successfully.`,
    });
  } catch (error) {
    // Rollback in case of an error
    await client.query("ROLLBACK");
    next(error);
  }
});

// Unban a user
// Accepts user ID as a URL parameter
adminRouter.patch("/unbanUser/:id", async (request, result, next) => {
  const userId = request.params.id; // Get user ID from URL parameters

  try {
    // Start a transaction
    await client.query("BEGIN");

    // Check if the user exists
    const userResult = await client.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (userResult.rowCount === 0) {
      // If user not found
      await client.query("ROLLBACK");
      return result.status(404).json({ error: "User not found" });
    }

    if (userResult.rows[0].status == 1) {
      // If user is already banned
      await client.query("ROLLBACK");
      return result.status(400).json({ error: "User is already not banned" });
    }

    // Update the user's status to 3 (banned)
    await client.query("UPDATE users SET status = 1 WHERE id = $1", [userId]);

    // Commit the transaction
    await client.query("COMMIT");

    return result.status(200).json({
      message: `User with ID ${userId} has been unbanned successfully.`,
    });
  } catch (error) {
    // Rollback in case of an error
    await client.query("ROLLBACK");
    next(error);
  }
});

export default adminRouter;

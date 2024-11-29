import express from "express";
import client from "../index.js";
import { deleteConfirmation, userConfirmation } from "../utils/middleware.js";

const eventRouter = express.Router();
const eventTypes = new Set([
  "Sports",
  "Music",
  "Food",
  "Art",
  "Hangout",
  "Gaming",
  "Convention",
]);

// Get all events, has pagination, search, and filter functionality
// Only shows public events
// Optional parameters: eventType = <event type>, search = <search Term>, page = <page number>, limit = <items per page>
eventRouter.get("/", async (request, response, next) => {
  try {
    // Default pagination values
    const page = Math.max(1, parseInt(request.query.page) || 1); // Default to page 1 if not provided
    const limit = Math.max(1, parseInt(request.query.limit) || 10); // Default to 10 items per page if not provided
    const offset = (page - 1) * limit;

    // Search query (optional)
    const searchTerm = request.query.search || ""; // Default to empty string if no search term

    // Base query to fetch events
    let queryText = "SELECT * FROM events WHERE visibility = true"; // Default condition is always true
    const queryParams = [];

    let placeholderIndex = 1; // Start the placeholder index from 1

    // Apply eventType filter if provided
    if (request.query.eventType) {
      if (eventTypes.has(request.query.eventType)) {
        queryText += ` AND eventtype = $${placeholderIndex}`; // Use current placeholder index
        queryParams.push(request.query.eventType); // Ensure eventType is a string
        placeholderIndex++; // Increment placeholder index for the next parameter
      } else {
        return response.status(400).json({
          error: `Event type ${request.query.eventType} does not exist`,
        });
      }
    }

    // Apply search filter if search term is provided
    if (searchTerm) {
      queryText += ` AND (title ILIKE $${placeholderIndex})`;
      queryParams.push(`%${searchTerm}%`); // Ensure the search term is a string
      placeholderIndex++; // Increment placeholder index for the next parameter
    }

    // Apply pagination
    queryText += ` LIMIT $${placeholderIndex} OFFSET $${placeholderIndex + 1}`;
    queryParams.push(limit, offset); // Ensure limit and offset are integers

    // Execute the query
    const result = await client.query(queryText, queryParams);

    // Get total count for pagination (total pages calculation)
    let countQuery = "SELECT COUNT(*) FROM events WHERE visibility = true"; // Base count query
    const countQueryParams = []; // Separate query parameters for count query
    let countPlaceholderIndex = 1; // Placeholder index for count query

    // Apply eventType filter for total count query
    if (request.query.eventType) {
      countQuery += ` AND eventtype = $${countPlaceholderIndex}`;
      countQueryParams.push(request.query.eventType);
      countPlaceholderIndex++;
    }

    // Apply search filter for total count query
    if (searchTerm) {
      countQuery += ` AND (title ILIKE $${countPlaceholderIndex})`;
      countQueryParams.push(`%${searchTerm}%`);
      countPlaceholderIndex++;
    }

    // Execute the count query
    const countResult = await client.query(countQuery, countQueryParams);
    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    // Return paginated response
    response.status(200).json({
      page,
      limit,
      totalPages,
      totalCount,
      events: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

// Get a single event by id
eventRouter.get("/:id", async (request, response, next) => {
  try {
    // Extract event ID from request parameters
    const eventId = parseInt(request.params.id);

    // Validate the ID
    if (isNaN(eventId) || eventId <= 0) {
      return response.status(400).json({
        error: "Invalid event ID",
      });
    }

    // Query to get the event by ID
    const queryText = "SELECT * FROM events WHERE id = $1";
    const result = await client.query(queryText, [eventId]);

    // Check if the event was found
    if (result.rows.length === 0) {
      return response.status(404).json({
        error: `Event with ID ${eventId} not found`,
      });
    }

    // Return the event data
    response.status(200).json({
      event: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Create a new event
// Requires a token to identify who the user is making this event
eventRouter.post("/", userConfirmation, async (request, response, next) => {
  const {
    title,
    eventtype,
    description,
    address,
    startdate,
    starttime,
    enddate,
    endtime,
    visibility,
  } = request.body;

  const userId = request.userId; // Access the user ID from the token

  if (
    !title ||
    !eventtype ||
    !description ||
    !address ||
    !startdate ||
    !starttime
  ) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  if (!userId) {
    return response.status(400).json({ error: "Invalid token" });
  }

  try {
    const result = await client.query(
      `INSERT INTO events 
       (title, eventtype, description, address, startdate, starttime, enddate, endtime, visibility) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        title,
        eventtype,
        description,
        address,
        startdate,
        starttime,
        enddate,
        endtime,
        visibility,
      ]
    );

    await client.query(
      `INSERT INTO event_creator (event_id, user_id) VALUES ($1, $2)`,
      [result.rows[0].id, userId]
    );

    response
      .status(201)
      .json({ event: result.rows[0], eventCreatorId: userId });
  } catch (error) {
    next(error);
  }
});

// Delete an event
// Requires a token to ensure that the user deleting the event is the one who made it, or is an admin
eventRouter.delete(
  "/:id",
  deleteConfirmation,
  async (request, response, next) => {
    const id = request.params.id;

    try {
      const result = await client.query(`DELETE FROM events WHERE id = $1;`, [
        id,
      ]);

      if (result.rowCount === 0) {
        // No rows were deleted (event not found)
        return response.status(404).json({ error: "Event not found" });
      }

      // Send a success response with no content
      response.status(204).send(); // No content response after successful deletion
    } catch (error) {
      next(error);
    }
  }
);

// Register a user for an event
// Requires a token to identify who the user is registering for this event
eventRouter.post(
  "/:id/register",
  userConfirmation,
  async (request, response, next) => {
    const eventId = request.params.id;
    const userId = request.userId; // Access the user ID from the token

    if (!userId) {
      return response.status(400).json({ error: "Invalid token" });
    }

    try {
      const eventExistsResult = await client.query(
        `SELECT 1 FROM events WHERE id = $1`,
        [eventId]
      );

      if (eventExistsResult.rowCount === 0) {
        // If no rows are returned, the event doesn't exist
        return response.status(400).json({ error: "EventId does not exist" });
      }

      await client.query(
        `INSERT INTO event_participants (event_id, user_id) VALUES ($1, $2)`,
        [eventId, userId]
      );

      response.status(201).json({ eventId: eventId, userRegisteredId: userId });
    } catch (error) {
      next(error);
    }
  }
);

export default eventRouter;

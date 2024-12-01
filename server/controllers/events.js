import express, { query } from "express";
import client from "../index.js";
import { creatorConfirmation, userConfirmation } from "../utils/middleware.js";

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
// Optional parameters:
// eventType = <event type> (multiple values should be separated by comma, no space),
// search = <search Term>,
// page = <page number>,
// limit = <items per page>
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

    let eventTypesArray;
    // Apply eventType filter if provided, multiple should be separated by comma
    if (request.query.eventType) {
      eventTypesArray = request.query.eventType
        .split(",")
        .map((type) => type.trim()); // Split the eventType by commas and trim spaces
      if (eventTypesArray.length > 0) {
        // Validate that each eventType is valid
        for (let eventType of eventTypesArray) {
          if (!eventTypes.has(eventType)) {
            return response.status(400).json({
              error: `Event type ${eventType} does not exist`,
            });
          }
        }

        console.log(eventTypesArray);

        // Add the `IN` filter to the query
        queryText += ` AND eventtype IN (${eventTypesArray
          .map((_, index) => `$${placeholderIndex + index}`)
          .join(", ")})`;
        queryParams.push(...eventTypesArray);
        placeholderIndex += eventTypesArray.length; // Increment the placeholder index for each eventType
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
      countQuery += ` AND eventtype IN (${eventTypesArray
        .map((_, index) => `$${countPlaceholderIndex + index}`)
        .join(", ")})`;
      countQueryParams.push(...eventTypesArray);
      countPlaceholderIndex += eventTypesArray.length;
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
    startdateraw,
    starttime,
    starttimeraw,
    enddate,
    enddateraw,
    endtime,
    endtimeraw,
    visibility,
    eventimage,
  } = request.body;

  const userId = request.userId; // Access the user ID from the token

  if (
    !title ||
    !eventtype ||
    !description ||
    !address ||
    !startdate ||
    !startdateraw ||
    !starttime ||
    !starttimeraw
  ) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  if (!userId) {
    return response.status(400).json({ error: "Invalid token" });
  }

  try {
    const result = await client.query(
      `INSERT INTO events 
       (title, eventtype, description, address, startdate, starttime, enddate, endtime, visibility, startdateraw, starttimeraw, enddateraw, endtimeraw, eventimage) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
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
        startdateraw,
        starttimeraw,
        enddateraw,
        endtimeraw,
        eventimage,
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
  creatorConfirmation,
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

// Edit an event
// Requires a token to ensure that the user editing the event is the one who made it, or is an admin
eventRouter.put(
  "/:id",
  creatorConfirmation,
  async (request, response, next) => {
    const { id } = request.params;
    const {
      title,
      eventtype,
      description,
      address,
      startdate,
      startdateraw,
      starttime,
      starttimeraw,
      enddate,
      enddateraw,
      endtime,
      endtimeraw,
      visibility,
      eventimage,
    } = request.body;

    // Check if the event exists
    const eventExists = await client.query(
      "SELECT * FROM events WHERE id = $1",
      [id]
    );

    if (eventExists.rows.length === 0) {
      return response.status(404).json({ error: "Event not found" });
    }

    // Set the updated values, but only if they are provided (or keep existing values if not)
    const updatedValues = [
      title || eventExists.rows[0].title,
      eventtype || eventExists.rows[0].eventtype,
      description || eventExists.rows[0].description,
      address || eventExists.rows[0].address,
      startdate || eventExists.rows[0].startdate,
      starttime || eventExists.rows[0].starttime,
      enddate || eventExists.rows[0].enddate,
      endtime || eventExists.rows[0].endtime,
      visibility || eventExists.rows[0].visibility,
      startdateraw || eventExists.rows[0].startdateraw,
      starttimeraw || eventExists.rows[0].starttimeraw,
      enddateraw || eventExists.rows[0].enddateraw,
      endtimeraw || eventExists.rows[0].endtimeraw,
      eventimage || eventExists.rows[0].eventimage,
      id,
    ];

    try {
      // Update the event in the database
      const updateQuery = `
        UPDATE events
        SET 
          title = $1,
          eventtype = $2,
          description = $3,
          address = $4,
          startdate = $5,
          starttime = $6,
          enddate = $7,
          endtime = $8,
          visibility = $9,
          startdateraw = $10,
          starttimeraw = $11,
          enddateraw = $12,
          endtimeraw = $13,
          eventimage = $14
        WHERE id = $15
        RETURNING *;
      `;

      const result = await client.query(updateQuery, updatedValues);

      // Check if the event was updated successfully
      if (result.rows.length === 0) {
        return response.status(400).json({ error: "Event update failed" });
      }

      response.status(200).json({ event: result.rows[0] });
    } catch (error) {
      next(error);
    }
  }
);

export default eventRouter;

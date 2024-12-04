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

    const event = result.rows[0];

    // Additional checks for private events
    if (!event.visibility) {
      userConfirmation(request, response, (err) => {
        if (err) {
          return next(err); // If there is an error, pass it to the error handler
        }
      });

      // Check invites
      if (!request.userId) {
        // If userId isn't set by the middleware, there was an error, so stop
        return;
      }

      const { userId } = request;

      const privateResult = await client.query(
        `SELECT 1 FROM event_invites WHERE event_id = $1 AND user_id = $2`,
        [eventId, userId]
      );

      const creatorResult = await client.query(
        `SELECT 1 FROM event_creator WHERE event_id = $1 AND user_id = $2`,
        [eventId, userId]
      );

      const participantResult = await client.query(
        `SELECT 1 FROM event_participants WHERE event_id = $1 AND user_id = $2`,
        [eventId, userId]
      );

      // User is not invited to this event
      if (
        privateResult.rowCount === 0 &&
        creatorResult.rowCount === 0 &&
        participantResult.rowCount === 0
      ) {
        return response.status(401).json({
          error: "You have not been invited to this private event",
        });
      }
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
        `SELECT e.startdate, e.enddate, e.visibility FROM events e WHERE e.id = $1`,
        [eventId]
      );

      if (eventExistsResult.rowCount === 0) {
        // If no rows are returned, the event doesn't exist
        return response.status(400).json({ error: "EventId does not exist" });
      }

      const event = eventExistsResult.rows[0];
      const today = new Date();
      const todayDateTime = new Date(
      `${today.toISOString().slice(0, 10)}T${today.toISOString().slice(11, 19)}-07:00`
        );

      // Convert dates to Date objects for comparison
      const eventStartDate = new Date(event.startdate);
      const eventEndDate = event.enddate ? new Date(event.enddate) : null;

      // Check if the event has already passed
      if (eventEndDate) {
        if (todayDateTime > eventEndDate) {
          return response.status(400).json({
            error: "This event has already passed",
          });
        }
      } else if (todayDateTime > eventStartDate) {
        return response.status(400).json({
          error: "This event has already passed",
        });
      }

      // Additional checks for private events
      if (!event.visibility) {
        const privateResult = await client.query(
          `SELECT * FROM event_invites WHERE event_id = $1 AND user_id = $2`,
          [eventId, userId]
        );

        // User is not invited to this event
        if (privateResult.rowCount === 0) {
          return response.status(401).json({
            error: "You have not been invited to this private event",
          });
        }
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

// Unregister a user from an event
// Requires a token to identify who the user is unregistering for this event
eventRouter.delete(
  "/:id/unregister",
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

      const userRegisteredResult = await client.query(
        `SELECT 1 FROM event_participants WHERE event_id = $1 AND user_id = $2`,
        [eventId, userId]
      );

      if (userRegisteredResult.rowCount === 0) {
        // If no rows are returned, user is not registered for this event
        return response
          .status(400)
          .json({ error: "You are not registered for this event" });
      }

      await client.query(
        `DELETE FROM event_participants WHERE event_id = $1 AND user_id = $2`,
        [eventId, userId]
      );

      response.status(200).json({
        message: `UserId ${userId} unregistered from eventId ${eventId}`,
      });
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
      enddate,
      endtime,
      visibility,
      startdateraw || eventExists.rows[0].startdateraw,
      starttimeraw || eventExists.rows[0].starttimeraw,
      enddateraw,
      endtimeraw,
      eventimage,
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

// Get invited users for an event
// Requires a token to ensure that the user viewing the invited users of this event is the one who made it, or is an admin
eventRouter.get(
  "/:id/invitedUsers",
  creatorConfirmation,
  async (req, res, next) => {
    const eventId = req.params.id; // Get the event ID from the URL parameter

    try {
      // Execute the query with the eventId as the parameter
      const result = await client.query(
        `
      SELECT u.id, u.username, u.firstname, u.lastname, u.email, u.phonenum
      FROM users u
      JOIN event_invites ei ON u.id = ei.user_id
      WHERE ei.event_id = $1;
    `,
        [eventId]
      );

      // Check if any users were invited (optional check, frontend can decide if needed or not)
      /* if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No invited users found for this event" });
    } */

      // Return list of invited users
      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  }
);

// Get number of users registered for an event
eventRouter.get("/:id/numberOfUsers", async (req, res, next) => {
  const eventId = req.params.id; // Get the event ID from the URL parameter

  try {
    const result = await client.query(
      ` SELECT COUNT(*) 
        FROM event_participants 
        WHERE event_id = $1;`,
      [eventId]
    );

    // Return list of invited users
    res.status(200).json({ count: result.rows[0].count });
  } catch (error) {
    next(error);
  }
});

// Get users that will be attending the event
// Requires a token representing the creator of the event
eventRouter.get(
  "/:id/attendingUsers",
  userConfirmation,
  async (req, response, next) => {
    const eventId = req.params.id; // Get the event ID from the URL parameter
    const userId = req.userId;

    try {
      // Find the event
      const creatorResult = await client.query(
        `SELECT * FROM event_creator WHERE event_id = $1`,
        [eventId]
      );

      if (creatorResult.rowCount === 0) {
        return response
          .status(404)
          .json({ error: `Event with id ${id} does not exist` });
      }

      // Get the creator of the event for later check
      const retrievedUserId = creatorResult.rows[0].user_id;

      const participantResult = await client.query(
        `SELECT * FROM event_participants WHERE event_id = $1 AND user_id = $2`,
        [eventId, userId]
      );

      // Success if user is either a participant OR the creator
      if (retrievedUserId == userId || participantResult.rowCount !== 0) {
        // Proceed with the normal logic since the user is authorized
      } else {
        // Error if the user is neither a participant nor the creator
        return response
          .status(403)
          .json({ error: "You are not authorized to perform this action" });
      }

      const result = await client.query(
        ` SELECT u.id, u.username, u.firstname, u.lastname 
        FROM event_participants ep
        JOIN users u ON ep.user_id = u.id 
        WHERE event_id = $1;`,
        [eventId]
      );

      // Return list of invited users
      response.status(200).json({ users: result.rows });
    } catch (error) {
      next(error);
    }
  }
);

// Invite users to an event
// Requires a token to ensure that the user viewing the invited users of this event is the one who made it, or is an admin
eventRouter.post(
  "/:id/invitedUsers",
  creatorConfirmation,
  async (req, res, next) => {
    const eventId = req.params.id; // Get the event ID from the URL parameter
    const userIds = req.body.userIds;

    if (!userIds || userIds.length === 0) {
      return res.status(400).json({ message: "No userIds provided" });
    }

    try {
      // Insert each user_id into the event_invites table for the given event_id
      const values = userIds
        .map((userId) => `(${eventId}, ${userId})`)
        .join(",");

      await client.query(`
        INSERT INTO event_invites (event_id, user_id)
        VALUES ${values}
        ON CONFLICT (event_id, user_id) DO NOTHING;`);

      // Return list of invited users
      res.status(200).json({ message: "Users invited successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default eventRouter;

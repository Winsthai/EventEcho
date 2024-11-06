import express from "express";
import client from "../index.js";

const eventRouter = express.Router();
const eventTypes = new Set(['Sports', 'Music', 'Food', 'Art', 'Hangout', 'Gaming', 'Convention']);

// Get all events
// Optional parameters: eventtype = <eventtype>
eventRouter.get("/", async (request, response, next) => {
  try {
    if (request.query.eventType) {
        if (eventTypes.has(request.query.eventType)) {
            // Return events of the specified type
            const result = await client.query("SELECT * FROM events WHERE eventtype = $1", [request.query.eventType]);
            response.status(200).json(result.rows);
            return;
        } else {
            response.status(400).json({ error: `Event type ${request.query.eventType} does not exist` });
            return;
        }
    }
    const events = await client.query("SELECT * FROM events");
    response.status(200).json(events.rows);
  } catch (error) {
    next(error);
  }
});

// Create a new event
eventRouter.post("/", async (request, response, next) => {
  const {
    title,
    eventtype,
    description,
    address,
    coordinates,
    startdate,
    starttime,
    enddate,
    endtime,
    visibility,
  } = request.body;

  if (
    !title ||
    !eventtype ||
    !description ||
    !address ||
    !coordinates ||
    !startdate ||
    !starttime
  ) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await client.query(
      `INSERT INTO events 
       (title, eventtype, description, address, coordinates, startdate, starttime, enddate, endtime, visibility) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [
        title,
        eventtype,
        description,
        address,
        coordinates,
        startdate,
        starttime,
        enddate,
        endtime,
        visibility,
      ]
    );

    response.status(201).json({ event: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

export default eventRouter;

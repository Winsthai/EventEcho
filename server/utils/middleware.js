import jwt from "jsonwebtoken";
import { SECRET } from "./config.js";

export const errorHandler = (error, _request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

export const adminConfirmation = (request, _response, next) => {
  let token;

  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, SECRET);

    if (!decodedToken.id || decodedToken.role !== "admin") {
      next(jwt.JsonWebTokenError);
    }
  } else {
    next(jwt.JsonWebTokenError);
  }

  next();
};

export const userConfirmation = (request, _response, next) => {
  let token;

  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");

    try {
      const decodedToken = jwt.verify(token, SECRET);

      // Ensure the token contains a valid user ID and role
      if (!decodedToken.id || decodedToken.role !== "user") {
        return next(jwt.JsonWebTokenError);
      }

      request.userId = decodedToken.id; // Add the user ID to the request object

      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next(jwt.JsonWebTokenError); // Wrong authorization header
  }
};

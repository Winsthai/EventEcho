const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const errorHandler = (error, _request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

const adminConfirmation = (request, _response, next) => {
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

const userConfirmation = (request, _response, next) => {
  let token;

  const id = request.params.id;

  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, SECRET);

    if (!decodedToken.id || decodedToken.id != id) {
      next(jwt.JsonWebTokenError);
    }
  } else {
    next(jwt.JsonWebTokenError);
  }

  next();
};

module.exports = {
  errorHandler,
  adminConfirmation,
  userConfirmation,
};

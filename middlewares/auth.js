// middleware/auth.js
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { JWT_SECRET } = process.env;
const UnauthorizedError = require("../errors/UnauthorizedError");
const { ERROR_MESSAGES } = require("../errors/constants");

module.exports = (req, res, next) => {
  // get authorization from the header by destructuring
  const { authorization } = req.headers;

  // check that the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  // auth header exists and is in correct format
  // so extract the token from the header
  const token = authorization.replace("Bearer ", "");

  // if token is verified, save the payload
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // otherwise, return an error
    return next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  /* Save payload to request. This makes the payload available
   to the latter parts of the route. See the `Accessing user
   data with req.user` example for details. */
  req.user = payload;

  // sending the request to the next middleware
  return next();
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Slaylist = require("../models/slaylist");

require("dotenv").config();

const { JWT_SECRET } = require("../utils/config");

const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");
const { ERROR_MESSAGES } = require("../errors/constants");

const login = (req, res, next) => {
  const { email, password } = req.body;

  // Looks for missing fields in request and returns error before findUserByCredentials is run
  if (!email || !password) {
    throw new UnauthorizedError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError(ERROR_MESSAGES.INCORRECT_CREDENTIALS));
      } else {
        console.error(err);
        console.log(err.name);
        next(err);
      }
    });
};

const getMySlaylists = (req, res, next) => {
  console.log("getMySlaylists");
  console.log(req.user);
  const userId = req.user._id;
  Slaylist.find({ owner: userId })
    .then((slaylists) => {
      res.send(slaylists);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  // Extract user ID from req.user, set by auth middleware
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
      }
      // Return user data, excluding password
      const { email, name, _id } = user;
      return res.send({ email, name, _id });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, email, password: hash })
      .then((user) =>
        res.status(201).send({ email: user.email, name: user.name })
      )
      .catch((err) => {
        console.log(req.body);
        console.error(err);
        console.log(err.name);
        if (err.name === "ValidationError") {
          next(new BadRequestError(err.message));
        }
        if (err.code === 11000) {
          next(new ConflictError(ERROR_MESSAGES.DUPLICATE_EMAIL));
        }

        next(err);
      });
  });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  getMySlaylists,
};

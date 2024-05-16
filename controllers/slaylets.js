const Slaylet = require("../models/slaylet");
require("dotenv").config();
const { BadRequestError, NotFoundError } = require("../errors/Errors");
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

const getSlayletsBySlaylistId = (req, res, next) => {
  const { slaylistId } = req.params;

  return Slaylet.find({ listOwner: slaylistId })
    .orFail(() => {
      throw new NotFoundError(
        ` No item found with the given ID: ${slaylistId}`
      );
    })
    .then((slaylet) => {
      return res.send(slaylet);
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      if (err.name === "CastError") {
        next(new BadRequestError("Incorrect or invalid data"));
      }

      next(err);
    });
};

const createSlaylet = (req, res, next) => {
  // This may need to be updated to take in many slaylet entries from the body and map through them
  const { slaylistId } = req.params;
  const { link, handle, notes } = req.body;

  // Looks for missing fields and returns error before the Slaylet is created
  if (!link || !handle || !notes) {
    console.log(req.body);
    throw new BadRequestError("Missing required fields");
  }

  return Slaylet.create({ link, handle, notes, listOwner: slaylistId })
    .then((slaylet) => {
      return res.status(201).send(slaylet);
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      if (err.name === "ValidationError") {
        next(new BadRequestError("Incorrect or invalid data"));
      }

      next(err);
    });
};

module.exports = {
  createSlaylet,
  getSlayletsBySlaylistId,
};

const Slaylet = require("../models/slaylet");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const { ERROR_MESSAGES } = require("../errors/constants");

const getSlayletsBySlaylistId = (req, res, next) => {
  const { slaylistId } = req.params;

  return Slaylet.find({ listOwner: slaylistId })
    .orFail(() => {
      throw new NotFoundError(
        ` ${ERROR_MESSAGES.SLAYLET_NOT_FOUND} ${slaylistId}`
      );
    })
    .then((slaylet) => {
      res.send(slaylet);
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
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
    throw new BadRequestError(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
  }

  return Slaylet.create({ link, handle, notes, listOwner: slaylistId })
    .then((slaylet) => {
      res.status(201).send(slaylet);
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }

      next(err);
    });
};

module.exports = {
  createSlaylet,
  getSlayletsBySlaylistId,
};

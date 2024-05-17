const Slaylist = require("../models/slaylist");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");

const getTopSlaylists = (req, res, next) => {
  /* This returns the top 10 slaylists by likes by locating slaylist records, counting the number of likes, then sorting in descending order, then limiting to 1st 10.
  To improve performance, I could add a likesCount field in each document that gets updated every time a like is added or removed so that the aggregation doesn't need to happen on every load.
  */

  Slaylist.aggregate([
    {
      $addFields: {
        likesCount: { $size: "$likes" },
      },
    },
    { $sort: { likesCount: -1 } },
    { $limit: 10 },
  ])
    .then((data) => {
      console.log("top slaylists from backend");
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      next(err);
    });
};

const getSlaylistById = (req, res, next) => {
  const { slaylistId } = req.params;

  return Slaylist.findById(slaylistId)
    .orFail(() => {
      throw new NotFoundError(
        ` No item found with the given ID: ${slaylistId}`
      );
    })
    .then((slaylist) => {
      res.send(slaylist);
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

const createSlaylist = (req, res, next) => {
  const { category, title, tagline } = req.body;
  const ownerId = req.user._id;

  // Looks for missing fields and returns error before the Slaylist is created
  if (!category || !title || !tagline) {
    console.log(req.body);
    throw new BadRequestError("Missing required fields");
  }

  return Slaylist.create({ category, title, tagline, owner: ownerId })
    .then((slaylist) => {
      res.status(201).send(slaylist);
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

const deleteSlaylist = (req, res, next) => {
  const { slaylistId } = req.params;

  Slaylist.findById(slaylistId)
    .orFail(() => {
      throw new NotFoundError(
        `No item found with the given ID: ${req.params.itemId}`
      );
    })
    .then((slaylist) => {
      if (String(slaylist.owner) === String(req.user._id)) {
        return Slaylist.findByIdAndDelete(slaylistId).then(() => {
          res.send({ message: "Slaylist deleted" });
        });
      }
      throw new ForbiddenError("Cannot delete another user's slaylist");
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(
          new BadRequestError(`${err.name} | ID did not match expected format`)
        );
      }
      next(err);
    });
};

module.exports = {
  getTopSlaylists,
  createSlaylist,
  getSlaylistById,
  deleteSlaylist,
};

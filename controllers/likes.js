const Slaylist = require("../models/slaylist");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");

const updateLike = (req, res, next) => {
  Slaylist.findByIdAndUpdate(
    req.params.slaylistId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((like) => {
      res.send(like);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Slaylist not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Incorrect or invalid data"));
      }
      next(err);
    });
};

const deleteLike = (req, res, next) => {
  console.log(req);
  Slaylist.findByIdAndUpdate(
    req.params.slaylistId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((like) => {
      res.send(like);
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Slaylist not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Incorrect or invalid data"));
      }

      next(err);
    });
};

module.exports = { updateLike, deleteLike };

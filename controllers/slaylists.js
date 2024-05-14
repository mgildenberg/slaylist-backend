const Slaylist = require("../models/slaylist");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

const getTopSlaylists = (req, res, next) => {
  /* This returns the top 10 slaylists by likes by locating slaylist records, counting the number of likes, then sorting in descending order, then limiting to 1st 10.
  To improve performance, I could add a likesCount field in each document that gets updated every time a like is added or removed so that the aggregation doesn't need to happen on every load.
  */

  return Slaylist.aggregate([
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
      return res.send({ data });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      next(err);
    });
};

module.exports = {
  getTopSlaylists,
};

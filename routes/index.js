const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const { NotFoundError } = require("../errors/Errors");
const userRouter = require("./users");
const slaylistRouter = require("./slaylists");
const likeRouter = require("./likes");
const slayletRouter = require("./slaylets");

// REGISTRATION AND LOGIN

// POST /signup
router.post("/signup", createUser);
// POST /signin
router.post("/signin", login);

// Minimum set for project

// GET returning information about the logged-in user (email and name)
// GET /users/me
router.use("/users", userRouter);

// POST creating a data object by the user
// POST would create a brand new Slaylist. Needs auth and requires tagline + category
// POST returns 201 if a new user account was created
// POST /slaylist
// I put this in the slaylistRouter

// DELETE removing the data object created by the user
// DELETE /slaylists/:slaylistId, needs auth
// I guess I have to add a Delete button to the dashboard's Slaylists

// Realistic set for usage

router.use("/slaylists", slaylistRouter);
// Likes
router.use("/slaylists", likeRouter);
// Slaylets
router.use("/slaylists", slayletRouter);

// router.use((req, res, next) => {
//   return res.status.(404).send(message: {"Not found" });
// });

router.get("/", (req, res, next) => {
  res.send("YAS KWEEN");
});

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;

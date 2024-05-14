const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const { NotFoundError } = require("../errors/Errors");
const userRouter = require("./users");
const slaylistRouter = require("./slaylists");

// REGISTRATION AND LOGIN

// POST /signup
router.post("/signup", createUser);
// POST /signin
router.post("/signin", login);

// Minimum set for project

// GET returning information about the logged-in user (email and name)
// GET /users/me
router.use("/users", userRouter);

// GET returning data saved by the user
// GET /users/me/slaylists
// I think this would be used by the dashboard, not the front page
// I put this in the userRouter

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
// GET /slaylists/top
// This would return the top 10 Slaylists with the most likes. No auth.
// router.get("/slaylists/top", (req, res) => {
//   console.log("GET /slaylists/top");
//   // Fetch the top 10 Slaylists sorted by likes
//   // call function that does that
// });

// Slaylists
// GET /slaylist/:slaylistId
// GET would return the whole Slaylist’s metadata: owner username, current likes, title, tagline, and category. No auth.
// This is in the slaylistRouter

// Likes
// POST needs auth, used to add your Like
// POST /slaylist/:slaylistId/likes
// DELETE needs auth, used to remove your Like
// DELETE /slaylist/:slaylistId/likes

// Slaylets
// POST needs auth and requires all fields to be valid (so also dependent on 3P API). Returns 201 when new slaylet is added.
// POST /slaylist/:slaylistId/slaylets, auth needed
// GET returns the Slaylist’s entries/slaylets (for viewing the Modal)
// GET /slaylist/:slaylistId/slaylets

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

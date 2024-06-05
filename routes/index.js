const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/NotFoundError");
const userRouter = require("./users");
const slaylistRouter = require("./slaylists");
const likeRouter = require("./likes");
const slayletRouter = require("./slaylets");
const {
  userRegistrationValidation,
  userLoginValidation,
} = require("../middlewares/validation");

// REGISTRATION AND LOGIN

// POST /signup
router.post("/signup", userRegistrationValidation, createUser);
// POST /signin
router.post("/signin", userLoginValidation, login);

// GET returning information about the logged-in user (email and name)
router.use("/users", userRouter);

// Slaylists, incl GET, POST, PUT, and DELETE
// Note a few Slaylist routes don't require auth
router.use("/slaylists", slaylistRouter);
// Likes
router.use("/slaylists", likeRouter);
// Slaylets
router.use("/slaylists", slayletRouter);

router.get("/", (req, res, next) => {
  // Used to check if the server is running
  res.send("We're in 🥷");
});

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;

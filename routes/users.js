const router = require("express").Router();
const { getCurrentUser, getMySlaylists } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
// GET returning data saved by the user
// GET /users/me/slaylists
// I think this would be used by the dashboard, not the front page
router.get("/me/slaylists", auth, getMySlaylists);

// router.post("/signup", createUser);
// router.post("/signin", login);

module.exports = router;

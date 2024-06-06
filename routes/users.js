const router = require("express").Router();
const { getCurrentUser, getMySlaylists } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
// GET returning data saved by the user

// GET returning the user's slaylists
// This would be used by the dashboard, not the front page
router.get("/me/slaylists", auth, getMySlaylists);

module.exports = router;

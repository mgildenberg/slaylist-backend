const router = require("express").Router();
const { getTopSlaylists } = require("../controllers/slaylists");
const auth = require("../middlewares/auth");

router.get("/top", getTopSlaylists);
// router.post("/signup", createUser);
// router.post("/signin", login);

module.exports = router;

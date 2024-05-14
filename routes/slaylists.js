const router = require("express").Router();
const {
  getTopSlaylists,
  getSlaylistById,
  createSlaylist,
} = require("../controllers/slaylists");
const auth = require("../middlewares/auth");

router.get("/top", getTopSlaylists);
router.get("/:slaylistId", getSlaylistById);
router.post("/new", auth, createSlaylist);
// router.post("/signup", createUser);
// router.post("/signin", login);

module.exports = router;

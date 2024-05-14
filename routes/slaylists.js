const router = require("express").Router();
const {
  getTopSlaylists,
  getSlaylistById,
  createSlaylist,
  deleteSlaylist,
} = require("../controllers/slaylists");
const auth = require("../middlewares/auth");

router.get("/top", getTopSlaylists);
router.get("/:slaylistId", getSlaylistById);
router.post("/new", auth, createSlaylist);
router.delete("/:slaylistId", auth, deleteSlaylist);

module.exports = router;

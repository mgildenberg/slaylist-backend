const router = require("express").Router();
const {
  getTopSlaylists,
  getSlaylistById,
  createSlaylist,
  deleteSlaylist,
} = require("../controllers/slaylists");
const auth = require("../middlewares/auth");
const {
  createSlaylistValidation,
  slaylistIdValidation,
} = require("../middlewares/validation");

router.get("/top", getTopSlaylists);
router.get("/:slaylistId", slaylistIdValidation, getSlaylistById);
router.post("/new", createSlaylistValidation, auth, createSlaylist);
router.delete("/:slaylistId", slaylistIdValidation, auth, deleteSlaylist);

module.exports = router;

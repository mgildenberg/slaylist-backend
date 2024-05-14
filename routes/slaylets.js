const router = require("express").Router();
const {
  createSlaylet,
  getSlayletsBySlaylistId,
} = require("../controllers/slaylets");
const auth = require("../middlewares/auth");

router.post("/:slaylistId/slaylets", auth, createSlaylet);
router.get("/:slaylistId/slaylets", getSlayletsBySlaylistId);

module.exports = router;

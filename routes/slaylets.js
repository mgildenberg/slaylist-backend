const router = require("express").Router();
const {
  createSlaylet,
  getSlayletsBySlaylistId,
} = require("../controllers/slaylets");
const auth = require("../middlewares/auth");
const {
  createSlayletValidation,
  slaylistIdValidation,
} = require("../middlewares/validation");

router.post(
  "/:slaylistId/slaylets",
  createSlayletValidation,
  auth,
  createSlaylet
);
router.get(
  "/:slaylistId/slaylets",
  slaylistIdValidation,
  getSlayletsBySlaylistId
);

module.exports = router;

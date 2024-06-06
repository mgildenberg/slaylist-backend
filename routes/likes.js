const router = require("express").Router();
const { updateLike, deleteLike } = require("../controllers/likes");
const auth = require("../middlewares/auth");
const { slaylistIdValidation } = require("../middlewares/validation");

router.put("/:slaylistId/likes", auth, slaylistIdValidation, updateLike);
router.delete("/:slaylistId/likes", auth, slaylistIdValidation, deleteLike);

module.exports = router;

const router = require("express").Router();
const { updateLike, deleteLike } = require("../controllers/likes");
const auth = require("../middlewares/auth");

router.put("/:slaylistId/likes", auth, updateLike);
router.delete("/:slaylistId/likes", auth, deleteLike);

module.exports = router;

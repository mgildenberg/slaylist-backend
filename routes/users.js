const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
// router.post("/signup", createUser);
// router.post("/signin", login);

module.exports = router;

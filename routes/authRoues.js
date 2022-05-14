const router = require("express").Router();
const {
  signup,
  login,
  create,
  authUser,
  contactMe,
} = require("../controllers/authContorller");

router.get("/signup", signup);

router.post("/signup", create);

router.get("/login", login);

router.post("/login", authUser);

router.post("/contact", contactMe);

module.exports = router;

const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/DashBoard");
  }
);

module.exports = router;

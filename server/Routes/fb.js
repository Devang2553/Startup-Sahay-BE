// const express = require("express");
// const passport = require("passport");

// const router = express.Router();

// // router.get("/facebook", passport.authenticate("facebook"));
// // router.get(
// //   "/facebook/callback",
// //   passport.authenticate("facebook", { failureRedirect: "/login" }),
// //   (req, res) => {
// //     res.redirect("http://localhost:3000/DashBoard");
// //   }
// // );

// // Facebook authentication route
// router.get(
//   "/auth/facebook",
//   passport.authenticate("facebook", { scope: ["email"] })
// );

// // Facebook authentication callback route
// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "http://localhost:3000/DashBoard",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// );

// // Logout route
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// module.exports = router;

const passport = require("passport");

module.exports = {
  getFacebookAuth: passport.authenticate("facebook", { scope: ["email"] }),

  getFacebookAuthCallback: passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },

  handleFacebookAuthCallback: (accessToken, refreshToken, profile, done) => {
    // Find or create user object in the database
    User.findOne({ facebookId: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        facebookId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }

        done(null, newUser);
      });
    });
  },
};

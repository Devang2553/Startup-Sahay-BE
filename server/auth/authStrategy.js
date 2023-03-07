const passportFacebook = require("passport-facebook");
const FacebookStrategy = passportFacebook.Strategy;
require("dotenv").config();

const facebookAuthenticate = () =>
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
    }
  );
module.exports = {
  facebookAuthenticate,
};

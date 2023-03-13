const passportFacebook = require("passport-facebook");
const FacebookStrategy = passportFacebook.Strategy;
const User = require("./Model/fbModel");
require("dotenv").config();

FACEBOOK_CLIENT_ID = "899070987812226";
FACEBOOK_CLIENT_SECRET = "8ee2eec54114c5c7be8fd11af48f7cf0";

const facebookAuthenticate = () =>
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const facebookId = profile.id;
        const displayName = profile.displayName;
        const email = profile.emails[0].value;
        const user = await User.findOne({ facebookId });
        if (user) {
          done(null, user);
          console.log(user);
        } else {
          const newUser = new User({
            facebookId,
            displayName,
            email,
          });

          await newUser.save();
          done(null, newUser);
          console.log(newUser);
        }
      } catch (err) {
        done(err);
      }
    }
  );
module.exports = {
  facebookAuthenticate,
};

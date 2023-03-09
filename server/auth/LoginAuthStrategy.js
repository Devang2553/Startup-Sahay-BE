const passportJwt = require('passport-jwt');
const JWTStrategy = passportJwt.Strategy;
const User = require('../Model/userModel');

const tokenValidation = () =>
  new JWTStrategy(
    {
      jwtFromRequest:
        passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret key',
    },
    async (jwtToken, next) => {
      try {
        const user = await User.findById(jwtToken.id);
        if (!user) {
          return next(null, false, {
            message: 'Token Not valid',
          });
        }
        return next(null, user, {
          message: 'Login Successfull...',
        });
      } catch (error) {
        return next(error);
      }
    },
  );

  module.exports=tokenValidation
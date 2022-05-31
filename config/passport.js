const { Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");
const { User } = require("../models");
const passport = require("passport");
//config jwt strategy options

const options = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    console.log(payload);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return done(null, false);
    }
    // done has 2 parameters
    done(null, "Success Token Verifications"); // req.user = 'Success Token Verification' , next();
  } catch (err) {
    done(err, false);
  }
});

passport.use("jwt", jwtStrategy);


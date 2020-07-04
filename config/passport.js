const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const UserModel = require('../models/User')

function initialize(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  }
  passport.use(new JWTStrategy(opts, function (payload, cb) {
    var key = payload.email;
    console.log(payload);
    UserModel.findOne({ email: email }, (err, result) => {
      if (err) {
        console.log(err);
        return cb(err, false);
      } else if (!result) {
        console.log(result);
        return cb(null, false);
      } else {
        console.log(result);
        return cb(null, result);
      }
    })
  }));

  passport.use(new LocalStrategy(function (username, password, cb) {
    UserModel.findOne({ email: username, password: password }, (err, user) => {
      if (err) {
        console.log(err);
        cb(err, false);
      } else if (!user) {
        cb(null, false);
      } else {
        console.log("In Local Strategy", user);
        cb(null, user);
      }
    })
  }))
}

module.exports = { initialize: initialize }
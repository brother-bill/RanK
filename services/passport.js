const passport = require("passport"); // Gives express idea of how to handle authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Tells passport exactly how to authenticate users
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users"); // 1 argument means load out of mongoose

// user is a mongoose model instance, and we turned it into an id
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is shortcut to mongo generated _id
});

// id is the user's id, and we turn it into the mongoose model instance
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Proxy true for https, let GoogleStrategy decide
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }); //returns a promise, anytime we do anything we DB

      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save(); //new User is model instance, to save to DB is .save()
      done(null, user);
    }
  )
);

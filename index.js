const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // Get access to cookies
const passport = require("passport"); // Passport use cookies
const keys = require("./config/keys");
require("./models/User"); // Make sure it is before require passport, order matters because passport uses model
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const app = express(); // Generates a running application that represents a single app

// maxAge = millseconds, 30 days
// app.use() uses middlewares, each middleware takes that object and modifies req object slightly, preprocessing
// middlewares before route handlers, most about express
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); // Same as doing:
// const authRoutes = require("./routes/authRoutes");
// authRoutes(app);

// Whenever Heroku/etc has the option to pass environment variables, it will look for these variables
// If there is no environment variable, then use 5000 (for development)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
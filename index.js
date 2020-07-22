const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // Get access to cookies
const passport = require("passport"); // Passport use cookies
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const cors = require("cors");

require("./models/User"); // Make sure it is before require passport, order matters because passport uses model
require("./models/Listing");
require("./models/Rank");
require("./services/passport.service");

// Connect to mongo session, extra parameters are to remove deprecation warnings
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express(); // Generates a running application that represents a single app

// app.use() uses middlewares, each middleware takes that object and modifies req object slightly, preprocessing
// Middlewares before route handlers
// These 5 intercept all routes
app.use(bodyParser.json());
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 2 different ways to use route, could switch but will leave as is for reference
require("./routes/passport.router")(app);
app.use("/api", require("./routes/listing.router"));

if (process.env.NODE_ENV === "production") {
  // If client is trying to access route that we did not create a route handler for, try to see if it is handled in client side
  // Express will serve up production assetts
  app.use(express.static("client/build"));

  // Order of operation, if there the client also does not handle the route, then serve the index.html file
  // Express will serve up index.html if all previous attempts to match resource failed
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Whenever Heroku/etc has the option to pass environment variables, it will look for these variables
// If there is no environment variable, then use 5000 (for development)
const PORT = process.env.PORT || 5000;
app.listen(PORT);

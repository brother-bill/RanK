const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // Get access to cookies
const passport = require("passport"); // Passport use cookies
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User"); // Make sure it is before require passport, order matters because passport uses model
require("./models/Listing"); // i
require("./models/Rank");
require("./services/passport");

let schedule = require("node-schedule");
let test1 = schedule.scheduleJob("7 * * * *", function () {
  console.log("TEST");
});
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const app = express(); // Generates a running application that represents a single app

// maxAge = millseconds, 30 days
// app.use() uses middlewares, each middleware takes that object and modifies req object slightly, preprocessing
// middlewares before route handlers, most about
// These 4 intercept all routes
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/listingRoutes")(app); // Call route function with app object
// Same as doing:
// const authRoutes = require("./routes/authRoutes");
// authRoutes(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assetts
  app.use(express.static("client/build"));
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

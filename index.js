const express = require("express");
const app = express(); // Generates a running application that represents a single app

// This is a route handler app.get()
// Arrow function is called automatically when a single request comes in
app.get("/", (req, res) => {
  res.send({ hi: "there" });
  console.log(req);
});

// Whenever Heroku/etc has the option to pass environment variables, it will look for these variables
// If there is no environment variable, then use 5000 (for development)
const PORT = process.env.PORT || 5000;
app.listen(PORT);

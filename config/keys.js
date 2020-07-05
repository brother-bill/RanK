// Figure out which credentials to return
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  // Return dev keys
  module.exports = require("./dev");
}

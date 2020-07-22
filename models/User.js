const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: { type: String },
});
mongoose.model("users", userSchema); // 2 arguments mean load into mongoose, 1 means load out like in passport.js

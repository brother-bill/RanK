const mongoose = require("mongoose");
//const Schema = mongoose.Schema; Same as below
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  //credits: {type: Number, default: 0}
});

mongoose.model("users", userSchema); // 2 arguments mean load into mongoose, 1 means load out like in passport.js

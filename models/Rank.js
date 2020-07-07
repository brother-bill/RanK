const mongoose = require("mongoose");

const { Schema } = mongoose;

const rankSchema = new Schema({
  rank: { type: Object, default: {} },
});

mongoose.model("rankings", rankSchema); // 2 arguments mean load into mongoose, 1 means load out like in passport.js

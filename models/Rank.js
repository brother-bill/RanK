const mongoose = require("mongoose");
const { Schema } = mongoose;
const rankSchema = new Schema(
  {
    rank: { type: Schema.Types.Mixed },
    lastUpdated: { type: Date, default: Date.now() },
  },
  { minimize: false } // Will store empty objects instead of removing
);

mongoose.model("rankings", rankSchema); // 2 arguments mean load into mongoose, 1 means load out like in passport.js

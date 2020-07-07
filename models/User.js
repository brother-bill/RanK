const mongoose = require("mongoose");
//const Schema = mongoose.Schema; Same as below
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String },
  //listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "listings" }], // role and champions desired
  //credits: {type: Number, default: 0}
});

//schema.set('toJSON', { virtuals: true });
mongoose.model("users", userSchema); // 2 arguments mean load into mongoose, 1 means load out like in passport.js

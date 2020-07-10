const mongoose = require("mongoose");
//const Schema = mongoose.Schema; Same as below
const { Schema } = mongoose;
const shortid = require("shortid");

const listingSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  shortid: { type: String, unique: true, default: shortid.generate },
  title: { type: String, default: "Listing" },
  role: { type: String, default: null },
  champions: { type: Object, default: {} },
  dateCreated: { type: Date, default: Date.now },
  //credits: {type: Number, default: 0}
});

mongoose.model("listings", listingSchema); // 2 arguments mean load into mongoose, 1 means load out like in passport.js

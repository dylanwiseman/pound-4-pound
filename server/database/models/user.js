const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  passwordHash: String,
  goalWeight: Number,
  currentWeight: Number,
  benchPR: Number,
  squatPR: Number,
  deadliftPR: Number,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

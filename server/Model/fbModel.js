const mongoose = require("mongoose");

const fbUserSchema = new mongoose.Schema({
  facebookId: String,
  displayName: String,
  email: String,
});

module.exports = mongoose.model("fbUsers", fbUserSchema);

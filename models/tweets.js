const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  message: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);
module.exports = Tweet;

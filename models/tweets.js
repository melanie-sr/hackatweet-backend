const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  message: String,
  like: {
    type: Number,
    default: 0,
  },
  likeBy: [{ type: String }],
});

const Tweet = mongoose.model("tweets", tweetSchema);
module.exports = Tweet;

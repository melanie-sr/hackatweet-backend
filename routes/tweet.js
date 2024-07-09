var express = require("express");
const { route } = require("./users");
var router = express.Router();
const User = require("../models/users");
const { checkUser } = require("../modules/checkUser");
const Tweet = require("../models/tweets");

router.post("/newTweet", (req, res) => {
  if (!checkUser(req.body, ["token", "message"])) {
    res.json({ results: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ token: req.body.token }).then((data) => {
    const newTweet = new Tweet({
      user: data._id,
      message: req.body.message,
    });
    newTweet.save().then((data) => {
      res.json({ results: data });
    });
  });
});

router.get("/getTweets", (req, res) => {
  Tweet.find()
    .populate("user")
    .then((data) => {
      res.json({ result: true, tweet: data });
    });
});

router.delete("/deleteTweet/:id", (req, res) => {
  // if (!checkUser(req.body, ["token", "message"])) {
  //   res.json({ results: false, error: "Missing or empty fields" });
  //   return;
  // }

  Tweet.deleteOne({ _id: req.params.id }).then(() =>
    res.json({ result: true })
  );
});

router.post("/incrementLike", async (req, res) => {
  // if (!checkUser(req.body, ["token"])) {
  //   res.json({ results: false, error: "Missing or empty fields" });
  //   return;
  // }

  try {
    const userToken = await User.findOne({ token: req.body.token });
    if (!userToken) {
      res.json({ result: false, error: "User not found" });
      return;
    }

    const tweet = await Tweet.findOne({ _id: req.body.id });
    if (!tweet) {
      res.json({ result: false, error: "Tweet not found" });
      return;
    }

    if (tweet.likeBy.includes(userToken.token)) {
      const updatedTweet = await Tweet.findOneAndUpdate(
        { _id: req.body.id },
        { $pull: { likeBy: userToken.token } },
        { new: true }
      );
      res.json({ result: updatedTweet });
    } else {
      const updatedTweet = await Tweet.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { likeBy: userToken.token } },
        { new: true }
      );
      res.json({ result: updatedTweet });
    }
  } catch (err) {
    res.json({ result: err.message });
  }
});

module.exports = router;

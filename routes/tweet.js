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
    newTweet.save().then(() => {
      res.json({ results: true });
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

module.exports = router;

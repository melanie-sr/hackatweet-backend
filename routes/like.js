var express = require("express");
const { route } = require("./users");
var router = express.Router();
const User = require("../models/users");
const { checkUser } = require("../modules/checkUser");
const Tweet = require("../models/tweets");

// router.post('/addLike/:id', (req, res) => {
//     console.log("id is", req.params.id);
//     if (!checkUser(req.body, ["token", "message"])) {
//         res.json({ results: false, error: "Missing or empty fields" });
//         return;
//     }

//     if()

// })

module.exports = router;

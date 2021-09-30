const express = require("express");
const router = express.Router();
const postsRoute = require("./posts_route");
const commentRoute = require("./comments_route");

router.use("/posts", postsRoute);
router.use("/comments", commentRoute);

module.exports = router;

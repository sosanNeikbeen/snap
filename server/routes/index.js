const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth");
const passport = require("passport");
const postsRoute = require("./posts_route");
const commentRoute = require("./comments_route");
const userRoute = require("./user_route");
const conversationRoute = require("./conversations_route");
const messageRoute = require("./messages_route");

router.use(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postsRoute
);
router.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRoute
);
router.use("/users", userRoute);

router.use(
  "/conversations",

  conversationRoute
);
router.use(
  "/messages",

  messageRoute
);

module.exports = router;

const express = require("express");
const conversationController = require("../controllers/conversation_controller");

const router = express.Router();

router.post("/", conversationController.createConversation);
router.get("/:userId", conversationController.getUserConversation);
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getUsersConversation
);

module.exports = router;

const express = require("express");
const messageController = require("../controllers/Message_controller");

const router = express.Router();

router.post("/", messageController.createMessage);
router.get("/:conversationId", messageController.getMessage);

module.exports = router;

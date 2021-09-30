const express = require("express");
const commentController = require("../controllers/comment_controller");

const router = express.Router();

router.post("/", commentController.createComment);
router.get("/", commentController.getComments);
router.get("/:id", commentController.getComment);
router.delete("/delete/:id", commentController.deleteComment);
router.put("/edit/:id", commentController.updateComment);

module.exports = router;

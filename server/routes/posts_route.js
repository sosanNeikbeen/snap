const express = require("express");
const postController = require("../controllers/post_controller");

const router = express.Router();

router.post("/", postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.delete("/delete/:id", postController.deletePost);
router.put("/edit/:id", postController.updatePost);

module.exports = router;

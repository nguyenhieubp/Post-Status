const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const { verifyToken } = require("../middleware/verifyToken");
router.get("/", postController.getAllPost);
router.post("/", verifyToken, postController.createPost);
router.put("/:postId", verifyToken, postController.putPost);
router.delete("/:postId", verifyToken, postController.deletePost);

module.exports = router;

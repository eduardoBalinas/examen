const express = require("express");
const verifyAuth = require("../middlewares/verifyAuth");
const router = express.Router()
const { addPostController, allPostController, findPostController, updatePostController, deletePostController, userAllPostController, searchPostController } = require("../controllers/postsController");

router.post("/addPost", verifyAuth, addPostController)
router.get("/search/:postId", verifyAuth, findPostController)
router.get("/allPost", verifyAuth , allPostController)
router.get("/userPosts", verifyAuth, userAllPostController)
router.patch("/update/:postId", verifyAuth, updatePostController)
router.delete("/delete/:postId", verifyAuth, deletePostController)
router.get("/filter", verifyAuth, searchPostController);

module.exports = router
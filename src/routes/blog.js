const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const app = express();
// app.use(express.json());
// validator library

const blogController = require("../controllers/blog");

// [POST] : /v1/blog/post

// get All data blog
router.get("/posts", blogController.getAllBlogPost);

// Create Data post
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Minimal 5 Huruf"),
    body("body").isLength({ min: 5 }).withMessage(" Minimal 5 Huruf"),
  ],
  blogController.createBlogPost
);

// get data blog berdasar BlogId
router.get("/post/:postId", blogController.getBlogPostById);
// update data
router.put(
  "/post/:postId",
  [
    body("title").isLength({ min: 5 }).withMessage("Minimal 5 Huruf"),
    body("body").isLength({ min: 5 }).withMessage(" Minimal 5 Huruf"),
  ],
  blogController.updateBlogPost
);
// delete data
router.delete("/post/:postId", blogController.deleteBlogPost);

module.exports = router;

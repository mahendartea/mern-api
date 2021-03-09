const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const app = express();
// app.use(express.json());
// validator library

const blogController = require("../controllers/blog");

// [POST] : /v1/blog/post

// plus validator form
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Minimal 5 Huruf"),
    body("body").isLength({ min: 5 }).withMessage(" Minimal 5 Huruf"),
    body("image"),
  ],
  blogController.createBlogPost
);

module.exports = router;

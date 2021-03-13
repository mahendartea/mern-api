const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const BlogPost = require("../models/blog");
const multer = require("multer");

// function create post
exports.createBlogPost = (req, res, next) => {
  // cek validasi form post
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input yang di isi tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  var image = req.file.path;
  const body = req.body.body;

  //   Insert Blog ke MongoDB
  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: { uid: 1, name: "Mahendar Dwi Payana" },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({ message: "Create Blog Succeed!", data: result });
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
};

// function get All data
// exports.getAllBlogPost = (req, res, next) => {
//   BlogPost.find()
//     .then((result) => {
//       res.status(201).json({
//         message: "Data BlogPost berhasil di panggil!",
//         data: result,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

// function get All data with pagination
exports.getAllBlogPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(201).json({
        message: "Data BlogPost berhasil di panggil!",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => {
      next(err);
    });
};

// function get data berdasarkan postID
exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Data tidak ditenmukan");
        error.status(404);
        throw error;
      }
      res.status(200).json({
        message: "Data blogpost berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// function update post
exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input yang di isi tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  var image = req.file.path;
  const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update data berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// function delete post
exports.deleteBlogPost = (req, res, next) => {
  const postID = req.params.postId;

  BlogPost.findById(postID)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      // hapus image
      removeImage(post.image);

      // mongoquery to delete
      return BlogPost.findByIdAndRemove(postID);
    })
    .then((result) => {
      res.status(200).json({
        message: "hapus data blog post berhasil!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  // console.log("filePath", filePath);
  // console.log("", __dirname);

  filePath = path.join(__dirname, "../../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

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

exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(201).json({
        message: "Data BlogPost berhasil di panggil!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const express = require('express'); 
const router = express.Router();
// validator library
const {body} = require('express-validator');

const blogController = require('../controllers/blog');

// [POST] : /v1/blog/post
// plus validator form
router.post('/post',[
   body('title').isLength({min:5}).withMessage('title Minimal 5 Huruf'),
   body('body').isLength({min:5}).withMessage('Isian Minimal 5 Huruf')
], blogController.createBlogPost);

module.exports = router;
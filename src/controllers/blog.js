const {validationResult} = require('express-validator');

exports.createBlogPost = (req,res,next) => {
   const title = req.body.title;
   // const img = req.body.image;
   const body = req.body.body; 

   // cek validasi form post
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      // console.log('err : ', errors);
      // res.status(400).json({
      //    message: "Request Error",
      //    data:null
      // })
      const err = new Error('Input yang di isi tidak sesuai');
      err.errorStatus = 400;
      err.data = errors.array();
      throw err;
   }

   // hasil inputan
   const result = {
      message: 'Create Blog Succeed!',
      data:{
         post_id: 1,
         title: title,
         image:"imgFile.png",
         body: body,
         created_at:"12/07/2020",
         author:{
            uid:1,
            name:"testing"
         } 
      }
   }
   // status berhasil input
   res.status(201).json(result);

}
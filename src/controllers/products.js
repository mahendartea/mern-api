exports.createProduct = (req,res,next) => {
   // const name = req.body.name;
   // const price = req.body.price;
   console.log(req.body)
   res.json(
      {
         message: 'Create Product Success!!!',
         data: {
            id:1,
            "name": "mahendar DP",
            "price": 5000
         }
      }
   );
   next();
};

exports.getAllProducts = (req,res,next) => {
   res.json(
      {
         message: 'Get All Products success!',
         data:[
            {
               id:1,
               name: 'Sari Gandum',
               price: 5000
            }
         ]
      }
   );
   next();
}





